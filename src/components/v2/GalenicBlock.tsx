import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { GalenicRail } from './GalenicRail';
import { GalenicScale } from './GalenicScale';
import type { RailItem } from './GalenicRailItem';
import { SectionTitle } from './SectionTitle';
import { homeContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/**
 * Formas galénicas + escala industrial (§ maqueta, bloque 03). Desde el
 * 28/09/2026 (cliente: «formas galénicas y escala industrial propia se unen,
 * números debajo de cada forma») es un solo bloque en tres pisos; desde la
 * misma tarde solo el primero es teal y los otros dos van en gris:
 *
 * - Arriba, titular y párrafo; a la derecha la fotografía virada al color de
 *   la división (grises + #00A099 en `multiply`).
 * - En medio, a todo el ancho, los nueve formatos con filetes compartidos y,
 *   bajo cada forma, su capacidad contando y su rango. Carril deslizable
 *   por debajo de lg.
 * - Abajo (`GalenicScale`), la escala de la planta como fila de totales, el
 *   acondicionamiento y la nota de cifras pendientes.
 *
 * Movimiento: cada glifo se dibuja de abajo arriba al entrar la franja y,
 * con cursor, el formato señalado se adelanta mientras los demás se apagan.
 */
export function GalenicBlock({ locale }: { locale: Locale }) {
  const { v2Galenic, v2Capacity } = homeContent(locale);
  // La capacidad de cada forma sale de `v2Capacity` por `id`; si una forma
  // no la tiene, se pinta sin cifra (nunca una supuesta).
  const capacity = new Map<string, { units: string; range?: string }>(
    v2Capacity.items.map((c) => [c.id, { units: c.units, range: 'range' in c ? c.range : undefined }]),
  );
  const items: RailItem[] = v2Galenic.items.map((f) => ({ ...f, ...capacity.get(f.id) }));

  return (
    <section id="formas-galenicas">
      <div className="relative bg-labs text-white">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-5 md:px-8 lg:px-12 2xl:px-20">
          <div className="pb-[var(--gal-top-pb)] pt-[var(--v2-section)] lg:w-1/2 lg:pr-16">
            <SectionTitle>{v2Galenic.title}</SectionTitle>
            <Reveal>
              <p className="mt-6 max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85]">
                {v2Galenic.lead}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="relative min-h-[16rem] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-1/2">
          <div className="v2-media absolute inset-0">
            <Image
              src={v2Galenic.image.src}
              alt={v2Galenic.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale brightness-110 contrast-105"
            />
          </div>
          <span aria-hidden className="absolute inset-0 bg-labs mix-blend-multiply opacity-[0.62]" />
          <span aria-hidden className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-labs to-transparent lg:block" />
        </Reveal>
      </div>

      {/* Segunda parte en gris (28/09/2026, cliente: «que no sea tan bloque
          verde grande»): formatos con su capacidad, carril bajo lg, y escala. */}
      <div className="bg-gray-100 text-blue">
        <Reveal className="v2-gal">
          <GalenicRail items={items} label={v2Galenic.title} hint={v2Galenic.swipeHint} />
        </Reveal>
        <GalenicScale content={v2Capacity} />
      </div>
    </section>
  );
}
