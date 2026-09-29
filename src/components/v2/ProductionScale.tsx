import { Reveal } from '@/components/ui/Reveal';
import { CapacityStat } from '@/components/sections/CapacityMeter';
import { homeContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/**
 * Capacidad productiva: magnitudes de la planta (+2.000 m², formatos, niveles
 * de acondicionamiento). Hasta el 29/09/2026 era el pie de Formas galénicas
 * («Escala industrial propia»); el cliente la renombró y la subió como
 * sección propia encima de ese bloque, sin la nota de cifras pendientes.
 * Fondo gris claro: entre el laboratorio (blanco) y la cabecera teal de
 * Formas galénicas (regla 5).
 */
export function ProductionScale({ locale }: { locale: Locale }) {
  const { v2Capacity: content } = homeContent(locale);
  return (
    <section id="escala" aria-label={content.scaleTitle} className="bg-gray-100 text-blue">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-[var(--v2-section)] md:px-8 lg:px-12 2xl:px-20">
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
      </div>
    </section>
  );
}
