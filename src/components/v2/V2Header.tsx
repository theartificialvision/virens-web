'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MenuOverlay } from '@/components/layout/MenuOverlay';
import { Logo } from './Logo';

/**
 * Cabecera de la home V2: barra blanca sólida, logo a la izquierda y trigger
 * de menú a la derecha. A diferencia de V1 —donde el trigger flota sobre el
 * hero— aquí la barra es opaca desde el primer píxel: la maqueta apoya el
 * logo sobre blanco, no sobre la foto.
 *
 * El panel del menú es el mismo de V1 (`MenuOverlay`): la franja vertical de
 * vidrio azul no depende del sistema claro/oscuro de la página que hay debajo.
 */
export function V2Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-[70] border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-[var(--v2-header)] w-full max-w-[var(--container-max)] items-center justify-between px-5 md:px-8 lg:px-12 2xl:px-20">
          <Logo />

          <button
            ref={triggerRef}
            type="button"
            data-menu-trigger
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="menu-overlay"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="group -mr-2 flex size-11 items-center justify-center text-blue transition-colors duration-200 hover:text-labs"
          >
            <MenuGlyph open={open} />
          </button>
        </div>
      </header>

      <MenuOverlay open={open} onClose={close} />
    </>
  );
}

/** Tres trazos iguales, como en la maqueta; al abrir se cruzan. */
function MenuGlyph({ open }: { open: boolean }) {
  const bar = cn(
    'absolute left-0 block h-[2px] w-full bg-current',
    'transition-[transform,opacity] duration-[420ms] ease-[var(--ease-out-quart)]',
  );
  return (
    <span className="relative block h-[14px] w-[26px]" aria-hidden>
      <span className={cn(bar, 'top-0', open && 'translate-y-[6px] rotate-45')} />
      <span className={cn(bar, 'top-[6px]', open && 'scale-x-0 opacity-0')} />
      <span className={cn(bar, 'top-[12px]', open && '-translate-y-[6px] -rotate-45')} />
    </span>
  );
}
