/**
 * Motor 3D de «Capacidad productiva» (home V2). Diseño del cliente en Claude
 * Design (24/09/2026, `Virens_sección_capacidad_productiva_3D.zip`): siete
 * envases modelados —dropper, vial, tarro, jarabe, blíster, stick y sobre— en
 * acabado porcelana mate, con balanceo lento en reposo y un gesto propio al
 * pasar el ratón (el tapón se desenrosca, el vial se inclina y se abre el
 * flip-off, el blíster y los sobres dan una vuelta).
 *
 * Port a TypeScript estricto con estos cambios de rendimiento (regla 9):
 *
 * - El original abría un WebGLRenderer por envase (siete contextos, siete
 *   mapas de sombra de 2048 px). Aquí hay UN renderer, UNA escena, UNA luz con
 *   sombra y UN entorno: los siete envases viven en la misma escena y cada uno
 *   se pinta por turno —solo él visible— en su propio canvas 2D.
 * - `three` llega con `import()` diferido desde el componente, cuando la
 *   sección se acerca al viewport; no entra en el bundle inicial.
 * - Densidad de píxel ×1,5 como tope, mapa de sombra de 512 px, suelo de
 *   sombras recortado y vidrio por transparencia en vez de `transmission`
 *   (que repintaba la escena entera en cada fotograma).
 * - En reposo (solo balanceo) pinta a 30 fps; con el ratón encima, al ritmo
 *   de la pantalla. No pinta los envases fuera de pantalla (fila deslizable
 *   en móvil) y se para del todo si la sección no se ve.
 *
 * Solo se conserva el acabado «Porcelana» (el elegido); sin líquidos, que ese
 * acabado ya ocultaba. El bucle se detiene fuera de pantalla y, con
 * `prefers-reduced-motion`, se pinta un fotograma quieto y no hay gestos.
 */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export type CapacityKind = 'dropper' | 'vial' | 'jar' | 'syrup' | 'blister' | 'stick' | 'sachet';

export interface CapacityHandle {
  /** Índice del envase bajo el puntero (−1 = ninguno). */
  hover: (i: number) => void;
  /** Posición del puntero dentro del envase i, normalizada a −1…1. */
  pointer: (i: number, x: number, y: number) => void;
  setVisible: (v: boolean) => void;
  dispose: () => void;
}

// Acabado «Porcelana» del diseño.
const FIN = {
  // Sin clearcoat (0,06 en el diseño, invisible) ni sheen: cada capa extra es
  // coste de sombreado por píxel en los siete envases.
  body: { color: '#f3f1ed', roughness: 0.7 },
  label: '#eef3f1',
  cap: '#6f9486',
  cap2: '#4b6180',
  pill: '#86a597',
  pouchBase: '#e9e8e4',
  pouchSeal: '#7a9a8d',
} as const;

/**
 * Encuadre, como en el original: el lienzo de cada envase es más alto que su
 * escenario visible y baja por debajo de la base para que suelo y sombra no se
 * corten. Sobre el alto del lienzo: 16 % libre arriba (el gesto de subida) y
 * 64 % de franja del objeto (64 px + 256 px sobre 400 px).
 */
const TOP_RATIO = 0.16;
const OBJ_RATIO = 0.64;

type Key = [number, number, number, number?];
interface Parts {
  cap?: THREE.Object3D;
  capY?: number;
  keys?: Key[];
  flip?: THREE.Object3D;
  flipY?: number;
}
interface View {
  kind: CapacityKind;
  cvs: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  host: HTMLElement;
  pivot: THREE.Group;
  tn: THREE.Group;
  sh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  shBase: [number, number];
  parts: Parts;
  ks: number[] | null;
  camera: THREE.PerspectiveCamera;
  w: number;
  h: number;
  st: number;
  size: number;
  sv: number;
  at: number;
  h2: number;
  spin: number;
  spinT: number;
  hov: number;
  tx: number;
  ty: number;
  ptx: number;
  pty: number;
  phase: number;
}

const PI = Math.PI;
const sm = (x: number) => {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
};

