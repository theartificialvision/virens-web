'use client';

import { useEffect, useRef, useState } from 'react';

/** Duración por tramo entre dos pasos del recorrido. */
const STEP_MS = 340;
/** Pausa antes de la primera pasada, al entrar la fila en pantalla. */
const REVEAL_DELAY_MS = 180;
/** Misma curva que `--lab-rail-ease` (globals.css): los puntos se encienden
 *  justo cuando la línea llega a ellos. */
const EASE = [0.65, 0, 0.35, 1] as const;

/** Momento (0–1) en que una curva cubic-bezier alcanza el avance `f`. */
function timeAt(f: number) {
  if (f <= 0) return 0;
  if (f >= 1) return 1;
  const [x1, y1, x2, y2] = EASE;
  const bez = (t: number, a: number, b: number) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t ** 2 * b + t ** 3;
  for (let t = 0; t <= 1; t += 0.005) if (bez(t, y1, y2) >= f) return bez(t, x1, x2);
  return 1;
}

const end = (n: number) => Math.max(n - 1, 0);

/**
 * Recorrido 01–05 (29/09/2026, cliente: «animaciones de progresión chulísimas
 * y pro»). La línea avanza o retrocede hasta el último paso del servicio
 * elegido y cada punto cambia justo cuando la línea pasa por él: devuelve la
 * duración de la pasada y el retardo de cada paso. Si la fila aún no se ve al
 * montar, arranca vacía y se llena al entrar en pantalla. Con movimiento
 * reducido, todo inmediato (regla 8).
 */
export function useStepProgress<T extends Element>(target: number, reduced: boolean) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);
  const [covered, setCovered] = useState(target);
  const [timing, setTiming] = useState<{ duration: number; delays: number[] }>({ duration: 0, delays: [] });
  const previous = useRef(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    setVisible(false);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setVisible(true);
      io.disconnect();
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const goal = visible ? target : 0;

  useEffect(() => {
    const from = previous.current;
    previous.current = goal;
    if (from === goal) return;
    const distance = Math.abs(end(goal) - end(from));
    const instant = reduced || !visible;
    const lead = !instant && from === 0 ? REVEAL_DELAY_MS : 0;
    const duration = instant ? 0 : Math.max(distance, 0.6) * STEP_MS;
    const delays = Array.from({ length: Math.max(from, goal) }, (_, i) => {
      if (instant || distance === 0) return lead;
      const travelled = goal > from ? i - end(from) : end(from) - i;
      return lead + timeAt(travelled / distance) * duration;
    });
    setTiming({ duration: duration + lead, delays });
    setCovered(goal);
  }, [goal, reduced, visible]);

  return { ref, covered, duration: timing.duration, delays: timing.delays, lead: covered > 0 && timing.delays[0] ? timing.delays[0] : 0 };
}
