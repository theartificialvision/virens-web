import { newsCategories, type NewsCategory } from '@/content/noticias';

/** Fecha ISO (YYYY-MM-DD) -> "26 de agosto de 2026". El `T00:00:00` evita que
 *  el huso horario la mueva al día anterior. */
export function formatNewsDate(dateISO: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${dateISO}T00:00:00`));
}

export function newsCategoryLabel(id: NewsCategory): string {
  return newsCategories.find((c) => c.id === id)?.label ?? id;
}

export function newsHref(slug: string): string {
  return `/noticias/${slug}`;
}
