import { Fragment } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import type { LegalBlock, LegalSection } from '@/content/legal';

/** Ancla de cada apartado: `#apartado-1`, `#apartado-2`… */
export const sectionId = (index: number) => `apartado-${index + 1}`;
export const sectionNumber = (index: number) => String(index + 1).padStart(2, '0');

const EMAIL = /([\w.+-]+@[\w-]+\.[\w.]+)/g;
/** `[texto](/ruta)` dentro del texto literal: los «[HIPERENLAZAR]» del cliente. */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const linkClass = 'font-medium text-labs underline decoration-labs/40 underline-offset-4 hover:decoration-labs';

/** Los correos del texto literal se vuelven enlaces `mailto:`. */
function withEmails(text: string) {
  return text.split(EMAIL).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={`mailto:${part}`} className={linkClass}>{part}</a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Enlaces marcados y correos. Los externos abren en otra pestaña. */
function richText(text: string) {
  const parts = text.split(LINK);
  // `split` con dos grupos devuelve [texto, etiqueta, ruta, texto, …].
  return parts.map((part, i) => {
    if (i % 3 === 0) return <Fragment key={i}>{withEmails(part)}</Fragment>;
    if (i % 3 === 2) return null;
    const href = parts[i + 1] ?? '';
    return href.startsWith('/') ? (
      <Link key={i} href={href} className={linkClass}>{part}</Link>
    ) : (
      <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{part}</a>
    );
  });
}

const paragraph = 'max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85] text-gray-700';

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') {
    return <p className={paragraph}>{richText(block)}</p>;
  }
  if ('subheading' in block) {
    return <h3 className="pt-4 text-[length:var(--text-small)] font-semibold leading-snug text-blue">{block.subheading}</h3>;
  }
  const List = block.ordered ? 'ol' : 'ul';
  return (
    <List className="max-w-[var(--measure-max)] space-y-3">
      {block.list.map((item, i) => (
        <li key={item} className="grid grid-cols-[2rem_1fr] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
          <span aria-hidden className="pt-px text-[length:var(--text-micro)] font-semibold text-labs">
            {block.alpha ? `${String.fromCharCode(97 + i)})` : block.ordered ? `${i + 1}.` : '—'}
          </span>
          <span>{richText(item)}</span>
        </li>
      ))}
    </List>
  );
}

/** Párrafos sueltos fuera de los apartados (introducción del documento). */
export function LegalParagraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-5">
      {paragraphs.map((text) => (
        <p key={text} className={paragraph}>{richText(text)}</p>
      ))}
    </div>
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
