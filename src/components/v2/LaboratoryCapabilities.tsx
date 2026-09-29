'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Loosen } from '@/lib/i18n';
import type { v2Laboratory } from '@/content/v2-home';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { useLabTour } from '@/lib/useLabTour';
import { LabRail } from './LabRail';
import { ServiceMorph } from './ServiceMorph';

type Service = { id: string; title: string; accent: string };

/**
 * Ciencia, desarrollo y fabricación (29/09/2026, 2.ª vuelta del cliente:
 * «simplificarla; sin línea verde; color avanzando en la barra; al llegar a
 * Logística se transforma en Full service; intuitivo y coordinado»).
 *
 * Un solo paso mueve todo a la vez: foto, texto, barra y nombre del servicio.
 * El recorrido avanza solo mientras se ve; la barra se tiñe hacia el siguiente
 * punto y, al llegar, cambian foto y texto. Desde `fullServiceFrom` el
 * servicio pasa de Private Label a Full service. Las capas de foto y texto
 * siguen montadas para que los cambios rápidos se fundan sin saltos.
 */
export function LaboratoryCapabilities({ content, services }: {
  content: Loosen<typeof v2Laboratory>;
  services: readonly Service[];
}) {
  const reduced = usePrefersReducedMotion();
  const count = content.capabilities.length;
  const tour = useLabTour(count, reduced);
  const { go, step } = tour;
  const full = step >= content.fullServiceFrom;
  const accent = `var(--color-${services[full ? 1 : 0]?.accent ?? 'labs'})`;
  // La foto nueva entra cuando ya ha cargado; mientras, la barra espera.
  const [ready, setReady] = useState<Set<number>>(() => new Set());
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (ready.has(step)) setShown(step);
  }, [ready, step]);
  // Enlaces directos: `#full-service` abre el recorrido en Logística.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === `#${services[1]?.id}`) go(content.fullServiceFrom);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [services, go, content.fullServiceFrom]);

  return (
    <>
      <div id={services[1]?.id} className="lab-head">
        <ServiceMorph services={services} full={full} summaries={content.serviceSummaries} />
      </div>
      <div ref={tour.ref} {...tour.focusHandlers}>
        <figure className="laboratory__figure laboratory__presentation">
          <div id="laboratory-visual" className="laboratory__image">
            {content.capabilities.map((item, index) => (
              <div key={item.label} className="laboratory__image-layer" data-active={shown === index} aria-hidden={shown !== index}>
                <Image src={item.image.src} alt={item.image.alt} fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1440px) 65vw, 920px" className="object-cover"
                  onLoad={() => setReady((previous) => new Set(previous).add(index))} />
              </div>
            ))}
            <Arrow direction="previous" label={content.navigation.previous} onClick={() => go(step - 1)} />
            <Arrow direction="next" label={content.navigation.next} onClick={() => go(step + 1)} />
            {tour.autoplay && (
              <button type="button" className="lab-toggle" onClick={tour.toggle}
                aria-label={tour.stopped ? content.navigation.play : content.navigation.pause}>
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
                  {tour.stopped ? <path d="M5 3.5v9l7.5-4.5z" /> : <path d="M4.5 3h2.5v10H4.5zM9 3h2.5v10H9z" />}
                </svg>
              </button>
            )}
          </div>
          <figcaption id="laboratory-detail" className="laboratory__detail">
            <p className="laboratory__caption">{content.caption}</p>
            <div className="laboratory__detail-stack">
              {content.capabilities.map((item, index) => (
                <div key={item.label} className="laboratory__detail-layer" data-active={shown === index} aria-hidden={shown !== index}>
                  <h3>{item.label}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </figcaption>
        </figure>
        <LabRail labels={content.capabilities.map((item) => item.label)} step={step} tick={tour.tick} jump={tour.jump}
          accent={accent} dwell={tour.dwell} autoplay={tour.autoplay} paused={tour.paused || shown !== step}
          onSelect={go} onDone={tour.next} />
      </div>
    </>
  );
}

function Arrow({ direction, label, onClick }: { direction: 'previous' | 'next'; label: string; onClick: () => void }) {
  return (
    <button type="button" className={`laboratory__arrow laboratory__arrow--${direction}`} aria-label={label}
      aria-controls="laboratory-visual laboratory-detail" onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
        <path d={direction === 'previous' ? 'm14 5-7 7 7 7' : 'm10 5 7 7-7 7'} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
