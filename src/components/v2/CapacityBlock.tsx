import { Reveal } from '@/components/ui/Reveal';
import { CapacityMeter, CapacityStat } from '@/components/sections/CapacityMeter';
import { homeContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { SectionTitle } from './SectionTitle';
import { CapacityFormats } from './CapacityFormats';

/**
 * Capacidad productiva integrada en dos tiempos: primero los siete formatos
 * que crecen por tamaños; después, la escala industrial de Labs con sus tres
 * magnitudes generales y las capacidades numéricas por formato.
 */
export function CapacityBlock({ locale }: { locale: Locale }) {
  const { v2Capacity } = homeContent(locale);
  return (
    <section id="capacidad-productiva" className="text-blue">
      <div className="bg-white">
        <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-14 px-5 py-[var(--v2-section)] md:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-12 2xl:px-20">
          <div className="lg:w-[var(--cap-text-w)] lg:shrink-0">
            <SectionTitle accent>{v2Capacity.title}</SectionTitle>
            <Reveal delay={0.06}>
              <p className="mt-6 max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
                {v2Capacity.lead}
              </p>
              {/* 27/09/2026 (cliente): fuera la indicación «pasa el cursor / toca
                  un formato para ver su tamaño». */}
            </Reveal>
          </div>

          <Reveal delay={0.12} className="min-w-0 flex-1">
            <CapacityFormats locale={locale} />
          </Reveal>
        </div>
      </div>

      <div id="escala-industrial" className="scroll-mt-24 border-t border-gray-200 bg-gray-50">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-[var(--v2-section)] md:px-8 lg:px-12 2xl:px-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionTitle accent>{v2Capacity.scaleTitle}</SectionTitle>
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
      </div>
    </section>
  );
}
