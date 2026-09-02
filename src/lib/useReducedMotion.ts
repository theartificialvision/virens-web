'use client';

import { useEffect, useState } from 'react';

/**
 * `prefers-reduced-motion` en JS: la regla CSS global (globals.css) solo
 * neutraliza transition/animation — no basta para un bucle requestAnimationFrame,
 * un cursor personalizado o una atracción magnética (CLAUDE.md regla 8).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  // El snapshot del servidor no conoce la preferencia del sistema. Esperar al
  // montaje mantiene idéntico el primer HTML y evita un mismatch de hidratación.
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}
