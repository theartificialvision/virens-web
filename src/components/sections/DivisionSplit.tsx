'use client';

import { useEffect, useRef, useState } from 'react';
import type { Division, DivisionHalfData } from '@/lib/types';
import { DivisionActions } from '@/components/sections/DivisionActions';
import { DivisionBackdrops } from '@/components/sections/DivisionBackdrops';
import { DivisionMarks } from '@/components/sections/DivisionMarks';
import { useCoarsePointer } from '@/lib/usePointer';

type Presentation = {
  title: string;
  subtitle: string;
  brand: string;
  resetLabel: string;
  previewLabel: string;
  enterLabel: string;
  image: { src: string; alt: string };
};

/**
 * Hero de Home: presentación de dos divisiones (dirección 06/09/2026 (5)).
 *
 * **Interacción (06/09/2026 (2), petición del cliente).** Son siempre DOS
 * pasos: el primero enseña la división, el segundo entra. Lo que cambia es el
 * gesto según con qué se navegue, porque un ratón puede señalar sin decidir y
 * un dedo no:
 *
 * - Ratón: pasar por encima ya desplaza la sección; el clic entra.
 * - Táctil: el primer toque desplaza; el segundo entra.
 * - Teclado: el foco desplaza; Enter entra.
 *
 * El hover **no** navega por sí solo, y es deliberado: con el puntero cruzando
 * la pantalla, navegar sin clic significa acabar en Labs sin haberlo pedido.
 * El primer paso siempre informa, el segundo siempre decide.
 *
 * Se vuelve al azul saliendo del hero con el ratón, sacando el foco, con
 * Escape o con la flecha. Logos y controles conservan sus nodos al centrarse.
 *
 * Los fondos viven en `DivisionBackdrops` y las marcas en `DivisionMarks`:
 * aquí solo quedan el estado, los gestos y la composición.
 */
export function DivisionSplit({ halves, presentation }: {
  halves: readonly [DivisionHalfData, DivisionHalfData];
  presentation: Presentation;
}) {
  const [active, setActive] = useState<Division | null>(null);
  const links = useRef<Partial<Record<Division, HTMLAnchorElement | null>>>({});
  const stage = useRef<HTMLElement>(null);
  const coarse = useCoarsePointer();
  // `reset()` devuelve el foco al enlace de la división que se cierra, y ese
  // foco volvería a seleccionarla al instante. Esta bandera se salta ese
  // primer `focus` — sin ella, cerrar con Escape reabre en el mismo gesto.
  const skipFocusSelect = useRef(false);
  // Al cerrar, el botón vuelve a su mitad barriendo por debajo del cursor, que
  // sigue quieto donde estaba. Ese barrido dispara un `mouseenter` que
  // reseleccionaba la división y hacía que Escape pareciera no funcionar. Se
  // ignora el hover hasta que el ratón se mueva de verdad: un elemento que
  // pasa por debajo del puntero no es un gesto del usuario.
  const hoverLocked = useRef(false);

  /** Cierre deliberado (flecha de retorno): devuelve el foco a su enlace,
   *  porque el botón que se acaba de pulsar desaparece con el cierre. */
  function reset() {
    const previous = active;
    hoverLocked.current = true;
    setActive(null);
    if (previous) {
      skipFocusSelect.current = true;
      links.current[previous]?.focus({ preventScroll: true });
    }
  }

  // Escape a nivel de documento, no de la sección: si se ha llegado por hover
  // el foco sigue en el <body> y un `onKeyDown` en el <section> no llega a
  // enterarse — la tecla no burbujea desde fuera. Solo se devuelve el foco si
  // ya estaba dentro del hero; si el gesto vino del ratón, moverlo sobraría.
  useEffect(() => {
    if (active === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      const inside = stage.current?.contains(document.activeElement);
      hoverLocked.current = true;
      setActive(null);
      if (inside && active) {
        skipFocusSelect.current = true;
        links.current[active]?.focus({ preventScroll: true });
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [active]);

  return (
    <section
      data-header-tone="dark"
      ref={stage}
      className="home-stage"
      data-division={active ?? 'home'}
      aria-labelledby="home-title"
      lang="en"
      // Se sale del hero con el ratón: vuelve el azul. Sin devolver el foco —
      // el gesto ha sido del puntero, mover el foco aquí daría un salto de
      // scroll que nadie ha pedido.
      onMouseLeave={coarse ? undefined : () => setActive(null)}
      // Un movimiento real del ratón es lo que levanta el bloqueo de arriba.
      onMouseMove={coarse ? undefined : () => { hoverLocked.current = false; }}
      // Paridad de teclado con el `mouseleave`: el foco sale del hero, se
      // cierra. `relatedTarget` nulo (clic fuera) también cuenta como salir.
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActive(null);
      }}
    >
      <DivisionBackdrops halves={halves} presentationImage={presentation.image} active={active} />

      <button
        type="button"
        className="home-reset glass"
        data-visible={active !== null}
        aria-label={presentation.resetLabel}
        aria-hidden={active === null}
        tabIndex={active === null ? -1 : 0}
        onClick={reset}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m14 5-7 7 7 7M7 12h14" />
        </svg>
      </button>

      <div className="home-composition">
        <DivisionMarks halves={halves} brand={presentation.brand} active={active} />

        <div className="home-heading">
          <h1 id="home-title">{presentation.title}</h1>
          <p>{presentation.subtitle}</p>
        </div>

        <DivisionActions
          halves={halves}
          active={active}
          coarse={coarse}
          previewLabel={presentation.previewLabel}
          enterLabel={presentation.enterLabel}
          links={links}
          skipFocusSelect={skipFocusSelect}
          hoverLocked={hoverLocked}
          onSelect={setActive}
        />
      </div>
    </section>
  );
}
