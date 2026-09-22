'use client';

import { usePathname } from 'next/navigation';

/**
 * Deja fuera la cabecera/pie/grano del sistema en las rutas que traen los
 * suyos. Hoy solo `/v2`, la home nueva: comparte proyecto con V1 (mismos
 * tokens, mismas fuentes, mismo node_modules) pero no su envoltorio.
 *
 * Es un envoltorio cliente con `children` server: el árbol de Header/Footer
 * se sigue renderizando en el servidor, aquí solo se decide si se pinta.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/v2')) return null;
  return <>{children}</>;
}
