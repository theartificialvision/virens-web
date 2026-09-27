import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { GalenicRail } from './GalenicRail';
import { SectionTitle } from './SectionTitle';
import { homeContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/**
 * Formas galénicas (§ maqueta, bloque 03), en dos pisos desde el 27/09/2026:
 *
 * - Arriba, mitad teal con titular y párrafo y mitad fotografía, virada al
 *   color de la división (escala de grises + capa #00A099 en `multiply`).
 * - Debajo, a todo el ancho (cliente: «ponlo en total wide así sumas
 *   tamaño»), la franja de los diez formatos con filetes compartidos: una
 *   fila en escritorio, dos en tablet y un carril deslizable en móvil.
 *
 * Movimiento (cliente: que sea interesante de ver sin competir con Capacidad
 * productiva, donde los envases crecen por tamaños): cada glifo se dibuja de
 * abajo arriba al entrar la franja y, con cursor, el formato señalado se
 * adelanta —zoom— mientras los demás retroceden. CSS: `.v2-gal` en globals.
 */
export function GalenicBlock({ locale }: { locale: Locale }) {
  const { v2Galenic } = homeContent(locale);
  return (
    <section id="formas-galenicas" className="bg-labs text-white">
      <div className="relative">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-5 md:px-8 lg:px-12 2xl:px-20">
          <div className="pb-[var(--gal-top-pb)] pt-[var(--v2-section)] lg:w-1/2 lg:pr-16">
            <SectionTitle>{v2Galenic.title}</SectionTitle>
            <Reveal>
              <p className="mt-6 max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85]">
                {v2Galenic.lead}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="relative min-h-[16rem] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-1/2">
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
      </div>

      {/* Franja de formatos a todo el ancho; carril deslizable bajo lg. */}
      <Reveal className="v2-gal border-t border-white/25">
        <GalenicRail items={v2Galenic.items} label={v2Galenic.title} hint={v2Galenic.swipeHint} />
      </Reveal>
    </section>
  );
}
