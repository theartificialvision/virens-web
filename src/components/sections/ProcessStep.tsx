import Image from 'next/image';
import type { ServiceBlock } from '@/lib/types';
import { Reveal } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/Button';

/** Foto completa en 16:9, texto legible y detalle de enlaces inspirado en la marca. */
export function ProcessStep({ block, index, total, phase, active }: {
  block: ServiceBlock;
  index: number;
  total: number;
  phase: string;
  active: boolean;
}) {
  return (
    <li id={block.id} data-step className="tech-chapter" data-active={active || undefined}>
      <div className="tech-editorial__container tech-chapter__layout">
        <Reveal className="tech-chapter__photo">
          <figure className="tech-chapter__media">
            <Image src={block.image.src} alt={block.image.alt} fill
              sizes="(max-width: 900px) 100vw, (max-width: 1440px) 56vw, 760px" className="tech-chapter__image" />
          </figure>
        </Reveal>
        <Reveal className="tech-chapter__copy" delay={0.06}>
          <p className="tech-chapter__meta">
            <span>{phase} {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <svg viewBox="0 0 94 28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false">
              <path d="m11 20 29-12 29 12 17-12" />
              <circle cx="11" cy="20" r="3" /><circle cx="40" cy="8" r="3" /><circle cx="69" cy="20" r="3" /><circle cx="86" cy="8" r="3" />
            </svg>
          </p>
          <h3 className="tech-chapter__title">{block.title}</h3>
          <div className="tech-chapter__body">{block.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          {block.link && <TextLink href={block.link.href} className="tech-chapter__link">{block.link.label}</TextLink>}
        </Reveal>
      </div>
    </li>
  );
}
