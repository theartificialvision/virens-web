'use client';

import { cphiPopup as c } from '@/content/cphi';

/**
 * Cápsula del evento (29/09/2026, cliente: «al cerrar, que baje tipo cápsula
 * abajo a la izquierda, minimalista, con el evento y la fecha, y que se pueda
 * volver a abrir; finísimo, Apple total»). Vidrio claro con filete de medio
 * píxel, punto teal que late mientras no empieza la feria («en directo»
 * durante) y la fecha en gris. Al pasar el cursor asoma el stand.
 */
export function CphiDock({ live, onOpen }: { live: boolean; onOpen: () => void }) {
  return (
    <button type="button" className="cphi-dock" onClick={onOpen} aria-label={c.dock.aria} aria-haspopup="dialog">
      <span aria-hidden className="cphi-dock__dot" data-live={live || undefined} />
      <span className="cphi-dock__name">{c.dock.name}</span>
      <span aria-hidden className="cphi-dock__sep" />
      <span className="cphi-dock__date">{live ? c.dock.live : c.dock.date}</span>
      <span aria-hidden className="cphi-dock__more">
        <span>{c.stand}</span>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 3.5 10.5 8 6 12.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </button>
  );
}
