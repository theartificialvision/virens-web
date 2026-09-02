'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { DARK_ROUTES } from '@/config/navigation';
import { divisionGlow } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Cursor de dos capas (punto + halo) para el sistema oscuro. Nunca
 * intercepta clics/teclado (pointer-events: none). Se apaga por completo
 * fuera de DARK_ROUTES, en puntero grueso (táctil) o bajo
 * prefers-reduced-motion (CLAUDE.md regla 8) — en esos casos no toca
 * `.cursor-none`, así que el cursor del sistema se ve con normalidad.
 */
export function Cursor() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const [coarse, setCoarse] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 260, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 260, mass: 0.4 });

  const active = DARK_ROUTES.includes(pathname as (typeof DARK_ROUTES)[number]) && !reduced && !coarse;

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarse(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add('cursor-none');
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      document.documentElement.classList.remove('cursor-none');
      window.removeEventListener('pointermove', onMove);
    };
  }, [active, x, y]);

  if (!active) return null;

  const color = pathname === '/virens-labs' ? divisionGlow.labs : pathname === '/virens-tech' ? divisionGlow.tech : '#fff';

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] size-2 rounded-full"
        style={{ x, y, translateX: '-50%', translateY: '-50%', background: color }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] size-10 rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%', borderColor: color, opacity: 0.5 }}
      />
    </>
  );
}
