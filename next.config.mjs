import { redirectRules } from './redirects.mjs';

/**
 * `STATIC_EXPORT=1` (lo pone `npm run build:static`) genera la web como HTML
 * estático en `out/` para subirla a un hosting Apache (cdmon). Sin servidor
 * Node no hay optimizador de imágenes ni redirecciones de Next: las imágenes
 * se sirven tal cual y las 301 pasan al `.htaccess` (scripts/build-static.mjs).
 * Sin la variable, la build es la de siempre (Netlify).
 */
const isStaticExport = process.env.STATIC_EXPORT === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `qualities`: Next 16 exige declarar las calidades que se piden con `quality={…}`
  // (el fondo de Contacto usa 85). 75 es el valor por defecto de `next/image`.
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    unoptimized: isStaticExport,
    // Blog (09/10/2026): fotos subidas desde el panel a Supabase Storage.
    remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' }],
  },
  ...(isStaticExport
    ? { output: 'export' }
    : {
        async redirects() {
          return redirectRules().map(([source, destination]) => ({ source, destination, permanent: true }));
        },
      }),
};

export default nextConfig;
