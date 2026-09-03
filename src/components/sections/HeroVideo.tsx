'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { KineticHeading } from '@/components/ui/KineticHeading';

interface HeroVideoProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  lead?: string;
  video: { webm?: string; mp4?: string; poster: string };
  children?: React.ReactNode; // CTA opcional (p. ej. el enlace a la otra división)
  /** Color de acento de la división, para el rótulo superior. */
  accent?: 'labs' | 'tech';
}

/**
 * Hero de las páginas de división (Labs y Tech).
 *
 * **Pivote 2026-09-05.** Era una imagen a sangre de alto completo con velo
 * azul, degradado inferior y todo el texto en blanco encima: la mayor
 * superficie de color de esas dos páginas y, con el sistema en blanco, un
 * cuerpo extraño. Pasa a la misma gramática que el hero de Home — fondo
 * blanco, texto en azul corporativo, y la fotografía contenida en un panel
 * con radio y sombra del sistema, a color real y sin velo encima.
 *
 * Se retira también el campo molecular ambiental que iba detrás del texto:
 * sobre blanco competía con la lectura y el brief pide no añadir efectos
 * decorativos que compitan con el contenido.
 *
 * El vídeo sigue siendo opcional y nunca bloquea la carga: el póster es la
 * imagen LCP y, bajo `prefers-reduced-motion` o en pantallas pequeñas, se
 * muestra solo el póster.
 */
export function HeroVideo({ eyebrow, title, subtitle, lead, video, children, accent }: HeroVideoProps) {
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
    <section className="bg-canvas pb-16 pt-32 lg:pb-24 lg:pt-40">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow className={accent === 'tech' ? 'text-tech-ink' : 'text-labs-ink'}>{eyebrow}</Eyebrow>
            {/* Mismas medidas que el H1 de Home —Montserrat semibold,
                interlineado 1,1, tracking -0,02em— y un escalón mayor de
                cuerpo: allí el titular va obligado a una línea entre los dos
                isotipos y aquí tiene media rejilla para respirar. */}
            <KineticHeading
              as="h1"
              text={title}
              className="mt-6 text-[length:var(--text-display)] font-semibold leading-[1.1] tracking-[-0.02em] text-blue"
            />
            <p className="mt-5 text-[length:var(--text-lead)] font-normal leading-[1.5] text-blue">{subtitle}</p>
            {lead && (
              <p className="mt-5 max-w-[var(--measure-max)] text-[length:var(--text-body)] leading-[1.65] text-muted">
                {lead}
              </p>
            )}
            {children && <div className="mt-10">{children}</div>}
          </div>

          {/* Fotografía contenida: a color real, sin velo ni degradado. El
              filete interior de 1 px evita que una foto clara se coma su
              propia esquina redondeada sobre blanco. */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-2)] lg:col-span-6 lg:aspect-[5/4]">
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
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] ring-1 ring-inset ring-blue/10"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
