'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Entrada al hacer scroll: opacidad + 16 px de desplazamiento, una sola vez.
 * Desactivada bajo `prefers-reduced-motion` (§10.6).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const disableMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={disableMotion ? false : { opacity: 0, y: 16 }}
      animate={disableMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={disableMotion ? { duration: 0 } : { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
