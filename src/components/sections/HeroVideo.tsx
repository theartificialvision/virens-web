'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { KineticHeading } from '@/components/ui/KineticHeading';
import { MolecularField } from '@/components/ui/MolecularField';

interface HeroVideoProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  lead?: string;
  video: { webm?: string; mp4?: string; poster: string };
  children?: React.ReactNode; // CTA opcional (p. ej. el enlace a la otra división)
  /** Campo molecular ambiental detrás del texto (pivote 2026-09-01). */
  moleculeVariant?: 'labs' | 'tech' | 'neutral';
}

/**
 * Hero a sangre con vídeo (§06 bloque 01).
 * - Velo #00285C al 20 % + degradado inferior para legibilidad.
 * - El poster es la imagen LCP: el vídeo nunca bloquea la carga.
 * - Bajo `prefers-reduced-motion` o en pantallas pequeñas se muestra solo el poster.
 */
export function HeroVideo({ eyebrow, title, subtitle, lead, video, children, moleculeVariant }: HeroVideoProps) {
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

  // `text-white` explicito en la seccion: el fondo es azul de marca y hasta el
  // 07/09 el blanco venia heredado del `body`, que era oscuro. Al pasar la web
  // a claro eso dejo de funcionar y el titular se quedo azul sobre azul. Un
  // bloque de fondo oscuro declara su propio color y no depende del de fuera.
  return (
    <section data-header-tone="dark" className="relative flex h-[100svh] min-h-[600px] items-end overflow-hidden bg-blue text-white">
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
      <div aria-hidden className="absolute inset-0 bg-[var(--hero-veil)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-[var(--hero-veil-end)]" />

      {moleculeVariant && <MolecularField variant={moleculeVariant} className="opacity-30" />}


      <Container className="relative pb-20 lg:pb-28">
        <div className="max-w-[58ch] lg:w-7/12 lg:max-w-none">
          {/* Sobre imagen, `mist`/`mist-dim` se apagan demasiado — el token
              está calibrado para superficies planas (ink/surface). Mismo
              criterio ya aplicado al hero de Home: blanco con opacidad alta. */}
          <Eyebrow className="text-white/70">{eyebrow}</Eyebrow>
          {/* 2026-09-04: fuera la serif también aquí. Mismas medidas que el H1
              de Home —Montserrat semibold, interlineado 1,1, tracking
              -0,02em—, solo un escalón mayor de cuerpo: allí el titular está
              obligado a una línea entre las dos moléculas y aquí tiene una
              columna de 7/12 para respirar. */}
          {/* 27/09/2026 (cliente): sin isotipo 3D al lado del titular. */}
          <div className="mt-6 max-w-[58ch]">
            <KineticHeading
              as="h1"
              text={title}
              className="text-[length:var(--text-display)] font-semibold leading-[1.1] tracking-[-0.02em] text-white"
            />
          </div>
          <p className="mt-5 max-w-[58ch] text-[length:var(--text-lead)] font-normal leading-[1.5] text-white">{subtitle}</p>
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
