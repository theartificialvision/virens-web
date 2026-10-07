import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { locales, routes, type PageKey } from '@/lib/i18n';

// Se genera en build: necesario para la exportación estática (Apache/cdmon).
export const dynamic = 'force-static';

/**
 * Sitemap generado en build. Sustituye al de Yoast, que publica 60 entradas
 * para 10 URLs. Desde el 27/09/2026 incluye el inglés, con cada página
 * enlazada a su versión en el otro idioma (hreflang en el propio sitemap).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.keys(routes) as PageKey[];
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${site.url}${routes[page][locale]}`,
      lastModified: new Date(),
      changeFrequency: ['legalNotice', 'privacy', 'cookies', 'sales'].includes(page) ? ('yearly' as const) : ('monthly' as const),
      priority: page === 'home' ? 1 : ['legalNotice', 'privacy', 'cookies', 'sales'].includes(page) ? 0.3 : 0.8,
      alternates: {
        languages: { es: `${site.url}${routes[page].es}`, en: `${site.url}${routes[page].en}` },
      },
    })),
  );
}
