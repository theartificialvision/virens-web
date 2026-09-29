'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Loosen } from '@/lib/i18n';
import type { v2Laboratory } from '@/content/v2-home';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { useLabTour } from '@/lib/useLabTour';
import { LabRail } from './LabRail';
import { ServiceTabs } from './ServiceTabs';

type Service = { id: string; title: string; accent: string };

/**
 * Ciencia, desarrollo y fabricación. Un solo paso mueve foto, texto y barra;
 * el recorrido avanza solo mientras se ve y la barra se tiñe hacia el
 * siguiente punto. Desde el 29/09/2026 (3.ª vuelta del cliente) Private Label
 * y Full service están siempre visibles y ambos recorren las cinco fases: la
 * barra toma el color del servicio activo y, al terminar el recorrido de uno,
 * sigue el del otro. Las capas de foto y texto siguen montadas para que los
 * cambios rápidos se fundan sin saltos.
 */
export function LaboratoryCapabilities({ content, services }: {
  content: Loosen<typeof v2Laboratory>;
  services: readonly Service[];
}) {
  const reduced = usePrefersReducedMotion();
  const count = content.capabilities.length;
  const tour = useLabTour(count, reduced);
  const { go, step } = tour;
  const [service, setService] = useState(0);
  const accent = `var(--color-${services[service]?.accent ?? 'labs'})`;
  const choose = (index: number) => {
    setService(index);
    go(0);
  };
  // Al acabar el recorrido de un servicio empieza el del otro.
  const advance = () => {
    if (step === count - 1) setService((s) => (s + 1) % 2);
    tour.next();
  };
  // La foto nueva entra cuando ya ha cargado; mientras, la barra espera.
  const [ready, setReady] = useState<Set<number>>(() => new Set());
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (ready.has(step)) setShown(step);
  }, [ready, step]);
  // Enlaces directos: `#full-service` abre el recorrido de Full service.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === `#${services[1]?.id}`) {
        setService(1);
        go(0);
      }
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [services, go]);

  return (
    <>
      <div id={services[1]?.id} className="lab-head">
        <ServiceTabs services={services} active={service} label={content.navigation.services}
          summaries={content.serviceSummaries} onSelect={choose} />
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
          onSelect={go} onDone={advance} />
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
