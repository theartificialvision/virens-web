import type { Division } from '@/lib/types';

export interface NavItem {
  href: string;
  label: string;
  division?: Division;
}

// 27/09/2026: menú principal y enlaces legales pasan a `src/content/ui.ts`,
// por idioma.

/**
 * Ruta del pivote oscuro 2026-09-01. Labs vive ahora en la Home clara; el
 * resto del sitio (Compañía/Contacto/Noticias) se queda en el sistema claro
 * hasta su propia fase — Header y Grain se autolimitan a esta lista.
 */
export const DARK_ROUTES = ['/virens-tech', '/en/virens-tech'] as const;
