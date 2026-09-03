'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Division, DivisionHalfData, DivisionInfoData } from '@/lib/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { KineticHeading } from '@/components/ui/KineticHeading';
import { LogoSpin } from '@/components/ui/LogoSpin';
import { useCoarsePointer } from '@/lib/usePointer';
import { DivisionButton } from './DivisionButton';
import { DivisionPhoto } from './DivisionPhoto';
import { DivisionInfo } from './DivisionInfo';

/** Giro del isotipo: vuelta entera, ciclo de apertura y reposo, en segundos. */
const LOGO_MOTION = { spin: 9, assemble: 15, hold: 2.2 } as const;

/**
 * Hero Labs/Tech de la HOME (bloque 01).
 *
 * **Pivote 2026-09-05 — de oscuro a claro.** El hero deja de ser dos
 * fotografías a sangre teñidas de teal y magenta (lectura anaglífica, ver
 * `DivisionPhoto`) y pasa a fondo blanco: titular en azul corporativo
 * arriba, los dos isotipos 3D grandes en el centro, dos botones sólidos y,
 * al pie, las fotografías a color real dentro de paneles con radio y sombra
 * del sistema. El color entra por los isotipos, los botones y las fotos, no
 * por superficie.
 *
 * La coreografía no cambia. Al activar una división:
 * - su panel de foto y su ranura de isotipo se llevan el ancho completo
 *   (`--half-basis`) y los de la otra se repliegan;
 * - el isotipo se reduce a tamaño de firma —a tamaño de reposo, claim,
 *   párrafo y seis servicios no caben en pantalla—;
 * - aparecen el claim sobre los botones y la información debajo.
 *
 * El sobrante vertical lo reparten tres espaciadores cuyo `flex-grow` se
 * interpola (`.hero-space`, globals.css); las ranuras de texto abren de
 * `0fr` a `1fr`, y Labs y Tech comparten celda de rejilla, así que cambiar
 * de división no desplaza nada.
 */
export function DivisionSplit({
  halves,
  info,
  eyebrow,
  title,
  subtitle,
}: {
  halves: readonly [DivisionHalfData, DivisionHalfData];
  info: Record<Division, DivisionInfoData>;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const [active, setActive] = useState<Division | null>(null);
  const coarse = useCoarsePointer();
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActive(null), []);

  // Táctil: sin puntero que pueda "salir del hero", el cierre lo da un toque
  // fuera. Con ratón esto no se monta — ahí manda `onMouseLeave`.
  useEffect(() => {
    if (!coarse || !active) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [coarse, active, close]);

  /** Mismo reparto para el isotipo y para la foto de cada división. */
  const basisOf = (id: Division) => (!active ? '50%' : active === id ? '100%' : '0%');

  return (
    <div
      ref={rootRef}
      data-active={active !== null}
      className="hero-copy relative flex min-h-[100svh] flex-col items-center bg-canvas px-6 pb-8 pt-28 text-center lg:px-10 lg:pb-10 lg:pt-0 2xl:px-16"
      // Al abandonar el conjunto del hero (no un botón suelto) se vuelve al
      // estado inicial: así el puntero puede bajar del botón a su texto sin
      // que este desaparezca a media lectura.
      onMouseLeave={coarse ? undefined : close}
      // Paridad de teclado: el área se cierra cuando el foco sale del hero.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      {/* Holgura fija bajo la navegación. */}
      <div aria-hidden className="hero-lead-space hidden lg:block" />

      <Eyebrow className="text-subtle">{eyebrow}</Eyebrow>

      <KineticHeading
        as="h1"
        text={title}
        className="mt-4 max-w-[68rem] text-[length:var(--text-display-compact)] font-semibold leading-[1.1] tracking-[-0.02em] text-blue lg:whitespace-nowrap"
      />

      {/* El subtítulo nombra las dos divisiones a la vez: una vez elegida
          una, sobra. Se pliega con la misma curva que todo lo demás. */}
      <div className="hero-slot w-full" data-open={active === null}>
        <div>
          <p className="mt-4 text-[length:var(--text-lead)] leading-[1.5] text-muted">{subtitle}</p>
        </div>
      </div>

      <div aria-hidden className="hero-space hidden lg:block" style={heroSpace(0.9, 0.5)} />

      {/* Banda de isotipos. Cada ranura replica el reparto de su división,
          así que el logo —centrado dentro de ella— cae en el centro de su
          mitad en reposo y en el centro del hero al activarse. */}
      <div className="hero-logos my-7 lg:my-0">
        {halves.map((half, i) => (
          <div key={half.id} className="hero-logo-slot" style={{ ['--half-basis' as string]: basisOf(half.id) }}>
            <LogoSpin
              logo={half.logoKey}
              poster={half.molecule}
              spin={LOGO_MOTION.spin}
              assemble={LOGO_MOTION.assemble}
              hold={LOGO_MOTION.hold}
              // Medio ciclo de desfase: se abren y se cierran alternándose,
              // no al unísono como un metrónomo.
              phase={i * 0.5}
              className="hero-logo"
              sizes="(max-width: 1024px) 160px, 320px"
            />
          </div>
        ))}
      </div>

      <div aria-hidden className="hero-space hidden lg:block" style={heroSpace(1, 0.24)} />

      {/* Claim de la división activa, justo encima de los botones. */}
      <div className="hero-slot w-full" data-open={active !== null}>
        <div>
          <div className="hero-stack pt-6">
            {halves.map((half) => (
              <h2
                key={half.id}
                id={`hero-claim-${half.id}`}
                className="hero-face text-[length:var(--text-hero-claim)] font-semibold leading-[1.2] tracking-[-0.015em] text-blue lg:whitespace-nowrap"
                data-active={active === half.id}
              >
                {half.claim}
              </h2>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-5 sm:gap-8 lg:gap-12 2xl:gap-16">
        {halves.map((half) => (
          <DivisionButton
            key={half.id}
            id={half.id}
            href={half.href}
            cta={half.cta}
            active={active === half.id}
            coarse={coarse}
            onActivate={() => setActive(half.id)}
          />
        ))}
      </div>

      {/* Información del área activa. `aria-live` la anuncia al abrirse con
          el teclado; la altura reservada es siempre la de Tech (la mayor),
          de modo que sus seis servicios nunca quedan cortados. */}
      <div className="hero-slot w-full" data-open={active !== null} aria-live="polite">
        <div>
          <div className="hero-stack pt-7">
            {halves.map((half) => (
              <DivisionInfo
                key={half.id}
                id={half.id}
                info={info[half.id]}
                active={active === half.id}
                onHover={() => setActive(half.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden className="hero-space hidden lg:block" style={heroSpace(1, 0.24)} />

      {/* Fotografías: a color real, contenidas en paneles con radio y sombra.
          Su altura cede al activar, que es cuando el texto necesita sitio. */}
      <div className="hero-photos mt-7 flex lg:mt-0">
        {halves.map((half) => (
          <DivisionPhoto key={half.id} {...half} activeDivision={active} />
        ))}
      </div>
    </div>
  );
}

/** Reparto del sobrante vertical de un espaciador: en reposo y al activar. */
function heroSpace(rest: number, activeGrow: number): React.CSSProperties {
  return { ['--grow-rest' as string]: rest, ['--grow-active' as string]: activeGrow };
}
