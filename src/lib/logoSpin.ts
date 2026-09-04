import * as THREE from 'three';

import type { LogoKey } from '@/lib/types';

/**
 * Motor 3D del isotipo (port de `logo-spin.js`, entregado por el cliente el
 * 2026-09-04). Dos cambios respecto al original, ninguno de comportamiento:
 *
 * 1. `three` se importa como módulo, no por URL de unpkg. Next la empaqueta y
 *    hace tree-shaking, así que entra solo lo que se usa (~150 KB gzip en vez
 *    de los 410 KB que pesan `three.module.js` + `three.core.js` sueltos) y se
 *    sirve desde el propio dominio, sin depender de un CDN de terceros.
 * 2. Deja de ser un custom element con shadow DOM: monta sobre un contenedor
 *    que le pasa React. Evita el shadow DOM en SSR y permite tipar de verdad
 *    (CLAUDE.md regla 10).
 *
 * La geometría, el degradado por vértice, el entorno de estudio y la
 * coreografía molecular son los del cliente, sin tocar.
 */

const S = 0.001;          // 1 px del logo original = 1 mm
const R_LINK = 0.04;      // radio de la barra de enlace
const FILLET = 0.052;     // radio del acuerdo cóncavo nodo↔barra
const SEPARATION = 0.16;  // fracción del ancho que se aparta cada mitad
const FIT = 1.06;         // holgura sobre la pose ABIERTA (ya medida): casi ninguna

interface LogoSpec {
  /** Eje del degradado en el plano del logo. */
  grad: readonly [number, number];
  /** Colores clave muestreados del logo 2D. */
  keys: readonly string[];
  /** `nodo: [x, y, radio]` en píxeles del original de 1240 px. */
  nodes: Readonly<Record<string, readonly [number, number, number]>>;
  links: ReadonlyArray<readonly [string, string]>;
}

const SPECS: Record<LogoKey, LogoSpec> = {
  A: {
    grad: [0.3, 1.0],
    keys: ['#1b4a8f', '#4b3389', '#7d2283', '#b8157e', '#e60c7c'],
    nodes: {
      A1: [215, 230, 105], A2: [492, 230, 118], A3: [500, 1012, 105],
      B1: [752, 225, 100], B2: [1035, 232, 105], B3: [752, 1012, 105],
    },
    links: [['A1', 'A2'], ['A2', 'A3'], ['B1', 'B2'], ['B1', 'B3']],
  },
  B: {
    grad: [1.0, 0.75],
    keys: ['#0b4a78', '#0c6081', '#0d7c8c', '#08a5a0', '#02c7b3'],
    nodes: {
      C1: [320, 190, 118], C2: [320, 1090, 112], C3: [680, 1100, 105],
      D1: [645, 415, 110], D2: [645, 790, 105], D3: [960, 790, 100],
    },
    links: [['C1', 'C2'], ['C2', 'C3'], ['D1', 'D2'], ['D2', 'D3']],
  },
};

/** Datos de animación que cuelgan de cada mitad en L del logo. */
interface PartData {
  base: THREE.Vector3;
  dir: THREE.Vector3;
  dist: number;
  axis: THREE.Vector3;
  up: THREE.Vector3;
  swayAxis: THREE.Vector3;
  sign: number;
}

/** Perfil del acuerdo: arco cóncavo tangente a la esfera (R) y a la barra (r). */
function filletProfile(R: number, r: number, f: number, steps: number) {
  const cx = r + f;
  const yf = Math.sqrt(Math.max((R + f) * (R + f) - cx * cx, 1e-6));
  const px = (cx * R) / (R + f);
  const py = (yf * R) / (R + f);
  const a0 = Math.atan2(py - yf, px - cx);
  const a1 = -Math.PI;
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = a0 + (a1 - a0) * (i / steps);
    pts.push(new THREE.Vector2(cx + f * Math.cos(a), yf + f * Math.sin(a)));
  }
  return { pts, yf };
}

function rampAt(cs: readonly THREE.Color[], t: number) {
  const u = Math.min(Math.max(t, 0), 1) * (cs.length - 1);
  const j = Math.min(cs.length - 2, Math.floor(u));
  const a = cs[j];
  const b = cs[j + 1];
  if (!a) throw new Error('rampa de color vacía');
  return b ? a.clone().lerp(b, u - j) : a.clone();
}

