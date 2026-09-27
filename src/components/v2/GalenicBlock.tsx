import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { GalenicIcon } from './GalenicIcon';
import { SectionTitle } from './SectionTitle';
import { v2Galenic } from '@/content/v2-home';

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
export function GalenicBlock() {
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

      {/* Franja de formatos a todo el ancho */}
      <Reveal className="v2-gal border-t border-white/25">
        <ul className="v2-gal-list flex snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-5 md:overflow-visible lg:grid-cols-10">
          {v2Galenic.items.map((f, i) => (
            <li
              key={f.id}
              className="v2-gal-item flex w-[var(--gal-cell-sm)] shrink-0 snap-start flex-col items-center border-r border-white/25 px-3 pb-12 pt-8 text-center md:w-auto md:[&:nth-child(5n)]:border-r-0 md:[&:nth-child(-n+5)]:border-b lg:[&:nth-child(-n+5)]:border-b-0 lg:[&:nth-child(5n)]:border-r lg:last:border-r-0"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="self-start text-[length:var(--text-note)] font-semibold tracking-label text-white/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <GalenicIcon name={f.icon} className="v2-gal-glyph mt-6 size-[var(--gal-icon)]" />
              <span className="v2-gal-label mt-6 text-[length:var(--text-small)] font-medium leading-snug">{f.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
