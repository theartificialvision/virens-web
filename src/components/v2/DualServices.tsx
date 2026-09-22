import { Reveal } from '@/components/ui/Reveal';
import { CircleIcon } from './GalenicIcon';
import { v2Services } from '@/content/v2-home';

/**
 * Dos columnas separadas por un filete vertical (§ maqueta, bloque 02).
 * Sin tarjetas: el filete y el aire son toda la estructura.
 */
export function DualServices() {
  return (
    <section className="bg-white text-blue">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-[var(--v2-section)] md:px-8 lg:px-12 2xl:px-20">
        <div className="grid gap-14 md:grid-cols-2 md:gap-0">
          {v2Services.map((s, i) => (
            <Reveal
              key={s.id}
              delay={i * 0.08}
              className={i === 0 ? 'md:pr-12 lg:pr-20' : 'md:border-l md:border-gray-200 md:pl-12 lg:pl-20'}
            >
              <div className="flex flex-col gap-7 sm:flex-row sm:gap-9">
                <CircleIcon name={s.icon} variant="solid" />
                <div className="max-w-[var(--measure-narrow)]">
                  <h2 className="text-[length:var(--text-h3)] font-medium leading-tight tracking-[-0.01em]">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-[length:var(--text-small)] leading-[1.85] text-gray-700">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
