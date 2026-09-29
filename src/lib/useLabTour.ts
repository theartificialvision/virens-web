'use client';

import { useCallback, useEffect, useRef, useState, type FocusEvent } from 'react';

/** Tiempo en cada paso del recorrido: lo que tarda la barra en llegar al siguiente. */
const DWELL_MS = 5000;
/** Pausa más larga en el último paso antes de pasar al otro servicio. */
const HOLD_MS = 6500;

/**
 * Estado único del recorrido del laboratorio (29/09/2026, 2.ª vuelta del
 * cliente: «intuitivo, amigable y coordinado»). Un solo `step` gobierna foto,
 * texto, barra y servicio; `tick` reinicia el temporizador de la barra en
 * cada cambio (también al pulsar el mismo paso).
 *
 * Avanza solo, pero se detiene: fuera de pantalla, con la pestaña oculta,
 * mientras el foco de teclado está dentro y cuando el usuario lo pausa
 * (WCAG 2.2.2: todo lo que se mueve solo más de 5 s necesita pausa). Con
 * movimiento reducido no hay avance automático (regla 8): solo manual.
 */
export function useLabTour(count: number, reduced: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [tick, setTick] = useState(0);
  // Saltos (clic, flecha, vuelta al principio): la barra se desliza hasta su
  // sitio. En el avance normal ya llega rellena por el temporizador.
  const [jump, setJump] = useState(false);
  const [inView, setInView] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const [stopped, setStopped] = useState(false);

  const go = useCallback((index: number) => {
    setStep(((index % count) + count) % count);
    setJump(true);
    setTick((t) => t + 1);
  }, [count]);

  // El temporizador llama a `next` al terminar; el ref evita leer un paso viejo.
  const stepRef = useRef(step);
  useEffect(() => { stepRef.current = step; }, [step]);
  const next = useCallback(() => {
    const current = stepRef.current;
    setJump(current === count - 1);
    setStep((current + 1) % count);
    setTick((t) => t + 1);
  }, [count]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  // Solo el foco de teclado pausa: un clic también enfoca el botón y no debe
  // dejar el recorrido parado.
  const focusHandlers = {
    onFocus: (event: FocusEvent<HTMLElement>) => setKeyboard(event.target.matches(':focus-visible')),
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboard(false);
    },
  };

  return {
    ref,
    step,
    tick,
    jump,
    go,
    next,
    autoplay: !reduced,
    stopped,
    toggle: () => setStopped((value) => !value),
    paused: stopped || !inView || hidden || keyboard,
    dwell: step === count - 1 ? HOLD_MS : DWELL_MS,
    focusHandlers,
  };
}
