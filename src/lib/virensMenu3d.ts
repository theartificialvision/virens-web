/**
 * Motor 3D del botón de menú molecular de la cabecera V2 (entregado por el
 * cliente el 23/09/2026 desde Claude Design, `WEB VIRENS/logo menu`). Port a
 * TypeScript estricto sin cambios de comportamiento: misma geometría, mismo
 * material de los nodos (degradado de marca por vértice, clearcoat), misma
 * iluminación de estudio y mismas poses/tiempos.
 *
 * Un único contexto WebGL compartido: cada instancia pinta su fotograma en un
 * canvas 2D propio. Se carga con `import()` diferido desde `MenuGlyph3D`, así
 * que `three` no entra en el bundle inicial (regla 9); mientras llega se ve
 * el póster SVG. Respeta `prefers-reduced-motion` (sin giro ni transición).
 */
import * as THREE from 'three';

export type MenuPoseName = 'rest' | 'hover' | 'open';
export type MenuTheme = 'light' | 'dark';
export type MenuSpin = 'turn' | 'sway' | 'off';

interface Link { cx: number; cy: number; h: number; a: number; z: number }
export interface MenuPose { r: number; l: [Link, Link] }

export interface MountOptions {
  scale?: number;
  theme?: MenuTheme;
  spin?: MenuSpin;
  reduced?: boolean;
  state?: MenuPoseName;
  hot?: boolean;
  onReady?: () => void;
}

export interface MenuHandle {
  set: (o: { state: MenuPoseName; hot?: boolean }) => void;
  configure: (o: { theme?: MenuTheme; spin?: MenuSpin; reduced?: boolean }) => void;
  destroy: () => void;
}

const BOX_W = 30;
const BOX_H = 16;
const BLEED = 8;
const CW = BOX_W + BLEED * 2;
const CH = BOX_H + BLEED * 2;
const R = 3.5; // nodo Ø 7 px
const BOND_R = (0.28 * 7) / 2; // enlace = 28 % del diámetro del nodo
const DEG = Math.PI / 180;
const TAU = Math.PI * 2;
const DURATION = 560;
const SPIN_PERIOD = 16;

// Unidades = px CSS a 1×. Cada enlace: centro, semilongitud entre nodos, ángulo, z.
export const POSES: Record<MenuPoseName, MenuPose> = {
  rest: { r: R, l: [{ cx: 0, cy: 4.5, h: 11.5, a: 0, z: 0 }, { cx: 6.3, cy: -4.5, h: 5.2, a: 0, z: 0 }] },
  hover: { r: R * 1.18, l: [{ cx: 6.3, cy: 4.5, h: 5.2, a: 0, z: 0 }, { cx: 0, cy: -4.5, h: 11.5, a: 0, z: 0 }] },
  open: { r: R, l: [{ cx: 0, cy: 0, h: 11.5, a: -32 * DEG, z: 1.1 }, { cx: 0, cy: 0, h: 11.5, a: 32 * DEG, z: -1.1 }] },
};

// Colores de marca: three.js necesita el valor, no la variable CSS. Son los
// mismos de `@theme` (--color-blue, --color-labs, --color-labs-glow).
const NAVY = '#00285C';
const TEAL = '#00A099';
const TEAL_L = '#2FE0D0';
const BOND: Record<MenuTheme, [string, string]> = { light: [NAVY, TEAL], dark: [TEAL, TEAL_L] };

