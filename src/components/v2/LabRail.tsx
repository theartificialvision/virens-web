'use client';

import type { AnimationEvent, CSSProperties } from 'react';

/**
 * Barra del recorrido 01–05 (29/09/2026, 2.ª vuelta del cliente: «nada de
 * línea verde debajo; quiero color avanzando en la barra»).
 *
 * Tres capas sobre la misma línea: la pista gris, el tramo ya recorrido y el
 * temporizador —el color que avanza hacia el siguiente punto mientras dura el
 * paso—. Cuando el temporizador termina, avanza el recorrido. Pausarlo es
 * congelar su animación (`data-paused`), así barra y foto siguen coordinadas.
 * El color es el del servicio en curso: al entrar en Full service cambia la
 * barra entera.
 */
export function LabRail({ labels, step, tick, jump, accent, dwell, autoplay, paused, onSelect, onDone }: {
  labels: readonly string[];
  step: number;
  tick: number;
  jump: boolean;
  accent: string;
  dwell: number;
  autoplay: boolean;
  paused: boolean;
  onSelect: (index: number) => void;
  onDone: () => void;
}) {
  const last = labels.length - 1;
  const done = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.target === event.currentTarget) onDone();
  };
  return (
    <div className="lab-rail" data-paused={paused || undefined} data-jump={jump || undefined}
      style={{ '--steps': labels.length, '--step': step, '--rail-accent': accent, '--dwell': `${dwell}ms` } as CSSProperties}>
      <span aria-hidden className="lab-rail__track" />
      <span aria-hidden className="lab-rail__done" />
      {autoplay && (
        <span key={tick} aria-hidden className="lab-rail__timer" data-last={step === last || undefined} onAnimationEnd={done} />
      )}
      <ol id="laboratory-steps" className="lab-rail__steps">
        {labels.map((label, index) => (
          <li key={label} data-state={index < step ? 'done' : index === step ? 'current' : undefined}>
            <button type="button" className="lab-rail__step" aria-current={index === step ? 'step' : undefined}
              aria-controls="laboratory-visual laboratory-detail" onClick={() => onSelect(index)}>
              <span aria-hidden className="lab-rail__dot" />
              <span aria-hidden className="lab-rail__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="lab-rail__label">{label}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
