import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { ServiceBlock } from '@/lib/types';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Un paso del proceso de Virens Tech (29/09/2026): acabado de instrumento de
 * laboratorio. Etiqueta de fase en monoespaciada, la foto se revela con una
 * línea de escaneo (y pasa de gris a color al terminar), marcas de encuadre en
 * las esquinas y una regla de medición debajo. En móvil lleva su nodo y el
 * tramo de línea hasta el siguiente, que se rellena con `--proc-p`.
 */
export function ProcessStep({ block, index, total, phase, state, seen }: {
  block: ServiceBlock;
  index: number;
  total: number;
  phase: string;
  state: 'done' | 'current' | 'next';
  seen: boolean;
}) {
  return (
    <li id={block.id} data-step className="proc-step" data-state={state} data-seen={seen || undefined}
      style={{ '--i': index } as CSSProperties}>
      <span aria-hidden className="proc-step__node" />
      <p className="proc-step__meta">
        <span>{phase} {pad(index + 1)} / {pad(total)}</span>
        <span aria-hidden className="proc-step__rule" />
      </p>
      <figure className="proc-step__media">
        <Image src={block.image.src} alt={block.image.alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="proc-step__img" />
        <span aria-hidden className="proc-step__scan" />
        <span aria-hidden className="proc-step__corners" />
      </figure>
      <span aria-hidden className="proc-step__ruler" />
      <h3 className="proc-step__title">{block.title}</h3>
      <div className="proc-step__body">
        {block.body.map((p) => <p key={p}>{p}</p>)}
      </div>
      {block.link ? (
        <a href={block.link.href} className="proc-step__link">
          {block.link.label} <span aria-hidden>&rarr;</span>
        </a>
      ) : null}
    </li>
  );
}
