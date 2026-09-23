'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { MenuHandle, MenuPoseName } from '@/lib/virensMenu3d';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Icono 3D del botón de menú (23/09/2026, diseño del cliente en Claude Design,
 * `WEB VIRENS/logo menu`): dos enlaces moleculares con nodos esféricos, como el
 * isotipo. Reposo → hover (los enlaces intercambian longitud, los nodos crecen
 * y el enlace pasa a teal) → abierto (X con los cuatro nodos en las puntas).
 * Toda la molécula gira muy despacio (una vuelta cada 16 s).
 *
 * Mismo patrón que `LogoSpin`: el motor (`@/lib/virensMenu3d`) llega con
 * `import()` diferido y, mientras tanto —o para siempre si no hay WebGL—, se
 * ve el póster SVG con la misma pose. Con movimiento reducido no gira y los
 * cambios de estado son instantáneos (regla 8).
 */

// Poses en px a 1× (copiadas del motor para que el póster no espere a three.js).
const DEG = Math.PI / 180;
const POSTER: Record<MenuPoseName, { r: number; l: { cx: number; cy: number; h: number; a: number }[] }> = {
  rest: { r: 3.5, l: [{ cx: 0, cy: 4.5, h: 11.5, a: 0 }, { cx: 6.3, cy: -4.5, h: 5.2, a: 0 }] },
  hover: { r: 3.5 * 1.18, l: [{ cx: 6.3, cy: 4.5, h: 5.2, a: 0 }, { cx: 0, cy: -4.5, h: 11.5, a: 0 }] },
  open: { r: 3.5, l: [{ cx: 0, cy: 0, h: 11.5, a: -32 * DEG }, { cx: 0, cy: 0, h: 11.5, a: 32 * DEG }] },
};

let engine: Promise<typeof import('@/lib/virensMenu3d')> | null = null;
const loadEngine = () => (engine ??= import('@/lib/virensMenu3d'));

export function MenuGlyph3D({ open, hot }: { open: boolean; hot: boolean }) {
  const pose: MenuPoseName = open ? 'open' : hot ? 'hover' : 'rest';
  const reduced = usePrefersReducedMotion();
  const hostRef = useRef<HTMLSpanElement>(null);
  const handleRef = useRef<MenuHandle | null>(null);
  const live = useRef({ pose, hot, reduced });
  live.current = { pose, hot, reduced };
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    loadEngine()
      .then(({ mount }) => {
        const host = hostRef.current;
        if (!alive || !host) return;
        const c = live.current;
        try {
          handleRef.current = mount(host, {
            theme: 'light',
            spin: 'turn',
            reduced: c.reduced,
            state: c.pose,
            hot: c.hot,
            onReady: () => alive && setReady(true),
          });
        } catch {
          // Sin WebGL: se queda el póster.
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
      handleRef.current?.destroy();
      handleRef.current = null;
      setReady(false);
    };
  }, []);

  useEffect(() => {
    handleRef.current?.set({ state: pose, hot });
  }, [pose, hot]);

  useEffect(() => {
    handleRef.current?.configure({ reduced });
  }, [reduced]);

  return (
    <span aria-hidden className="relative block h-[var(--v2-menu-h)] w-[var(--v2-menu-w)] shrink-0">
      {!ready && <Poster pose={pose} hot={hot} />}
      <span ref={hostRef} className="absolute inset-0 block" />
    </span>
  );
}

/** Póster estático con la pose vigente: esferas con degradado de marca y brillo. */
function Poster({ pose, hot }: { pose: MenuPoseName; hot: boolean }) {
  const id = useId().replace(/:/g, '');
  const P = POSTER[pose];
  return (
    <svg
      viewBox="-23 -16 46 32"
      className="pointer-events-none absolute left-[-8px] top-[-8px] h-[32px] w-[46px] overflow-visible"
    >
      <defs>
        <radialGradient id={id} cx="0.34" cy="0.3" r="0.78">
          <stop offset="0" style={{ stopColor: 'var(--color-labs-glow)' }} />
          <stop offset="0.48" style={{ stopColor: 'var(--color-labs)' }} />
          <stop offset="1" style={{ stopColor: 'var(--color-blue)' }} />
        </radialGradient>
      </defs>
      {P.l.map((l, i) => {
        const dx = l.h * Math.cos(l.a);
        const dy = l.h * Math.sin(l.a);
        const pts: [[number, number], [number, number]] = [
          [l.cx - dx, -(l.cy - dy)],
          [l.cx + dx, -(l.cy + dy)],
        ];
        return (
          <g key={i}>
            <line
              x1={pts[0][0]}
              y1={pts[0][1]}
              x2={pts[1][0]}
              y2={pts[1][1]}
              strokeWidth={1.96}
              style={{ stroke: hot ? 'var(--color-labs)' : 'var(--color-blue)' }}
            />
            {pts.map((p, j) => (
              <g key={j}>
                <circle cx={p[0]} cy={p[1]} r={P.r} fill={`url(#${id})`} />
                <circle cx={p[0] - P.r * 0.34} cy={p[1] - P.r * 0.38} r={P.r * 0.22} fill="white" opacity="0.55" />
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
