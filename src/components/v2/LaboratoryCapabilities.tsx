'use client';

import Image from 'next/image';
import { useEffect, useState, type CSSProperties } from 'react';
import type { Loosen } from '@/lib/i18n';
import type { v2Laboratory } from '@/content/v2-home';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { useStepProgress } from '@/lib/useStepProgress';
import { ServiceTabs } from './ServiceTabs';

type Service = { id: string; title: string; accent: string };

/**
 * Las capas permanecen montadas para que cambios rápidos reviertan el fundido sin saltos.
 *
 * Private Label / Full service (29/09/2026, cliente: «no quiero texto; que se
 * entienda el proceso y se destaquen las dos opciones», sin repetir los pasos):
 * dos pestañas sobre la foto y la fila 01–05 hace de recorrido. La pestaña
 * elegida enciende en su color los pasos que abarca (`serviceScope`); el resto
 * se atenúa pero sigue navegable. El resumen de cada servicio queda solo para
 * lectores de pantalla.
 */
export function LaboratoryCapabilities({ content, services }: {
  content: Loosen<typeof v2Laboratory>;
  services: readonly Service[];
}) {
  const [service, setService] = useState(0);
  const reduced = usePrefersReducedMotion();
  const rail = useStepProgress<HTMLOListElement>(content.serviceScope[service] ?? content.capabilities.length, reduced);
  const accent = `var(--color-${services[service]?.accent ?? 'labs'})`;
  const [selected, setSelected] = useState(0);
  const [ready, setReady] = useState<Set<number>>(() => new Set());
  const [active, setActive] = useState(0);
  // Foto y texto cambian juntos, conservando la selección anterior durante la carga.
  useEffect(() => {
    if (ready.has(selected)) setActive(selected);
  }, [ready, selected]);
  return (
    <>
      <ServiceTabs services={services} summaries={content.serviceSummaries} active={service} onSelect={setService} />
      <figure className="laboratory__figure laboratory__presentation">
        <div id="laboratory-visual" className="laboratory__image">
          {content.capabilities.map((item, index) => (
            <div key={item.label} className="laboratory__image-layer" data-active={active === index} aria-hidden={active !== index}>
              <Image src={item.image.src} alt={item.image.alt} fill
                sizes="(max-width: 767px) 100vw, (max-width: 1440px) 65vw, 920px" className="object-cover"
                onLoad={() => setReady((previous) => new Set(previous).add(index))} />
            </div>
          ))}
          <button type="button" className="laboratory__arrow laboratory__arrow--previous"
            aria-label={content.navigation.previous} aria-controls="laboratory-visual laboratory-detail"
            onClick={() => setSelected((current) => (current - 1 + content.capabilities.length) % content.capabilities.length)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
              <path d="m14 5-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="laboratory__arrow laboratory__arrow--next"
            aria-label={content.navigation.next} aria-controls="laboratory-visual laboratory-detail"
            onClick={() => setSelected((current) => (current + 1) % content.capabilities.length)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
              <path d="m10 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <figcaption id="laboratory-detail" className="laboratory__detail">
          <p className="laboratory__caption">{content.caption}</p>
          <div className="laboratory__detail-stack">
            {content.capabilities.map((item, index) => (
              <div key={item.label} className="laboratory__detail-layer" data-active={active === index} aria-hidden={active !== index}>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </figcaption>
      </figure>
      <ol ref={rail.ref} id="laboratory-steps" className="laboratory__capabilities" data-lit={rail.covered > 0 || undefined}
        style={{ '--covered': rail.covered, '--steps': content.capabilities.length, '--service-accent': accent,
          '--rail-duration': `${rail.duration - rail.lead}ms`, '--rail-lead': `${rail.lead}ms` } as CSSProperties}>
        {content.capabilities.map((item, index) => (
          <li key={item.label} data-covered={index < rail.covered || undefined}
            style={{ '--d': `${rail.delays[index] ?? 0}ms` } as CSSProperties}>
            <button type="button" className="laboratory__capability" aria-pressed={selected === index}
              aria-controls="laboratory-visual laboratory-detail" onPointerEnter={(event) => { if (event.pointerType !== 'touch') setSelected(index); }}
              onFocus={() => setSelected(index)} onClick={() => setSelected(index)}>
              <span className="laboratory__dot" aria-hidden="true" />
              <span className="laboratory__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="laboratory__label">{item.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}
