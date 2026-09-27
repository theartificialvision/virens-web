'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { GalenicIcon } from './GalenicIcon';

type GalenicName = Parameters<typeof GalenicIcon>[0]['name'];

interface RailItem { id: string; icon: GalenicName; label: string }

const WIDE = '(min-width: 1024px)';
/** Espera tras entrar en pantalla antes del vaivén que invita a deslizar. */
const NUDGE_DELAY = 700;

/**
 * Franja de formas galénicas (27/09/2026, cliente: «que se intuya un scroll
 * horizontal, una micro animación que invite a deslizar, foco con aumento
 * sutil de iconos, deslizamiento perfecto»).
 *
 * - Desde lg: los diez formatos en una fila; con cursor, el señalado crece un
 *   poco y el resto se apaga (solo CSS).
 * - Por debajo: carril con el formato activo centrado (snap al centro) y el
 *   siguiente asomando. El que queda en el centro es el «foco» — el
 *   equivalente táctil del hover — y se calcula aquí. Fundido en los bordes
 *   solo donde queda contenido, barra de progreso y un vaivén único al entrar
 *   en pantalla mientras nadie ha tocado el carril.
 *
 * Todo se escribe como atributos y variables CSS, sin re-render por scroll.
 * Con movimiento reducido no hay vaivén (regla 8).
 */
export function GalenicRail({ items, label, hint }: { items: readonly RailItem[]; label: string; hint: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const list = listRef.current;
    if (!root || !list) return;
    const cells = Array.from(list.querySelectorAll<HTMLElement>('.v2-gal-item'));
    const wide = window.matchMedia(WIDE);
    let frame = 0;
    let focused = -1;

    const update = () => {
      frame = 0;
      if (wide.matches) {
        cells.forEach((c) => c.removeAttribute('data-focus'));
        focused = -1;
        return;
      }
      const max = list.scrollWidth - list.clientWidth;
      const x = list.scrollLeft;
      root.style.setProperty('--gal-progress', (max > 0 ? x / max : 0).toFixed(4));
      root.style.setProperty('--gal-thumb', (list.clientWidth / list.scrollWidth).toFixed(4));
      // El fundido solo aparece en el lado donde queda contenido.
      root.style.setProperty('--gal-fade-l', Math.min(x / 48, 1).toFixed(3));
      root.style.setProperty('--gal-fade-r', Math.min((max - x) / 48, 1).toFixed(3));

      const box = list.getBoundingClientRect();
      const mid = box.left + box.width / 2;
      let best = 0;
      let dist = Infinity;
      cells.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < dist) { dist = d; best = i; }
      });
      if (best !== focused) {
        cells[focused]?.removeAttribute('data-focus');
        cells[best]?.setAttribute('data-focus', '');
        focused = best;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    // Cualquier gesto del usuario apaga la invitación.
    const touched = () => { root.dataset.touched = 'true'; };
    list.addEventListener('pointerdown', touched, { passive: true });
    list.addEventListener('wheel', touched, { passive: true });
    list.addEventListener('keydown', touched);

    let nudgeTimer = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      if (reduced || wide.matches) return;
      nudgeTimer = window.setTimeout(() => {
        if (root.dataset.touched) return;
        root.dataset.nudge = 'true';
      }, NUDGE_DELAY);
    }, { threshold: 0.6 });
    io.observe(list);

    update();
    list.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    wide.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(nudgeTimer);
      io.disconnect();
      list.removeEventListener('scroll', schedule);
      list.removeEventListener('pointerdown', touched);
      list.removeEventListener('wheel', touched);
      list.removeEventListener('keydown', touched);
      window.removeEventListener('resize', schedule);
      wide.removeEventListener('change', schedule);
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="v2-gal-rail relative">
      {/* Carril desplazable: enfocable con teclado (flechas) por debajo de lg. */}
      <ul
        ref={listRef}
        aria-label={label}
        tabIndex={0}
        className="v2-gal-list flex snap-x snap-mandatory overflow-x-auto outline-offset-[-4px] lg:grid lg:grid-cols-10 lg:overflow-visible"
      >
        {items.map((f, i) => (
          <li
            key={f.id}
            className="v2-gal-item flex w-[var(--gal-cell)] shrink-0 snap-center flex-col items-center border-r border-white/25 px-3 pb-12 pt-8 text-center first:border-l lg:w-auto lg:first:border-l-0 lg:last:border-r-0"
            style={{ '--i': i } as CSSProperties}
          >
            <span className="self-start text-[length:var(--text-note)] font-semibold tracking-label text-white/60">
              {String(i + 1).padStart(2, '0')}
            </span>
            <GalenicIcon name={f.icon} className="v2-gal-glyph mt-6 size-[var(--gal-icon)]" />
            <span className="v2-gal-label mt-6 text-[length:var(--text-small)] font-medium leading-snug">{f.label}</span>
          </li>
        ))}
      </ul>

      {/* Invitación y progreso (solo carril). */}
      <div aria-hidden className="v2-gal-meter mx-auto flex w-full max-w-[var(--container-max)] items-center gap-5 px-5 pb-8 md:px-8 lg:hidden">
        <span className="v2-gal-hint flex items-center gap-2 text-[length:var(--text-note)] font-semibold uppercase tracking-label text-white/80">
          {hint}
          <span className="v2-gal-hint-arrow">&rarr;</span>
        </span>
        <span className="relative h-[2px] flex-1 overflow-hidden bg-white/20">
          <span className="v2-gal-thumb absolute inset-y-0 left-0 bg-white" />
        </span>
      </div>
    </div>
  );
}
