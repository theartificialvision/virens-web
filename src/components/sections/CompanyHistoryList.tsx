'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import type { TimelineEntry } from '@/lib/types';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/** Punto de la pantalla (fracción del alto) donde «llega» la línea en móvil. */
const MOBILE_FOCUS = 0.62;
/** Tramo de scroll en escritorio: la línea arranca con la lista al 85 % del
 *  viewport y termina cuando llega al 35 %. */
const DESKTOP_START = 0.85;
const DESKTOP_SPAN = 0.5;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Hitos de la historia (27/09/2026, cliente: «que con el desplazamiento se
 * vayan formando o agrandando los círculos»).
 *
 * Una sola línea de progreso une los nodos y avanza con el scroll: vertical
 * en móvil, horizontal desde 1280 px. Cada círculo que la línea alcanza se
 * «forma» —crece, se dibuja su aro y lanza un pulso— y su texto aparece.
 * Con cursor, el hito señalado se adelanta y los demás se apagan (CSS).
 *
 * La geometría se mide en JS (los textos tienen alturas distintas) y se pasa
 * a CSS como variables. Sin JS no hay `data-ready` y todo se ve completo; con
 * movimiento reducido el progreso queda fijo en 1 y nada se anima (regla 8).
 */
export function CompanyHistoryList({ entries }: { entries: TimelineEntry[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLLIElement>('.company-history-item'));
    const nodes = items.map((item) => item.querySelector<HTMLElement>('.company-history-node'));
    const wide = window.matchMedia('(min-width: 1280px)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const box = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const centers = nodes.map((node) => {
        const r = node?.getBoundingClientRect();
        return r ? { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top } : { x: 0, y: 0 };
      });
      const first = centers[0];
      const last = centers[centers.length - 1];
      if (!first || !last) return;

      const horizontal = wide.matches;
      const length = horizontal ? last.x - first.x : last.y - first.y;
      const progress = reduced ? 1 : horizontal
        ? clamp((vh * DESKTOP_START - box.top) / (vh * DESKTOP_SPAN))
        : clamp((vh * MOBILE_FOCUS - (box.top + first.y)) / Math.max(length, 1));

      list.style.setProperty('--h-start', `${horizontal ? first.x : first.y}px`);
      list.style.setProperty('--h-cross', `${horizontal ? first.y : first.x}px`);
      list.style.setProperty('--h-length', `${Math.max(length, 0)}px`);
      list.style.setProperty('--h-progress', progress.toFixed(4));

      centers.forEach((c, i) => {
        const at = length > 0 ? ((horizontal ? c.x - first.x : c.y - first.y) / length) : 0;
        const active = progress >= at - 0.002;
        const item = items[i];
        if (item && (item.dataset.active === 'true') !== active) item.dataset.active = String(active);
      });
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    list.dataset.ready = 'true';
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    wide.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      wide.removeEventListener('change', schedule);
      delete list.dataset.ready;
      items.forEach((item) => { delete item.dataset.active; });
    };
  }, [reduced]);

  return (
    <div ref={listRef} className="company-history relative">
      <span aria-hidden className="company-history-track">
        <span className="company-history-progress" />
      </span>
      <ol className="company-history-list">
      {entries.map((entry, index) => (
        <li key={`${entry.year}-${index}`} className="company-history-item" style={{ '--i': index } as CSSProperties}>
          <p className="company-history-copy text-[length:var(--text-small)] font-medium leading-snug xl:text-[length:var(--text-note)] xl:font-semibold xl:leading-[1.35]">{entry.text}</p>
          <span className="company-history-node text-[length:var(--text-small)] font-semibold">
            <svg aria-hidden viewBox="0 0 100 100" className="company-history-ring">
              <circle cx="50" cy="50" r="48.5" pathLength={1} />
            </svg>
            <span className="company-history-year">{entry.year}</span>
          </span>
        </li>
      ))}
      </ol>
    </div>
  );
}