/** Degradado como color por vértice: fundido continuo, sin escalones por tramo. */
function paintGradient(group: THREE.Group, keys: readonly string[], grad: readonly [number, number]) {
  const cs = keys.map((h) => new THREE.Color(h));
  const axis = new THREE.Vector3(grad[0], -grad[1], 0).normalize();
  const meshes: THREE.Mesh[] = [];
  group.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh);
  });
  group.updateMatrixWorld(true);

  let lo = Infinity;
  let hi = -Infinity;
  const proj: Float32Array[] = [];
  const v = new THREE.Vector3();
  for (const m of meshes) {
    const pa = m.geometry.getAttribute('position');
    if (!pa) continue;
    const d = new Float32Array(pa.count);
    for (let i = 0; i < pa.count; i++) {
      v.fromBufferAttribute(pa, i).applyMatrix4(m.matrixWorld);
      const s = v.dot(axis);
      d[i] = s;
      if (s < lo) lo = s;
      if (s > hi) hi = s;
    }
    proj.push(d);
  }
  const span = hi - lo || 1;
  meshes.forEach((m, k) => {
    const d = proj[k];
    if (!d) return;
    const col = new Float32Array(d.length * 3);
    for (let i = 0; i < d.length; i++) {
      const c = rampAt(cs, ((d[i] ?? lo) - lo) / span);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    m.geometry.setAttribute('color', new THREE.BufferAttribute(col, 3));
  });
}

