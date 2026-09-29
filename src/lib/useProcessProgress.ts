'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Progreso del proceso de Virens Tech (29/09/2026). Lee dónde está cada paso
 * (`[data-step]`) respecto a una línea de lectura en el 55 % de la pantalla y
 * escribe en la sección `--proc-p` (0 … n-1, continuo: 1,4 = entre el paso 2 y
 * el 3) y `--proc-f` (0 … 1). Con eso el CSS dibuja los enlaces de la molécula
 * y la línea de móvil sin re-renderizar en cada fotograma; React solo se entera
 * cuando cambia el paso activo o entra uno nuevo en pantalla.
 * Con movimiento reducido la molécula sale completa y todo visible (regla 8).
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
    // Sin JS todo se ve completo: las entradas (escaneo, regla) solo se
    // preparan cuando el progreso ya se está midiendo.
    root.dataset.ready = '1';
    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.55;
      const tops = steps.map((s) => s.getBoundingClientRect().top);
      let p = 0;
      for (let i = 0; i < tops.length; i++) {
        const top = tops[i] ?? 0;
        if (top > line) break;
        const next = tops[i + 1];
        p = next === undefined ? i : i + Math.min(1, (line - top) / Math.max(next - top, 1));
      }
      p = Math.min(Math.max(p, 0), count - 1);
      root.style.setProperty('--proc-p', p.toFixed(3));
      root.style.setProperty('--proc-f', (count > 1 ? p / (count - 1) : 1).toFixed(4));
      setActive(Math.min(count - 1, Math.floor(p + 0.001)));
      const entered = tops.flatMap((t, i) => (t < window.innerHeight * 0.85 ? [i] : []));
      setSeen((old) => (entered.every((i) => old.has(i)) ? old : new Set([...old, ...entered])));
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, count, reduced]);

  return { active, seen };
}
