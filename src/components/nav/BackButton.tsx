'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useBackTarget } from '@/lib/useBackTarget';
import { routes, pathFor, type Locale, type PageKey } from '@/lib/i18n';
import type { ui } from '@/content';

type Nav = (typeof ui)['es']['nav'];

const clean = (path: string) => path.replace(/\/$/, '') || '/';

/** Página de una ruta del sitio, para nombrarla en «Volver a …». */
function pageOf(path: string, locale: Locale): PageKey | undefined {
  return (Object.keys(routes) as PageKey[]).find((key) => routes[key][locale] === path);
}

/**
 * Botón «volver» (30/09/2026, cliente: «solo flecha atrás mínima, glass, bajo
 * el header»). Chevron fino en un círculo de vidrio fijo bajo la cabecera,
 * como el atrás de iOS; el nombre de la página va solo en el `aria-label`.
 * No aparece en la home.
 * Entrando por la vía natural usa el historial del navegador (recupera el
 * scroll donde se dejó); si se entró directo, lleva a la home.
 */
export function BackButton({ locale, nav }: { locale: Locale; nav: Nav }) {
  const pathname = clean(usePathname());
  const router = useRouter();
  const { previous, jumped } = useBackTarget();
  const home = pathFor('home', locale);
  if (pathname === home) return null;

  const target = previous ?? home;
  const page = pageOf(target, locale) ?? 'home';
  const label = nav.pages[page];
  const useHistory = previous !== null && !jumped;

  return (
    <button
      type="button"
      className="nav-back glass"
      aria-label={`${nav.backTo} ${label}`}
      onClick={() => (useHistory ? router.back() : router.push(target))}
    >
      <svg viewBox="0 0 12 20" aria-hidden="true" focusable="false" className="nav-back__chevron">
        <path d="M10 2 2 10l8 8" />
      </svg>
    </button>
  );
}
