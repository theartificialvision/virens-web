'use client';

import Link from 'next/link';
import type { RefObject } from 'react';
import type { Division, DivisionHalfData } from '@/lib/types';

/**
 * Botones de división del hero (dirección 06/09/2026 (5)).
 *
 * Presentacional a propósito: los gestos que distinguen ratón/táctil/teclado
 * viven aquí pegados al JSX que los dispara, pero el estado (`active`) y sus
 * guardias (`hoverLocked`, `skipFocusSelect`) los posee `DivisionSplit` y
 * entran por props — la lógica sutil de los dos pasos se lee en un solo
 * sitio y no se duplica.
 */
export function DivisionActions({ halves, active, coarse, previewLabel, enterLabel, links, skipFocusSelect, hoverLocked, onSelect }: {
  halves: readonly [DivisionHalfData, DivisionHalfData];
  active: Division | null;
  coarse: boolean;
  previewLabel: string;
  enterLabel: string;
  links: RefObject<Partial<Record<Division, HTMLAnchorElement | null>>>;
  skipFocusSelect: RefObject<boolean>;
  hoverLocked: RefObject<boolean>;
  onSelect: (division: Division) => void;
}) {
  return (
    <div className="home-actions">
      {halves.map((half) => {
        const hidden = active !== null && active !== half.id;
        return (
          <div key={half.id} className="home-action-slot" data-side={half.id}
            data-selected={active === half.id} data-hidden={hidden}>
            <Link
              ref={(node) => { links.current[half.id] = node; }}
              href={half.href}
              className="home-division-link glass"
              aria-label={`${active === half.id ? enterLabel : previewLabel} ${half.name}`}
              aria-hidden={hidden}
              tabIndex={hidden ? -1 : 0}
              // Ratón: señalar ya desplaza la sección. En táctil no se
              // monta — ahí el navegador dispara un `mouseenter` sintético
              // junto al toque y se comería el primero de los dos pasos.
              onMouseEnter={coarse ? undefined : () => {
                if (hoverLocked.current) return;
                onSelect(half.id);
              }}
              // Solo con puntero fino. En táctil, tocar un enlace lo
              // enfoca: si el foco seleccionase, el primer toque haría los
              // dos pasos de golpe —seleccionar y, en el `click` que viene
              // detrás, navegar— y no habría previsualización ninguna.
              onFocus={coarse ? undefined : () => {
                if (skipFocusSelect.current) {
                  skipFocusSelect.current = false;
                  return;
                }
                onSelect(half.id);
              }}
              onClick={(event) => {
                // Conserva abrir en pestaña nueva con los modificadores nativos.
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                // Con ratón o teclado el hover/foco ya ha hecho el primer
                // paso, así que el clic entra. En táctil no hay hover: el
                // primer toque hace de "hover" y solo el segundo entra.
                if (coarse && active !== half.id) {
                  event.preventDefault();
                  onSelect(half.id);
                }
              }}
            >
              {/* En un <span>, no suelto: el filo y el reflejo de `.glass`
                  son absolutos y taparían un nodo de texto plano. */}
              <span>{half.cta}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
