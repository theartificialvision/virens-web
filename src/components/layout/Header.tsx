'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { DARK_ROUTES } from '@/config/navigation';
import { MenuOverlay } from './MenuOverlay';

/**
 * Cabecera: sin barra de fondo. El logo y el grupo de la derecha
 * (ES/EN + trigger) son elementos flotantes sobre el contenido, cada uno
 * por su cuenta — nunca una franja de ancho completo con fondo/filete.
 * Solo cambia el color del texto (blanco en DARK_ROUTES, azul en el resto)
 * para mantener contraste sin necesitar una caja detrás. Pivote 2026-09-01:
 * antes el texto volvía a azul a mitad de scroll del hero de vídeo; ahora
 * todo el contenido de Home/Labs/Tech es oscuro, así que el texto se queda
 * blanco durante toda la página — ya no hace falta el listener de scroll.
 *
 * El trigger del menú vive arriba-derecha en desktop (el panel despliega
 * hacia abajo desde aquí). En mobile se sustituye por un botón flotante fijo
 * abajo-derecha: el panel despliega hacia arriba desde ese punto.
 */
export function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<'desktop' | 'mobile'>('desktop');

  // Cierra el menú al cambiar de ruta (navegación por teclado o enlace directo).
  useEffect(() => setOpen(false), [pathname]);

  const light = DARK_ROUTES.includes(pathname as (typeof DARK_ROUTES)[number]) && !open;

  function openMenu(from: 'desktop' | 'mobile') {
    lastTrigger.current = from;
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
    // Trampa de foco (§2 punto 8): el foco vuelve al botón que abrió el menú.
    (lastTrigger.current === 'desktop' ? desktopTriggerRef : mobileTriggerRef).current?.focus();
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-6 lg:px-10 lg:py-5 2xl:px-16">
        <Link href="/" aria-label="Laboratorios Virens — inicio">
          {/* Sustituir por el SVG del logo. Dos versiones: color y blanco.
              Cápsula con blur solo fuera del hero: sin ella el logo se pierde
              contra secciones de color (verde/azul/magenta) al hacer scroll;
              sobre el hero no hace falta, el velo del vídeo ya da contraste. */}
          <span
            className={cn(
              'inline-block text-[length:var(--text-small)] font-bold tracking-[0.18em] uppercase transition-colors duration-300',
              light ? 'text-white' : 'rounded-full bg-white/85 px-4 py-2 text-blue backdrop-blur-md',
            )}
          >
            Laboratorios Virens
          </span>
        </Link>

        <div
          className={cn(
            'flex items-center gap-6 transition-colors duration-300',
            !light && 'rounded-full bg-white/85 py-2 pl-5 pr-4 backdrop-blur-md',
          )}
        >
          <LocaleSwitch dark={light} />
          {/* Trigger desktop. Oculto en mobile: ahí el trigger es el botón flotante. */}
          <button
            ref={desktopTriggerRef}
            type="button"
            onClick={() => openMenu('desktop')}
            aria-expanded={open}
            aria-controls="menu-overlay"
            className={cn(
              'hidden items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 lg:flex',
              light ? 'text-white' : 'text-blue',
            )}
          >
            Menú
            <span className="flex flex-col gap-[5px]" aria-hidden>
              <span className={cn('block h-px w-6 transition-colors duration-300', light ? 'bg-white' : 'bg-blue')} />
              <span className={cn('block h-px w-6 transition-colors duration-300', light ? 'bg-white' : 'bg-blue')} />
            </span>
          </button>
        </div>
      </div>

      {/* Trigger mobile: flotante, fijo abajo-derecha, por encima del panel (z-65) para poder cerrar tocando el mismo botón. */}
      <button
        ref={mobileTriggerRef}
        type="button"
        onClick={() => (open ? closeMenu() : openMenu('mobile'))}
        aria-expanded={open}
        aria-controls="menu-overlay"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        className="fixed bottom-5 right-5 z-[65] flex size-14 items-center justify-center rounded-full bg-blue text-white lg:hidden"
      >
        <MenuGlyph open={open} />
      </button>

      <MenuOverlay open={open} onClose={closeMenu} />
    </>
  );
}

/** Hamburguesa que se convierte en aspa cuando el menú está abierto. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative flex size-4 flex-col items-center justify-center gap-[5px]" aria-hidden>
      <span
        className={cn(
          'block h-px w-5 bg-white transition-transform duration-200',
          open && 'translate-y-[3px] rotate-45',
        )}
      />
      <span
        className={cn(
          'block h-px w-5 bg-white transition-transform duration-200',
          open && '-translate-y-[3px] -rotate-45',
        )}
      />
    </span>
  );
}

function LocaleSwitch({ dark }: { dark: boolean }) {
  return (
    <div className={cn('hidden text-[12px] font-semibold tracking-[0.14em] transition-colors duration-300 sm:flex sm:gap-3', dark ? 'text-white' : 'text-blue')}>
      <span aria-current="true">ES</span>
      <span className="opacity-40">·</span>
      <Link href="/en" className="opacity-60 transition-opacity hover:opacity-100">EN</Link>
    </div>
  );
}
