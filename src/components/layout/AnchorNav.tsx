'use client';

import { useEffect, useRef, useState } from 'react';
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
  const list = useRef<HTMLUListElement>(null);

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

  // La barra se desplaza sola para centrar la seccion en la que estas: bajando
  // por la pagina, las categorias que vienen van entrando por la derecha.
  //
  // Se calcula el `scrollLeft` a mano en vez de usar `scrollIntoView`, que
  // ademas del contenedor horizontal mueve el scroll VERTICAL de la pagina —
  // seria la propia barra empujando la lectura, justo lo contrario de lo que
  // se busca.
  useEffect(() => {
    const ul = list.current;
    const el = ul?.querySelector<HTMLElement>(`[data-anchor="${active}"]`);
    if (!ul || !el) return;
    const target = el.offsetLeft - (ul.clientWidth - el.offsetWidth) / 2;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ul.scrollTo({ left: Math.max(0, target), behavior: reduced ? 'auto' : 'smooth' });
  }, [active]);

  const accent = division === 'labs' ? 'var(--color-labs)' : 'var(--color-tech)';

  return (
    <nav
      data-header-tone="dark"
      aria-label="Secciones de esta página"
      // `top-0`: antes se pegaba a 64/80 px del borde, un hueco heredado de cuando
      // la cabecera era una franja. Hoy el header es un boton flotante, asi que ese
      // hueco solo dejaba ver el contenido pasando por encima de la barra.
      className="glass sticky top-0 z-40 [--glass-blur:22px] [--glass-body:color-mix(in_srgb,var(--color-ink)_82%,transparent)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-5 md:px-6 lg:px-12 2xl:px-20">
        <ul ref={list} className="flex h-14 items-stretch gap-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const id = item.href.slice(1);
            const isActive = active === id;
            return (
              <li key={item.href} className="flex shrink-0 items-center">
                <a
                  href={item.href}
                  data-anchor={id}
                  className={cn(
                    'whitespace-nowrap border-b-2 pb-1 text-[length:var(--text-micro)] font-semibold uppercase tracking-label transition-colors',
                    isActive ? 'text-white' : 'border-transparent text-mist-dim hover:text-white',
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