function buildLogo(key: LogoKey): THREE.Group {
  const spec = SPECS[key];
  const group = new THREE.Group();
  group.name = 'logo_' + key;

  const mat = new THREE.MeshStandardMaterial({
    name: `metal_${key}`,
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.88,
    roughness: 0.19,
    envMapIntensity: 1.6,
  });

  const cx = 620;
  const cy = 620;
  // Map en vez de Record indexado: con `noUncheckedIndexedAccess` cada lectura
  // de un Record es `T | undefined`, y aquí las claves salen del propio spec.
  const nodes = new Map<string, { pos: THREE.Vector3; rad: number }>();
  for (const [k, [x, y, r]] of Object.entries(spec.nodes)) {
    nodes.set(k, { pos: new THREE.Vector3((x - cx) * S, (cy - y) * S, 0), rad: r * S });
  }
  const nodeAt = (k: string) => {
    const n = nodes.get(k);
    if (!n) throw new Error(`enlace a un nodo inexistente: ${k}`);
    return n;
  };

  // Las dos L del logo: se agrupan por la letra de sus nodos.
  const letters = [...new Set(Object.keys(spec.nodes).map((k) => k[0]))];
  const parts = letters.map((_, i) => {
    const g = new THREE.Group();
    g.name = 'parte_' + (i + 1);
    group.add(g);
    return g;
  });
  const partOf = (k: string) => {
    const i = letters.indexOf(k.slice(0, 1));
    const g = parts[i < 0 ? 0 : i];
    if (!g) throw new Error('el logo no tiene partes');
    return g;
  };

  for (const [k, n] of nodes) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(n.rad, 48, 32), mat);
    m.name = `nodo_${k}`;
    m.position.copy(n.pos);
    partOf(k).add(m);
  }

  for (const [a, b] of spec.links) {
    const na = nodeAt(a);
    const nb = nodeAt(b);
    const dir = new THREE.Vector3().subVectors(nb.pos, na.pos);
    const L = dir.length();
    dir.normalize();
    const link = new THREE.Group();
    link.name = `enlace_${a}_${b}`;
    link.position.copy(na.pos);
    link.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

    let f = FILLET;
    let pa = filletProfile(na.rad, R_LINK, f, 14);
    let pb = filletProfile(nb.rad, R_LINK, f, 14);
    for (let i = 0; i < 12; i++) {
      pa = filletProfile(na.rad, R_LINK, f, 14);
      pb = filletProfile(nb.rad, R_LINK, f, 14);
      if (L - pa.yf - pb.yf > 0.02) break;
      f *= 0.8;
    }

    const capA = new THREE.Mesh(new THREE.LatheGeometry(pa.pts, 48), mat);
    capA.name = `enlace_${a}_${b}_acuerdo_1`;
    link.add(capA);

    const capB = new THREE.Mesh(new THREE.LatheGeometry(pb.pts, 48), mat);
    capB.name = `enlace_${a}_${b}_acuerdo_2`;
    capB.rotation.z = Math.PI;
    capB.position.y = L;
    link.add(capB);

    const y0 = pa.yf - 0.0008;
    const y1 = L - pb.yf + 0.0008;
    const span = y1 - y0;
    const n = Math.max(1, Math.min(16, Math.round(span / 0.05)));
    for (let i = 0; i < n; i++) {
      const h = span / n;
      const yc = y0 + h * (i + 0.5);
      const seg = new THREE.Mesh(
        new THREE.CylinderGeometry(R_LINK, R_LINK, h + 0.0006, 48, 1, true),
        mat,
      );
      seg.name = `enlace_${a}_${b}_barra_${i + 1}`;
      seg.position.y = yc;
      link.add(seg);
    }
    partOf(a).add(link);
  }

  // Cada L pivota sobre su propio centroide; el conjunto se centra en el origen.
  paintGradient(group, spec.keys, spec.grad);
  group.updateMatrixWorld(true);
  parts.forEach((p) => {
    const c = new THREE.Box3().setFromObject(p).getCenter(new THREE.Vector3());
    p.children.forEach((ch) => ch.position.sub(c));
    p.position.copy(c);
  });
  group.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(group);
  const c0 = box.getCenter(new THREE.Vector3());
  parts.forEach((p) => p.position.sub(c0));
  group.updateMatrixWorld(true);

  const size = box.getSize(new THREE.Vector3());
  const width = Math.max(size.x, size.y);
  const p0 = parts[0];
  const p1 = parts[1];
  const sep =
    p0 && p1
      ? new THREE.Vector3().subVectors(p1.position, p0.position)
      : new THREE.Vector3(1, 0, 0);
  if (sep.lengthSq() < 1e-6) sep.set(1, 0, 0);
  sep.normalize();

  parts.forEach((p, i) => {
    const s = i === 0 ? -1 : 1;
    const data: PartData = {
      base: p.position.clone(),
      dir: sep.clone().multiplyScalar(s).add(new THREE.Vector3(0, 0, s * 0.3)).normalize(),
      dist: width * SEPARATION,
      axis: new THREE.Vector3(s * 0.14, 1, 0).normalize(),
      up: new THREE.Vector3(-sep.y, sep.x, 0).normalize(),
      swayAxis: new THREE.Vector3(0, 0, 1),
      sign: s,
    };
    p.userData = data;
  });
  group.userData = { parts };
  return group;
}

/** Entorno de estudio para el reflejo metálico, pintado a canvas. */
function studioEnv(renderer: THREE.WebGLRenderer): THREE.Texture {
  const ec = document.createElement('canvas');
  ec.width = 1024;
  ec.height = 512;
  const ex = ec.getContext('2d');
  if (!ex) throw new Error('sin contexto 2D para el entorno');
  const g = ex.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.44, '#eef1f5');
  g.addColorStop(0.52, '#b9bfc7');
  g.addColorStop(1, '#5d6167');
  ex.fillStyle = g;
  ex.fillRect(0, 0, 1024, 512);
  const focos: ReadonlyArray<readonly [number, number, number]> = [
    [210, 130, 150], [700, 170, 110], [470, 60, 80],
  ];
  for (const [x, y, r] of focos) {
    const rg = ex.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, 'rgba(255,255,255,1)');
    rg.addColorStop(1, 'rgba(255,255,255,0)');
    ex.fillStyle = rg;
    ex.beginPath();
    ex.arc(x, y, r, 0, Math.PI * 2);
    ex.fill();
  }
  const tex = new THREE.Texture(ec);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  const pm = new THREE.PMREMGenerator(renderer);
  const env = pm.fromEquirectangular(tex).texture;
  pm.dispose();
  tex.dispose();
  return env;
}

