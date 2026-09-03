'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { Division } from '@/lib/types';
import { divisionColor, divisionGlow } from '@/lib/utils';

/**
 * Botón glass del hero (CLAUDE.md regla 4): fondo translúcido + blur + borde
 * + pulso en dos capas en el color de su división (`.glass-pulse`,
 * globals.css). Rótulo: solo el nombre de la división en mayúsculas, sin
 * flecha — petición del cliente 2026-09-02.
 *
 * Sigue siendo un enlace de verdad a /virens-labs y /virens-tech: el destino
 * no cambia. Lo que cambia (2026-09-04) es el primer toque en táctil, donde
 * no hay hover que pueda abrir el área: ahí el primer toque despliega la
 * información y solo el segundo navega. Con ratón o teclado el enlace
 * funciona al primer clic/Intro, como siempre.
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
  const accent = divisionColor[id];

  // Al tocar, el navegador sintetiza `mouseenter` ANTES del `click`: mirar
  // `active` dentro del click daría siempre "ya estaba abierta" y el primer
  // toque navegaría. Se anota el estado en `pointerdown`, que sí ocurre antes
  // de esa cadena sintética, y el click decide con ese apunte.
  const abiertaAlPulsar = useRef(false);

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
        // `detail === 0` es activación por teclado (Intro): ahí no hay dos
        // toques que valgan, el enlace navega directamente.
        if (!coarse || e.detail === 0 || abiertaAlPulsar.current) return;
        e.preventDefault();
        onActivate();
      }}
      // `touch-manipulation`: sin él, dos toques seguidos en el mismo sitio son
      // un doble toque de zoom para el navegador y el segundo clic se pierde —
      // justo el gesto en el que se apoya la versión táctil.
      className="glass-pulse inline-flex touch-manipulation items-center justify-center rounded-full border px-9 py-[length:var(--btn-py)] text-[length:var(--text-small)] font-semibold uppercase leading-none tracking-[0.18em] text-white backdrop-blur-md transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-quart)] hover:-translate-y-px focus-visible:-translate-y-px"
      style={
        {
          background: `color-mix(in srgb, ${accent} ${active ? 52 : 30}%, rgba(255,255,255,0.08))`,
          borderColor: active ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)',
          '--pulse-glow': divisionGlow[id],
        } as React.CSSProperties
      }
    >
      {cta}
    </Link>
  );
}
