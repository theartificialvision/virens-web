import { homeContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { SectionTitle } from './SectionTitle';

/** Conserva el carácter cromático original dentro de una franja compacta. */
const ACCENT = ['text-white', 'text-labs-glow', 'text-white', 'text-tech-glow'] as const;

export function AreasMarquee({ locale }: { locale: Locale }) {
  const { v2Areas } = homeContent(locale);
  const items = v2Areas.items;

  return (
    <section id="areas-terapeuticas" className="overflow-hidden bg-blue py-[var(--v2-marquee-pad)] text-white">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 md:px-8 lg:px-12 2xl:px-20">
        <SectionTitle>{v2Areas.label}</SectionTitle>
      </div>

      <div className="mt-[var(--v2-marquee-gap)] flex w-full overflow-hidden">
        <Track items={items} />
        <Track items={items} ariaHidden />
      </div>
    </section>
  );
}

function Track({ items, ariaHidden = false }: { items: readonly string[]; ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="v2-marquee flex shrink-0 items-center gap-[var(--v2-marquee-item-gap)] whitespace-nowrap pr-[var(--v2-marquee-item-gap)] text-[length:var(--v2-marquee)] font-normal uppercase leading-tight tracking-[-0.01em]"
    >
      {items.map((area, index) => (
        <li key={area} className="flex items-center gap-[var(--v2-marquee-item-gap)]">
          <span className={ACCENT[index % ACCENT.length]}>{area}</span>
          <span aria-hidden className="text-white/20">/</span>
        </li>
      ))}
    </ul>
  );
}