function noiseTex(size: number, rep: [number, number], lo: number, hi: number, blur: number) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const x = c.getContext('2d');
  if (!x) throw new Error('2D context unavailable');
  const img = x.createImageData(size, size);
  for (let i = 0; i < size * size; i += 1) {
    const v = lo + Math.random() * (hi - lo);
    img.data.set([v, v, v, 255], i * 4);
  }
  x.putImageData(img, 0, 0);
  if (blur) {
    x.filter = `blur(${blur}px)`;
    x.drawImage(c, 0, 0);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(rep[0], rep[1]);
  return t;
}

function shadowTex() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  if (!x) throw new Error('2D context unavailable');
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(30,44,52,0.5)');
  g.addColorStop(0.35, 'rgba(30,44,52,0.16)');
  g.addColorStop(1, 'rgba(30,44,52,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

// ---------- geometría (idéntica al diseño) ----------
type Pt = [number, number];
interface BottleOpts { R: number; H: number; b: number; sh: number; nR: number; nH: number }

function lathe(pts: Pt[], seg = 96, rib?: { n: number; amp: number; y0: number; y1: number }) {
  const g = new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), seg);
  if (rib) {
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i += 1) {
      const x = p.getX(i);
      const y = p.getY(i);
      const z = p.getZ(i);
      if (y < rib.y0 || y > rib.y1) continue;
      const k = 1 + rib.amp * Math.cos(Math.atan2(z, x) * rib.n);
      p.setXYZ(i, x * k, y, z * k);
    }
    g.computeVertexNormals();
  }
  return g;
}

function bottle({ R, H, b, sh, nR, nH }: BottleOpts): Pt[] {
  const p: Pt[] = [[0, 0]];
  for (let j = 0; j <= 10; j += 1) {
    const a = -PI / 2 + (PI / 2) * (j / 10);
    p.push([R - b + b * Math.cos(a), b + b * Math.sin(a)]);
  }
  p.push([R, H - sh]);
  const P0: Pt = [R, H - sh];
  const C1: Pt = [R, H - sh * 0.3];
  const C2: Pt = [nR + (R - nR) * 0.4, H];
  const P3: Pt = [nR, H];
  for (let j = 1; j <= 18; j += 1) {
    const t = j / 18;
    const u = 1 - t;
    const f = (a: number, bb: number, c: number, d: number) => u * u * u * a + 3 * u * u * t * bb + 3 * u * t * t * c + t * t * t * d;
    p.push([f(P0[0], C1[0], C2[0], P3[0]), f(P0[1], C1[1], C2[1], P3[1])]);
  }
  p.push([nR, H + nH], [nR * 0.8, H + nH], [0, H + nH]);
  return p;
}

function capProfile(r: number, h: number, er: number, rin: number): Pt[] {
  const p: Pt[] = [[rin, 0], [r - 0.004, 0], [r, 0.004], [r, h - er]];
  for (let j = 1; j <= 10; j += 1) {
    const a = (PI / 2) * (j / 10);
    p.push([r - er + er * Math.cos(a), h - er + er * Math.sin(a)]);
  }
  p.push([0, h]);
  return p;
}

/** Tamaños relativos del «pulso» al pasar el ratón (escalas del diseño). */
const PULSE: Partial<Record<CapacityKind, number[]>> = {
  dropper: [1.2, 1.42],
  vial: [1.2, 1.42],
  jar: [1.18, 1.36],
  syrup: [1.2, 1.42],
  blister: [1.18],
  stick: [1.22, 1.44],
};

/** Cede el hilo principal al navegador entre pasos del arranque. */
const yieldToBrowser = () => new Promise<void>((r) => setTimeout(r, 0));

/**
 * Arranque escalonado: entorno → un envase por paso → compilación de shaders
 * en paralelo (`compileAsync`) → primer fotograma. Así no hay una tarea larga
 * que congele el scroll justo al llegar a la sección (INP, regla 9).
 * `isAlive` permite abandonar si el componente se desmonta a mitad.
 */
