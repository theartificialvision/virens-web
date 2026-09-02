'use client';

import { motion, type Variants } from 'framer-motion';
import { EASE_OUT_QUART } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

type Tag = 'h1' | 'h2' | 'h3';

const MOTION_TAG = { h1: motion.h1, h2: motion.h2, h3: motion.h3 } as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const word: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_QUART } },
};

/**
 * Titular cinético: stagger por palabra (nunca por carácter — riesgo de
 * accesibilidad para lector de pantalla), renderiza el propio tag de
 * encabezado (nunca duplica jerarquía, CLAUDE.md regla 8). El nombre
 * accesible viene de `aria-label`; las palabras animadas quedan
 * `aria-hidden` para que un lector de pantalla no las lea fragmentadas.
 * Estático bajo prefers-reduced-motion.
 */
export function KineticHeading({
  as = 'h1',
  text,
  className,
  delay = 0,
}: {
  as?: Tag;
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(' ');

  if (reduced) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  const MotionTag = MOTION_TAG[as];

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      animate="visible"
      variants={container}
      transition={{ delayChildren: delay }}
    >
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={`${w}-${i}`}>
            {i > 0 && ' '}
            <span className="inline-block overflow-hidden align-top">
              <motion.span variants={word} className="inline-block">{w}</motion.span>
            </span>
          </span>
        ))}
      </span>
    </MotionTag>
  );
}
