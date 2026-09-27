import { Reveal } from '@/components/ui/Reveal';
import { v2Capacity } from '@/content/v2-home';
import { SectionTitle } from './SectionTitle';
import { CapacityFormats } from './CapacityFormats';

/**
 * Capacidad productiva (home). Desde el 27/09/2026, el diseño del cliente
 * «Capacidad_Productiva.html»: texto a la izquierda (filete teal, titular,
 * párrafo e indicación) y, a la derecha, los siete formatos en silueta de
 * trazo, que crecen por sus tamaños al pasar el cursor (`CapacityFormats`).
 * Sustituye al escaparate 3D del 24/09. En columna única (móvil) el texto va
 * arriba y los formatos debajo.
 */
export function CapacityBlock() {
  return (
    <section id="capacidad-productiva" className="bg-white text-blue">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-14 px-5 py-[var(--v2-section)] md:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-12 2xl:px-20">
        <div className="lg:w-[var(--cap-text-w)] lg:shrink-0">
          <SectionTitle accent>{v2Capacity.title}</SectionTitle>
          <Reveal delay={0.06}>
            <p className="mt-6 max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
              {v2Capacity.lead}
            </p>
            <p className="mt-8 flex items-center gap-2.5 text-[length:var(--text-micro)] font-semibold uppercase tracking-label text-gray-500">
              <span aria-hidden className="h-px w-4 bg-current" />
              <span className="cap-hint-pointer">{v2Capacity.hint.pointer}</span>
              <span className="cap-hint-touch">{v2Capacity.hint.touch}</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="min-w-0 flex-1">
          <CapacityFormats />
        </Reveal>
      </div>
    </section>
  );
}
