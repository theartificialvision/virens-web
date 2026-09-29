'use client';

import { useEffect, useState, type RefObject } from 'react';

/** Solo sigue la lectura: un cálculo por frame de scroll, sin bucle ni movimiento impuesto. */
export function useProcessProgress(ref: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
    let frame = 0;
    const measure = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.45;
      let current = 0;
      steps.forEach((step, index) => {
        if (step.getBoundingClientRect().top <= readingLine) current = index;
      });
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
