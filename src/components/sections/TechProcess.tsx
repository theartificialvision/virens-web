'use client';

import { useRef, type CSSProperties } from 'react';
import type { ServiceBlock } from '@/lib/types';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { useProcessProgress } from '@/lib/useProcessProgress';
import { ProcessMolecule } from './ProcessMolecule';
import { ProcessStep } from './ProcessStep';

/**
 * Servicios de Virens Tech como proceso (29/09/2026, cliente: «tiene que ser
 * más tech; la veo PowerPoint»). Sustituye al slide de diapositivas: en vez de
 * cinco pantallas que se reemplazan, una molécula que se construye mientras se
 * baja. Escritorio: la molécula fija a la izquierda y los pasos corren a la
 * derecha en flujo normal (sin secuestrar el scroll). Móvil: una línea con
 * nodos en el borde izquierdo que se va llenando. Las anclas (#formulacion…)
 * funcionan solas porque cada paso es un elemento real de la página.
 */
export function TechProcess({ services, label, phase }: { services: ServiceBlock[]; label: string; phase: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const n = services.length;
  const { active, seen } = useProcessProgress(ref, n, reduced);
  return (
    <section ref={ref} aria-label={label} className="proc" data-header-tone="light" style={{ '--n': n } as CSSProperties}>
      <div className="proc__inner">
        <div className="proc__aside">
          <ProcessMolecule labels={services.map((s) => s.title)} hrefs={services.map((s) => `#${s.id}`)} active={active} label={label} />
        </div>
        <ol className="proc__steps">
          {services.map((s, i) => (
            <ProcessStep key={s.id} block={s} index={i} total={n} phase={phase}
              state={i < active ? 'done' : i === active ? 'current' : 'next'} seen={seen.has(i)} />
          ))}
        </ol>
      </div>
    </section>
  );
}
