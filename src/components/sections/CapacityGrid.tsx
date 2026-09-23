import type { CapacityItem } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CapacityMeter, CapacityStat } from './CapacityMeter';

interface Props {
  eyebrow: string;
  title: string;
  stats: readonly { value: string; unit?: string; label: string }[];
  items: CapacityItem[];
  operations: readonly string[];
  note: string;
}

/**
 * Pieza de datos (§06 bloque 06). Sin fotografía: solo tipografía y siluetas.
 * Es el bloque que convierte el mayor activo de la empresa —hoy atrapado en un
 * PNG— en contenido legible, indexable y accesible.
 *
 * 23/09/2026: las cifras y las siluetas «cargan» al entrar en pantalla
 * (`CapacityMeter`, `CapacityStat`).
 */
export function CapacityGrid({ eyebrow, title, stats, items, operations, note }: Props) {
  return (
    <Section id="capacidad-productiva" tone="gray" rhythm="air">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="max-w-[var(--measure-narrow)] lg:col-span-4">
            <Eyebrow className="text-gray-500">{eyebrow}</Eyebrow>
            <h2 className="mt-6 text-[length:var(--text-h2)] font-bold leading-[1.1] tracking-[-0.015em]">
              {title}
            </h2>
          </div>

          {/* 07/09 (22): fuera el border-y + divide-x — leia como fila de tabla.
              Cada numero es su propio bloque, separado por aire. */}
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-3 lg:col-span-8">
            {stats.map((s, i) => (
              <CapacityStat key={s.label} stat={s} index={i} />
            ))}
          </dl>
        </div>

        {/* Mismo criterio: sin caja de celda. El icono ya funciona como ancla
            visual, así que el aire entre items basta para separarlos. */}
        <ul className="mt-10 grid gap-x-8 gap-y-8 lg:mt-20 lg:gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, i) => (
            <li key={item.id}>
              <CapacityMeter item={item} index={i} />
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-12">
          <p className="text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow text-gray-500">
            Acondicionamiento
          </p>
          <ul className="flex flex-wrap gap-x-10 gap-y-2 text-gray-700 lg:col-span-8">
            {operations.map((op) => (
              <li key={op}>{op}</li>
            ))}
          </ul>
          <p className="text-[length:var(--text-note)] text-gray-500 lg:col-span-3">{note}</p>
        </div>
      </Container>
    </Section>
  );
}
