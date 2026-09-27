import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { ServiceBlock } from '@/lib/types';
import { TextLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ServiceSlideProps {
  block: ServiceBlock;
  active: boolean;
  stacked: boolean;
  index: number;
  /** «01 — 06»: solo se pinta en móvil; en escritorio lo lleva el panel fijo. */
  counter: string;
  /** Color del panel de esta diapositiva (azul / verde alternos). */
  panel: string;
}

/**
 * Una diapositiva del slide de servicios de Tech (27/09/2026, diseño del
 * cliente). Desde lg se superpone a las demás dentro de la escena fija de
 * `ServicesSlider` y solo se ve la activa (`data-active`, CSS en globals);
 * `--d` (distancia a la activa, la escribe `useSlideProgress`) la hace
 * derivar con el scroll mediante `.svc-drift`.
 *
 * Móvil (27/09/2026, cliente: «la versión mobile adaptada»): la misma
 * composición en vertical — el panel de color con el contador asoma detrás
 * de la foto, arriba a la derecha, y la foto se abre, el titular entra
 * palabra a palabra y el filete magenta crece al llegar cada servicio.
 */
export function ServiceSlide({ block, active, stacked, index, counter, panel }: ServiceSlideProps) {
  // En móvil (apilado) todas las diapositivas son contenido visible; en la
  // escena fija solo la activa existe para lectores de pantalla y teclado.
  const hidden = !stacked && !active;
  // «01» → «1.», como en el diseño del cliente («1. Formulación»).
  const words = `${Number(block.index)}. ${block.title}`.split(' ');

  return (
    <article
      data-active={active || undefined}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
      className={cn(
        'svc-slide py-[var(--v2-section-tight)] lg:absolute lg:inset-0 lg:bg-transparent lg:py-0',
        index % 2 === 0 ? 'bg-bone' : 'bg-gray-100',
      )}
    >
      {/* Foto nítida, montada entre la zona clara y el panel */}
      <div className="relative px-5 md:px-8 lg:absolute lg:left-[var(--svc-photo-x)] lg:top-1/2 lg:w-[var(--svc-photo-w)] lg:-translate-y-1/2 lg:px-0">
        {/* Panel de color que asoma detrás de la foto (solo móvil) */}
        <div aria-hidden className="svc-m-panel absolute right-0 top-0 lg:hidden" style={{ background: panel }}>
          <span className="absolute right-5 top-4 text-[length:var(--text-eyebrow)] font-bold tracking-eyebrow text-white md:right-8">
            {counter}
          </span>
        </div>

        <div className="svc-drift relative pr-[var(--svc-m-inset)] pt-[var(--svc-m-top)] lg:p-0" style={{ '--k': 0.5 } as CSSProperties}>
          <div className="svc-photo relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={block.image.src}
              alt={block.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <span aria-hidden className="svc-line mt-8 hidden h-[2px] w-[var(--svc-line-w)] bg-tech lg:block" />
        </div>
      </div>

      {/* Texto */}
      <div className="mt-10 px-5 md:px-8 lg:absolute lg:left-0 lg:top-1/2 lg:mt-0 lg:w-[var(--svc-text-w)] lg:-translate-y-1/2 lg:pl-12 lg:pr-0 2xl:pl-20">
        <div className="svc-drift" style={{ '--k': 1 } as CSSProperties}>
          <span aria-hidden className="svc-line mb-7 block h-[2px] w-14 bg-tech lg:hidden" />
          <h3 className="text-[length:var(--text-h2)] font-medium leading-tight tracking-[-0.015em] text-blue">
            {/* Palabra a palabra (GIF de referencia); el espacio va fuera del
                inline-block para que el titular pueda partir línea. */}
            {words.map((w, i) => (
              <span key={`${w}-${i}`}>
                <span className="svc-word inline-block" style={{ '--i': i } as CSSProperties}>
                  {w}
                </span>
                {i < words.length - 1 ? ' ' : null}
              </span>
            ))}
          </h3>
          <div className="svc-copy mt-6 max-w-[var(--measure-max)] space-y-4 text-[length:var(--text-small)] leading-[1.85] text-gray-700">
            {block.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {block.link && (
              <div className="pt-4">
                <TextLink href={block.link.href}>{block.link.label}</TextLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
