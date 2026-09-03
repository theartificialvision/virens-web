'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { Division } from '@/lib/types';
import { divisionInk } from '@/lib/utils';

/**
 * Botón de división. **Pivote 2026-09-05:** deja de ser una cápsula «glass»
 * translúcida con pulso y pasa a ser un botón sólido.
 *
 * El brief pedía presencia sin depender de brillos: relleno pleno del color
 * de marca, texto blanco (5,3:1 en Labs, 9,4:1 en Tech) y ni una sombra de
 * color. Los estados se leen sin ambigüedad y sin animación llamativa — los
 * tres rellenos viajan como variables CSS (`--btn-bg*`) y los aplica
 * `.btn-division` en globals.css, porque un color calculado en runtime no
 * puede pasar por una utilidad `hover:` de Tailwind:
 *
 * - **Reposo** — color de marca pleno, sombra corta.
 * - **Hover** — 12 % más oscuro, sube 1 px, sombra media.
 * - **Pulsado** — 22 % más oscuro, vuelve a su sitio y baja a sombra corta:
 *   el botón «se hunde», que es la lectura física correcta.
 * - **Foco** — anillo azul del sistema con offset, visible entero alrededor
 *   de la píldora.
 * - **Activo** (su área desplegada) — anillo exterior del propio color, no un
 *   cambio de relleno: así no compite con el hover.
 *
 * Sigue siendo un enlace real a /virens-labs y /virens-tech. En táctil el
 * primer toque despliega y el segundo navega.
 */
export function DivisionButton({
  id,
  href,
  cta,
  active,
  coarse,
  onActivate,
}: {
  id: Division;
  href: string;
  cta: string;
  active: boolean;
  coarse: boolean;
  onActivate: () => void;
}) {
  // Al tocar, el navegador sintetiza `mouseenter` ANTES del `click`: mirar
  // `active` dentro del click daría siempre "ya estaba abierta" y el primer
  // toque navegaría. Se anota el estado en `pointerdown`, que sí ocurre antes
  // de esa cadena sintética.
  const abiertaAlPulsar = useRef(false);
  // Variante oscurecida del acento: sobre el teal plano el texto blanco se
  // queda en 3,24:1 y no llega a AA. El granate ya pasaba, pero se usa la
  // misma fuente para los dos y así el par se lee con el mismo peso.
  const accent = divisionInk[id];

  return (
    <Link
      href={href}
      data-active={active}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onPointerDown={() => {
        abiertaAlPulsar.current = active;
      }}
      onClick={(e) => {
        // `detail === 0` es activación por teclado (Intro): ahí el enlace
        // navega directamente, sin dos toques que valgan.
        if (!coarse || e.detail === 0 || abiertaAlPulsar.current) return;
        e.preventDefault();
        onActivate();
      }}
      className="btn-division touch-manipulation"
      style={
        {
          '--btn-bg': accent,
          '--btn-bg-hover': `color-mix(in srgb, ${accent} 88%, #000)`,
          '--btn-bg-active': `color-mix(in srgb, ${accent} 78%, #000)`,
          '--btn-ring': `color-mix(in srgb, ${accent} 32%, transparent)`,
        } as React.CSSProperties
      }
    >
      {cta}
    </Link>
  );
}
