import type { Metadata } from 'next';
import { isIndexable, site } from '@/config/site';
import { legalContent, ui } from '@/content';
import { alternatesFor, type Locale, type PageKey } from '@/lib/i18n';

/** Metadatos del layout raíz de cada idioma. */
export function rootMetadata(locale: Locale): Metadata {
  const t = ui[locale];
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.defaultTitle, template: '%s · Laboratorios Virens' },
    description: t.meta.description,
    openGraph: { type: 'website', locale: t.ogLocale, siteName: site.name },
    robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/** Título, descripción, canónica y hreflang de una página en un idioma. */
export function pageMetadata(page: PageKey, locale: Locale): Metadata {
  const legal = legalContent(locale).legalDocs.find((d) => d.key === page);
  const m = legal ? { title: legal.title, description: legal.description } : ui[locale].meta[page as Exclude<keyof typeof ui.es.meta, 'defaultTitle' | 'description'>];
  return { title: m.title, description: m.description, alternates: alternatesFor(page, locale) };
}
