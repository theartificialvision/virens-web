import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { isIndexable } from '@/config/site';

/**
 * Mientras esto sea un prototipo NO debe indexarse. No es una precaución
 * teórica: es el rediseño de una web que está en producción (lvirens.com) y
 * publica datos todavía sin confirmar por el cliente —la dirección postal en
 * disputa, el claim "FDA APPROVED" pendiente de revisar, copy marcado como NO
 * LITERAL—. Un prototipo indexado bajo la marca del cliente puede competir con
 * su web real en resultados y confundir a quien lo encuentre.
 *
 * Cerrado por defecto: se abre poniendo `NEXT_PUBLIC_INDEXABLE=true` en el
 * entorno, y eso solo debería ocurrir el día que esto sea la web de verdad.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
