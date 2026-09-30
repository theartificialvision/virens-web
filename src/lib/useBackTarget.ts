'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const KEY_CURRENT = 'virens-nav-current';
const KEY_PREVIOUS = 'virens-nav-previous';

const clean = (path: string) => path.replace(/\/$/, '') || '/';

/**
 * Página desde la que se llegó a esta, dentro de la propia web (30/09/2026).
 *
 * Se guarda en `sessionStorage` (una pestaña, una visita): al cambiar la ruta,
 * la anterior pasa a ser «previous». Si se entró directo (Google, un enlace),
 * no hay anterior y el botón lleva a la home. `jumped` avisa de que en esta
 * página se ha saltado a un ancla: entonces `router.back()` deshacería el
 * salto en vez de volver de página, y el botón navega a la ruta anterior.
 */
export function useBackTarget(): { previous: string | null; jumped: boolean } {
  const pathname = clean(usePathname());
  const [previous, setPrevious] = useState<string | null>(null);
  const [jumped, setJumped] = useState(false);

  useEffect(() => {
    setJumped(false);
    try {
      const current = sessionStorage.getItem(KEY_CURRENT);
      if (current && current !== pathname) sessionStorage.setItem(KEY_PREVIOUS, current);
      sessionStorage.setItem(KEY_CURRENT, pathname);
      const stored = sessionStorage.getItem(KEY_PREVIOUS);
      setPrevious(stored && stored !== pathname ? stored : null);
    } catch {
      setPrevious(null); // Sin almacenamiento: el botón lleva a la home.
    }
    const onHash = () => setJumped(true);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [pathname]);

  return { previous, jumped };
}