function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i += 1) {
      const e = sx(t) - x;
      if (Math.abs(e) < 1e-6) return sy(t);
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    for (let i = 0; i < 24; i += 1) {
      if (sx(t) < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return sy(t);
  };
}
const ease = cubicBezier(0.22, 1, 0.36, 1);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpLink = (a: Link, b: Link, t: number): Link => ({
  cx: mix(a.cx, b.cx, t),
  cy: mix(a.cy, b.cy, t),
  h: mix(a.h, b.h, t),
  a: mix(a.a, b.a, t),
  z: mix(a.z, b.z, t),
});
const lerpPose = (A: MenuPose, B: MenuPose, t: number): MenuPose => ({
  r: mix(A.r, B.r, t),
  l: [lerpLink(A.l[0], B.l[0], t), lerpLink(A.l[1], B.l[1], t)],
});

const canFilter = (() => {
  try {
    const c = document.createElement('canvas').getContext('2d');
    return !!c && typeof c.filter === 'string';
  } catch {
    return false;
  }
})();

interface Instance {
  visible: boolean;
  dirty: boolean;
  live: () => boolean;
  needsFrame: () => boolean;
  render: (now: number) => void;
}

interface Shared {
  renderer: THREE.WebGLRenderer;
  envTex: THREE.Texture;
  sphereGeo: THREE.SphereGeometry;
  sphereMat: THREE.MeshPhysicalMaterial;
  bondGeo: THREE.CylinderGeometry;
  w: number;
  h: number;
  list: Set<Instance>;
  raf: number;
}

let S: Shared | null = null;

function shared(): Shared {
  if (S) return S;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  // Estudio para reflejos: softbox arriba-izquierda (brillo especular), luz
  // principal arriba-derecha, contraluz frío detrás y suelo tenue.
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x0e1822);
  env.add(new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshBasicMaterial({ color: 0x27323e, side: THREE.BackSide })));
  const panel = (w: number, h: number, col: number, k: number, p: [number, number, number]) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(k), side: THREE.DoubleSide }),
    );
    m.position.set(p[0], p[1], p[2]);
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  panel(4.5, 3.5, 0xffffff, 7, [-7, 8, 9]);
  panel(8, 6, 0xffffff, 1.8, [9, 6, 6]);
  panel(14, 3, 0x9cc8ff, 2.4, [0, 3, -12]);
  panel(20, 20, 0x8a96a3, 0.45, [0, -12, 0]);
  const pm = new THREE.PMREMGenerator(renderer);
  const envTex = pm.fromScene(env, 0.035).texture;
  pm.dispose();

  // Nodo: degradado de marca en vértices (azul → teal → teal claro hacia arriba-izquierda).
  const sphereGeo = new THREE.SphereGeometry(1, 48, 32);
  const pos = sphereGeo.attributes.position as THREE.BufferAttribute;
  const cols = new Float32Array(pos.count * 3);
  const d = new THREE.Vector3(-0.55, 0.7, 0.45).normalize();
  const c0 = new THREE.Color(NAVY);
  const c1 = new THREE.Color(TEAL);
  const c2 = new THREE.Color(TEAL_L);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i += 1) {
    const t = Math.pow((pos.getX(i) * d.x + pos.getY(i) * d.y + pos.getZ(i) * d.z + 1) / 2, 1.15);
    if (t < 0.55) c.lerpColors(c0, c1, t / 0.55);
    else c.lerpColors(c1, c2, (t - 0.55) / 0.45);
    cols[i * 3] = c.r;
    cols[i * 3 + 1] = c.g;
    cols[i * 3 + 2] = c.b;
  }
  sphereGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  const sphereMat = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    metalness: 0.35,
    roughness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1,
  });
  const bondGeo = new THREE.CylinderGeometry(1, 1, 1, 28, 1, true);

  S = { renderer, envTex, sphereGeo, sphereMat, bondGeo, w: 0, h: 0, list: new Set(), raf: 0 };
  return S;
}

function loop(now: number) {
  if (!S) return;
  S.raf = 0;
  let again = false;
  for (const inst of S.list) {
    if (!inst.visible) continue;
    if (inst.needsFrame()) inst.render(now);
    if (inst.live()) again = true;
  }
  if (again) S.raf = requestAnimationFrame(loop);
}
const kick = () => {
  if (S && !S.raf) S.raf = requestAnimationFrame(loop);
};

