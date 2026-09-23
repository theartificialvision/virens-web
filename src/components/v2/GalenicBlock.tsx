import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { GalenicIcon } from './GalenicIcon';
import { SectionTitle } from './SectionTitle';
import { v2Galenic } from '@/content/v2-home';

/**
 * Mitad teal + mitad fotografía (§ maqueta, bloque 03).
 * La foto va virada al color de la división —escala de grises + capa #00A099
 * en `multiply`— para que las dos mitades lean como un solo bloque y no como
 * una imagen pegada al lado de un color.
 *
 * 23/09/2026 — el texto vive dentro del mismo contenedor que el resto de la
 * home y la foto se posiciona a sangre en la mitad derecha. Antes el bloque era
 * una rejilla de dos columnas a sangre y, a partir de 1440 px, su texto
 * arrancaba 128 px más a la izquierda que todas las demás secciones.
 */
export function GalenicBlock() {
  return (
    <section id="formas-galenicas" className="relative bg-labs text-white">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 md:px-8 lg:px-12 2xl:px-20">
        <div className="py-[var(--v2-section)] lg:w-1/2 lg:pr-16">
          <SectionTitle>{v2Galenic.title}</SectionTitle>
          <Reveal>
            <p className="mt-6 max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85]">
              {v2Galenic.lead}
            </p>
          </Reveal>

          <ul className="mt-14 grid grid-cols-3 gap-x-4 gap-y-10 sm:grid-cols-5">
            {v2Galenic.items.map((f, i) => (
              <li key={f.id}>
                <Reveal delay={(i % 5) * 0.03} className="flex flex-col items-center gap-4 text-center">
                  <GalenicIcon name={f.icon} />
                  <span className="text-[length:var(--text-note)] leading-snug">{f.label}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Reveal className="relative min-h-[20rem] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-1/2">
        <div className="v2-media absolute inset-0">
          <Image
            src={v2Galenic.image.src}
            alt={v2Galenic.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale brightness-110 contrast-105"
          />
        </div>
        <span aria-hidden className="absolute inset-0 bg-labs mix-blend-multiply opacity-[0.62]" />
        <span aria-hidden className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-labs to-transparent lg:block" />
      </Reveal>
    </section>
  );
}
