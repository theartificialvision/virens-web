'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Progreso 0 → 1 de una animación de «carga» que arranca la primera vez que el
 * elemento entra en pantalla (capacidad productiva, 23/09/2026).
 *
 * - El HTML del servidor sale con el valor final (`1`): sin JS, en buscadores
 *   y en lectores de pantalla las cifras son las reales desde el principio.
 * - Al montar, si el bloque aún no se ve, vuelve a `0` fuera de pantalla y
 *   espera; si ya se ve, anima desde `0` en ese momento.
 * - Con `prefers-reduced-motion` se queda en `1` y no abre bucle (regla 8:
 *   comprobación explícita en JS, la regla CSS no alcanza a un rAF).
 * - Curva ease-out quart: arranca con decisión y se asienta despacio, como
 *   una línea que alcanza su régimen; más suave que la exponencial, para que
 *   el llenado se lea. Sin rebote.
 */
export function useLoadProgress<T extends Element>(
  ref: RefObject<T | null>,
  { delay = 0, duration = 1600 }: { delay?: number; duration?: number } = {},
): number {
  const [t, setT] = useState(1);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let timer = 0;
    const run = () => {
      if (started.current) return;
      started.current = true;
      setT(0);
      timer = window.setTimeout(() => {
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          setT(p >= 1 ? 1 : 1 - Math.pow(1 - p, 4));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      }, delay);
    };

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) setT(0);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [ref, delay, duration]);

  return t;
}

/** Separa «200M» / «+2.000» en prefijo, número y sufijo para contarlo. */
export function parseFigure(raw: string): { prefix: string; value: number; suffix: string; grouped: boolean } {
  const m = raw.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return { prefix: '', value: 0, suffix: raw, grouped: false };
  const digits = m[2] ?? '';
  const grouped = /\d\.\d{3}/.test(digits);
  return {
    prefix: m[1] ?? '',
    value: Number(digits.replace(/\./g, '').replace(',', '.')),
    suffix: m[3] ?? '',
    grouped,
  };
}

/** Formatea el valor intermedio igual que el literal (miles con punto si lo llevaba). */
export function formatFigure(value: number, grouped: boolean): string {
  const n = Math.round(value);
  return grouped ? n.toLocaleString('es-ES', { useGrouping: 'always' }) : String(n);
}
