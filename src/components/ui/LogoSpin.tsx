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
  tint = null,
  className,
  sizes,
}: {
  logo: LogoKey;
  /** PNG original del cliente: póster y alternativa sin WebGL. */
  poster: string;
  spin: number;
  assemble: number;
  hold: number;
  phase?: number;
  /** Color del contraluz: un halo radial difuso detrás del isotipo, para que
   *  el volumen metálico asiente sobre la fotografía en vez de flotar. */
  glow?: string;
  /** Color al que vira el isotipo. `null` lo deja en blanco, que es el reposo
   *  desde el 06/09 (9): el color aparece solo cuando su division se abre. */
  tint?: string | null;
  className?: string;
  sizes: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<LogoSpinHandle | null>(null);
  // El motor puede montarse cuando la division ya esta abierta (carga diferida):
  // este ref lleva el tinte vigente para aplicarlo nada mas nacer.
  const tintRef = useRef<string | null>(tint);
  tintRef.current = tint;
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
        handle.setTint(tintRef.current);
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
    // `tint` fuera a proposito: cambiarlo NO debe remontar el motor —
    // reiniciaria el giro y el ciclo de apertura, y el isotipo daria un salto
    // en cada cambio de division. Lo aplica el efecto de abajo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logo, spin, assemble, hold, phase]);

  useEffect(() => {
    handleRef.current?.setTint(tint);
  }, [tint]);

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
      <Image
        src={poster}
        alt=""
        width={512}
        height={512}
        sizes={sizes}
        className={cn(
          'absolute inset-0 size-full object-contain transition-opacity duration-500',
          live ? 'opacity-0' : 'opacity-100',
        )}
      />
      <span ref={hostRef} aria-hidden className="absolute inset-0 block" />
    </span>
  );
}
