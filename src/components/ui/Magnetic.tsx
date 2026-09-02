'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Envoltorio de atracción magnética: desplaza a su hijo hacia el puntero
 * dentro de su propio área. Inerte en táctil/reduced-motion (CLAUDE.md
 * regla 8) — el hijo se renderiza sin transformar, sin perder foco/tabulación.
 * Uso puntual (CTA de DivisionSplit/CtaContact/HeroVideo), no integrado en
 * Button.tsx: es un acento deliberado, no un comportamiento global.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [coarse, setCoarse] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 18, stiffness: 220, mass: 0.4 });
  const springY = useSpring(y, { damping: 18, stiffness: 220, mass: 0.4 });

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarse(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const inert = reduced || coarse;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (inert || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const maxOffset = 14;
    x.set(Math.max(-maxOffset, Math.min(maxOffset, relX * strength)));
    y.set(Math.max(-maxOffset, Math.min(maxOffset, relY * strength)));
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  if (inert) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}
