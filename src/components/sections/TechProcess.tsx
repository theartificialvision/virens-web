'use client';

import { useEffect, useRef } from 'react';
import type { ServiceBlock } from '@/lib/types';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { useProcessProgress } from '@/lib/useProcessProgress';
import { ProcessStep } from './ProcessStep';
import { SectionTitle } from '@/components/v2/SectionTitle';

type Introduction = { title: string; body: string; pillars: readonly string[] };

/** Laboratorio editorial: navegación conectada y capítulos en el flujo natural. */
export function TechProcess({ services, label, phase, introduction }: {
  services: ServiceBlock[];
  label: string;
  phase: string;
  introduction: Introduction;
}) {
  const ref = useRef<HTMLElement>(null);
  const active = useProcessProgress(ref);
  const navigation = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();
  // En móvil, acompañar solo el desplazamiento horizontal del índice.
  useEffect(() => {
    const rail = navigation.current;
    const item = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !item || rail.scrollWidth <= rail.clientWidth) return;
    const railBox = rail.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    if (itemBox.left < railBox.left || itemBox.right > railBox.right) {
      rail.scrollTo({ left: rail.scrollLeft + itemBox.left - railBox.left - (rail.clientWidth - itemBox.width) / 2,
        behavior: reduced ? 'instant' : 'smooth' });
    }
  }, [active, reduced]);
  return (
    <section ref={ref} aria-labelledby="tech-process-title" className="tech-editorial" data-header-tone="light">
      <header className="tech-editorial__intro">
        <div className="tech-editorial__container">
          <div className="tech-editorial__intro-copy">
            <SectionTitle id="tech-process-title" className="tech-editorial__heading">{introduction.title}</SectionTitle>
            <p>{introduction.body}</p>
          </div>
          <ul className="tech-editorial__principles">
            {introduction.pillars.map((pillar) => <li key={pillar}>{pillar}</li>)}
          </ul>
        </div>
      </header>

      <nav className="tech-editorial__nav" aria-label={label}>
        <ol ref={navigation} className="tech-editorial__navigation tech-editorial__container">
          {services.map((service, index) => (
            <li key={service.id}>
              <a href={`#${service.id}`} aria-current={active === index ? 'step' : undefined}>
                <span className="tech-editorial__nav-node" aria-hidden="true" />
                <span className="tech-editorial__nav-index" aria-hidden="true">{service.index}</span>
                <span>{service.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <ol className="tech-editorial__chapters">
        {services.map((service, index) => (
          <ProcessStep key={service.id} block={service} index={index} total={services.length}
            phase={phase} active={active === index} />
        ))}
      </ol>
    </section>
  );
}
