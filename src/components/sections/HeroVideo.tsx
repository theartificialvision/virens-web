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

      <Container className="relative pb-20 lg:pb-28">
        <div className="max-w-[58ch] lg:w-7/12">
          <Eyebrow className="text-white/80">{eyebrow}</Eyebrow>
          <KineticHeading
            as="h1"
            text={title}
            className="mt-6 text-[length:var(--text-display)] font-bold leading-[0.98] tracking-[-0.02em] text-white"
          />
          <p className="mt-5 text-[length:var(--text-lead)] font-normal text-white">{subtitle}</p>
          {lead && <p className="mt-5 max-w-[var(--measure-max)] text-white/80">{lead}</p>}
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
