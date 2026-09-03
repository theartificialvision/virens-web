'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MenuOverlay } from './MenuOverlay';

/**
 * Cabecera: sin barra de fondo, sin logotipo de texto. Solo el trigger del
 * menú, flotante sobre el contenido.
 *
 * **Pivote 2026-09-05.** Antes el color del texto dependía de la ruta
 * (blanco en las rutas oscuras, azul en el resto) y la cápsula aparecía solo
 * a veces. Con toda la web en blanco esa bifurcación sobra, y además fallaba
 * al pasar por las franjas de color que quedan. Ahora el trigger es siempre
 * el mismo control flotante —cápsula blanca translúcida con desenfoque,
 * filete y sombra corta—, legible sobre blanco, sobre fotografía y sobre las
 * secciones azules. Un solo estado, sin lógica de ruta.
 *
 * El trigger vive arriba-derecha en desktop (el panel despliega hacia abajo
 * desde ahí). En mobile se sustituye por un botón flotante fijo abajo-
 * derecha: el panel despliega hacia arriba desde ese punto.
 */
export function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<'desktop' | 'mobile'>('desktop');

  // Cierra el menú al cambiar de ruta (navegación por teclado o enlace directo).
  useEffect(() => setOpen(false), [pathname]);

  function openMenu(from: 'desktop' | 'mobile') {
    lastTrigger.current = from;
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
    // Trampa de foco: el foco vuelve al botón que abrió el menú.
    (lastTrigger.current === 'desktop' ? desktopTriggerRef : mobileTriggerRef).current?.focus();
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-end px-5 py-4 md:px-6 lg:px-10 lg:py-5 2xl:px-16">
        {/* Trigger desktop. Oculto en mobile: ahí el trigger es el botón flotante. */}
        <button
          ref={desktopTriggerRef}
          type="button"
          onClick={() => openMenu('desktop')}
          aria-expanded={open}
          aria-controls="menu-overlay"
          className="hidden items-center gap-3 rounded-[var(--radius-pill)] border border-hairline bg-canvas/80 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-blue shadow-[var(--shadow-1)] backdrop-blur-md transition-shadow duration-200 hover:shadow-[var(--shadow-2)] lg:flex"
        >
          Menú
          <span className="flex flex-col gap-[5px]" aria-hidden>
            <span className="block h-px w-6 bg-blue" />
            <span className="block h-px w-6 bg-blue" />
          </span>
        </button>
      </div>

      {/* Trigger mobile: flotante, fijo abajo-derecha, por encima del panel
          (z-65) para poder cerrar tocando el mismo botón. */}
      <button
        ref={mobileTriggerRef}
        type="button"
        onClick={() => (open ? closeMenu() : openMenu('mobile'))}
        aria-expanded={open}
        aria-controls="menu-overlay"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        className="fixed bottom-5 right-5 z-[65] flex size-14 items-center justify-center rounded-[var(--radius-pill)] bg-blue text-white shadow-[var(--shadow-3)] lg:hidden"
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
        className={`block h-px w-5 bg-white transition-transform duration-200 ${open ? 'translate-y-[3px] rotate-45' : ''}`}
      />
      <span
        className={`block h-px w-5 bg-white transition-transform duration-200 ${open ? '-translate-y-[3px] -rotate-45' : ''}`}
      />
    </span>
  );
}
