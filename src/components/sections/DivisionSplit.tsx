import Image from 'next/image';
import Link from 'next/link';
import type { Division } from '@/lib/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
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
 * Split inmersivo Labs/Tech (HOME · Bloque 03, sustituye la rejilla de
 * tarjetas). Mitad y mitad a sangre: cada lado con el tono de su marca
 * (duotono vía mix-blend-mode sobre la foto, nunca un degradado
 * decorativo) y la molécula de su isotipo. Al pasar ratón o foco por una
 * mitad, esa mitad gana espacio y la otra cede — en 3 segundos se lee que
 * Virens son dos divisiones. Efecto solo en desktop (`.division-split`,
 * ver globals.css); en mobile las mitades se apilan a igual altura.
 */
export function DivisionSplit({ halves }: { halves: readonly [DivisionHalf, DivisionHalf] }) {
  return (
    <div className="division-split relative flex flex-col lg:h-[85vh] lg:min-h-[640px] lg:flex-row">
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
      className="group relative flex min-h-[480px] flex-1 flex-col justify-between overflow-hidden p-8 lg:min-h-0 lg:p-12 2xl:p-16"
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
          className="absolute inset-0 h-full w-full object-contain object-left-top transition-opacity duration-500 group-hover:opacity-0"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <img
          src={molecule}
          alt=""
          className="absolute inset-0 h-full w-full object-contain object-left-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </span>

      <span className="relative max-w-[30rem]">
        <Eyebrow className="text-white/80">{name}</Eyebrow>
        <h3 className="mt-4 text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
          {claim}
        </h3>
        <p className="mt-4 max-w-[38ch] text-white/85">{body}</p>
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
