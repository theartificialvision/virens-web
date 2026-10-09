/**
 * BLOG (09/10/2026) — conexión con Supabase (base de datos, login e imágenes).
 *
 * Las dos claves son PÚBLICAS por diseño: viajan al navegador de cualquier
 * visitante. Lo que protege los datos son las reglas de `supabase/schema.sql`
 * (solo lectura de lo publicado; escribir exige ser admin). La clave secreta
 * («service_role» / «secret») NUNCA va aquí ni en ningún archivo del proyecto.
 *
 * Se pueden sobrescribir con variables de entorno en Netlify si algún día se
 * cambia de proyecto, sin tocar código.
 */
export const blogConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://qkcogkghxqczbcseieov.supabase.co',
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY ?? 'sb_publishable_SsSXJ0uAjBIQ7LIQYLQSvw_ecesVxLM',
  /** Carpeta de imágenes en Supabase Storage (la crea `schema.sql`). */
  bucket: 'blog',
  /** Segundos que la web tarda como máximo en reflejar un cambio del panel. */
  revalidate: 60,
} as const;

export const isBlogConfigured = Boolean(blogConfig.supabaseUrl && blogConfig.supabaseKey);
