'use client';

import { useRef } from 'react';
import { formatFigure, parseFigure, useLoadProgress } from '@/lib/useLoadProgress';

/**
 * Capacidad de un formato bajo su forma galénica (28/09/2026, cliente:
 * «formas galénicas y escala industrial se unen, números debajo de cada
 * forma»). Cuenta de 0 a su valor literal al entrar en pantalla, como las
 * cifras de Capacidad productiva.
 *
 * Cascada solo en la fila de escritorio: en el carril móvil cada cifra
 * arranca cuando el propio formato entra deslizando, sin esperar su turno.
 * El texto real va en `sr-only`; lo que cuenta es `aria-hidden`.
 */
export function GalenicFigure({ units, index, className }: { units: string; index: number; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const wide = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
  const t = useLoadProgress(ref, { delay: wide ? index * 80 : 0, duration: 2000 });
  const fig = parseFigure(units);

  return (
    <p ref={ref} className={className}>
      <span aria-hidden>
        {fig.prefix}
        {formatFigure(fig.value * t, fig.grouped, fig.sep)}
        {fig.suffix}
      </span>
      <span className="sr-only">{units}</span>
    </p>
  );
}
