'use client';

import type { Division, DivisionInfoData } from '@/lib/types';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Información de la división activa, desplegada bajo los botones del hero
 * (2026-09-04): la web original la publicaba en la portada de cada división
 * y la home de acceso la había perdido entera.
 *
 * Presentación deliberadamente desnuda —párrafo a medida de lectura, rótulo
 * y rejilla de servicios— sin tarjeta, filete ni viñeta por servicio
 * (CLAUDE.md regla 7). Lo que separa el párrafo de los servicios es el peso,
 * el color y el aire, no una caja.
 *
 * Tres columnas en desktop: los tres servicios de Labs caen en una fila
 * limpia y los seis de Tech en dos, así que el desplegable más alto sigue
 * cabiendo en el hero sin recortar nada. Como las dos variantes se apilan en
 * la misma celda de rejilla (ver `.hero-stack`), la altura reservada es
 * siempre la de Tech: pasar de LABS a TECH no mueve un píxel de la
 * composición.
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
      <p className="mx-auto max-w-[52ch] text-[length:var(--text-body)] font-normal leading-[1.65] text-white/90">
        {info.lead}
      </p>

      <Eyebrow className="mt-7 text-white/60">{info.servicesLabel}</Eyebrow>

      {/* Dos columnas de 328 px: el rótulo más largo ("Project management de
          formulaciones") mide 305 px, así que ninguno parte en dos líneas. A
          tres columnas entrarían igual, pero la rejilla se iría a 1.000 px y
          se despegaría de la medida del párrafo; así el bloque entero se lee
          como una sola columna de texto. */}
      <ul className="mx-auto mt-4 grid max-w-[44rem] gap-x-12 gap-y-3 text-center sm:grid-cols-2 sm:text-left">
        {info.services.map((service) => (
          <li
            key={service}
            className="text-[length:var(--text-small)] font-semibold leading-[1.45] tracking-[-0.005em] text-white"
          >
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}