export function mount(container: HTMLElement, opts: MountOptions = {}): MenuHandle {
  const sh = shared();
  const scale = opts.scale ?? 1;
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  let theme: MenuTheme = opts.theme === 'dark' ? 'dark' : 'light';
  let spin: MenuSpin = opts.spin ?? 'turn';
  let reducedOverride = opts.reduced;
  const reduced = () => (reducedOverride != null ? reducedOverride : mq.matches);

  const cvs = document.createElement('canvas');
  Object.assign(cvs.style, {
    position: 'absolute',
    left: `${-BLEED * scale}px`,
    top: `${-BLEED * scale}px`,
    width: `${CW * scale}px`,
    height: `${CH * scale}px`,
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 180ms linear',
  });
  cvs.setAttribute('aria-hidden', 'true');
  container.appendChild(cvs);
  const ctx = cvs.getContext('2d');
  if (!ctx) throw new Error('2D context unavailable');

  const scene = new THREE.Scene();
  scene.environment = sh.envTex;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x1a2a3a, 0.45));
  const key = new THREE.DirectionalLight(0xffffff, 1.7);
  key.position.set(40, 50, 60);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8fbfff, 2.2);
  rim.position.set(-30, 25, -60);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);
  const bondMat = new THREE.MeshPhysicalMaterial({
    color: BOND[theme][0],
    metalness: 0.3,
    roughness: 0.3,
    clearcoat: 0.7,
    clearcoatRoughness: 0.2,
    envMapIntensity: 0.8,
  });
  const nodes = [0, 1, 2, 3].map(() => {
    const m = new THREE.Mesh(sh.sphereGeo, sh.sphereMat);
    group.add(m);
    return m;
  });
  const bonds = [0, 1].map(() => {
    const m = new THREE.Mesh(sh.bondGeo, bondMat);
    group.add(m);
    return m;
  });

  const FOV = 16;
  const camera = new THREE.PerspectiveCamera(FOV, CW / CH, 1, 500);
  camera.position.set(0, 0, CH / 2 / Math.tan((FOV / 2) * DEG));

  const cRest = new THREE.Color();
  const cHot = new THREE.Color();
  const setColors = () => {
    cRest.set(BOND[theme][0]);
    cHot.set(BOND[theme][1]);
  };
  setColors();

  const first = POSES[opts.state ?? 'rest'];
  const firstHot = (opts.hot ?? opts.state === 'hover') ? 1 : 0;
  const st = { from: first, to: first, cur: first, hFrom: firstHot, hTo: firstHot, hot: firstHot, t0: 0, dur: 0, animating: false };
  let readyFired = false;

  const spinning = () => spin !== 'off' && !reduced();
  const inst: Instance = {
    visible: true,
    dirty: true,
    live: () => st.animating || spinning(),
    needsFrame: () => inst.dirty || inst.live(),
    render(now: number) {
      inst.dirty = false;
      const p = st.dur > 0 ? Math.min(1, (now - st.t0) / st.dur) : 1;
      const e = ease(p);
      st.animating = p < 1;
      st.cur = lerpPose(st.from, st.to, e);
      st.hot = mix(st.hFrom, st.hTo, e);
      const P = st.cur;
      P.l.forEach((l, i) => {
        const dx = l.h * Math.cos(l.a);
        const dy = l.h * Math.sin(l.a);
        const a = nodes[i * 2];
        const b = nodes[i * 2 + 1];
        const bond = bonds[i];
        if (!a || !b || !bond) return;
        a.position.set(l.cx - dx, l.cy - dy, l.z);
        b.position.set(l.cx + dx, l.cy + dy, l.z);
        a.scale.setScalar(P.r);
        b.scale.setScalar(P.r);
        bond.position.set(l.cx, l.cy, l.z);
        bond.rotation.set(0, 0, l.a + Math.PI / 2);
        bond.scale.set(BOND_R, Math.max(0.001, l.h * 2), BOND_R);
      });
      bondMat.color.lerpColors(cRest, cHot, st.hot);
      const T = now / 1000 / SPIN_PERIOD;
      group.rotation.y = !spinning() ? 0 : spin === 'sway' ? 0.32 * Math.sin(T * TAU) : (T % 1) * TAU;

      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const bw = Math.round(CW * scale * dpr);
      const bh = Math.round(CH * scale * dpr);
      if (cvs.width !== bw || cvs.height !== bh) {
        cvs.width = bw;
        cvs.height = bh;
      }
      const ss = dpr < 2 ? 2 : 1; // supermuestreo a 1×: bordes limpios a 7 px
      const rw = bw * ss;
      const rh = bh * ss;
      if (sh.w < rw || sh.h < rh) {
        sh.w = Math.max(sh.w, rw);
        sh.h = Math.max(sh.h, rh);
        sh.renderer.setSize(sh.w, sh.h, false);
      }
      const r = sh.renderer;
      r.setViewport(0, 0, rw, rh);
      r.setScissor(0, 0, rw, rh);
      r.setScissorTest(true);
      r.render(scene, camera);
      const src = r.domElement;
      const sy = sh.h - rh;
      ctx.clearRect(0, 0, bw, bh);
      if (canFilter) {
        // Sombra de contacto muy suave, luz desde arriba-derecha.
        ctx.save();
        ctx.filter = `blur(${1.2 * scale * dpr}px) brightness(0)`;
        ctx.globalAlpha = theme === 'dark' ? 0.38 : 0.16;
        ctx.drawImage(src, 0, sy, rw, rh, -0.8 * scale * dpr, 1.6 * scale * dpr, bw, bh);
        ctx.restore();
      }
      ctx.drawImage(src, 0, sy, rw, rh, 0, 0, bw, bh);
      if (!readyFired) {
        readyFired = true;
        cvs.style.opacity = '1';
        opts.onReady?.();
      }
    },
  };
  sh.list.add(inst);

  const io = new IntersectionObserver(
    (es) => {
      for (const e of es) {
        inst.visible = e.isIntersecting;
        if (inst.visible) {
          inst.dirty = true;
          kick();
        }
      }
    },
    { rootMargin: '120px' },
  );
  io.observe(container);
  const onMq = () => {
    inst.dirty = true;
    kick();
  };
  mq.addEventListener('change', onMq);
  kick();

  return {
    set({ state, hot }) {
      const to = POSES[state];
      const h = (hot ?? state === 'hover') ? 1 : 0;
      if (to === st.to && h === st.hTo) return;
      st.from = st.cur;
      st.hFrom = st.hot;
      st.to = to;
      st.hTo = h;
      st.t0 = performance.now();
      st.dur = reduced() ? 0 : DURATION;
      st.animating = true;
      inst.dirty = true;
      kick();
    },
    configure(o) {
      if (o.theme) {
        theme = o.theme;
        setColors();
      }
      if (o.spin) spin = o.spin;
      if ('reduced' in o) reducedOverride = o.reduced;
      inst.dirty = true;
      kick();
    },
    destroy() {
      io.disconnect();
      mq.removeEventListener('change', onMq);
      sh.list.delete(inst);
      bondMat.dispose();
      cvs.remove();
    },
  };
}
