import type { Division } from '@/lib/types';

export interface NavItem {
  href: string;
  label: string;
  division?: Division;
}

/**
 * Overlay de menú (§5.3): Compañía · Virens Labs · Virens Tech · Noticias ·
 * Contacto. "Inicio" se añadió el 2026-09-02 al quitar el logotipo de texto
 * de la cabecera (petición del cliente): sin él, el menú es la única forma
 * de volver a Home.
 */
export const mainNav: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/compania', label: 'Compañía' },
  { href: '/virens-labs', label: 'Virens Labs', division: 'labs' },
  { href: '/virens-tech', label: 'Virens Tech', division: 'tech' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/contacto', label: 'Contacto' },
];

/** Barra de anclas sticky de /virens-labs (§10.8) — un ítem por bloque con id. */
export const labsAnchors: NavItem[] = [
  { href: '#private-label', label: 'Private Label' },
  { href: '#full-service', label: 'Full Service' },
  { href: '#formas-galenicas', label: 'Formas galénicas' },
  { href: '#capacidad-productiva', label: 'Capacidad productiva' },
  { href: '#calidad', label: 'Calidad' },
  { href: '#areas-terapeuticas', label: 'Áreas terapéuticas' },
];

/** Barra de anclas sticky de /virens-tech. */
export const techAnchors: NavItem[] = [
  { href: '#formulacion', label: 'Formulación' },
  { href: '#rd-galenicos', label: 'R+D galénicos' },
  { href: '#centro-de-sabores', label: 'Centro de sabores' },
  { href: '#estabilidad', label: 'Estabilidad' },
  { href: '#garantia-de-calidad', label: 'Garantía de calidad' },
  { href: '#regulatory-consulting', label: 'Regulatory consulting' },
];


/** Pie de página, legales agrupados bajo /legal (§5.2, redirecciones §14). */
export const legalNav: NavItem[] = [
  { href: '/legal/aviso-legal', label: 'Aviso legal' },
  { href: '/legal/politica-de-privacidad', label: 'Política de privacidad' },
  { href: '/legal/politica-de-cookies', label: 'Cookies' },
  { href: '/legal/condiciones-generales-de-venta', label: 'Condiciones generales de venta' },
];

/**
 * Rutas del pivote oscuro 2026-09-01 (Home + las dos divisiones). El resto
 * del sitio (Compañía/Contacto/Noticias) se queda en el sistema claro hasta
 * su propia fase — Header y Grain se autolimitan a esta lista.
 */
export const DARK_ROUTES = ['/', '/virens-labs', '/virens-tech'] as const;
