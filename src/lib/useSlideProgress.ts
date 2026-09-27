'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/** Constante de tiempo de la inercia (ms): en ~TAU el progreso mostrado
 *  recorre dos tercios de lo que le falta. Va por tiempo y no por fotograma
 *  para que se sienta igual a 120 Hz que en un móvil lento a 30. */
const TAU = 110;
const EPSILON = 0.0005;

/**
 * Progreso continuo de un slide guiado por scroll (Virens Tech, 27/09/2026:
 * «que el scroll sea más fluido»).
 *
 * Antes el índice saltaba de golpe a mitad de cada tramo y entre saltos no se
 * movía nada: cada `--svc-step` de scroll era una zona muerta. Ahora:
 *
 * - `p` (0 … n-1) sigue al scroll con una inercia corta (por tiempo, no
 *   por fotograma) en lugar de copiarlo en seco.
 * - Cada diapositiva recibe `--d = p - i` por CSS: la que está en pantalla
 *   deriva suavemente con el scroll, la saliente sigue su camino mientras se
 *   funde y la entrante llega desde abajo. Siempre hay movimiento.
 * - El índice activo (lo que dispara las animaciones de entrada) es `round(p)`.
 *
 * Las variables se escriben directamente en el DOM, sin re-render de React
 * por fotograma; solo cambia estado cuando cambia el índice. Con movimiento
 * reducido no hay inercia ni deriva (regla 8).
 */
export function useSlideProgress(
  ref: RefObject<HTMLElement | null>,
  n: number,
  enabled: boolean,
  reduced: boolean,
) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const slides = Array.from(el.querySelectorAll<HTMLElement>('.svc-slide'));
    let shown = indexRef.current;
    let frame = 0;
    let last = 0;

    const target = () => {
      const rect = el.getBoundingClientRect();
      const step = (rect.height - window.innerHeight) / Math.max(n - 1, 1);
      return Math.min(n - 1, Math.max(0, -rect.top / Math.max(step, 1)));
    };

    const paint = () => {
      el.style.setProperty('--svc-p', shown.toFixed(4));
      slides.forEach((slide, i) => {
        const d = reduced ? 0 : Math.max(-1.5, Math.min(1.5, shown - i));
        slide.style.setProperty('--d', d.toFixed(4));
      });
      const idx = Math.round(shown);
      if (idx !== indexRef.current) {
        indexRef.current = idx;
        setIndex(idx);
      }
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 16;
      last = now;
      const goal = target();
      const diff = goal - shown;
      const k = 1 - Math.exp(-dt / TAU);
      shown = reduced || Math.abs(diff) < EPSILON ? goal : shown + diff * k;
      paint();
      if (shown === goal) { frame = 0; last = 0; } else frame = requestAnimationFrame(tick);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(tick); };

    shown = target();
    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      slides.forEach((slide) => slide.style.removeProperty('--d'));
    };
  }, [ref, n, enabled, reduced]);

  return index;
}
