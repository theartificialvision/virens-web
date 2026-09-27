'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { v2Capacity } from '@/content/v2-home';
import { CAPACITY_SHAPES } from '@/lib/capacityShapes';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { FormatIcon } from './FormatIcon';

const STEP = 170;        // ms entre tamaños al crecer (valor del diseño)
const CYCLE = 2200;      // ms por formato en el recorrido automático (táctil)
const TOUCH_PAUSE = 6000; // ms sin recorrido tras un toque

/**
 * Formatos de Capacidad productiva (diseño del cliente, 27/09/2026; sustituye
 * al escaparate 3D). Con cursor: al pasar por un formato, su envase crece por
 * los tamaños que se fabrican y el filete se alarga en teal.
 *
 * En táctil no hay hover, así que el gesto se conserva de otra forma: mientras
 * la sección está en pantalla los formatos se van activando solos, de uno en
 * uno, y un toque activa el que se quiera (el recorrido se pausa un momento).
 * Con movimiento reducido no hay recorrido automático; el toque sigue valiendo.
 */
export function CapacityFormats() {
  const items = v2Capacity.items;
  const reduced = usePrefersReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const timers = useRef<number[]>([]);
  const pausedUntil = useRef(0);
  const [active, setActive] = useState<number | null>(null);
  const [stage, setStage] = useState(0);

  const activate = useCallback((i: number | null) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setActive(i);
    setStage(0);
    if (i === null) return;
    const n = CAPACITY_SHAPES[items[i]?.id ?? '']?.stages.length ?? 1;
    for (let k = 1; k < n; k++) {
      timers.current.push(window.setTimeout(() => setStage(k), (k - 1) * STEP + 30));
    }
  }, [items]);

  // Táctil: recorrido automático mientras la lista está a la vista.
  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches;
    const el = listRef.current;
    if (!touch || reduced || !el) return;
    let next = 0;
    let interval = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(interval);
      if (!e?.isIntersecting) { activate(null); return; }
      interval = window.setInterval(() => {
        if (Date.now() < pausedUntil.current) return;
        activate(next % items.length);
        next += 1;
      }, CYCLE);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); window.clearInterval(interval); };
  }, [reduced, activate, items.length]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    // Móvil: cuatro por fila y centrados (4 + 3), siluetas más pequeñas para
    // que los siete formatos quepan en dos filas; tablet: los siete en una;
    // escritorio: la rejilla del diseño.
    <ul
      ref={listRef}
      className="flex flex-wrap items-start justify-center gap-y-10 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(var(--cap-col-min),1fr))] lg:gap-x-2"
    >
      {items.map((it, i) => {
        const shape = CAPACITY_SHAPES[it.id];
        const on = active === i;
        return (
          <li
            key={it.id}
            tabIndex={0}
            data-active={on || undefined}
            className="cap-item flex w-1/4 cursor-default flex-col items-center px-1 text-center outline-none md:w-[calc(100%/7)] lg:w-auto lg:px-0"
            onMouseEnter={() => activate(i)}
            onMouseLeave={() => activate(null)}
            onFocus={() => activate(i)}
            onBlur={() => activate(null)}
            onClick={() => { pausedUntil.current = Date.now() + TOUCH_PAUSE; activate(i); }}
          >
            <div className="aspect-[1/2] w-full max-w-[var(--cap-icon-max-sm)] lg:max-w-[var(--cap-icon-max)]">
              {shape && <FormatIcon shape={shape} stage={on ? stage : 0} active={on} />}
            </div>
            <div className="mt-3.5 flex h-[var(--cap-line-on)] items-start">
              <span aria-hidden className="cap-line block" />
            </div>
            <p className="mt-3.5 text-[length:var(--text-small)] font-medium leading-snug text-blue lg:text-[length:var(--text-body)]">{it.label}</p>
            <p className="mt-1.5 text-balance text-[length:var(--text-micro)] font-semibold leading-snug text-labs lg:text-[length:var(--text-small)]">{it.range}</p>
          </li>
        );
      })}
    </ul>
  );
}
