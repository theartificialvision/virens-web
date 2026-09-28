import type { CSSProperties } from 'react';
import { GalenicIcon } from './GalenicIcon';
import { GalenicFigure } from './GalenicFigure';

type GalenicName = Parameters<typeof GalenicIcon>[0]['name'];

/** Forma galénica con su capacidad (`units`/`range`, de `v2Capacity`). */
export interface RailItem { id: string; icon: GalenicName; label: string; units?: string; range?: string }

/**
 * Una celda de la franja de formas galénicas: número de orden, glifo, nombre
 * y, debajo (28/09/2026, al unir «Escala industrial propia»), la capacidad
 * contando y su rango. La celda es una subrejilla de cinco filas del carril:
 * nombres de una o dos líneas no descuadran las cifras de la fila. Las clases
 * `v2-gal-*` (foco, apagado y entrada) viven en globals.
 */
export function GalenicRailItem({ item, index }: { item: RailItem; index: number }) {
  return (
    <li
      className="v2-gal-item row-span-5 grid snap-center grid-rows-subgrid justify-items-center border-r border-white/25 px-3 pb-12 pt-8 text-center first:border-l lg:first:border-l-0 lg:last:border-r-0"
      style={{ '--i': index } as CSSProperties}
    >
      <span className="v2-gal-meta justify-self-start text-[length:var(--text-note)] font-semibold tracking-label text-white/60">
        {String(index + 1).padStart(2, '0')}
      </span>
      <GalenicIcon name={item.icon} className="v2-gal-glyph mt-6 size-[var(--gal-icon)]" />
      <span className="v2-gal-meta v2-gal-copy mt-6 text-[length:var(--text-small)] font-medium leading-snug">{item.label}</span>
      {item.units ? (
        <GalenicFigure
          units={item.units}
          index={index}
          className="v2-gal-meta v2-gal-copy mt-[var(--gal-fig-gap)] text-[length:var(--gal-fig)] font-bold leading-none tracking-[-0.02em] tabular-nums"
        />
      ) : <span />}
      {item.range && (
        <span className="v2-gal-meta v2-gal-copy mt-2 max-w-[var(--gal-range-w)] text-[length:var(--text-note)] leading-snug text-white/70">
          {item.range}
        </span>
      )}
    </li>
  );
}
