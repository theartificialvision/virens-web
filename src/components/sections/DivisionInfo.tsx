'use client';

import type { Division, DivisionInfoData } from '@/lib/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { divisionInk } from '@/lib/utils';

/**
 * Información de la división activa, desplegada bajo los botones del hero:
 * la web original la publicaba en la portada de cada división y la home de
 * acceso la había perdido entera.
 *
 * Presentación desnuda —párrafo a medida de lectura, rótulo y rejilla de
 * servicios— sin tarjeta, filete ni viñeta por servicio. Lo que separa el
 * párrafo de los servicios es el peso, el color y el aire.
 *
 * Pivote 2026-09-05 (claro): el párrafo va en `muted` (8,9:1 sobre blanco) y
 * los servicios en el acento oscurecido de su división, que es el único
 * color de la pieza — intenso, no rebajado, y con contraste suficiente para
 * texto de 15 px.
 *
 * Dos columnas en desktop. Como las dos variantes se apilan en la misma
 * celda de rejilla (`.hero-stack`), la altura reservada es siempre la de
 * Tech: pasar de LABS a TECH no mueve un píxel de la composición.
 */
export function DivisionInfo({
  id,
  info,
  active,
  onHover,
}: {
  id: Division;
  info: DivisionInfoData;
  active: boolean;
  onHover: () => void;
}) {
  return (
    <div
      className="hero-face"
      data-active={active}
      role="region"
      aria-labelledby={`hero-claim-${id}`}
      // Mantiene el área abierta mientras se lee: el puntero puede salir del
      // botón y entrar aquí sin que el texto desaparezca. La variante
      // inactiva está en `visibility: hidden`, así que no intercepta nada.
      onMouseEnter={onHover}
    >
      <p className="mx-auto max-w-[52ch] text-[length:var(--text-body)] font-normal leading-[1.65] text-muted">
        {info.lead}
      </p>

      <Eyebrow className="mt-7 text-subtle">{info.servicesLabel}</Eyebrow>

      {/* Dos columnas de 328 px: el rótulo más largo ("Project management de
          formulaciones") mide 305 px, así que ninguno parte en dos líneas. */}
      <ul className="mx-auto mt-4 grid max-w-[44rem] gap-x-12 gap-y-3 text-center sm:grid-cols-2 sm:text-left">
        {info.services.map((service) => (
          <li
            key={service}
            className="text-[length:var(--text-small)] font-semibold leading-[1.45] tracking-[-0.005em]"
            style={{ color: divisionInk[id] }}
          >
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}
