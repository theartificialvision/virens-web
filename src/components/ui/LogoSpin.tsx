'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { LogoSpinHandle } from '@/lib/logoSpin';
import type { LogoKey } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Isotipo 3D en vivo (WebGL). Sustituye al PNG estático el 2026-09-04, con la
 * versión con giro que aportó el cliente.
 *
 * Tres decisiones que hacen que esto no cueste el LCP (CLAUDE.md regla 9):
 *
 * - **El motor se carga con `import()` dinámico**, así que `three` viaja en un
 *   chunk aparte que el navegador pide DESPUÉS del primer pintado. El HTML
 *   inicial no lo espera.
 * - **El PNG original hace de póster** debajo del canvas: es lo que se ve
 *   mientras three.js llega, y se queda para siempre si el equipo no tiene
 *   WebGL o si falla la carga. Nunca hay hueco vacío ni salto de layout — el
 *   contenedor tiene tamaño propio y el canvas se superpone.
 * - **`sizes` acotado** para que el póster pese lo mínimo.
 *
 * El motor pausa solo fuera de pantalla y respeta `prefers-reduced-motion`
 * (ahí pinta un fotograma y no abre bucle).
 */
export function LogoSpin({
  logo,
  poster,
  spin,
  assemble,
  hold,
  phase = 0,
  glow,
  branded = false,
  className,
  posterClassName,
  sizes,
}: {
  logo: LogoKey;
  /** PNG original del cliente: póster y alternativa sin WebGL. Sin póster
   *  (hero de Labs/Tech, 24/09/2026), el hueco queda vacío y el 3D entra con
   *  un fundido: el PNG es el isotipo antiguo en color y se veía un instante
   *  antes del vidrio blanco. */
  poster?: string;
  spin: number;
  assemble: number;
  hold: number;
  phase?: number;
  /** Color del contraluz: un halo radial difuso detrás del isotipo, para que
   *  el volumen metálico asiente sobre la fotografía en vez de flotar. */
  glow?: string;
  /** `true` devuelve al isotipo su degradado de marca; `false` lo deja en el
   *  vidrio blanco de reposo. El color aparece solo cuando su division se
   *  abre (06/09 (9)), y vuelve la rampa entera, no una tinta plana (10). */
  branded?: boolean;
  className?: string;
  /** Ajuste del póster para que coincida con la huella del 3D: el motor deja
   *  holgura para la pose abierta y el PNG no, así que en logos pequeños el
   *  póster se reduce para que el relevo no se note. */
  posterClassName?: string;
  sizes: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<LogoSpinHandle | null>(null);
  // El motor puede montarse cuando la division ya esta abierta (carga diferida):
  // este ref lleva el estado vigente para aplicarlo nada mas nacer.
  const brandedRef = useRef(branded);
  brandedRef.current = branded;
  const [live, setLive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let handle: LogoSpinHandle | null = null;
    let cancelled = false;

    // El paralaje de puntero no tiene sentido —ni coste que valga la pena— en
    // un dispositivo táctil.
    const pointer = window.matchMedia('(hover: hover)').matches;

    import('@/lib/logoSpin')
      .then(({ mountLogoSpin }) => {
        if (cancelled) return;
        handle = mountLogoSpin(host, { logo, spin, assemble, hold, phase, pointer });
        handleRef.current = handle;
        // De golpe: el primer fotograma ya lleva el color vigente.
        handle.setBranded(brandedRef.current, true);
        setLive(true);
      })
      .catch(() => {
        // Sin WebGL o con el chunk caído: se queda el póster, que ya está
        // pintado. No hay nada que recuperar ni que avisar al usuario.
      });

    handleRef.current = null;
    return () => {
      cancelled = true;
      handle?.dispose();
      handleRef.current = null;
      setLive(false);
    };
    // `branded` fuera a proposito: cambiarlo NO debe remontar el motor —
    // reiniciaria el giro y el ciclo de apertura, y el isotipo daria un salto
    // en cada cambio de division. Lo aplica el efecto de abajo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logo, spin, assemble, hold, phase]);

  useEffect(() => {
    handleRef.current?.setBranded(branded);
  }, [branded]);

  return (
    <span className={cn('relative block', className)}>
      {/* Contraluz (2026-09-04): radial del color de la división, difuso y
          por debajo del póster y del canvas. Sutil a propósito — es lo que
          integra el metal en la foto, no un efecto en sí mismo. */}
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 scale-[1.6] rounded-full opacity-55 blur-3xl"
          style={{ background: `radial-gradient(circle at 50% 55%, ${glow} 0%, transparent 58%)` }}
        />
      )}
      {poster ? (
        <Image
          src={poster}
          alt=""
          width={512}
          height={512}
          sizes={sizes}
          className={cn(
            'absolute inset-0 size-full object-contain transition-opacity duration-500',
            live ? 'opacity-0' : 'opacity-100',
            posterClassName,
          )}
        />
      ) : null}
      <span
        ref={hostRef}
        aria-hidden
        className={cn(
          'absolute inset-0 block',
          !poster && 'transition-opacity duration-700',
          !poster && !live && 'opacity-0',
        )}
      />
    </span>
  );
}
