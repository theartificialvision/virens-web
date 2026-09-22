/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },

  // Redirecciones 301 desde la web actual (WordPress) — ver §14.5 del documento maestro.
  async redirects() {
    const map = [
      // La home V2 vivió en /v2 unos días (22/09/2026): por si quedó enlazada.
      ['/v2', '/'],
      ['/compania/', '/compania'],
      ['/virens-labs/', '/virens-labs'],
      ['/virens-tech/', '/virens-tech'],
      ['/noticias/', '/noticias'],
      ['/contacto/', '/contacto'],
      ['/aviso-legal/', '/legal/aviso-legal'],
      ['/politica-de-proteccion-de-datos/', '/legal/politica-de-privacidad'],
      ['/uso-de-cookies/', '/legal/politica-de-cookies'],
      ['/condiciones-generales-de-venta/', '/legal/condiciones-generales-de-venta'],
    ];
    return map.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