export async function mount(
  hosts: HTMLElement[],
  kinds: CapacityKind[],
  opts: { reduced: boolean; isAlive: () => boolean },
): Promise<CapacityHandle | null> {
  // `low-power`: en portátiles con dos gráficas no despierta la dedicada (ni
  // gasta batería) por una sección decorativa.
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  // ×1,5 como tope: a ×2/×3 el coste de pintar crece con el cuadrado y, en
  // objetos mate de 150 px, la diferencia no se ve.
  const pr = Math.min(1.5, window.devicePixelRatio || 1);
  renderer.setPixelRatio(pr);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  // Entorno a 64 px (256 por defecto): en porcelana mate no se aprecian los
  // reflejos finos y prepararlo cuesta 16 veces menos.
  const envTex = pm.fromScene(new RoomEnvironment(), 0.04, 0.1, 100, { size: 64 }).texture;
  pm.dispose();
  scene.environment = envTex;
  scene.add(new THREE.HemisphereLight(0xfbfaf6, 0xd9dedc, 0.35));
  const key = new THREE.DirectionalLight(0xfffaf2, 2.1);
  key.position.set(-2.2, 4.6, 1.5);
  key.castShadow = true;
  // Sombra suave y pequeña en pantalla: 512 px de mapa bastan.
  key.shadow.mapSize.set(512, 512);
  key.shadow.radius = 5;
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.015;
  Object.assign(key.shadow.camera, { left: -2.5, right: 2.5, top: 2.5, bottom: -1.5, near: 0.5, far: 12 });
  key.shadow.camera.updateProjectionMatrix();
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xf2f6f4, 0.9);
  rim.position.set(2.6, 1.8, -1.8);
  scene.add(rim);
  // Suelo solo donde caen sombras (la luz viene de arriba a la izquierda): el
  // plano de 6 × 6 del diseño calculaba sombra en media pantalla vacía.
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2), new THREE.ShadowMaterial({ color: 0x1d2e3a, opacity: 0.09 }));
  floor.rotation.x = -PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  await yieldToBrowser();
  const abort = () => {
    renderer.dispose();
    renderer.forceContextLoss();
    return null;
  };
  if (!opts.isAlive()) return abort();

  // Materiales (porcelana).
  const grain = noiseTex(512, [6, 3], 90, 165, 0.6);
  const grainR = noiseTex(256, [4, 2], 200, 255, 1);
  const paper = noiseTex(256, [8, 2], 110, 150, 0.4);
  const fine = noiseTex(256, [10, 10], 110, 150, 0.5);
  // MeshStandardMaterial: sin clearcoat ni sheen no hace falta el físico, y el
  // estándar compila y sombrea bastante más rápido.
  const P = (o: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(o);
  const mats = {
    body: P({ ...FIN.body, metalness: 0, bumpMap: grain, bumpScale: 0.12, roughnessMap: grainR }),
    label: P({ color: FIN.label, roughness: 0.9, side: THREE.DoubleSide, bumpMap: paper, bumpScale: 0.2 }),
    cap: P({ color: FIN.cap, roughness: 0.72, bumpMap: fine, bumpScale: 0.08 }),
    cap2: P({ color: FIN.cap2, roughness: 0.74, bumpMap: fine, bumpScale: 0.08 }),
    metal: P({ color: '#d7dbdd', metalness: 0.85, roughness: 0.48 }),
    foil: P({ color: '#e9ecec', metalness: 0.5, roughness: 0.55, bumpMap: fine, bumpScale: 0.1 }),
    // Burbujas del blíster y pipeta: vidrio por transparencia simple. La
    // `transmission` del diseño obliga a three a pintar la escena una segunda
    // vez en cada fotograma solo para refractar dos piezas diminutas.
    dome: P({ color: '#ffffff', transparent: true, opacity: 0.35, roughness: 0.08, depthWrite: false }),
    pill: P({ color: FIN.pill, roughness: 0.7 }),
    rubber: P({ color: '#a3aaad', roughness: 0.92 }),
    pipette: P({ color: '#ffffff', transparent: true, opacity: 0.3, roughness: 0.08, depthWrite: false }),
    pouch: P({ vertexColors: true, roughness: 0.72, bumpMap: fine, bumpScale: 0.1 }),
  };
  type Role = keyof typeof mats;
  const mesh = (geo: THREE.BufferGeometry, role: Role, y = 0) => {
    const m = new THREE.Mesh(geo, mats[role]);
    m.userData.role = role;
    m.position.y = y;
    return m;
  };
  const bottleSet = (g: THREE.Group, o: BottleOpts, lab: [number, number]) => {
    g.add(mesh(lathe(bottle(o), 128), 'body'));
    g.add(mesh(new THREE.CylinderGeometry(o.R + 0.003, o.R + 0.003, lab[1], 128, 1, true), 'label', lab[0]));
  };
  const pillow = (w: number, h: number, d: number, sx: number, sy: number, freq: number, ws: number, hs: number) => {
    const g = new THREE.BoxGeometry(w, h, d, ws, hs, 1);
    const p = g.attributes.position as THREE.BufferAttribute;
    const cols = new Float32Array(p.count * 3);
    const base = new THREE.Color(FIN.pouchBase);
    const seal = new THREE.Color(FIN.pouchSeal);
    const ix = w / 2 - sx;
    const iy = h / 2 - sy;
    const seam = 0.004;
    for (let i = 0; i < p.count; i += 1) {
      const x = p.getX(i);
      const y = p.getY(i);
      const sg = Math.sign(p.getZ(i)) || 1;
      let z: number;
      let edge = true;
      if (Math.abs(y) > iy) z = seam + 0.0026 * (0.5 + 0.5 * Math.sin(x * freq));
      else if (Math.abs(x) > ix) z = seam;
      else {
        const u = Math.abs(x) / ix;
        const v = Math.abs(y) / iy;
        z = seam + (d / 2) * Math.sqrt(1 - u * u) * Math.sqrt(1 - Math.pow(v, 6));
        edge = false;
      }
      p.setZ(i, sg * z);
      const c = edge ? seal : base;
      cols.set([c.r, c.g, c.b], i * 3);
    }
    g.computeVertexNormals();
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    return g;
  };

  const build = (kind: CapacityKind): { group: THREE.Group; shadow: [number, number]; parts: Parts } => {
    const g = new THREE.Group();
    let shadow: [number, number] = [0.72, 0.72];
    let parts: Parts = {};
    if (kind === 'dropper') {
      const o = { R: 0.3, H: 0.6, b: 0.06, sh: 0.16, nR: 0.1, nH: 0.08 };
      bottleSet(g, o, [0.2, 0.14]);
      const as = new THREE.Group();
      as.add(mesh(lathe(capProfile(0.125, 0.11, 0.02, 0.1), 256, { n: 48, amp: 0.012, y0: 0.006, y1: 0.09 }), 'cap2', o.H));
      const bp: Pt[] = [[0.075, 0], [0.075, 0.02], [0.058, 0.04]];
      for (let j = 0; j <= 20; j += 1) {
        const a = -0.8 + (PI / 2 + 0.8) * (j / 20);
        bp.push([0.08 * Math.cos(a), 0.15 + 0.115 * Math.sin(a)]);
      }
      as.add(mesh(lathe(bp, 96), 'cap', o.H + 0.1));
      const pp: Pt[] = [[0, 0], [0.012, 0.004], [0.018, 0.03], [0.026, 0.07], [0.026, 0.44], [0, 0.44]];
      as.add(mesh(lathe(pp, 48), 'pipette', o.H - 0.42));
      g.add(as);
      parts = { cap: as, capY: 0, keys: [[0, 0, 0], [0.8, 0.05, -2.5 * PI], [1.45, 0.34, -2.7 * PI], [2.15, 0.34, -2.7 * PI], [2.75, 0.05, -2.5 * PI], [3.5, 0, 0]] };
    } else if (kind === 'vial') {
      const o = { R: 0.2, H: 0.7, b: 0.04, sh: 0.07, nR: 0.12, nH: 0.06 };
      const cy = o.H + o.nH - 0.05;
      bottleSet(g, o, [0.22, 0.16]);
      const cr: Pt[] = [[0.12, 0], [0.131, 0], [0.135, 0.004], [0.135, 0.066]];
      for (let j = 1; j <= 8; j += 1) {
        const a = (PI / 2) * (j / 8);
        cr.push([0.121 + 0.014 * Math.cos(a), 0.066 + 0.014 * Math.sin(a)]);
      }
      cr.push([0.066, 0.08], [0.06, 0.077], [0.058, 0.07]);
      g.add(mesh(lathe(cr, 128), 'metal', cy));
      const st: Pt[] = [[0, 0.055], [0.06, 0.055], [0.062, 0.066], [0.059, 0.073]];
      for (let j = 0; j <= 8; j += 1) {
        const a = j / 8;
        st.push([0.059 - 0.059 * a, 0.073 + 0.006 * Math.sin((a * PI) / 2)]);
      }
      g.add(mesh(lathe(st, 64), 'rubber', cy));
      const ring = mesh(new THREE.TorusGeometry(0.028, 0.004, 10, 48), 'rubber', cy + 0.078);
      ring.rotation.x = PI / 2;
      g.add(ring);
      const flip = mesh(lathe(capProfile(0.142, 0.05, 0.02, 0), 128), 'cap', cy + 0.082);
      g.add(flip);
      parts = { flip, flipY: cy + 0.082 };
      shadow = [0.5, 0.5];
    } else if (kind === 'jar') {
      const o = { R: 0.38, H: 0.52, b: 0.05, sh: 0.05, nR: 0.33, nH: 0.05 };
      bottleSet(g, o, [0.24, 0.22]);
      const cap = mesh(lathe(capProfile(0.355, 0.15, 0.03, 0.33), 440, { n: 110, amp: 0.005, y0: 0.006, y1: 0.12 }), 'cap', o.H - 0.005);
      g.add(cap);
      parts = { cap, capY: o.H - 0.005, keys: [[0, 0, 0], [0.9, 0.06, -3 * PI], [1.45, 0.22, -3.3 * PI], [2.0, 0.22, -3.3 * PI], [2.5, 0.06, -3 * PI], [3.4, 0, 0]] };
      shadow = [0.8, 0.8];
    } else if (kind === 'syrup') {
      const o = { R: 0.29, H: 0.86, b: 0.07, sh: 0.22, nR: 0.105, nH: 0.1 };
      bottleSet(g, o, [0.3, 0.22]);
      const cap = mesh(lathe(capProfile(0.12, 0.16, 0.02, 0.105), 320, { n: 40, amp: 0.014, y0: 0.006, y1: 0.14 }), 'cap', o.H + o.nH - 0.08);
      g.add(cap);
      parts = {
        cap,
        capY: o.H + o.nH - 0.08,
        keys: [[0, 0, 0, 0], [0.8, 0.05, -2.5 * PI, 0], [1.3, 0.2, -2.7 * PI, 0], [1.9, 0.2, -2.7 * PI, 0.45], [2.6, 0.2, -2.7 * PI, 0.45], [3.2, 0.2, -2.7 * PI, 0], [3.7, 0.05, -2.5 * PI, 0], [4.4, 0, 0, 0]],
      };
      const ring = mesh(new THREE.TorusGeometry(0.112, 0.009, 12, 96), 'cap2', o.H + o.nH - 0.088);
      ring.rotation.x = PI / 2;
      g.add(ring);
      shadow = [0.78, 0.78];
    } else if (kind === 'blister') {
      const w = 0.6;
      const h = 0.92;
      const r = 0.06;
      const s = new THREE.Shape();
      s.moveTo(-w / 2 + r, -h / 2);
      s.lineTo(w / 2 - r, -h / 2);
      s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      s.lineTo(w / 2, h / 2 - r);
      s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      s.lineTo(-w / 2 + r, h / 2);
      s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      s.lineTo(-w / 2, -h / 2 + r);
      s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      const pg = new THREE.ExtrudeGeometry(s, { depth: 0.012, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 3, curveSegments: 12 });
      pg.center();
      g.add(mesh(pg, 'foil'));
      const dg = new THREE.SphereGeometry(0.066, 40, 16, 0, PI * 2, 0, PI / 2);
      dg.rotateX(PI / 2);
      const pgl = new THREE.SphereGeometry(0.05, 32, 16);
      for (let c = 0; c < 3; c += 1) {
        for (let q = 0; q < 5; q += 1) {
          const x = (c - 1) * 0.175;
          const y = (q - 2) * 0.168;
          const d = mesh(dg, 'dome');
          d.position.set(x, y, 0.012);
          d.scale.set(1, 1, 0.6);
          g.add(d);
          const p = mesh(pgl, 'pill');
          p.position.set(x, y, 0.026);
          p.scale.set(1, 1, 0.42);
          g.add(p);
        }
      }
      shadow = [0.75, 0.28];
    } else if (kind === 'stick') {
      g.add(mesh(pillow(0.17, 1, 0.055, 0.012, 0.075, 380, 72, 120), 'pouch'));
      shadow = [0.34, 0.2];
    } else {
      g.add(mesh(pillow(0.7, 0.8, 0.075, 0.05, 0.06, 190, 140, 110), 'pouch'));
      shadow = [0.85, 0.3];
    }
    return { group: g, shadow, parts };
  };

  const shTex = shadowTex();
  const views: View[] = [];
  for (let i = 0; i < kinds.length; i += 1) {
    await yieldToBrowser();
    if (!opts.isAlive()) {
      hosts.forEach((h) => h.querySelectorAll('canvas').forEach((c) => c.remove()));
      return abort();
    }
    const kind = kinds[i] as CapacityKind;
    const host = hosts[i] as HTMLElement;
    const cvs = document.createElement('canvas');
    Object.assign(cvs.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block' });
    cvs.setAttribute('aria-hidden', 'true');
    host.appendChild(cvs);
    const ctx = cvs.getContext('2d');
    if (!ctx) throw new Error('2D context unavailable');

    const { group, shadow, parts } = build(kind);
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const ctr = box.getCenter(new THREE.Vector3());
    const s = Math.min(1 / size.y, 0.62 / Math.max(size.x, size.z));
    group.scale.setScalar(s);
    group.position.set(-ctr.x * s, -box.min.y * s - 0.12, -ctr.z * s);
    const pivot = new THREE.Group();
    const tn = new THREE.Group();
    tn.position.y = 0.12;
    group.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const r = o.userData.role as Role;
        o.castShadow = r !== 'pipette' && r !== 'dome';
        o.receiveShadow = true;
      }
    });
    tn.add(group);
    pivot.add(tn);
    pivot.visible = false;
    scene.add(pivot);
    const sh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false, opacity: 0.45, toneMapped: false }),
    );
    sh.rotation.x = -PI / 2;
    sh.position.y = 0.001;
    sh.visible = false;
    scene.add(sh);
    views.push({
      kind, cvs, ctx, host, pivot, tn, sh, shBase: shadow, parts, ks: PULSE[kind] ?? null,
      camera: new THREE.PerspectiveCamera(26, 1, 0.1, 50),
      w: 0, h: 0, st: -1, size: 1, sv: 0, at: -1, h2: 0, spin: 0, spinT: 0, hov: 0, tx: 0, ty: 0, ptx: 0, pty: 0, phase: i * 0.85,
    });
  }

  const resize = () => {
    for (const v of views) {
      const w = Math.max(1, v.host.clientWidth);
      const h = Math.max(1, v.host.clientHeight);
      v.w = w;
      v.h = h;
      v.cvs.width = Math.round(w * pr);
      v.cvs.height = Math.round(h * pr);
      const top = h * TOP_RATIO;
      const obj = h * OBJ_RATIO;
      const a = w / obj;
      const k = 2 * Math.tan((13 * PI) / 180);
      const d = Math.max(1.26 / k, 0.9 / (k * a));
      v.camera.aspect = a;
      v.camera.position.set(0, 0.6 + d * 0.1, d);
      v.camera.lookAt(0, 0.6, 0);
      v.camera.setViewOffset(w, obj, 0, -top, w, h);
      v.camera.updateProjectionMatrix();
    }
  };

  let hovIdx = -1;
  let visible = true;
  let dead = false;
  let raf = 0;
  let last = performance.now();

  const draw = (v: View) => {
    if (renderer.domElement.width !== v.cvs.width || renderer.domElement.height !== v.cvs.height) {
      renderer.setSize(v.w, v.h, false);
    }
    v.pivot.visible = true;
    v.sh.visible = true;
    renderer.render(scene, v.camera);
    v.pivot.visible = false;
    v.sh.visible = false;
    v.ctx.clearRect(0, 0, v.cvs.width, v.cvs.height);
    v.ctx.drawImage(renderer.domElement, 0, 0, v.cvs.width, v.cvs.height);
  };

  /** Algún envase en movimiento propio (hover, gesto o muelle sin asentar). */
  const busy = () =>
    warm < views.length ||
    hovIdx >= 0 ||
    views.some((v) => v.hov > 0.002 || v.at >= 0 || v.st >= 0 || Math.abs(v.spinT - v.spin) > 0.002 || Math.abs(v.sv) > 0.002 || v.h2 > 0.002);

  /** ¿Está el lienzo en pantalla? En móvil la fila se desliza y la mayoría queda fuera. */
  const onScreen = (v: View) => {
    const r = v.host.getBoundingClientRect();
    return r.right > 0 && r.left < window.innerWidth && r.bottom > 0 && r.top < window.innerHeight;
  };

  /** Envases ya pintados al menos una vez: al arrancar se suma uno por fotograma. */
  let warm = 0;

  const tick = (t: number, dt: number) => {
    const idle = !opts.reduced;
    // Al arrancar, un envase más por fotograma (de izquierda a derecha, como la
    // entrada en cascada): el primer pintado no es una tarea larga única.
    if (warm < views.length) warm += 1;
    const e = (k: number) => 1 - Math.exp(-dt * k);
    for (let i = 0; i < views.length; i += 1) {
      const v = views[i] as View;
      if (v.host.clientWidth !== v.w || v.host.clientHeight !== v.h) resize();
      v.hov += ((hovIdx === i ? 1 : 0) - v.hov) * e(6);
      v.spin += (v.spinT - v.spin) * e(2.4);
      v.tx += (v.ptx - v.tx) * e(7);
      v.ty += (v.pty - v.ty) * e(7);
      const h = v.hov;
      const idl = idle ? Math.sin(t * 0.45 + v.phase) * 0.3 : 0;
      const Pp = v.parts;
      if (Pp.keys && Pp.cap && Pp.capY != null && v.at >= 0) {
        v.at += dt;
        const K = Pp.keys;
        let y = 0;
        let r = 0;
        let tl = 0;
        const lastKey = K[K.length - 1] as Key;
        if (v.at >= lastKey[0]) v.at = -1;
        else {
          for (let j = 0; j < K.length - 1; j += 1) {
            const a = K[j] as Key;
            const b = K[j + 1] as Key;
            if (v.at < b[0]) {
              const u = sm((v.at - a[0]) / (b[0] - a[0]));
              y = a[1] + (b[1] - a[1]) * u;
              r = a[2] + (b[2] - a[2]) * u;
              tl = (a[3] ?? 0) + ((b[3] ?? 0) - (a[3] ?? 0)) * u;
              break;
            }
          }
        }
        Pp.cap.position.y = Pp.capY + y;
        Pp.cap.rotation.y = r;
        if (v.kind === 'syrup') v.tn.rotation.x = tl;
      }
      if (v.kind === 'vial' && Pp.flip && Pp.flipY != null) {
        v.h2 += ((hovIdx === i ? 1 : 0) - v.h2) * e(2.6);
        const ti = sm(v.h2 / 0.65);
        const fp = sm((v.h2 - 0.35) / 0.65);
        v.tn.rotation.x = 0.62 * ti;
        Pp.flip.position.y = Pp.flipY + 0.14 * fp;
        Pp.flip.position.z = -0.05 * fp;
        Pp.flip.rotation.x = -0.55 * fp;
      }
      const tf = v.kind === 'vial' || Pp.keys ? 0.25 : 0.5;
      v.pivot.rotation.y = v.spin + idl * (1 - h) + v.tx * tf * h;
      v.pivot.rotation.x = v.ty * 0.16 * h;
      v.pivot.position.y = 0.07 * h + (idle ? Math.sin(t * 1.1 + v.phase) * 0.006 : 0);
      v.pivot.scale.setScalar((1 + 0.02 * h) * v.size);
      let tgt = 1;
      if (v.ks && v.st >= 0 && hovIdx === i) {
        v.st += dt;
        const k1 = v.ks[0] as number;
        const k2 = v.ks[1] ?? k1;
        const S = v.st;
        tgt = S < 0.35 ? 1 : S < 1.35 ? k1 : S < 2.6 ? k2 : 1;
        if (S > 3.2) v.st = -1;
      }
      // Muelle hacia el tamaño objetivo (el «pulso» del diseño).
      v.sv += ((tgt - v.size) * 90 - v.sv * 13) * dt;
      v.size += v.sv * dt;
      const sc = (1 - 0.14 * h) * v.size;
      v.sh.scale.set(v.shBase[0] * sc, v.shBase[1] * sc, 1);
      v.sh.material.opacity = 0.45 - 0.22 * h;
      if (i < warm && (opts.reduced || onScreen(v))) draw(v);
    }
  };

  // En reposo solo hay el balanceo lento: basta a 30 fps. Con el ratón encima
  // (o mientras un gesto termina) va al ritmo de la pantalla.
  const IDLE_FRAME = 1000 / 30;
  const loop = (now: number) => {
    raf = 0;
    if (dead || !visible) return;
    if (busy() || now - last >= IDLE_FRAME - 1) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      tick(now / 1000, dt);
    }
    raf = requestAnimationFrame(loop);
  };
  const start = () => {
    if (dead || raf || opts.reduced) return;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };

  resize();
  // Shaders compilados fuera del hilo principal donde el navegador lo permite
  // (KHR_parallel_shader_compile); con todo visible para que no falte ninguna
  // variante al pintar.
  views.forEach((v) => {
    v.pivot.visible = true;
    v.sh.visible = true;
  });
  const first = views[0];
  if (first) await renderer.compileAsync(scene, first.camera);
  views.forEach((v) => {
    v.pivot.visible = false;
    v.sh.visible = false;
  });
  if (!opts.isAlive()) {
    views.forEach((v) => v.cvs.remove());
    return abort();
  }
  // Primer fotograma (solo el primer envase; el resto entra uno por fotograma).
  tick(0, 0);
  if (opts.reduced) {
    // Sin bucle: termina el calentamiento en fotogramas sucesivos y se queda quieto.
    const warmUp = () => {
      if (dead || warm >= views.length) return;
      tick(0, 0);
      requestAnimationFrame(warmUp);
    };
    requestAnimationFrame(warmUp);
  }
  const ro = new ResizeObserver(() => {
    resize();
    if (opts.reduced) tick(0, 0);
  });
  hosts.forEach((h) => ro.observe(h));
  start();

  return {
    hover(i) {
      if (opts.reduced) return;
      hovIdx = i;
      const v = views[i];
      if (!v) return;
      v.st = 0;
      if (v.kind === 'jar' || v.kind === 'dropper' || v.kind === 'syrup') {
        if (v.at < 0) v.at = 0;
      } else if (v.kind !== 'vial') v.spinT += PI * 2;
    },
    pointer(i, x, y) {
      const v = views[i];
      if (!v) return;
      v.ptx = x;
      v.pty = y;
    },
    setVisible(vis) {
      visible = vis;
      if (vis) start();
    },
    dispose() {
      dead = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      views.forEach((v) => v.cvs.remove());
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) m.geometry.dispose();
      });
      Object.values(mats).forEach((m) => m.dispose());
      [grain, grainR, paper, fine, shTex, envTex].forEach((t) => t.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
