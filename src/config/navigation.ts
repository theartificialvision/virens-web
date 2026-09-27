import type { Division } from '@/lib/types';

export interface NavItem {
  href: string;
  label: string;
  division?: Division;
}

/**
 * Overlay de menú (§5.3): Inicio · Compañía · Virens Tech · Noticias ·
 * Contacto. "Inicio" se añadió el 2026-09-02 al quitar el logotipo de texto
 * de la cabecera (petición del cliente): sin él, el menú es la única forma
 * de volver a Home.
 */
export const mainNav: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/compania', label: 'Compañía' },
  { href: '/virens-tech', label: 'Virens Tech', division: 'tech' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/contacto', label: 'Contacto' },
];

/** Barra de anclas sticky de /virens-tech. */

/** Pie de página, legales agrupados bajo /legal (§5.2, redirecciones §14). */
export const legalNav: NavItem[] = [
  { href: '/legal/aviso-legal', label: 'Aviso legal' },
  { href: '/legal/politica-de-privacidad', label: 'Política de privacidad' },
  { href: '/legal/politica-de-cookies', label: 'Cookies' },
  { href: '/legal/condiciones-generales-de-venta', label: 'Condiciones generales de venta' },
];

/**
 * Ruta del pivote oscuro 2026-09-01. Labs vive ahora en la Home clara; el
 * resto del sitio (Compañía/Contacto/Noticias) se queda en el sistema claro
 * hasta su propia fase — Header y Grain se autolimitan a esta lista.
 */
export const DARK_ROUTES = ['/virens-tech'] as const;
