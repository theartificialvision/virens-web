'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Progreso del proceso de Virens Tech (29/09/2026). Lee dónde está cada paso
 * (`[data-step]`) respecto a una línea de lectura en el 55 % de la pantalla y
 * escribe en la sección `--proc-p` (0 … n-1, continuo) y `--proc-f` (0 … 1).
 * 2.ª vuelta (cliente: «más lógica de fluidos»): el valor que se pinta no
 * salta con el scroll, lo persigue con un muelle amortiguado, así los enlaces
 * crecen como un líquido que se asienta. React solo se entera cuando cambia el
 * paso activo o entra uno nuevo. Con movimiento reducido: todo completo.
 */
export function useProcessProgress(ref: RefObject<HTMLElement | null>, count: number, reduced: boolean) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set());

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (reduced) {
      root.style.setProperty('--proc-p', String(count - 1));
      root.style.setProperty('--proc-f', '1');
      setSeen(new Set(Array.from({ length: count }, (_, i) => i)));
      return;
    }
    root.dataset.ready = '1';
    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
    let target = 0;
    let shown = 0;
    let frame = 0;
    const paint = () => {
      frame = 0;
      shown += (target - shown) * 0.12;
      if (Math.abs(target - shown) < 0.001) shown = target;
      root.style.setProperty('--proc-p', shown.toFixed(4));
      root.style.setProperty('--proc-f', (count > 1 ? shown / (count - 1) : 1).toFixed(4));
      if (shown !== target) frame = window.requestAnimationFrame(paint);
    };
    const measure = () => {
      const line = window.innerHeight * 0.55;
      const tops = steps.map((s) => s.getBoundingClientRect().top);
      let p = 0;
      for (let i = 0; i < tops.length; i++) {
        const top = tops[i] ?? 0;
        if (top > line) break;
        const next = tops[i + 1];
        p = next === undefined ? i : i + Math.min(1, (line - top) / Math.max(next - top, 1));
      }
      target = Math.min(Math.max(p, 0), count - 1);
      setActive(Math.min(count - 1, Math.floor(target + 0.001)));
      const entered = tops.flatMap((t, i) => (t < window.innerHeight * 0.85 ? [i] : []));
      setSeen((old) => (entered.every((i) => old.has(i)) ? old : new Set([...old, ...entered])));
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, count, reduced]);

  return { active, seen };
}