/**
 * Movimiento molecular continuo con dos reposos por ciclo: en cada reposo las
 * dos L están cerradas y de frente —el logo original— durante `hold` segundos.
 * Entre reposos cada mitad da una vuelta entera, así la pose vuelve exacta.
 */
function molecular(u: number, holdFrac: number) {
  const h = Math.min(Math.max(holdFrac, 0), 0.4);
  const a = Math.max((1 - 2 * h) / 2, 1e-4);
  let prog: number;
  let s = -1;

  if (u < h) prog = 0;
  else if (u < h + a) {
    s = (u - h) / a;
    prog = 0;
  } else if (u < 2 * h + a) prog = 0.5;
  else {
    s = (u - 2 * h - a) / a;
    prog = 0.5;
  }

  if (s < 0) return { prog, open: 0, turn: 0, sway: 0, lift: 0, env: 0 };

  const eased = s - Math.sin(s * Math.PI * 2) / (Math.PI * 2);
  const open = (1 - Math.cos(s * Math.PI * 2)) / 2;
  return {
    prog: prog + eased * 0.5,
    open,
    turn: (prog + eased * 0.5) * Math.PI * 4,
    sway: Math.sin(s * Math.PI * 2) * 0.13,
    lift: Math.sin(s * Math.PI * 4) * 0.5,
    env: open,
  };
}

export interface LogoSpinOptions {
  logo: LogoKey;
  /** Segundos por vuelta completa. */
  spin: number;
  /** Segundos del ciclo de apertura/cierre. 0 lo desactiva. */
  assemble: number;
  /** Segundos de reposo con el logo cerrado, dos veces por ciclo. */
  hold: number;
  /** Paralaje suave siguiendo el puntero. */
  pointer: boolean;
  /** Desfase inicial del ciclo (0-1), para que los dos logos no vayan a la par. */
  phase: number;
}

/** Instancia montada; `dispose()` libera el contexto WebGL. */
export interface LogoSpinHandle {
  dispose: () => void;
}

/**
 * Monta el logo sobre `host`. Devuelve un handle con `dispose()`. Bajo
 * `prefers-reduced-motion` pinta un solo fotograma y no abre bucle de rAF.
 */
