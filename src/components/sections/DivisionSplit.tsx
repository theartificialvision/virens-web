import Image from 'next/image';
import Link from 'next/link';
import type { Division } from '@/lib/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { KineticHeading } from '@/components/ui/KineticHeading';
import { Magnetic } from '@/components/ui/Magnetic';
import { divisionColor } from '@/lib/utils';

interface DivisionHalf {
  id: Division;
  href: string;
  name: string;
  claim: string;
  body: string;
  image: { src: string; alt: string };
  molecule: string;
}

/**
 * Hero inmersivo Labs/Tech (HOME · bloque 01, sustituye al vídeo). Mitad y
 * mitad a sangre: cada lado con el tono de su marca (duotono vía
 * mix-blend-mode sobre la foto, nunca un degradado decorativo) y la
 * molécula de su isotipo. Al pasar ratón o foco por una mitad, esa mitad
 * gana espacio y la otra cede — en 3 segundos se lee que Virens son dos
 * divisiones. Efecto solo en desktop (`.division-split`, ver globals.css);
 * en mobile las mitades se apilan a igual altura. El titular compartido
 * (`title`/`subtitle`) es el H1 de la página, centrado sobre la costura.
 */
export function DivisionSplit({
  halves,
  eyebrow,
  title,
  subtitle,
}: {
  halves: readonly [DivisionHalf, DivisionHalf];
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="division-split relative flex flex-col lg:h-[100svh] lg:min-h-[640px] lg:flex-row">
      {/* Mobile: banda normal, apilada antes que las mitades (cada una ya
          lleva su propio nombre/claim, no compite por el mismo espacio).
          Desktop (lg): se saca del flujo y se centra sobre la costura. */}
      <div className="division-split-heading relative z-10 flex flex-col items-center bg-ink px-6 py-10 text-center text-white transition-opacity duration-500 ease-[var(--ease-out-quart)] lg:pointer-events-none lg:absolute lg:inset-0 lg:justify-center lg:bg-transparent lg:py-0">
        {/* En mobile el logo del header queda justo encima y repetiria
            literalmente este rotulo: solo se muestra en desktop, donde el
            titular esta centrado y lejos del logo. */}
        <Eyebrow className="hidden text-white/80 lg:block">{eyebrow}</Eyebrow>
        <KineticHeading
          as="h1"
          text={title}
          className="mt-4 max-w-[20ch] text-[length:var(--text-display)] font-bold leading-[0.98] tracking-[-0.02em]"
        />
        <p className="mt-4 text-[length:var(--text-lead)] text-white/85">{subtitle}</p>
      </div>

      {halves.map((half) => (
        <DivisionHalf key={half.id} {...half} />
      ))}
    </div>
  );
}

function DivisionHalf({ id, href, name, claim, body, image, molecule }: DivisionHalf) {
  const accent = divisionColor[id];
  return (
    <Link
      href={href}
      data-half={id}
      className="group relative flex min-h-[46svh] flex-1 flex-col items-center overflow-hidden p-8 text-center lg:min-h-0 lg:p-12 2xl:p-16"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover grayscale contrast-110 transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.04]"
      />
      <span aria-hidden className="absolute inset-0" style={{ background: accent, mixBlendMode: 'color', opacity: 0.92 }} />
      <span aria-hidden className="absolute inset-0 bg-black/15" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-black/60" />

      <span aria-hidden className="relative h-12 w-12 lg:h-16 lg:w-16">
        <img
          src={molecule}
          alt=""
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 group-hover:opacity-0"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <img
          src={molecule}
          alt=""
          className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </span>

      <span className="relative mt-auto flex max-w-[26rem] flex-col items-center">
        <Eyebrow className="text-white/80">{name}</Eyebrow>
        <h2 className="mt-4 text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
          {claim}
        </h2>
        <p className="mt-4 max-w-[34ch] text-white/85">{body}</p>
        <Magnetic className="mt-8 inline-block">
          <span
            className="inline-flex items-center gap-2 rounded-full px-8 py-[length:var(--btn-py)] text-[length:var(--text-small)] font-semibold tracking-[0.04em] text-white transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:-translate-y-px"
            style={{ background: accent }}
          >
            Ver división
            <span aria-hidden>&rarr;</span>
          </span>
        </Magnetic>
      </span>
    </Link>
  );
}
