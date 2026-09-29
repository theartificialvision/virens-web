import type { LegalSection } from '@/content/legal';
import { sectionId, sectionNumber } from './LegalArticle';

/** Índice lateral fijo (solo escritorio): número + título de cada apartado. */
export function LegalToc({ sections, label }: { sections: readonly LegalSection[]; label: string }) {
  return (
    <nav aria-label={label} className="sticky top-[var(--anchor-offset)] hidden lg:block">
      <span aria-hidden className="block h-[3px] w-14 bg-labs" />
      <p className="mt-6 text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow text-gray-500">{label}</p>
      <ol className="mt-6 space-y-1 border-l border-gray-200">
        {sections.map((section, index) => (
          <li key={section.heading}>
            <a
              href={`#${sectionId(index)}`}
              className="-ml-px flex gap-3 border-l-2 border-transparent py-2 pl-4 text-[length:var(--text-micro)] leading-snug text-gray-600 transition-colors duration-200 hover:border-labs hover:text-blue"
            >
              <span className="font-semibold text-labs">{sectionNumber(index)}</span>
              <span>{section.heading}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
