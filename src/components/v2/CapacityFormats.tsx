'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { homeContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { CAPACITY_SHAPES } from '@/lib/capacityShapes';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { FormatIcon } from './FormatIcon';

const STEP = 170;
const CYCLE = 2200;
const TOUCH_PAUSE = 6000;

/**
 * Formatos que crecen por sus tamaños. Con cursor se activan por hover/foco;
 * en táctil recorren la lista automáticamente y también responden al toque.
 */
export function CapacityFormats({ locale }: { locale: Locale }) {
  const items = homeContent(locale).v2Capacity.formats;
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

  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches;
    const el = listRef.current;
    if (!touch || reduced || !el) return;
    let next = 0;
    let interval = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(interval);
      if (!entry?.isIntersecting) {
        activate(null);
        return;
      }
      interval = window.setInterval(() => {
        if (Date.now() < pausedUntil.current) return;
        activate(next % items.length);
        next += 1;
      }, CYCLE);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(interval);
    };
  }, [reduced, activate, items.length]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <ul
      ref={listRef}
      className="flex flex-wrap items-start justify-center gap-y-10 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(var(--cap-col-min),1fr))] lg:gap-x-2"
    >
      {items.map((item, index) => {
        const shape = CAPACITY_SHAPES[item.id];
        const on = active === index;
        return (
          <li
            key={item.id}
            tabIndex={0}
            data-active={on || undefined}
            className="cap-item flex w-1/4 cursor-default flex-col items-center px-1 text-center outline-none md:w-[calc(100%/7)] lg:w-auto lg:px-0"
            onMouseEnter={() => activate(index)}
            onMouseLeave={() => activate(null)}
            onFocus={() => activate(index)}
            onBlur={() => activate(null)}
            onClick={() => {
              pausedUntil.current = Date.now() + TOUCH_PAUSE;
              activate(index);
            }}
          >
            <div className="aspect-[1/2] w-full max-w-[var(--cap-icon-max-sm)] lg:max-w-[var(--cap-icon-max)]">
              {shape && <FormatIcon shape={shape} stage={on ? stage : 0} active={on} />}
            </div>
            <div className="mt-3.5 flex h-[var(--cap-line-on)] items-start">
              <span aria-hidden className="cap-line block" />
            </div>
            <p className="mt-3.5 text-[length:var(--text-small)] font-medium leading-snug text-blue lg:text-[length:var(--text-body)]">
              {item.label}
            </p>
            <p className="mt-1.5 text-balance text-[length:var(--text-micro)] font-semibold leading-snug text-labs lg:text-[length:var(--text-small)]">
              {item.range}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
