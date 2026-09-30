'use client';

import { useRef, type CSSProperties } from 'react';
import type { ServiceBlock } from '@/lib/types';
import { useProcessProgress } from '@/lib/useProcessProgress';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/v2/SectionTitle';
import { ProcessStep, type StepState } from './ProcessStep';
import { TechVisor } from './TechVisor';

type Introduction = { title: string; body: string; pillars: readonly string[] };

/**
 * «De la idea al producto final» — laboratorio de vanguardia (30/09/2026).
 * Cliente: volver al magenta + azul oscuro de Tech, «alta tecnología web» y
 * que no parezca un PowerPoint. Escenario azul profundo con halo magenta; a
 * la izquierda el visor fijo (`TechVisor`), a la derecha los capítulos unidos
 * por un raíl molecular que se llena con la lectura. Sin secuestro de scroll.
 * Textos y anclas (#formulacion … #regulatory-consulting) sin cambios.
 */
export function TechProcess({ services, label, phase, introduction }: {
  services: ServiceBlock[];
  label: string;
  phase: string;
  introduction: Introduction;
}) {
  const ref = useRef<HTMLElement>(null);
  const active = useProcessProgress(ref);
  const stateOf = (index: number): StepState => (index < active ? 'past' : index === active ? 'active' : 'future');

  return (
    <section ref={ref} aria-labelledby="tech-process-title" className="tech-lab" data-header-tone="dark">
      <header className="tech-lab__intro tech-lab__container">
        <div className="tech-lab__intro-copy">
          <SectionTitle id="tech-process-title" rule="tech">{introduction.title}</SectionTitle>
          <Reveal delay={0.06}><p>{introduction.body}</p></Reveal>
        </div>
        <ul className="tech-lab__pillars">
          {introduction.pillars.map((pillar, index) => (
            <li key={pillar}>
              <span className="tech-lab__pillar-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              {pillar}
            </li>
          ))}
        </ul>
      </header>

      <div className="tech-lab__stage tech-lab__container" style={{ '--tech-bonds': services.length - 1 } as CSSProperties}>
        <TechVisor services={services} active={active} label={label} />
        <ol className="tech-lab__steps">
          {services.map((service, index) => (
            <ProcessStep key={service.id} block={service} index={index} total={services.length}
              phase={phase} state={stateOf(index)} last={index === services.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}
