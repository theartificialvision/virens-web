'use client';

import { useEffect, useState } from 'react';

/**
 * `true` en dispositivos sin hover real (táctiles). El hero lo necesita para
 * decidir qué hace el primer toque sobre LABS/TECH: ahí abre el área en vez
 * de navegar, y solo el segundo toque sigue el enlace (CLAUDE.md regla 8 —
 * la interacción tiene que existir también sin ratón).
 */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);

  // Igual que `usePrefersReducedMotion`: el snapshot del servidor no conoce
  // el dispositivo, así que se resuelve tras el montaje y el primer HTML no
  // cambia (sin mismatch de hidratación).
  useEffect(() => {
    const media = window.matchMedia('(hover: none)');
    const update = () => setCoarse(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return coarse;
}
