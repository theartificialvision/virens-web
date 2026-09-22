import { Reveal } from '@/components/ui/Reveal';
import { v2Capacity } from '@/content/v2-home';

/**
 * Capacidad productiva (§ maqueta, bloque 04): titular y párrafo a la
 * izquierda, la fila de siluetas de envase a la derecha, alineadas por su base
 * y a escala real entre sí — el frasco de jarabe es más alto que el vial
 * porque lo es, no porque quepa mejor.
 *
 * Las siluetas son los vectores del propio cliente (`Objetosweb.ai`,
 * 22/09/2026), extraídos uno a uno a `/img/v2/objetos/*.svg`.
 */
export function CapacityBlock() {
  return (
    <section id="capacidad-productiva" className="bg-white text-blue">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-[var(--v2-section)] md:px-8 lg:px-12 2xl:px-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <span aria-hidden className="block h-[3px] w-14 bg-labs" />
            <h2 className="mt-6 text-[length:var(--text-h2)] font-medium leading-tight tracking-[-0.015em]">
              {v2Capacity.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-narrow)] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
              {v2Capacity.lead}
            </p>
          </div>

          {/* Scroll horizontal solo en pantallas estrechas: la fila mantiene la
              escala relativa entre envases en lugar de reflowear a rejilla. */}
          <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0 lg:col-span-8">
            <ul className="flex min-w-[40rem] items-end justify-between gap-6 lg:min-w-0">
              {v2Capacity.items.map((item, i) => (
                <li key={item.id} className="flex flex-1 flex-col items-center">
                  <Reveal delay={i * 0.05} className="flex w-full flex-col items-center">
                    <span className="flex h-[var(--v2-vessel-h)] items-end">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/img/v2/objetos/${item.file}.svg`}
                        alt=""
                        aria-hidden
                        className="max-h-full w-auto text-blue"
                      />
                    </span>
                    <span aria-hidden className="mt-4 block h-6 w-px bg-blue/35" />
                    <span className="mt-3 block text-center text-[length:var(--text-note)] leading-tight">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-center text-[length:var(--text-note)] font-semibold leading-tight text-labs">
                      {item.range}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
