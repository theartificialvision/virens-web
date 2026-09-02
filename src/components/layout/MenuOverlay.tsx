'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { mainNav } from '@/config/navigation';
import { site } from '@/config/site';
import { cn, EASE_OUT_QUART } from '@/lib/utils';

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
  ).filter((el) => el.offsetParent !== null);
}

/**
 * Menú principal: panel flotante, nunca a pantalla completa — franja
 * anclada al trigger que la abrió, estilo desplegable de macOS/apple.com
 * (blur + radio + elevación sutil, §2 punto 4 de CLAUDE.md).
 * Desktop (>=lg): ancla arriba-derecha (bajo el botón "Menú" del header),
 * cae hacia abajo. Mobile: ancla abajo-derecha (junto al FAB), crece hacia
 * arriba — mismo componente, solo cambia el anclaje y el signo del offset
 * de entrada, que depende del breakpoint vía JS porque Framer Motion anima
 * valores explícitos, no puede leer un breakpoint de CSS.
 *
 * Accesible: trampa de foco real, cierre con Esc y con clic fuera del
 * panel, bloqueo de scroll del body, foco devuelto al trigger (lo
 * gestiona `Header`, que pasa `onClose`).
 */
export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

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

    // Un clic fuera del panel cierra el menú, como cualquier desplegable
    // nativo (ya no cubre toda la pantalla en ningún breakpoint).
    const onPointerDown = (e: PointerEvent) => {
      if (e.target instanceof Node && !panel.contains(e.target)) onClose();
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
          className={cn(
            'fixed z-[60] flex flex-col overflow-hidden rounded-[length:var(--radius-panel)]',
            'border border-white/10 bg-blue/95 text-white outline-none backdrop-blur-xl',
            // Mobile: ancla abajo-derecha, junto al FAB, franja con márgenes.
            'inset-x-4 bottom-24 max-h-[65vh]',
            // Desktop: ancla arriba-derecha, bajo el header.
            'lg:inset-x-auto lg:bottom-auto lg:right-6 lg:top-[4.5rem] lg:max-h-[calc(100vh-6rem)] lg:w-[min(26rem,calc(100vw-3rem))]',
          )}
          style={{ boxShadow: 'var(--shadow-panel)' }}
          initial={{ opacity: 0, y: isDesktop ? -8 : 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: isDesktop ? -8 : 16, scale: 0.97 }}
          transition={{ duration: 0.22, ease: EASE_OUT_QUART }}
        >
          <div className="flex h-11 shrink-0 items-center justify-end px-5 lg:px-7">
            <button type="button" onClick={onClose} className="text-[13px] font-semibold uppercase tracking-[0.18em]">
              Cerrar &times;
            </button>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto px-5 lg:px-7">
            <ul>
              {mainNav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.03, duration: 0.25 }}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-4 py-3.5 text-[1.375rem] font-medium leading-tight"
                  >
                    {item.division && (
                      <span
                        aria-hidden
                        className="block h-5 w-[3px] shrink-0"
                        style={{ background: item.division === 'labs' ? 'var(--color-labs)' : 'var(--color-tech)' }}
                      />
                    )}
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-white/10 px-5 py-4 text-[12px] leading-relaxed text-white/70 lg:px-7">
            <p>
              {site.contact.street} · {site.contact.city}
            </p>
            <p>
              <a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a> ·{' '}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
