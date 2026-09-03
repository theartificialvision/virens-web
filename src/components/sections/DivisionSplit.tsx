'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Division, DivisionHalfData, DivisionInfoData } from '@/lib/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { KineticHeading } from '@/components/ui/KineticHeading';
import { useCoarsePointer } from '@/lib/usePointer';
import { DivisionButton } from './DivisionButton';
import { DivisionHalf } from './DivisionHalf';
import { DivisionInfo } from './DivisionInfo';

/**
 * Hero Labs/Tech de la HOME (bloque 01, sustituye al vídeo). Mitad y mitad a
 * sangre, cada lado con el tono de su marca y su isotipo; sobre la costura,
 * un único bloque de texto centrado con los dos botones.
 *
 * **2026-09-04, tercera vuelta.** El hero pasa de "dos botones que tiñen" a
 * "dos botones que abren":
 *
 * - **Reposo:** rótulo, H1 compartido, subtítulo y los dos botones,
 *   centrados. Los botones se separan de verdad (de 16 px a 24/40/56/80 px
 *   según ancho): son dos opciones distintas, no un par.
 * - **Activo:** el H1 sube a la franja alta del hero —dentro de la
 *   composición, sin scroll y sin llegar a la navegación—, en su hueco
 *   aparece «Contract Manufacturing» o «Contract Development» pegado encima
 *   de los botones, y debajo se despliega la información de esa división.
 *
 * El movimiento es una sola transición contenida, no un cambio de pantalla:
 * el bloque vive en una columna flex con dos espaciadores cuyo `flex-grow`
 * se anima (`.hero-copy`, globals.css). En reposo reparten el sobrante a
 * partes iguales —de ahí el centrado—; al activar, el de arriba se apaga y
 * la columna se apoya en su holgura mínima (`--hero-lead-min`), por debajo
 * de los isotipos. Nada salta: es la misma columna moviéndose.
 *
 * Tipografía unificada (petición del cliente): fuera la serif del H1, todo
 * el hero en la sans del sistema con una sola escala —H1
 * `--text-display-compact`, claim `--text-hero-claim`, subtítulo
 * `--text-lead`, cuerpo `--text-body`, servicios y botones `--text-small`—.
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

  return (
    <div
      ref={rootRef}
      className="division-split relative flex flex-col lg:h-[100svh] lg:min-h-[49rem] lg:flex-row"
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
        <div aria-hidden className="hero-lead-space hidden lg:block" />

        {/* En mobile el logo del header queda justo encima y repetiría este
            rótulo: solo se muestra en desktop. */}
        <Eyebrow className="hidden text-white/70 lg:block">{eyebrow}</Eyebrow>

        {/* Único H1 real de la página. Sans del sistema (antes serif) y a un
            tamaño que entra en una sola línea entre las dos moléculas. */}
        <KineticHeading
          as="h1"
          text={title}
          className="mt-4 max-w-[68rem] text-[length:var(--text-display-compact)] font-semibold leading-[1.1] tracking-[-0.02em] lg:whitespace-nowrap"
        />

        {/* El subtítulo nombra las dos divisiones a la vez: una vez elegida
            una, sobra. Se pliega con la misma curva que todo lo demás en vez
            de quedarse compitiendo con el claim. */}
        <div className="hero-slot w-full" data-open={active === null}>
          <div>
            <p className="mt-4 text-[length:var(--text-lead)] leading-[1.5] text-white/90">{subtitle}</p>
          </div>
        </div>

        {/* Hueco que deja el H1 al subir: aquí entra el claim de la división
            activa, justo encima de los botones. Las dos variantes se apilan
            en la misma celda, así que cambiar de LABS a TECH no altera la
            altura ni desplaza los botones. */}
        <div className="hero-slot w-full" data-open={active !== null}>
          <div>
            <div className="hero-stack pt-7">
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

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 2xl:gap-20">
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
            <div className="hero-stack pt-8">
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

        <div aria-hidden className="hidden lg:block lg:grow" />
      </div>

      <DivisionHalf {...halves[0]} side="left" activeDivision={active} />
      <DivisionHalf {...halves[1]} side="right" activeDivision={active} />
    </div>
  );
}
