import { homeContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { SectionTitle } from './SectionTitle';

/** Franja tipográfica sobria; la segunda copia permite el bucle continuo. */
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
      className="v2-marquee flex shrink-0 items-center gap-[var(--v2-marquee-item-gap)] whitespace-nowrap pr-[var(--v2-marquee-item-gap)] text-[length:var(--v2-marquee)] font-normal leading-tight tracking-[-0.01em]"
    >
      {items.map((area) => (
        <li key={area} className="flex items-center gap-[var(--v2-marquee-item-gap)]">
          <span className="text-white/80">{area}</span>
          <span aria-hidden className="h-[var(--v2-marquee-dot)] w-[var(--v2-marquee-dot)] rounded-full bg-labs-glow/60" />
        </li>
      ))}
    </ul>
  );
}
