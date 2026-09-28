import { Reveal } from '@/components/ui/Reveal';
import { CapacityStat } from '@/components/sections/CapacityMeter';

interface ScaleContent {
  scaleTitle: string;
  stats: readonly { value: string; unit?: string; label: string }[];
  operationsTitle: string;
  operations: readonly string[];
  note: string;
}

/**
 * Pie de Formas galénicas (28/09/2026, al unir «Escala industrial propia»):
 * bajo la capacidad de cada forma, las magnitudes de la planta como fila de
 * totales y, debajo, el acondicionamiento y la nota de que unidad y periodo
 * están pendientes (regla 3: la cifra no se presenta como cerrada).
 *
 * Comparte la rejilla de 12 columnas en las dos filas, así cifras y
 * operaciones arrancan en la misma vertical. En móvil, la primera magnitud
 * ocupa la fila y las otras dos van a pares en columnas de ancho propio
 * (`auto`): «Acondicionamiento» no cabe en media columna fija.
 */
export function GalenicScale({ content }: { content: ScaleContent }) {
  return (
    <div className="border-t border-white/25">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 pb-[var(--v2-section)] pt-[var(--v2-section-tight)] md:px-8 lg:px-12 2xl:px-20">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <p className="pt-2 text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow text-white/70 lg:col-span-3">
            {content.scaleTitle}
          </p>
          <dl className="grid grid-cols-[repeat(2,auto)] justify-between gap-x-8 gap-y-9 sm:grid-cols-[repeat(3,auto)] lg:col-span-9 [&_dd]:whitespace-nowrap">
            {content.stats.map((stat, index) => (
              <CapacityStat
                key={stat.label}
                stat={stat}
                index={index}
                className="first:col-span-2 sm:first:col-span-1"
                labelClassName="text-white/70"
              />
            ))}
          </dl>
        </Reveal>

        <div className="mt-12 grid gap-5 border-t border-white/25 pt-8 lg:mt-16 lg:grid-cols-12 lg:items-baseline lg:gap-8">
          <p className="text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow text-white/70 lg:col-span-3">
            {content.operationsTitle}
          </p>
          <ul className="flex flex-wrap gap-x-10 gap-y-2 text-[length:var(--text-small)] font-medium lg:col-span-6">
            {content.operations.map((operation) => (
              <li key={operation}>{operation}</li>
            ))}
          </ul>
          <p className="text-[length:var(--text-note)] leading-relaxed text-white/70 lg:col-span-3">{content.note}</p>
        </div>
      </div>
    </div>
  );
}
