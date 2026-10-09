/**
 * Redirecciones 301 desde la web actual (WordPress) — ver §14.5 del documento
 * maestro. Una sola lista para los dos destinos: `next.config.mjs` (Netlify) y
 * el `.htaccess` de la exportación estática para Apache (cdmon), que genera
 * `scripts/build-static.mjs`.
 */
export const redirectMap = [
  // La home V2 vivió en /v2 unos días (22/09/2026): por si quedó enlazada.
  ['/v2', '/'],
  ['/compania/', '/compania'],
  // Labs ya es la home: se conserva la URL histórica como redirección.
  ['/virens-labs', '/'],
  ['/virens-tech/', '/virens-tech'],
  // Noticias vuelve como Blog (09/10/2026, rama `blog`): mismas direcciones
  // con /blog delante. El inglés no tiene blog: sigue yendo a su home.
  ['/noticias', '/blog'],
  ['/noticias/:path*', '/blog/:path*'],
  // Las 18 noticias de WordPress colgaban de la raíz (/cphi-milan-2026/).
  ['/cphi-milan-2026/', '/blog/cphi-milan-2026'],
  ['/verano-2026/', '/blog/verano-2026'],
  ['/vitafoods-2026-un-exito-gracias-por-formar-parte-de-esta-gran-edicion/', '/blog/vitafoods-2026-un-exito-gracias-por-formar-parte-de-esta-gran-edicion'],
  ['/vitafoods-2026/', '/blog/vitafoods-2026'],
  ['/nootropicos-y-salud-cognitiva-como-los-suplementos-apoyan-la-salud-cerebral/', '/blog/nootropicos-y-salud-cognitiva-como-los-suplementos-apoyan-la-salud-cerebral'],
  ['/cierre-por-vacaciones-de-agosto/', '/blog/cierre-por-vacaciones-de-agosto'],
  ['/la-creatina-el-boom-en-los-suplementos-para-la-mujer-2/', '/blog/la-creatina-el-boom-en-los-suplementos-para-la-mujer-2'],
  ['/vitafoods-europe-2025/', '/blog/vitafoods-europe-2025'],
  ['/nutricion-deportiva-claves-y-tendencias-para-2025/', '/blog/nutricion-deportiva-claves-y-tendencias-para-2025'],
  ['/feliz-navidad-y-prospero-ano-nuevo/', '/blog/feliz-navidad-y-prospero-ano-nuevo'],
  ['/tendencias-en-los-complementos-alimenticios-en-2025/', '/blog/tendencias-en-los-complementos-alimenticios-en-2025'],
  ['/envejecimiento-saludable-bienestar/', '/blog/envejecimiento-saludable-bienestar'],
  ['/vitafoods-moves-to-barcelona/', '/blog/vitafoods-moves-to-barcelona'],
  ['/laboratorios-virens-amb-accio/', '/blog/laboratorios-virens-amb-accio'],
  ['/laboratorios-virens-vuelve-a-vitafoods-2024/', '/blog/laboratorios-virens-vuelve-a-vitafoods-2024'],
  ['/virens-crece/', '/blog/virens-crece'],
  ['/nuevo-catalogo/', '/blog/nuevo-catalogo'],
  ['/vitafoods-2023/', '/blog/vitafoods-2023'],
  ['/en/news', '/en'],
  ['/en/news/:path*', '/en'],
  ['/contacto/', '/contacto'],
  ['/aviso-legal/', '/legal/aviso-legal'],
  ['/politica-de-proteccion-de-datos/', '/legal/politica-de-privacidad'],
  ['/uso-de-cookies/', '/legal/politica-de-cookies'],
  ['/condiciones-generales-de-venta/', '/legal/condiciones-generales-de-venta'],

  // Inglés (27/09/2026). /en/company/, /en/contact/… ya coinciden con las
  // rutas nuevas (Next quita la barra final solo). Labs es la home.
  ['/en/virens-labs', '/en'],
  ['/en/virens-labs/', '/en'],
  ['/en/legal-notice/', '/en/legal/legal-notice'],
  ['/en/data-protection-policy/', '/en/legal/privacy-policy'],
  ['/en/use-of-cookies/', '/en/legal/cookie-policy'],
  ['/en/sales-terms-and-conditions/', '/en/legal/sales-terms-and-conditions'],

  // Idiomas que la web actual publica y la nueva no tiene en esta fase
  // (§14.5: nunca dejarlos en 404). Catalán → español; francés, italiano
  // y chino → inglés.
  ['/ca', '/'],
  ['/ca/:path*', '/'],
  ['/fr', '/en'],
  ['/fr/:path*', '/en'],
  ['/it', '/en'],
  ['/it/:path*', '/en'],
  ['/zh-hans', '/en'],
  ['/zh-hans/:path*', '/en'],
];

/**
 * Lista final sin duplicados. Next quita la barra final antes de mirar estas
 * reglas (308 a la ruta sin barra), así que cada origen con barra se registra
 * también sin ella. Nunca una regla que apunte a sí misma (/compania/ →
 * /compania daría /compania → /compania: bucle infinito).
 */
export function redirectRules() {
  const both = redirectMap
    .flatMap(([source, destination]) =>
      source.length > 1 && source.endsWith('/') ? [[source, destination], [source.slice(0, -1), destination]] : [[source, destination]],
    )
    .filter(([source, destination]) => source !== destination);
  return [...new Map(both.map((r) => [r[0], r])).values()];
}
