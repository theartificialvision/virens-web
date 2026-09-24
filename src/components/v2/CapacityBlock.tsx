import type { CSSProperties } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { v2Capacity } from '@/content/v2-home';
import { SectionTitle } from './SectionTitle';

/**
 * Capacidad productiva (§ maqueta, bloque 04): titular y párrafo a la
 * izquierda, la fila de siluetas de envase a la derecha, alineadas por su base
 * y a escala real entre sí — el frasco de jarabe es más alto que el vial
 * porque lo es, no porque quepa mejor.
 *
 * Las siluetas son los vectores del propio cliente (`Objetosweb.ai`,
 * 22/09/2026), extraídos uno a uno a `/img/v2/objetos/*.svg`. Van en azul
 * corporativo desde el 24/09/2026: el trazo está fijado en el propio SVG
 * porque dentro de un <img> `currentColor` no hereda y salían en negro.
 *
 * Entrada (`.v2-cap`, globals.css): cada envase se llena de abajo arriba en
 * cascada, luego baja el filete y aparecen nombre y rango.
 */
export function CapacityBlock() {
  return (
    <section id="capacidad-productiva" className="bg-white text-blue">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-[var(--v2-section)] md:px-8 lg:px-12 2xl:px-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionTitle accent>{v2Capacity.title}</SectionTitle>
            <Reveal delay={0.06}>
              <p className="mt-6 max-w-[var(--measure-narrow)] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
                {v2Capacity.lead}
              </p>
            </Reveal>
          </div>

          {/* Scroll horizontal solo en pantallas estrechas: la fila mantiene la
              escala relativa entre envases en lugar de reflowear a rejilla. */}
          <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0 lg:col-span-8">
            <Reveal className="v2-cap">
              <ul className="flex min-w-[40rem] items-end justify-between gap-6 lg:min-w-0">
                {v2Capacity.items.map((item, i) => (
                  <li
                    key={item.id}
                    className="flex flex-1 flex-col items-center"
                    style={{ '--i': i } as CSSProperties}
                  >
                    <span className="v2-cap-vessel flex h-[var(--v2-vessel-h)] items-end">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/img/v2/objetos/${item.file}.svg`} alt="" aria-hidden className="max-h-full w-auto" />
                    </span>
                    <span aria-hidden className="v2-cap-stem mt-4 block h-6 w-px bg-blue/35" />
                    <span className="v2-cap-text flex flex-col items-center">
                      <span className="mt-3 block text-center text-[length:var(--text-note)] leading-tight">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-center text-[length:var(--text-note)] font-semibold leading-tight text-labs">
                        {item.range}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
