import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { GalenicIcon } from './GalenicIcon';
import { v2Galenic } from '@/content/v2-home';

/**
 * Mitad teal + mitad fotografía (§ maqueta, bloque 03).
 * La foto va virada al color de la división —escala de grises + capa #00A099
 * en `multiply`— para que las dos mitades lean como un solo bloque y no como
 * una imagen pegada al lado de un color.
 */
export function GalenicBlock() {
  return (
    <section id="formas-galenicas" className="bg-labs text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative order-1 flex items-center lg:order-none">
          <div className="mx-auto w-full max-w-[46rem] px-5 py-[var(--v2-section)] md:px-8 lg:pl-12 lg:pr-16 2xl:pl-20">
            <h2 className="text-[length:var(--text-h2)] font-medium leading-tight tracking-[-0.015em]">
              {v2Galenic.title}
            </h2>
            <p className="mt-6 max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85]">
              {v2Galenic.lead}
            </p>

            <ul className="mt-14 grid grid-cols-3 gap-x-4 gap-y-10 sm:grid-cols-5">
              {v2Galenic.items.map((f, i) => (
                <li key={f.id}>
                  <Reveal delay={(i % 5) * 0.05} className="flex flex-col items-center gap-4 text-center">
                    <GalenicIcon name={f.icon} />
                    <span className="text-[length:var(--text-note)] leading-snug">{f.label}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative order-2 min-h-[20rem] overflow-hidden lg:min-h-[34rem]">
          <Image
            src={v2Galenic.image.src}
            alt={v2Galenic.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale brightness-110 contrast-105"
          />
          <span aria-hidden className="absolute inset-0 bg-labs mix-blend-multiply opacity-[0.62]" />
          <span aria-hidden className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-labs to-transparent lg:block" />
        </div>
      </div>
    </section>
  );
}
