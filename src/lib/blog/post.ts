/** Artículo del blog tal como está en la tabla `posts` (supabase/schema.sql). */
export interface Post {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  /** URL completa (Supabase Storage) o ruta de la web (`/img/noticias/…`). */
  cover_image: string | null;
  /** HTML del editor. Se limpia siempre antes de mostrarlo (`sanitize.ts`). */
  content: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

/** Lo que necesitan el listado y la plantilla pública. */
export type PublicPost = Pick<Post, 'title' | 'subtitle' | 'slug' | 'cover_image' | 'content' | 'published_at' | 'updated_at'>;
export type PostSummary = Omit<PublicPost, 'content'>;

export const blogHref = (slug: string) => `/blog/${slug}`;

/** «Café: guía práctica» → «cafe-guia-practica». */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
    .replace(/-+$/g, '');
}

/** Fecha en español: «9 de octubre de 2026». Hora de Madrid, no la del servidor. */
export function formatPostDate(iso: string | null): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Madrid' }).format(new Date(iso));
}

/**
 * Fecha del formulario (AAAA-MM-DD) ↔ marca de tiempo. Se guarda a mediodía UTC
 * para que, vista desde España, nunca caiga en el día anterior o el siguiente.
 */
export const dateToTimestamp = (date: string) => `${date}T12:00:00Z`;
export const timestampToDate = (iso: string | null) =>
  iso ? new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date(iso)) : '';
export const todayDate = () => timestampToDate(new Date().toISOString());
