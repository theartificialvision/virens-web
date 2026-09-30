'use client';

import { useEffect, useRef, useState } from 'react';

export type LabClipSources = { webm: string; mp4: string };

/**
 * Clip corto del vídeo corporativo sobre la foto de una fase del recorrido
 * (30/09/2026). La foto hace de póster: el clip entra fundiéndose cuando ya
 * está reproduciendo, así no hay salto si tarda en cargar.
 *
 * - Solo en ≥768 px: en móvil no se descarga ni se reproduce (regla 9).
 * - `preload="none"`: no pide nada hasta que su fase está activa.
 * - Con `prefers-reduced-motion` se queda la foto (regla 8, comprobado en JS).
 * - Sigue al recorrido: si el recorrido se pausa (botón, foco de teclado,
 *   pestaña oculta o fuera de pantalla), el clip también (WCAG 2.2.2).
 */
export function LabClip({ clip, active, paused, reduced }: {
  clip: LabClipSources;
  active: boolean;
  paused: boolean;
  reduced: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    if (!active || reduced || !wide) {
      video.pause();
      setPlaying(false);
      return;
    }
    if (paused) {
      video.pause();
      return;
    }
    video.play().catch(() => setPlaying(false));
    return () => video.pause();
  }, [active, paused, reduced]);

  // Al salir de su fase vuelve al inicio, para que la próxima entrada arranque limpia.
  useEffect(() => {
    if (!active && ref.current) ref.current.currentTime = 0;
  }, [active]);

  return (
    <video
      ref={ref}
      className="lab-clip"
      data-playing={playing || undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
    >
      <source src={clip.webm} type="video/webm" />
      <source src={clip.mp4} type="video/mp4" />
    </video>
  );
}
