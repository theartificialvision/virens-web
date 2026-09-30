'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MenuOverlay } from '@/components/layout/MenuOverlay';
import { Logo } from './Logo';
import { BackButton } from '@/components/nav/BackButton';
import { MenuGlyph3D } from './MenuGlyph3D';
import { homeContent, ui } from '@/content';
import type { Locale } from '@/lib/i18n';

/**
 * Cabecera de la home V2: barra de vidrio líquido claro (`.header-glass`,
 * desde el 23/09/2026; antes blanca sólida), logo a la izquierda y trigger
 * de menú a la derecha. Es sticky y ocupa su sitio en el flujo: al hacer
 * scroll el contenido pasa por debajo y se ve a través del vidrio.
 *
 * El panel del menú es el mismo de V1 (`MenuOverlay`): la franja vertical de
 * vidrio azul no depende del sistema claro/oscuro de la página que hay debajo.
 */
export function V2Header({ locale }: { locale: Locale }) {
  const { v2Menu } = homeContent(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Hover/foco de teclado del botón: el icono 3D tiene su propia pose de hover.
  const [hot, setHot] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <header className="v2-fade header-glass sticky top-0 z-[70]">
        <div className="mx-auto flex h-[var(--v2-header)] w-full max-w-[var(--container-max)] items-center justify-between px-5 md:px-8 lg:px-12 2xl:px-20">
          {/* 30/09/2026: el botón «volver» va tras el logo para que este no cambie de sitio entre páginas. */}
          <div className="flex items-center gap-4">
            <Logo locale={locale} />
            <BackButton locale={locale} nav={ui[locale].nav} />
          </div>

          <button
            ref={triggerRef}
            type="button"
            data-menu-trigger
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="menu-overlay"
            aria-label={open ? v2Menu.closeAria : v2Menu.openAria}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHot(true)}
            onPointerLeave={() => setHot(false)}
            onFocus={(e) => e.currentTarget.matches(':focus-visible') && setHot(true)}
            onBlur={() => setHot(false)}
            className="-mr-3 flex h-11 items-center gap-3 rounded-full px-3 text-blue"
          >
            <MenuLabel open={open} labels={v2Menu} />
            <MenuGlyph3D open={open} hot={hot} />
          </button>
        </div>
      </header>

      <MenuOverlay open={open} onClose={close} locale={locale} />
    </>
  );
}

/**
 * Rótulo del botón (23/09/2026): «Menú» / «Cerrar» apilados en la misma celda
 * de rejilla —la caja mide lo que la palabra más larga, así el icono no salta—
 * y al conmutar uno sale por arriba mientras el otro entra desde abajo.
 * Oculto en móvil: ahí el icono solo se entiende de sobra.
 */
function MenuLabel({ open, labels }: { open: boolean; labels: { open: string; close: string } }) {
  const word = cn(
    '[grid-area:1/1] block transition-transform duration-[520ms] ease-[var(--motion-ease)]',
  );
  return (
    <span
      aria-hidden
      className="hidden overflow-hidden text-[length:var(--text-note)] font-semibold uppercase leading-[1.5] tracking-[0.2em] sm:grid sm:justify-items-end"
    >
      <span className={cn(word, open ? '-translate-y-full' : 'translate-y-0')}>{labels.open}</span>
      <span className={cn(word, open ? 'translate-y-0' : 'translate-y-full')}>{labels.close}</span>
    </span>
  );
}
