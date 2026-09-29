import { Reveal } from '@/components/ui/Reveal';
import { homeContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { SectionTitle } from './SectionTitle';
import { CapacityFormats } from './CapacityFormats';

/**
 * Formatos (antes «Capacidad productiva», renombrada el 29/09/2026): los
 * siete formatos que crecen por tamaños. La escala de planta es ahora su
 * propia sección, `ProductionScale`, encima de Formas galénicas.
 */
export function CapacityBlock({ locale }: { locale: Locale }) {
  const { v2Capacity } = homeContent(locale);
  return (
    <section id="capacidad-productiva" className="text-blue">
      <div className="bg-white">
        <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-14 px-5 py-[var(--v2-section)] md:px-8 cap:flex-row cap:items-center cap:gap-16 lg:px-12 2xl:px-20">
          <div className="cap:w-[var(--cap-text-w)] cap:shrink-0">
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
    </section>
  );
}
