'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { blogConfig, isBlogConfigured } from '@/config/blog';

/**
 * Conexión del panel con Supabase, solo en el navegador. La sesión se guarda en
 * el navegador y se renueva sola: quien ha entrado sigue dentro al recargar o
 * volver otro día, hasta que pulse «Cerrar sesión».
 */
let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient {
  if (!isBlogConfigured) throw new Error('Supabase sin configurar (src/config/blog.ts)');
  client ??= createClient(blogConfig.supabaseUrl, blogConfig.supabaseKey, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: 'virens-blog-admin' },
  });
  return client;
}
