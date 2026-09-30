'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Sigue la lectura del recorrido de Tech: un cálculo por frame de scroll, sin
 * bucle ni movimiento impuesto. Devuelve el capítulo activo y, además, escribe
 * `--tech-progress` (0 → 1, del primer nodo al último) directamente en el
 * elemento para que el raíl molecular se llene sin re-renderizar React.
 *
 * El punto de medida de cada capítulo es su `[data-step-anchor]` (la línea de
 * «Fase 0X / 05», a la altura del nodo), no el borde del `li`: así el nodo se
 * enciende justo cuando su texto cruza la línea de lectura.
 */
export function useProcessProgress(ref: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const anchors = Array.from(root.querySelectorAll<HTMLElement>('[data-step-anchor]'));
    if (!anchors.length) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.5;
      const tops = anchors.map((anchor) => anchor.getBoundingClientRect().top);
      let current = 0;
      tops.forEach((top, index) => { if (top <= readingLine) current = index; });
      const first = tops[0] ?? 0;
      const last = tops[tops.length - 1] ?? first;
      const span = last - first;
      const progress = span > 0 ? Math.min(1, Math.max(0, (readingLine - first) / span)) : 0;
      root.style.setProperty('--tech-progress', progress.toFixed(4));
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref]);
  return active;
}
