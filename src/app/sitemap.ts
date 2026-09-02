import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

/** Sitemap generado en build. Sustituye al de Yoast, que publica 60 entradas para 10 URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/virens-labs', '/virens-tech', '/compania', '/noticias', '/contacto'];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/noticias' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
