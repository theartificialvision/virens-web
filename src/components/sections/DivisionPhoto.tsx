'use client';

import Image from 'next/image';
import type { Division, DivisionHalfData } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Fotografía de una división en el hero. **Sustituye a `DivisionHalf`
 * (pivote 2026-09-05).**
 *
 * Lo que había antes era una mitad a sangre con la foto en `grayscale
 * contrast-110` y **dos capas de `mix-blend-mode: color`** encima —teal a la
 * izquierda, magenta a la derecha—. Cian y rojo son justo el par de las gafas
 * anaglíficas, y el `contrast-110` amplificaba el reborde de los contornos
 * que el blend teñía después: de ahí el fringing de color y la sensación de
 * imagen 3D antigua. Se retira entero. La foto va ahora a color real, sin
 * filtro, sin velo y sin blend.
 *
 * La imagen pasa de fondo a objeto: panel contenido con radio y sombra del
 * sistema, apoyado sobre blanco. Conserva el reparto `--half-basis`, así que
 * al activar una división su panel se lleva el ancho y el otro se repliega.
 */
export function DivisionPhoto({
  id,
  image,
  name,
  activeDivision,
}: Pick<DivisionHalfData, 'id' | 'image' | 'name'> & { activeDivision: Division | null }) {
  const own = activeDivision === id;
  const collapsed = activeDivision !== null && !own;

  return (
    <div
      className={cn(
        'group/half relative min-w-0 flex-1 overflow-hidden',
        'rounded-[var(--radius-xl)] shadow-[var(--shadow-2)]',
        'transition-[flex-basis,opacity] duration-[620ms] ease-[var(--ease-hero)]',
        collapsed && 'opacity-0',
      )}
      style={{ ['--half-basis' as string]: !activeDivision ? '50%' : own ? '100%' : '0%' }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
      {/* Filete interior de 1 px: sobre blanco, una foto clara sin borde se
          come su propia esquina redondeada. No es decoración, es el canto. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] ring-1 ring-inset ring-blue/10"
      />
      <span className="sr-only">{name}</span>
    </div>
  );
}
