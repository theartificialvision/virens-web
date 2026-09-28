import { Reveal } from '@/components/ui/Reveal';
import { CapacityStat } from '@/components/sections/CapacityMeter';

interface ScaleContent {
  scaleTitle: string;
  stats: readonly { value: string; unit?: string; label: string }[];
  note: string;
}

/** Totales de la planta y nota de cifras pendientes de confirmar (regla 3). */
export function GalenicScale({ content }: { content: ScaleContent }) {
  return (
    <div className="border-t border-gray-300">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 pb-[var(--v2-section)] pt-[var(--v2-section-tight)] md:px-8 lg:px-12 2xl:px-20">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <p className="pt-2 text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow text-gray-500 lg:col-span-3">
            {content.scaleTitle}
          </p>
          <dl className="grid grid-cols-[repeat(2,auto)] justify-between gap-x-8 gap-y-9 sm:grid-cols-[repeat(3,auto)] lg:col-span-9 [&_dd]:whitespace-nowrap">
            {content.stats.map((stat, index) => (
              <CapacityStat
                key={stat.label}
                stat={stat}
                index={index}
                className="first:col-span-2 sm:first:col-span-1"
              />
            ))}
          </dl>
        </Reveal>

        <p className="mt-8 text-[length:var(--text-note)] leading-relaxed text-gray-500">{content.note}</p>
      </div>
    </div>
  );
}
