'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { DOUBLE, STUBS, VERTICES, VIEW, offsetLine, serviceVertex } from './moleculeGeometry';

/**
 * Molécula del proceso de Virens Tech (2.ª vuelta, 29/09/2026 — cliente:
 * «más lógica de fluidos atómica; se pasó a gamer; química e inteligencia»).
 * Fórmula esquelética en tinta azul sobre claro. El scroll dibuja la cadena
 * enlace a enlace (`--proc-p`, suavizado); el servicio activo lleva un
 * electrón en órbita lenta. Los átomos derivan apenas, cada uno a su ritmo,
 * como en una simulación molecular, y los enlaces los siguen.
 */
export function ProcessMolecule({ labels, hrefs, active, label }: {
  labels: readonly string[];
  hrefs: readonly string[];
  active: number;
  label: string;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();

  // Deriva «browniana»: ±2,5 unidades, periodos de 7–11 s. Solo en pantalla.
  useEffect(() => {
    const el = svg.current;
    if (!el || reduced) return;
    const phase = VERTICES.map((_, k) => [k * 1.7, k * 2.3] as const);
    let frame = 0;
    let visible = false;
    const tick = (t: number) => {
      const pos = VERTICES.map((v, k) => {
        const [a, b] = phase[k] ?? [0, 0];
        return { x: v.x + 2.5 * Math.sin(t / 1400 + a), y: v.y + 2.5 * Math.cos(t / 1800 + b) };
      });
      el.querySelectorAll<SVGGElement>('[data-v]').forEach((g) => {
        const p = pos[Number(g.dataset.v)];
        if (p) g.setAttribute('transform', `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);
      });
      el.querySelectorAll<SVGLineElement>('[data-e]').forEach((l) => {
        const [from, to] = (l.dataset.e ?? '').split('-').map(Number);
        const a = pos[from ?? 0], b = pos[to ?? 0];
        const off = Number(l.dataset.off ?? 0);
        if (!a || !b) return;
        const c = off ? offsetLine(a, b, off) : { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
        l.setAttribute('x1', c.x1.toFixed(2));
        l.setAttribute('y1', c.y1.toFixed(2));
        l.setAttribute('x2', c.x2.toFixed(2));
        l.setAttribute('y2', c.y2.toFixed(2));
      });
      if (visible) frame = window.requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting);
      if (visible && !frame) frame = window.requestAnimationFrame(tick);
      if (!visible && frame) { window.cancelAnimationFrame(frame); frame = 0; }
    });
    io.observe(el);
    return () => { io.disconnect(); if (frame) window.cancelAnimationFrame(frame); };
  }, [reduced]);

  const bonds = VERTICES.slice(0, -1).map((a, k) => ({ k, a, b: VERTICES[k + 1] ?? a }));
  return (
    <nav aria-label={label} className="proc-mol">
      <svg ref={svg} viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="proc-mol__svg" role="presentation">
        {STUBS.map(({ k, dx }) => {
          const v = VERTICES[k];
          return v ? <line key={`s${k}`} x1={v.x} y1={v.y} x2={v.x + dx} y2={v.y} className="proc-mol__stub" style={{ '--b': k - 1 } as CSSProperties} /> : null;
        })}
        {bonds.map(({ k, a, b }) => (
          <g key={`b${k}`} style={{ '--b': k } as CSSProperties}>
            <line data-e={`${k}-${k + 1}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="proc-mol__track" />
            <line data-e={`${k}-${k + 1}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} pathLength={1} className="proc-mol__bond" />
            {DOUBLE.has(k) ? <line data-e={`${k}-${k + 1}`} data-off="7" {...offsetLine(a, b, 7)} pathLength={1} className="proc-mol__bond proc-mol__bond--double" /> : null}
          </g>
        ))}
        {VERTICES.map((v, k) => <g key={`v${k}`} data-v={k} transform={`translate(${v.x} ${v.y})`}>{k % 2 === 0 ? <circle r={1.6} className="proc-mol__carbon" /> : null}</g>)}
        {labels.map((name, i) => {
          const k = serviceVertex(i);
          const v = VERTICES[k];
          if (!v) return null;
          const state = i < active ? 'done' : i === active ? 'current' : 'next';
          return (
            <a key={name} href={hrefs[i]} data-state={state} className="proc-mol__atom" aria-current={i === active ? 'step' : undefined}>
              <g data-v={k} transform={`translate(${v.x} ${v.y})`}>
                <circle r={18} className="proc-mol__orbit" />
                <g className="proc-mol__electron"><circle cx={18} r={2.6} /></g>
                <circle r={7.5} className="proc-mol__core" />
                <text x={30} y={-6} className="proc-mol__num">{String(i + 1).padStart(2, '0')}</text>
                <text x={30} y={16} className="proc-mol__name">{name}</text>
              </g>
            </a>
          );
        })}
      </svg>
    </nav>
  );
}
