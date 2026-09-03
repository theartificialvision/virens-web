'use client';

import { useEffect, useState } from 'react';
import type { NavItem } from '@/config/navigation';
import type { Division } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Barra de anclas sticky de las one-page (§10.8).
 * Sustituye a las pestañas de la web actual: el contenido ya está desplegado,
 * esto solo orienta y da URL compartible a cada bloque.
 */
export function AnchorNav({ items, division }: { items: NavItem[]; division: Division }) {
  const [active, setActive] = useState(items[0]?.href.slice(1) ?? '');

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  const accent = division === 'labs' ? 'var(--color-labs)' : 'var(--color-tech)';

  return (
    <nav
      aria-label="Secciones de esta página"
      className="sticky top-16 z-40 border-b border-hairline bg-canvas/85 backdrop-blur-md lg:top-20"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-5 md:px-6 lg:px-12 2xl:px-20">
        <ul className="flex h-14 items-stretch gap-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const id = item.href.slice(1);
            const isActive = active === id;
            return (
              <li key={item.href} className="flex shrink-0 items-center">
                <a
                  href={item.href}
                  className={cn(
                    'whitespace-nowrap border-b-2 pb-1 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors',
                    isActive ? 'text-blue' : 'border-transparent text-subtle hover:text-blue',
                  )}
                  style={isActive ? { borderColor: accent } : undefined}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
