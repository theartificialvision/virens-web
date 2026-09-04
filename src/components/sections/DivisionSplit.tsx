'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Division, DivisionHalfData, DivisionInfoData } from '@/lib/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { KineticHeading } from '@/components/ui/KineticHeading';
import { LogoSpin } from '@/components/ui/LogoSpin';
import { useCoarsePointer } from '@/lib/usePointer';
import { divisionGlow } from '@/lib/utils';
import { DivisionButton } from './DivisionButton';
import { DivisionHalf } from './DivisionHalf';
import { DivisionInfo } from './DivisionInfo';

/** Giro del isotipo: vuelta entera, ciclo de apertura y reposo, en segundos. */
const LOGO_MOTION = { spin: 8, assemble: 14, hold: 1.8 } as const;

/**
 * Hero Labs/Tech de la HOME (bloque 01, sustituye al vídeo). Mitad y mitad a
 * sangre, cada lado con el tono de su marca; sobre la costura, un único bloque
 * de texto centrado con los dos isotipos y los dos botones.
 *
 * **2026-09-04, cuarta vuelta.** El titular deja de estar centrado y se ancla
 * arriba; el centro pasa a ser de los isotipos, ahora en 3D y girando
 * (`LogoSpin`). Cada isotipo vive en una ranura que replica el reparto de las
 * mitades (`--half-basis`): en reposo cae en el centro de SU mitad y, cuando
 * su división se lleva el ancho completo, queda centrado en todo el hero.
 *
 * Al activar una división el isotipo se reduce a tamaño de firma. No es
 * capricho: con el logo a tamaño de reposo, el claim, el párrafo y los seis
 * servicios de Tech se salen de la pantalla en cualquier portátil, y que esos
 * seis servicios se lean enteros es requisito explícito.
 *
 * El movimiento sigue siendo una sola transición contenida: la columna reparte
 * su sobrante entre tres espaciadores cuyo `flex-grow` se interpola
 * (`.hero-space`, globals.css), y las ranuras de texto abren de `0fr` a `1fr`.
 * Labs y Tech comparten celda de rejilla, así que cambiar de división no
 * desplaza nada.
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

  /** Mismo reparto que las mitades, para que el isotipo viaje con su lado. */
  const basisOf = (id: Division) => (!active ? '50%' : active === id ? '100%' : '0%');

  return (
    <div
      ref={rootRef}
      className="division-split relative flex flex-col lg:h-[100svh] lg:min-h-[50rem] lg:flex-row"
      // Al abandonar el conjunto del hero (no un botón suelto) se vuelve al
      // estado inicial: así el puntero puede bajar del botón a su texto sin
      // que este desaparezca a media lectura.
      onMouseLeave={coarse ? undefined : close}
      // Paridad de teclado: el área se cierra cuando el foco sale del hero,
      // no al abandonar el botón — el mismo criterio que con el ratón.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      {/* Mobile: banda normal, primero en el flujo (antes de las fotos) — el
          titular/CTA es lo primero que se lee. Desktop (lg): fuera del flujo,
          centrada sobre la costura, así que el orden del DOM deja de importar
          ahí (el z-10 fija el apilado). */}
      <div
        data-active={active !== null}
        className="hero-copy relative z-10 flex flex-col items-center bg-ink px-6 py-10 text-center text-white lg:absolute lg:inset-0 lg:bg-transparent lg:py-0"
      >
        {/* Holgura fija bajo la navegación: el titular vive arriba, en reposo
            y activo, así que este espaciador ya no crece. */}
        <div aria-hidden className="hero-lead-space hidden lg:block" />

        {/* En mobile el logo del header queda justo encima y repetiría este
            rótulo: solo se muestra en desktop. */}
        <Eyebrow className="hidden text-white/70 lg:block">{eyebrow}</Eyebrow>

        <KineticHeading
          as="h1"
          text={title}
          className="mt-4 max-w-[68rem] text-[length:var(--text-display-compact)] font-semibold leading-[1.1] tracking-[-0.02em] lg:whitespace-nowrap"
        />

        {/* El subtítulo nombra las dos divisiones a la vez: una vez elegida
            una, sobra. Se pliega con la misma curva que todo lo demás. */}
        <div className="hero-slot w-full" data-open={active === null}>
          <div>
            <p className="mt-4 text-[length:var(--text-lead)] leading-[1.5] text-white/90">{subtitle}</p>
          </div>
        </div>

        <div aria-hidden className="hero-space hidden lg:block" style={heroSpace(0.66, 0.5)} />

        {/* Banda de isotipos. Cada ranura replica el reparto de su mitad, así
            que el centrado horizontal del logo dentro de ella lo lleva al
            centro de la mitad en reposo y al centro del hero al activarse. */}
        <div className="hero-logos my-8 lg:my-0">
          {halves.map((half, i) => (
            <div
              key={half.id}
              className="hero-logo-slot"
              style={{ ['--half-basis' as string]: basisOf(half.id) }}
            >
              <LogoSpin
                logo={half.logoKey}
                poster={half.molecule}
                spin={LOGO_MOTION.spin}
                assemble={LOGO_MOTION.assemble}
                hold={LOGO_MOTION.hold}
                // Medio ciclo de desfase entre los dos: se abren y se cierran
                // alternándose, no al unísono como un metrónomo.
                phase={i * 0.5}
                glow={divisionGlow[half.id]}
                className="hero-logo"
                sizes="(max-width: 1024px) 160px, 352px"
              />
            </div>
          ))}
        </div>

        <div aria-hidden className="hero-space hidden lg:block" style={heroSpace(1, 0.28)} />

        {/* Claim de la división activa, justo encima de los botones. Las dos
            variantes se apilan en la misma celda, así que cambiar de LABS a
            TECH no altera la altura ni desplaza los botones. */}
        <div className="hero-slot w-full" data-open={active !== null}>
          <div>
            <div className="hero-stack pt-5">
              {halves.map((half) => (
                <h2
                  key={half.id}
                  id={`hero-claim-${half.id}`}
                  className="hero-face text-[length:var(--text-hero-claim)] font-semibold leading-[1.2] tracking-[-0.015em] text-white lg:whitespace-nowrap"
                  data-active={active === half.id}
                >
                  {half.claim}
                </h2>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 2xl:gap-20">
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
            <div className="hero-stack pt-5">
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

        <div aria-hidden className="hero-space hidden lg:block" style={heroSpace(1, 0.12)} />
      </div>

      <DivisionHalf {...halves[0]} side="left" activeDivision={active} />
      <DivisionHalf {...halves[1]} side="right" activeDivision={active} />
    </div>
  );
}

/** Reparto del sobrante vertical de un espaciador: en reposo y al activar. */
function heroSpace(rest: number, activeGrow: number): React.CSSProperties {
  return { ['--grow-rest' as string]: rest, ['--grow-active' as string]: activeGrow };
}
