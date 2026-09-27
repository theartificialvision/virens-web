import { Reveal } from '@/components/ui/Reveal';
import { CapacityMeter, CapacityStat } from '@/components/sections/CapacityMeter';
import { v2Capacity } from '@/content/v2-home';
import { SectionTitle } from './SectionTitle';

/**
 * Escala productiva de Labs, integrada en la home: tres magnitudes generales
 * y las capacidades por formato. Las cifras y los glifos se cargan al entrar
 * en pantalla mediante los medidores accesibles de la antigua página Labs.
 */
export function CapacityBlock() {
  return (
    <section id="capacidad-productiva" className="bg-white text-blue">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-[var(--v2-section)] md:px-8 lg:px-12 2xl:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionTitle accent>{v2Capacity.title}</SectionTitle>
            <Reveal delay={0.06}>
              <p className="mt-6 max-w-[var(--measure-narrow)] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
                {v2Capacity.lead}
              </p>
            </Reveal>
          </div>

          <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-3 lg:col-span-8">
            {v2Capacity.stats.map((stat, index) => (
              <CapacityStat key={stat.label} stat={stat} index={index} />
            ))}
          </dl>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:mt-20 lg:grid-cols-5 lg:gap-y-16">
          {v2Capacity.items.map((item, index) => (
            <li key={item.id}>
              <CapacityMeter item={item} index={index} />
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-12 lg:items-start">
          <p className="text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow text-gray-500">
            Acondicionamiento
          </p>
          <ul className="flex flex-wrap gap-x-10 gap-y-2 text-[length:var(--text-small)] text-gray-700 lg:col-span-8">
            {v2Capacity.operations.map((operation) => (
              <li key={operation}>{operation}</li>
            ))}
          </ul>
          <p className="text-[length:var(--text-note)] leading-relaxed text-gray-500 lg:col-span-3">{v2Capacity.note}</p>
        </div>
      </div>
    </section>
  );
}
