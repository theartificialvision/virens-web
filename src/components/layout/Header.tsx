'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { DARK_ROUTES } from '@/config/navigation';
import { MenuOverlay } from './MenuOverlay';

/**
 * Cabecera: sin barra de fondo, sin logotipo de texto. Solo el trigger del
 * menú, flotante sobre el contenido — nunca una franja de ancho completo
 * con fondo/filete. Solo cambia el color del texto (blanco en DARK_ROUTES,
 * azul en el resto) para mantener contraste sin necesitar una caja detrás.
 * Pivote 2026-09-01: antes el texto volvía a azul a mitad de scroll del
 * hero de vídeo; ahora todo el contenido de Home/Labs/Tech es oscuro, así
 * que el texto se queda blanco durante toda la página — ya no hace falta
 * el listener de scroll.
 *
 * **2026-09-02, petición directa del cliente:** fuera el wordmark
 * "Laboratorios Virens" de arriba-izquierda y fuera el selector ES/EN de
 * junto al trigger — la cabecera queda solo con "Menú". El selector de
 * idioma se traslada dentro del panel (`MenuOverlay`, franja superior). Sin
 * logo que enlace a "/", "Inicio" se añadió como primera entrada de
 * `mainNav` para no perder la vuelta a Home.
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
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-end px-5 py-4 md:px-6 lg:px-10 lg:py-5 2xl:px-16">
        {/* Trigger desktop. Oculto en mobile: ahí el trigger es el botón flotante.
            Cápsula con blur solo fuera del hero (rutas claras): sin ella el texto
            se pierde contra secciones de color al hacer scroll; sobre fondo
            oscuro (DARK_ROUTES) no hace falta, el propio fondo da contraste. */}
        <button
          ref={desktopTriggerRef}
          type="button"
          onClick={() => openMenu('desktop')}
          aria-expanded={open}
          aria-controls="menu-overlay"
          className={cn(
            'hidden items-center gap-3 rounded-full px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 lg:flex',
            light ? 'text-white' : 'bg-white/85 text-blue backdrop-blur-md',
          )}
        >
          Menú
          <span className="flex flex-col gap-[5px]" aria-hidden>
            <span className={cn('block h-px w-6 transition-colors duration-300', light ? 'bg-white' : 'bg-blue')} />
            <span className={cn('block h-px w-6 transition-colors duration-300', light ? 'bg-white' : 'bg-blue')} />
          </span>
        </button>
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
