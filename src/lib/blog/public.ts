import 'server-only';
import { blogConfig, isBlogConfigured } from '@/config/blog';
import type { PostSummary, PublicPost } from './post';

/**
 * Lectura pública del blog, en el servidor (en la build y, en Netlify, cada
 * `revalidate` segundos). Va directa a la API REST de Supabase con la clave
 * pública: no hace falta su librería en las páginas públicas.
 *
 * Los borradores no pueden salir de aquí aunque se pidieran: la regla de la
 * tabla (RLS) solo deja leer lo publicado con fecha ya cumplida.
 */
const SUMMARY = 'title,subtitle,slug,cover_image,published_at,updated_at';

async function query<T>(params: string): Promise<T[]> {
  if (!isBlogConfigured) return [];
  try {
    const res = await fetch(`${blogConfig.supabaseUrl}/rest/v1/posts?${params}`, {
      headers: { apikey: blogConfig.supabaseKey, Authorization: `Bearer ${blogConfig.supabaseKey}` },
      next: { revalidate: blogConfig.revalidate, tags: ['blog'] },
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    return (await res.json()) as T[];
  } catch (error) {
    // Si Supabase no responde, el blog sale vacío en vez de tumbar la build.
    console.error('[blog]', error);
    return [];
  }
}

export function listPublishedPosts(): Promise<PostSummary[]> {
  return query<PostSummary>(`select=${SUMMARY}&status=eq.published&order=published_at.desc`);
}

export async function getPublishedPost(slug: string): Promise<PublicPost | null> {
  const rows = await query<PublicPost>(`select=${SUMMARY},content&status=eq.published&slug=eq.${encodeURIComponent(slug)}&limit=1`);
  return rows[0] ?? null;
}
