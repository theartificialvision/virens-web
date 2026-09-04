'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { DARK_ROUTES } from '@/config/navigation';
import { MenuOverlay, type MenuOrigin } from './MenuOverlay';

/**
 * Cabecera: sin barra de fondo, sin logotipo de texto. Solo el trigger del
 * menú, flotante sobre el contenido — nunca una franja de ancho completo
 * con fondo/filete. Solo cambia el color del trazo (blanco en DARK_ROUTES,
 * azul en el resto) para mantener contraste sin necesitar una caja detrás.
 *
 * **2026-09-02, petición directa del cliente:** fuera el wordmark
 * "Laboratorios Virens" de arriba-izquierda y fuera el selector ES/EN de
 * junto al trigger. El selector de idioma vive dentro del panel
 * (`MenuOverlay`, franja superior). Sin logo que enlace a "/", "Inicio" se
 * añadió como primera entrada de `mainNav` para no perder la vuelta a Home.
 *
 * **2026-09-04, petición del cliente ("el menú está espantoso"):** fuera
 * también la palabra "Menú" — el trigger queda como un botón circular de
 * vidrio con el glifo solo, y el glifo se rehace (ver `MenuGlyph`). El panel
 * pasa a ser una franja vertical de altura completa (`MenuOverlay`), que
 * nace del propio trigger: por eso se mide su centro al abrir y se le pasa
 * como origen del recorte.
 *
 * El trigger vive arriba-derecha en desktop. En mobile se sustituye por un
 * botón flotante fijo abajo-derecha, al alcance del pulgar.
 */
export function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  // Centro del trigger que abrió el menú, en px desde el borde derecho y
  // superior de la ventana: es el punto del que "brota" la franja.
  const [origin, setOrigin] = useState<MenuOrigin>({ right: 64, top: 44 });
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<'desktop' | 'mobile'>('desktop');

  // Cierra el menú al cambiar de ruta (navegación por teclado o enlace directo).
  useEffect(() => setOpen(false), [pathname]);

  const light = DARK_ROUTES.includes(pathname as (typeof DARK_ROUTES)[number]) && !open;

  function openMenu(from: 'desktop' | 'mobile') {
    lastTrigger.current = from;
    const el = (from === 'desktop' ? desktopTriggerRef : mobileTriggerRef).current;
    if (el) {
      const r = el.getBoundingClientRect();
      setOrigin({ right: window.innerWidth - (r.left + r.width / 2), top: r.top + r.height / 2 });
    }
    setOpen(true);
  }

  const closeMenu = useCallback(() => {
    setOpen(false);
    // Trampa de foco (§2 punto 8): el foco vuelve al botón que abrió el menú.
    (lastTrigger.current === 'desktop' ? desktopTriggerRef : mobileTriggerRef).current?.focus();
  }, []);

  function toggle(from: 'desktop' | 'mobile') {
    if (open) closeMenu();
    else openMenu(from);
  }

  return (
    <>
      {/* Contenedor sin fondo y sin caja: `pointer-events-none` para que la
          franja superior no intercepte clics del hero (los isotipos 3D llegan
          hasta arriba); solo el botón recupera el puntero. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex items-center justify-end px-5 py-4 md:px-6 lg:px-10 lg:py-5 2xl:px-16">
        <button
          ref={desktopTriggerRef}
          type="button"
          data-menu-trigger
          onClick={() => toggle('desktop')}
          aria-expanded={open}
          aria-controls="menu-overlay"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className={cn(triggerClass(open, light), 'pointer-events-auto hidden size-[var(--menu-trigger)] lg:flex')}
        >
          <MenuGlyph open={open} />
        </button>
      </div>

      {/* Trigger mobile: flotante, fijo abajo-derecha, por encima de la franja
          para poder cerrarla tocando el mismo botón. */}
      <button
        ref={mobileTriggerRef}
        type="button"
        data-menu-trigger
        onClick={() => toggle('mobile')}
        aria-expanded={open}
        aria-controls="menu-overlay"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        className={cn(
          triggerClass(open, true),
          'fixed bottom-5 right-5 z-[70] flex size-[var(--menu-fab)] lg:hidden',
          // Cerrado va sobre contenido cualquiera (foto, vídeo, fondo claro):
          // el azul de marca le da contraste propio; abierto se funde con la
          // franja y basta el vidrio.
          !open && 'border-white/20 bg-blue/85 text-white',
        )}
      >
        <MenuGlyph open={open} />
      </button>

      <MenuOverlay open={open} onClose={closeMenu} origin={origin} />
    </>
  );
}

/**
 * Botón circular de vidrio (excepción 4 de CLAUDE.md: elemento flotante de
 * navegación). Abierto vive sobre la franja azul, así que siempre en claro.
 */
function triggerClass(open: boolean, light: boolean) {
  return cn(
    'group items-center justify-center rounded-full border backdrop-blur-xl',
    'transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-quart)]',
    open
      ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
      : light
        ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
        : 'border-blue/15 bg-blue/[0.06] text-blue hover:bg-blue/10',
  );
}

/**
 * Glifo del menú. Tres trazos de anchos distintos —el sistema es de filetes
 * finos, no de iconos gordos— alineados a la derecha: en reposo dibujan una
 * escalera, al pasar el ratón se igualan y al abrir los dos extremos giran
 * sobre el centro y el del medio se retira. Se anima `transform` y `width`,
 * nunca `top`, para que el giro salga del propio centro del glifo.
 */
function MenuGlyph({ open }: { open: boolean }) {
  const bar = cn(
    'absolute right-0 block h-[1.5px] bg-current',
    'transition-[width,transform,opacity] duration-[420ms] ease-[var(--ease-out-quart)]',
  );

  return (
    <span className="relative block h-[13px] w-[22px]" aria-hidden>
      <span className={cn(bar, 'top-0', open ? 'w-full translate-y-[6px] rotate-45' : 'w-full')} />
      <span
        className={cn(
          bar,
          'top-[6px]',
          open ? 'w-full scale-x-0 opacity-0' : 'w-4/5 group-hover:w-full group-focus-visible:w-full',
        )}
      />
      <span className={cn(bar, 'top-[12px]', open ? 'w-full -translate-y-[6px] -rotate-45' : 'w-3/5 group-hover:w-full group-focus-visible:w-full')} />
    </span>
  );
}
