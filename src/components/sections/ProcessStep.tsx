import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { ServiceBlock } from '@/lib/types';
import { Reveal } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/Button';

export type StepState = 'past' | 'active' | 'future';

/**
 * Un capítulo del recorrido de Tech. El nodo del raíl molecular es el
 * `::before` del `li`; el enlace hacia el siguiente, `.tech-step__bond`, se
 * llena según `--tech-progress` y su posición `--i` (CSS).
 *
 * La foto propia solo se muestra en móvil (en escritorio la lleva el visor);
 * `display: none` evita además que se descargue con `loading="lazy"`.
 */
export function ProcessStep({ block, index, total, phase, state, last }: {
  block: ServiceBlock;
  index: number;
  total: number;
  phase: string;
  state: StepState;
  last: boolean;
}) {
  return (
    <li id={block.id} className="tech-step" data-state={state} style={{ '--i': index } as CSSProperties}>
      {!last && <span className="tech-step__bond" aria-hidden="true"><span /></span>}
      <Reveal className="tech-step__photo">
        <figure className="tech-step__media">
          <Image src={block.image.src} alt={block.image.alt} fill sizes="(max-width: 900px) 100vw, 1px" />
        </figure>
      </Reveal>
      <div className="tech-step__copy">
        <p className="tech-step__meta" data-step-anchor>
          {phase} {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <span className="tech-step__index" aria-hidden="true">{block.index}</span>
        <h3 className="tech-step__title">{block.title}</h3>
        <div className="tech-step__body">{block.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        {block.link && <TextLink href={block.link.href} className="tech-step__link">{block.link.label}</TextLink>}
      </div>
    </li>
  );
}
