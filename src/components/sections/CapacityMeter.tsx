'use client';

import { useRef, type CSSProperties } from 'react';
import type { CapacityItem } from '@/lib/types';
import { FormIcon } from '@/components/ui/FormIcon';
import { formatFigure, parseFigure, useLoadProgress } from '@/lib/useLoadProgress';

/**
 * Un formato de la franja de capacidad, «cargando» al entrar en pantalla
 * (23/09/2026, petición del cliente: que la capacidad del laboratorio se vea
 * como algo que se llena). Tres cosas suben a la vez, con la misma curva:
 *
 * 1. La silueta se llena de teal de abajo arriba, como un envase en línea:
 *    una copia del glifo en `--color-labs` recortada con `clip-path`.
 * 2. La cifra cuenta desde 0 hasta su valor literal («200M»).
 * 3. Un filete bajo la cifra crece hasta la proporción real frente al mayor
 *    formato (cápsulas = 100 %). Escala lineal a propósito: es un dato, y
 *    comprimirla haría parecer parecidos a jarabes y cápsulas. Al terminar,
 *    un único barrido de luz lo recorre (`.capacity-sheen`).
 *
 * El texto real va en `sr-only`; lo que cuenta es `aria-hidden`, para que un
 * lector de pantalla no lea los valores intermedios.
 */
export function CapacityMeter({ item, max, index }: { item: CapacityItem; max: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Cascada por fila de cinco: cada formato arranca 90 ms después del anterior.
  const t = useLoadProgress(ref, { delay: (index % 5) * 90, duration: 2200 });
  const fig = parseFigure(item.units);
  const ratio = max > 0 ? fig.value / max : 0;
  const done = t >= 1;

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <span className="relative block size-12 shrink-0 lg:size-14" aria-hidden>
        <FormIcon name={item.icon} className="absolute inset-0 size-full text-gray-300" />
        <FormIcon
          name={item.icon}
          className="absolute inset-0 size-full text-labs"
          // El recorte baja con el progreso: 100 % arriba = vacío, 0 % = lleno.
          style={{ clipPath: `inset(${((1 - t) * 100).toFixed(2)}% 0 0 0)` } as CSSProperties}
        />
      </span>

      <div>
        <p className="text-[length:var(--text-eyebrow)] font-bold uppercase tracking-label text-gray-500">{item.label}</p>
        <p className="mt-3 text-[length:var(--text-stat-compact)] font-bold leading-none tracking-[-0.02em] text-labs tabular-nums">
          <span aria-hidden>
            {fig.prefix}
            {formatFigure(fig.value * t, fig.grouped)}
            {fig.suffix}
          </span>
          <span className="sr-only">{item.units}</span>
        </p>

        <span aria-hidden className="relative mt-4 block h-[2px] w-full overflow-hidden bg-gray-300">
          <span
            className="absolute inset-y-0 left-0 block w-full origin-left bg-labs"
            style={{ transform: `scaleX(${(ratio * t).toFixed(4)})` }}
          />
          {done && (
            <span className="capacity-sheen absolute inset-y-0 left-0 block" style={{ width: `${ratio * 100}%` }} />
          )}
        </span>

        {item.range && <p className="mt-3 text-[length:var(--text-micro)] text-gray-500">{item.range}</p>}
      </div>
    </div>
  );
}

/** Cifra grande de la cabecera del bloque («+2.000 m²», «9», «2»), contando. */
export function CapacityStat({
  stat,
  index,
}: {
  stat: { value: string; unit?: string; label: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const t = useLoadProgress(ref, { delay: index * 120, duration: 1900 });
  const fig = parseFigure(stat.value);
  return (
    <div ref={ref} className="flex flex-col">
      <dd className="text-[length:var(--text-stat-compact)] font-bold leading-none tracking-[-0.03em] tabular-nums">
        <span aria-hidden>
          {fig.prefix}
          {formatFigure(fig.value * t, fig.grouped)}
          {fig.suffix}
        </span>
        <span className="sr-only">{stat.value}</span>
        {stat.unit && <span className="ml-1 align-top text-[0.42em]">{stat.unit}</span>}
      </dd>
      <dt className="mt-4 text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow text-gray-500">
        {stat.label}
      </dt>
    </div>
  );
}
