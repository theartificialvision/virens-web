'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { mainNav } from '@/config/navigation';
import { site } from '@/config/site';
import { cn, EASE_OUT_QUART } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/** Centro del trigger, en px desde el borde derecho y superior de la ventana. */
export interface MenuOrigin {
  right: number;
  top: number;
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
  ).filter((el) => el.offsetParent !== null);
}

/**
 * Menú principal: **franja vertical de altura completa pegada al borde
 * derecho** (2026-09-04, petición del cliente). Sustituye al desplegable
 * anclado al trigger — aquella cajita no aguantaba el peso de la marca.
 *
 * «Morphing glass»: la franja no entra deslizándose, se *revela* — un
 * recorte circular que nace en el centro exacto del trigger (`origin`, que
 * mide `Header` al abrir) y crece hasta cubrirla. Como la superficie es
 * vidrio (azul profundo translúcido + `backdrop-blur`), lo que se ve es el
 * botón dilatándose hasta convertirse en la franja, no un panel que aparece
 * encima. El recorte se ancla al borde derecho de la propia franja, así que
 * vale igual en desktop (trigger arriba-derecha) que en mobile (trigger
 * flotante abajo-derecha), sin ramas por breakpoint.
 *
 * Accesible: trampa de foco real, cierre con Esc y con clic fuera, bloqueo
 * de scroll del body, foco devuelto al trigger (lo gestiona `Header`). El
 * aspa de cerrar es el propio trigger, que se queda por encima de la franja.
 * `prefers-reduced-motion` (regla 8): sin recorte ni escalonado, un fundido.
 */
export function MenuOverlay({
  open,
  onClose,
  origin,
}: {
  open: boolean;
  onClose: () => void;
  origin: MenuOrigin;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = getFocusable(panel);
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Un clic fuera cierra, como cualquier desplegable nativo. El trigger
    // queda excluido: si no, cerraría aquí y su propio onClick volvería a
    // abrir en el mismo gesto — el aspa no llegaba a cerrar nunca.
    const onPointerDown = (e: PointerEvent) => {
      if (!(e.target instanceof Node)) return;
      if (panel.contains(e.target)) return;
      if (e.target instanceof Element && e.target.closest('[data-menu-trigger]')) return;
      onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    document.body.style.overflow = 'hidden';

    const raf = requestAnimationFrame(() => {
      (getFocusable(panel)[0] ?? panel).focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Mismo formato en los dos extremos (solo cambia el radio) para que la
  // interpolación de Framer Motion recorra números equivalentes.
  const clip = (radius: string) => `circle(${radius} at right ${origin.right}px top ${origin.top}px)`;
  const closed = clip('0%');
  const opened = clip('160%');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-overlay"
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          className="fixed inset-y-0 right-0 z-[60] flex flex-col overflow-hidden text-white outline-none backdrop-blur-2xl backdrop-saturate-150"
          style={{
            width: 'var(--menu-rail)',
            background: 'var(--menu-surface)',
            borderLeft: '1px solid var(--menu-edge)',
            boxShadow: 'var(--shadow-panel)',
          }}
          initial={reduced ? { opacity: 0 } : { clipPath: closed }}
          animate={reduced ? { opacity: 1 } : { clipPath: opened }}
          exit={reduced ? { opacity: 0 } : { clipPath: closed }}
          transition={{ duration: reduced ? 0.15 : 0.62, ease: EASE_OUT_QUART }}
        >
          {/* Filete de marca en el canto: teal arriba, magenta abajo — las dos
              divisiones cruzándose, mismo recurso que `DivisionSwitch` (matiz
              2026-09-01 sobre degradados: señal de marca, no adorno). */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-px opacity-60"
            style={{
              background:
                'linear-gradient(to bottom, var(--color-labs-glow), transparent 42%, transparent 58%, var(--color-tech-glow))',
            }}
          />

          {/* El aspa de cerrar es el trigger, que flota encima: esta franja
              solo le reserva el hueco (pr) para no pasarle por debajo. */}
          <div className="flex shrink-0 items-center px-8 pb-6 pr-24 pt-6 lg:pt-[1.625rem]">
            <LocaleSwitch />
          </div>

          <nav className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto px-8 py-4">
            <ul>
              {mainNav.map((item, i) => {
                const active = pathname === item.href;
                const accent =
                  item.division === 'labs'
                    ? 'var(--color-labs-glow)'
                    : item.division === 'tech'
                      ? 'var(--color-tech-glow)'
                      : undefined;

                return (
                  <motion.li
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduced ? 0 : 0.16 + i * 0.05, duration: 0.5, ease: EASE_OUT_QUART }}
                    className="border-b border-white/[0.07] last:border-b-0"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? 'page' : undefined}
                      className="group/item flex items-center gap-5 py-4"
                    >
                      {/* Filete-guía: crece al pasar el ratón y ya viene crecido
                          en la página actual. Sustituye al taco de color que
                          llevaban solo Labs y Tech — ahora las seis entradas
                          comparten sistema y el color sigue distinguiendo a las
                          dos divisiones. */}
                      <span
                        aria-hidden
                        className={cn(
                          'block h-px shrink-0 transition-[width,opacity] duration-500 ease-[var(--ease-out-quart)]',
                          active
                            ? 'w-10 opacity-100'
                            : 'w-4 opacity-45 group-hover/item:w-10 group-hover/item:opacity-100',
                        )}
                        style={{ background: accent ?? 'currentColor' }}
                      />
                      <span
                        className={cn(
                          'text-[length:var(--text-h3)] font-medium leading-tight tracking-[-0.015em]',
                          'transition-[transform,color] duration-500 ease-[var(--ease-out-quart)] group-hover/item:translate-x-1',
                          active ? 'text-white' : 'text-white/80 group-hover/item:text-white',
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Holgura inferior extra en mobile: ahí el trigger flota justo
              encima de esta esquina. */}
          <div className="shrink-0 border-t border-white/10 px-8 pb-24 pt-6 text-[length:var(--text-note)] leading-relaxed text-mist lg:pb-8">
            <p>
              {site.contact.street} · {site.contact.city}
            </p>
            <p className="mt-1">
              <a href={`tel:${site.contact.phone}`} className="transition-colors hover:text-white">
                {site.contact.phoneDisplay}
              </a>{' '}
              ·{' '}
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">
                {site.contact.email}
              </a>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Trasladado aquí desde `Header` el 2026-09-02 (petición del cliente: fuera
 * de la cabecera fija, junto al trigger). Vive siempre sobre la franja azul
 * del menú, por eso ya no necesita la variante clara/oscura del header.
 */
function LocaleSwitch() {
  return (
    <div className="flex items-center gap-3 text-[length:var(--text-note)] font-semibold tracking-[0.18em] text-white">
      <span aria-current="true">ES</span>
      <span className="opacity-30">·</span>
      <Link href="/en" className="opacity-60 transition-opacity hover:opacity-100">
        EN
      </Link>
    </div>
  );
}