export function mountLogoSpin(host: HTMLElement, opts: LogoSpinOptions): LogoSpinHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearAlpha(0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const env = studioEnv(renderer);
  scene.environment = env;
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d2c4, 0.4));
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(2.4, 3.2, 2.6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xbcd6ff, 0.7);
  rim.position.set(-2.6, 0.6, -2.2);
  scene.add(rim);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 60);
  const obj = buildLogo(opts.logo);
  scene.add(obj);

  /* Radio de encuadre, calculado UNA sola vez y con las dos mitades abiertas
     del todo. Antes se recalculaba en cada `resize()` recorriendo toda la
     geometría (Box3.setFromObject), y como la banda de isotipos anima su
     tamaño durante 620 ms, el ResizeObserver lo disparaba en cada fotograma
     de la transición: ese era el origen de los tirones, no los FPS del bucle.
     De paso, medir siempre la pose abierta deja el encuadre quieto durante
     todo el ciclo en vez de reajustarlo según la pose de ese instante. */
  const fitRadius = (() => {
    const partes = (obj.userData as { parts: THREE.Group[] }).parts;
    const guardadas = partes.map((pt) => pt.position.clone());
    for (const pt of partes) {
      const d = pt.userData as PartData;
      pt.position.copy(d.base).addScaledVector(d.dir, d.dist);
    }
    obj.updateMatrixWorld(true);
    const r = new THREE.Box3().setFromObject(obj).getBoundingSphere(new THREE.Sphere()).radius;
    partes.forEach((pt, i) => {
      const g = guardadas[i];
      if (g) pt.position.copy(g);
    });
    obj.updateMatrixWorld(true);
    return r;
  })();

  let stopped = false;
  let visible = true;
  let yaw = 0.6;
  let t = 0;
  let u = ((opts.phase % 1) + 1) % 1;
  let px = 0;
  let py = 0;
  let targetPx = 0;
  let targetPy = 0;
  const sway = new THREE.Quaternion();

  function frame(force = false) {
    if (stopped || (!visible && !force)) return;
    const on = opts.assemble > 0;
    const m = molecular(on ? u : 0, on ? opts.hold / opts.assemble : 0);
    const envMix = on ? m.env : 1;
    const parts = (obj.userData as { parts: THREE.Group[] }).parts;
    for (const p of parts) {
      const d = p.userData as PartData;
      p.position
        .copy(d.base)
        .addScaledVector(d.dir, d.dist * m.open)
        .addScaledVector(d.up, d.dist * 0.28 * m.lift * d.sign);
      p.quaternion.setFromAxisAngle(d.axis, d.sign * m.turn);
      if (on && m.sway) {
        sway.setFromAxisAngle(d.swayAxis, d.sign * m.sway);
        p.quaternion.multiply(sway);
      }
    }
    // En los reposos todo queda quieto y de frente: el logo se lee sin ruido.
    const yawTurns = on ? 2 * Math.max(1, Math.round(opts.assemble / (2 * Math.max(opts.spin, 1)))) : 0;
    obj.rotation.y = (on ? m.prog * Math.PI * 2 * yawTurns : yaw) + px * 0.5 * envMix;
    obj.rotation.x = (Math.sin(t * 0.55) * 0.09 + py * 0.35) * envMix;
    obj.position.y = Math.sin(t * 0.7) * 0.035 * envMix;
    renderer.render(scene, camera);
  }

  let lastW = 0;
  let lastH = 0;

  function resize() {
    const w = host.clientWidth || 320;
    const h = host.clientHeight || 320;
    if (w === lastW && h === lastH) return;
    lastW = w;
    lastH = h;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const fov = (camera.fov * Math.PI) / 180;
    const fitH = fitRadius / Math.sin(fov / 2);
    const fitW = fitRadius / Math.sin(Math.atan(Math.tan(fov / 2) * camera.aspect));
    camera.position.set(0, 0, Math.max(fitH, fitW) * FIT);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    frame(true);
  }

  let resizeTimer: number | null = null;
  let lastResizeAt = 0;
  const RESIZE_EVERY = 160;
  const onResize = () => {
    const ahora = performance.now();
    if (lastW === 0 || ahora - lastResizeAt >= RESIZE_EVERY) {
      lastResizeAt = ahora;
      resize();
    }
    // Llamada de cola: el último tamaño de la transición siempre se aplica.
    if (resizeTimer !== null) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resizeTimer = null;
      lastResizeAt = performance.now();
      resize();
    }, RESIZE_EVERY);
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(host);
  const io = new IntersectionObserver((entries) => {
    const first = entries[0];
    if (first) visible = first.isIntersecting;
  }, { threshold: 0.05 });
  io.observe(host);

  let onMove: ((ev: PointerEvent) => void) | null = null;
  if (opts.pointer) {
    onMove = (ev) => {
      const r = host.getBoundingClientRect();
      const w = Math.max(window.innerWidth, 1);
      const h = Math.max(window.innerHeight, 1);
      targetPx = ((ev.clientX - (r.left + r.width / 2)) / w) * 1.6;
      targetPy = ((ev.clientY - (r.top + r.height / 2)) / h) * -0.9;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
  }

  resize();

  // CLAUDE.md regla 8: bajo reducir-movimiento no se abre bucle de rAF; queda
  // un fotograma fijo con el logo de frente.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    yaw = 0.5;
    frame(true);
  } else {
    let last = performance.now();
    const loop = (now: number) => {
      if (stopped) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (visible && !document.hidden) {
        t += dt;
        const speed = (Math.PI * 2) / Math.max(opts.spin, 0.5);
        yaw += speed * dt;
        u = opts.assemble > 0 ? (u + dt / opts.assemble) % 1 : 0;
        px += (targetPx - px) * Math.min(dt * 3.2, 1);
        py += (targetPy - py) * Math.min(dt * 3.2, 1);
        frame();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  return {
    dispose() {
      stopped = true;
      ro.disconnect();
      io.disconnect();
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      if (onMove) window.removeEventListener('pointermove', onMove);
      obj.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) m.geometry.dispose();
      });
      env.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
