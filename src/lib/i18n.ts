import { site, type Locale } from '@/config/site';

export type { Locale };
export const locales = site.locales;
export const defaultLocale: Locale = 'es';

/**
 * Páginas del sitio y su ruta en cada idioma (27/09/2026, fase i18n).
 *
 * El español vive en la raíz, como hasta ahora; el inglés bajo `/en` con
 * rutas traducidas —las mismas que ya publica lvirens.com en inglés
 * (`/en/company/`, `/en/contact/`…), así no se pierde nada de lo
 * que Google ya tiene indexado—. Añadir un idioma es añadir una columna aquí,
 * su diccionario en `src/content/<idioma>` y su carpeta en `src/app`.
 */
export const routes = {
  home: { es: '/', en: '/en' },
  company: { es: '/compania', en: '/en/company' },
  tech: { es: '/virens-tech', en: '/en/virens-tech' },
  contact: { es: '/contacto', en: '/en/contact' },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof routes;

/** Ruta de una página en un idioma, con ancla opcional (`#formas-galenicas`). */
export function pathFor(page: PageKey, locale: Locale, hash?: string): string {
  const base = routes[page][locale];
  return hash ? `${base}#${hash}` : base;
}

/** Idioma de una ruta del sitio. */
export function localeOf(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

/** La misma página en otro idioma; si no se reconoce, la home de ese idioma. */
export function switchLocale(pathname: string, to: Locale): string {
  const from = localeOf(pathname);
  const clean = pathname.replace(/\/$/, '') || '/';
  const page = (Object.keys(routes) as PageKey[]).find((k) => routes[k][from] === clean);
  return page ? routes[page][to] : routes.home[to];
}

/** `alternates` de metadatos: canónica + hreflang recíproco + x-default (§14.5). */
export function alternatesFor(page: PageKey, locale: Locale) {
  return {
    canonical: routes[page][locale],
    languages: {
      'es-ES': routes[page].es,
      en: routes[page].en,
      'x-default': routes[page].es,
    },
  };
}

/**
 * El diccionario inglés tiene que tener exactamente las mismas claves que el
 * español, pero sus textos no pueden ser los literales `as const` de aquel.
 * `Loosen` conserva la forma y ensancha los literales a su tipo base.
 */
export type Loosen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Loosen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Loosen<T[K]> }
          : T;
