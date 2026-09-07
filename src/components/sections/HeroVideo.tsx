'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { KineticHeading } from '@/components/ui/KineticHeading';
import { MolecularField } from '@/components/ui/MolecularField';
import { LogoSpin } from '@/components/ui/LogoSpin';
import type { LogoKey } from '@/lib/types';

interface HeroVideoProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  lead?: string;
  video: { webm?: string; mp4?: string; poster: string };
  children?: React.ReactNode; // CTA opcional (p. ej. el enlace a la otra división)
  /** Campo molecular ambiental detrás del texto (pivote 2026-09-01). */
  moleculeVariant?: 'labs' | 'tech' | 'neutral';
  /** Isotipo 3D de la división (07/09 (15)). Va en vidrio BLANCO, sin la rampa
   *  de marca: aquí ya no hace falta identificar cuál es —lo dice el titular y
   *  la URL—, así que el color sobraría y competiría con la fotografía. */
  mark?: { logoKey: LogoKey; molecule: string };
}

/**
 * Hero a sangre con vídeo (§06 bloque 01).
 * - Velo #00285C al 20 % + degradado inferior para legibilidad.
 * - El poster es la imagen LCP: el vídeo nunca bloquea la carga.
 * - Bajo `prefers-reduced-motion` o en pantallas pequeñas se muestra solo el poster.
 */
export function HeroVideo({ eyebrow, title, subtitle, lead, video, children, moleculeVariant, mark }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  const hasVideo = Boolean(video.webm || video.mp4);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 767px)').matches;
    setPlay(!reduce && !small && hasVideo);
  }, [hasVideo]);

  useEffect(() => {
    if (play) ref.current?.play().catch(() => undefined);
  }, [play]);

  return (
    <section className="relative flex h-[100svh] min-h-[600px] items-end overflow-hidden bg-blue">
      {play ? (
        <video
          ref={ref}
          className="absolute inset-0 size-full object-cover"
          poster={video.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={video.poster} alt="" className="absolute inset-0 size-full object-cover" />
      )}

      {/* Velo de legibilidad (§9.3) */}
      <div aria-hidden className="absolute inset-0 bg-[rgba(0,40,92,0.20)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-black/45" />

      {moleculeVariant && <MolecularField variant={moleculeVariant} className="opacity-30" />}

      {/* El isotipo ocupa el hueco de la derecha, que el texto deja libre en
          desktop. Oculto por debajo de lg: ahí la columna es completa y el
          isotipo se le echaría encima. */}
      {mark && (
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-5/12 items-center justify-center lg:flex">
          <LogoSpin
            logo={mark.logoKey}
            poster={mark.molecule}
            spin={14}
            assemble={20}
            hold={3.5}
            className="w-[min(26vw,20rem)] aspect-square opacity-90"
            sizes="(max-width: 1024px) 0px, 320px"
          />
        </div>
      )}

      <Container className="relative pb-20 lg:pb-28">
        <div className="max-w-[58ch] lg:w-7/12">
          {/* Sobre imagen, `mist`/`mist-dim` se apagan demasiado — el token
              está calibrado para superficies planas (ink/surface). Mismo
              criterio ya aplicado al hero de Home: blanco con opacidad alta. */}
          <Eyebrow className="text-white/70">{eyebrow}</Eyebrow>
          {/* 2026-09-04: fuera la serif también aquí. Mismas medidas que el H1
              de Home —Montserrat semibold, interlineado 1,1, tracking
              -0,02em—, solo un escalón mayor de cuerpo: allí el titular está
              obligado a una línea entre las dos moléculas y aquí tiene una
              columna de 7/12 para respirar. */}
          <KineticHeading
            as="h1"
            text={title}
            className="mt-6 text-[length:var(--text-display)] font-semibold leading-[1.1] tracking-[-0.02em] text-white"
          />
          <p className="mt-5 text-[length:var(--text-lead)] font-normal leading-[1.5] text-white">{subtitle}</p>
          {lead && (
            <p className="mt-5 max-w-[var(--measure-max)] text-[length:var(--text-body)] leading-[1.65] text-white/85">
              {lead}
            </p>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </Container>

      <span
        aria-hidden
        className="absolute bottom-8 right-6 hidden h-16 w-px bg-white/40 lg:block"
      />
    </section>
  );
}
