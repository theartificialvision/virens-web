'use client';

import Image from 'next/image';
import type { Division, DivisionHalfData } from '@/lib/types';
import { divisionColor, divisionGlow, cn } from '@/lib/utils';

/**
 * Una de las dos mitades a sangre del hero: fotografía teñida con el color
 * de marca y, arriba, el isotipo de la división.
 *
 * Recibe la división ACTIVA (no "si yo estoy activa"): al pasar por Labs,
 * también la mitad Tech se tiñe de teal, y viceversa — petición del cliente
 * 2026-09-02. La expansión a ancho completo de la mitad activa (2026-09-03,
 * confirmada de nuevo el 2026-09-04) viaja como `--half-basis`.
 *
 * **2026-09-04:** ya no lleva rótulo ni claim propios. «Contract
 * Manufacturing» / «Contract Development» pasan al bloque central, encima de
 * los botones, donde ahora también cuelga la información de la división:
 * repetirlos aquí duplicaba literalmente el mismo texto en pantalla.
 */
export function DivisionHalf({
  id,
  image,
  molecule,
  name,
  side,
  activeDivision,
}: DivisionHalfData & { side: 'left' | 'right'; activeDivision: Division | null }) {
  const accent = divisionColor[id];
  const active = activeDivision !== null;
  const own = activeDivision === id;
  const collapsed = active && !own;
  // Color que inunda ESTA mitad al activar: el de la división activa, no el
  // propio. En reposo no hay inundación, así que cae al suyo.
  const flood = activeDivision ? divisionColor[activeDivision] : accent;
  // El tinte nace en la costura y crece hacia fuera: el origen del círculo
  // está en el lado contrario al que da al exterior de la pantalla.
  const origin = side === 'left' ? '100% 50%' : '0% 50%';

  return (
    <div
      className={cn(
        'group/half relative flex min-h-[46svh] flex-1 flex-col items-center overflow-hidden p-8 text-center',
        'transition-[flex-basis,padding] duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-0',
        // El padding no colapsa con `flex-basis: 0`: sin esto, la mitad
        // replegada deja un resto de 96px y la otra nunca llega a ancho
        // completo. Se apaga a la vez y con la misma curva.
        collapsed ? 'lg:p-0' : 'lg:p-12 2xl:p-16',
      )}
      style={{ ['--half-basis' as string]: !activeDivision ? '50%' : own ? '100%' : '0%' }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={cn(
          'object-cover grayscale contrast-110 transition-[filter] duration-[1100ms] ease-[var(--ease-out-quart)]',
          active ? 'saturate-[1.3] brightness-100' : 'brightness-[0.92]',
        )}
      />
      {/* Reposo: cada mitad ya lleva su color de marca (petición explícita
          del cliente 2026-09-02 — "no quiero que empiece en B/N"). La foto
          va en escala de grises (arriba) para que este `mix-blend-mode:
          color` la tiña por completo con el acento. */}
      <span aria-hidden className="absolute inset-0" style={{ background: accent, mixBlendMode: 'color', opacity: 0.55 }} />
      <span
        aria-hidden
        className="absolute inset-0 transition-[clip-path] duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          background: flood,
          mixBlendMode: 'color',
          opacity: 0.95,
          clipPath: `circle(${active ? '150%' : '0%'} at ${origin})`,
        }}
      />
      {/* Velo de contraste: el bloque de texto central llega ahora hasta
          abajo (párrafo + servicios), así que el oscurecido deja de ser un
          degradado de pie de foto y pasa a cubrir la mitad entera. Al activar
          sube de 0,30 a 0,52 — es lo que hace legible un párrafo de cuatro
          líneas sobre una nave iluminada, y de paso el hero "baja la luz"
          cuando pasa a modo lectura. La foto sigue viéndose: es un velo
          plano, no un degradado decorativo. */}
      <span
        aria-hidden
        className="absolute inset-0 bg-black transition-opacity duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ opacity: active ? 0.52 : 0.3 }}
      />

      {/* Isotipo original del cliente (PNG estático con alfa, proporción 1:1).
          2026-09-04: se retira el sprite de 30 fotogramas — el balanceo leía
          a novedad y no aportaba la sensación inmersiva buscada. Vuelve el
          archivo original, sin recorte ni recoloreado; solo un halo de marca
          detrás, que es fondo, no logo. Arriba y fuera del flujo para no
          empujar el bloque central. */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-6 flex justify-center lg:top-10 2xl:top-12">
        <span className="relative block size-16 lg:size-28 2xl:size-32">
          <span
            className="absolute inset-0 scale-150 rounded-full blur-2xl transition-opacity duration-700"
            style={{ background: divisionGlow[id], opacity: active ? 0.7 : 0.35 }}
          />
          <Image
            src={molecule}
            alt=""
            width={512}
            height={512}
            sizes="(max-width: 1024px) 64px, (max-width: 1536px) 112px, 128px"
            className="relative size-full object-contain"
          />
        </span>
      </span>

      {/* El nombre de la división sigue en el DOM para el lector de pantalla
          (identifica de qué mitad es esta fotografía) sin volver a pintarse
          sobre la imagen. */}
      <span className="sr-only">{name}</span>
    </div>
  );
}
