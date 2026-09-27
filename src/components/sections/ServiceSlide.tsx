import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { ServiceBlock } from '@/lib/types';
import { TextLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * Una diapositiva del slide de servicios de Tech (27/09/2026, diseño del
 * cliente). En móvil es un bloque normal —foto arriba, texto debajo, regla
 * de la casa—; desde lg se superpone a las demás dentro de la escena fija de
 * `ServicesSlider` y solo se ve la activa (`data-active`, CSS en globals).
 */
export function ServiceSlide({ block, active, stacked }: { block: ServiceBlock; active: boolean; stacked: boolean }) {
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
        'svc-slide bg-bone py-[var(--section-compact)] even:bg-gray-100 lg:absolute lg:inset-0 lg:bg-transparent lg:py-0 lg:even:bg-transparent',
      )}
    >
      {/* Foto nítida, montada entre la zona clara y el panel */}
      <div className="px-5 md:px-6 lg:absolute lg:left-[var(--svc-photo-x)] lg:top-1/2 lg:w-[var(--svc-photo-w)] lg:-translate-y-1/2 lg:px-0">
        <div className="svc-photo relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={block.image.src}
            alt={block.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
        <span aria-hidden className="svc-line mt-8 block h-[2px] w-[var(--svc-line-w)] bg-tech" />
      </div>

      {/* Texto */}
      <div className="mt-10 px-5 md:px-6 lg:absolute lg:left-0 lg:top-1/2 lg:mt-0 lg:w-[var(--svc-text-w)] lg:-translate-y-1/2 lg:pl-12 lg:pr-0 2xl:pl-20">
        <h3 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-[-0.015em] text-blue">
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
        <div className="svc-copy mt-6 max-w-[var(--measure-max)] space-y-4 text-[length:var(--text-lead)] leading-[1.55] text-blue">
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
    </article>
  );
}
