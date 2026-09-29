import { Fragment } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import type { LegalBlock, LegalSection } from '@/content/legal';

/** Ancla de cada apartado: `#apartado-1`, `#apartado-2`… */
export const sectionId = (index: number) => `apartado-${index + 1}`;
export const sectionNumber = (index: number) => String(index + 1).padStart(2, '0');

const EMAIL = /([\w.+-]+@[\w-]+\.[\w.]+)/g;

/** Los correos del texto literal se vuelven enlaces `mailto:`. */
function withEmails(text: string) {
  return text.split(EMAIL).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={`mailto:${part}`} className="font-medium text-labs underline decoration-labs/40 underline-offset-4 hover:decoration-labs">{part}</a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') {
    return <p className="max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85] text-gray-700">{withEmails(block)}</p>;
  }
  const List = block.ordered ? 'ol' : 'ul';
  return (
    <List className="max-w-[var(--measure-max)] space-y-3">
      {block.list.map((item, i) => (
        <li key={item} className="grid grid-cols-[2rem_1fr] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
          <span aria-hidden className="pt-px text-[length:var(--text-micro)] font-semibold text-labs">
            {block.ordered ? `${i + 1}.` : '—'}
          </span>
          <span>{withEmails(item)}</span>
        </li>
      ))}
    </List>
  );
}

/** Cuerpo del documento: apartados numerados separados por filete. */
export function LegalArticle({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <article>
      {sections.map((section, index) => (
        <section
          key={section.heading}
          id={sectionId(index)}
          aria-labelledby={`${sectionId(index)}-t`}
          className="scroll-mt-[var(--anchor-offset)] border-t border-gray-200 py-12 first:border-t-0 first:pt-0 lg:py-14"
        >
          <Reveal>
            <p aria-hidden className="text-[length:var(--text-eyebrow)] font-bold tracking-eyebrow text-labs">{sectionNumber(index)}</p>
            <h2 id={`${sectionId(index)}-t`} className="mt-3 text-[length:var(--text-h3)] font-medium leading-tight tracking-[-0.015em] text-blue">
              {section.heading}
            </h2>
          </Reveal>
          <div className="mt-7 space-y-5">
            {section.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
