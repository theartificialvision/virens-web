'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MenuOverlay } from '@/components/layout/MenuOverlay';
import { Logo } from './Logo';
import { v2Menu } from '@/content/v2-home';

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
      <header className="v2-fade sticky top-0 z-[70] border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-[var(--v2-header)] w-full max-w-[var(--container-max)] items-center justify-between px-5 md:px-8 lg:px-12 2xl:px-20">
          <Logo />

          <button
            ref={triggerRef}
            type="button"
            data-menu-trigger
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="menu-overlay"
            aria-label={open ? v2Menu.closeAria : v2Menu.openAria}
            className="group -mr-3 flex h-11 items-center gap-4 rounded-full px-3 text-blue transition-colors duration-[var(--motion-control)] hover:text-labs focus-visible:text-labs"
          >
            <MenuLabel open={open} />
            <MenuGlyph open={open} />
          </button>
        </div>
      </header>

      <MenuOverlay open={open} onClose={close} />
    </>
  );
}

/**
 * Rótulo del botón (23/09/2026): «Menú» / «Cerrar» apilados en la misma celda
 * de rejilla —la caja mide lo que la palabra más larga, así el icono no salta—
 * y al conmutar uno sale por arriba mientras el otro entra desde abajo.
 * Oculto en móvil: ahí el icono solo se entiende de sobra.
 */
function MenuLabel({ open }: { open: boolean }) {
  const word = cn(
    '[grid-area:1/1] block transition-transform duration-[520ms] ease-[var(--motion-ease)]',
  );
  return (
    <span
      aria-hidden
      className="hidden overflow-hidden text-[length:var(--text-note)] font-semibold uppercase leading-[1.5] tracking-[0.2em] sm:grid sm:justify-items-end"
    >
      <span className={cn(word, open ? '-translate-y-full' : 'translate-y-0')}>{v2Menu.open}</span>
      <span className={cn(word, open ? 'translate-y-0' : 'translate-y-full')}>{v2Menu.close}</span>
    </span>
  );
}

/**
 * Glifo de menú molecular (23/09/2026), sacado del isotipo 3D: en vez de dos
 * rayas, dos enlaces con un nodo esférico en cada extremo — el mismo lenguaje
 * de bolas y barras del logo, con el degradado azul → teal de sus nodos y un
 * brillo arriba a la izquierda que les da volumen (`.v2-node`, globals.css).
 *
 * Mismo comportamiento que el glifo anterior: los enlaces son de distinta
 * longitud y alineados a la derecha; al pasar el ratón se estiran/encogen como
 * la molécula al abrirse y cerrarse, y los nodos crecen un punto; al abrir, los
 * dos enlaces se igualan y se cruzan en una X con los cuatro nodos en las
 * puntas. Los nodos van dentro de cada enlace, así que lo siguen solos.
 */
function MenuGlyph({ open }: { open: boolean }) {
  const nodes = (
    <>
      <span className="v2-node" data-end="start" />
      <span className="v2-node" data-end="end" />
    </>
  );
  return (
    <span className="v2-menu" data-open={open} aria-hidden>
      <span className="v2-bond" data-bond="top">{nodes}</span>
      <span className="v2-bond" data-bond="bottom">{nodes}</span>
    </span>
  );
}
