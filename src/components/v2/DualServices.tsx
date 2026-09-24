import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';
import { v2Services } from '@/content/v2-home';
import { SectionTitle } from './SectionTitle';

/**
 * Private Label / Full service según la maqueta del cliente (24/09/2026):
 * dos fotografías enteras en 16:9 (sin recorte, 24/09/2026), separadas por
 * una calle estrecha y, debajo, un panel gris
 * continuo con los dos textos y un filete vertical entre ellos. Bajo cada
 * título, un filete corto en el color de su servicio. Sustituye a la versión
 * con icono en círculo.
 *
 * Cada servicio es una columna (foto + texto) para que en móvil se apile en
 * orden —foto arriba, texto debajo— y no como dos fotos seguidas de dos textos.
 * La calle entre fotos es relleno interior de cada columna, no `gap`, para que
 * el panel gris de abajo no se corte.
 */
export function DualServices() {
  return (
    <section className="bg-white text-blue">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-[var(--v2-section)] md:px-8 lg:px-12 2xl:px-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-0">
          {v2Services.map((s, i) => (
            <article key={s.id} className="flex flex-col">
              <Reveal delay={i * 0.08} className={cn(i === 0 ? 'md:pr-4' : 'md:pl-4')}>
                <div className="relative aspect-video overflow-hidden">
                  <div className="v2-media absolute inset-0">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>

              <div className="relative flex-1 bg-gray-50 px-6 py-12 sm:px-10 lg:py-16 xl:px-[17%]">
                {/* Filete vertical entre los dos textos: solo a la altura del texto, como en la maqueta. */}
                {i === 1 ? (
                  <span aria-hidden className="absolute inset-y-12 left-0 hidden w-px bg-gray-200 md:block lg:inset-y-16" />
                ) : null}
                <div>
                  <SectionTitle>{s.title}</SectionTitle>
                  <Reveal delay={0.1}>
                    <span
                      aria-hidden
                      className={cn('v2-accent mt-6 block h-[3px] w-14', s.accent === 'tech' ? 'bg-tech' : 'bg-blue')}
                    />
                    <p className="mt-8 max-w-[var(--measure-narrow)] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
                      {s.body}
                    </p>
                  </Reveal>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
