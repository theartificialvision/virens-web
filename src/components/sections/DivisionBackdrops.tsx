'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Division, DivisionHalfData } from '@/lib/types';

/**
 * Fondos del hero de Home (dirección 06/09/2026 (5)).
 *
 * Solo foto en blanco y negro + un velo neutro único (ver `.home-shade` en
 * globals.css). El color de división ya no baña la escena: vive como señal
 * puntual en el filete bajo cada wordmark y en el brillo del botón activo.
 * Sin duotono, sin líquido, sin campo WebGL, sin respiración — la foto es la
 * prueba y tiene que leerse como tal.
 */
export function DivisionBackdrops({ halves, presentationImage, active }: {
  halves: readonly [DivisionHalfData, DivisionHalfData];
  presentationImage: { src: string; alt: string };
  active: Division | null;
}) {
  // Los tres fondos ocupan el viewport entero, así que `loading="lazy"` no los
  // aplazaría: para el navegador ya están a la vista aunque su opacidad sea 0.
  // El aplazamiento tiene que ser de montaje. El azul es el LCP y entra con
  // `priority`; Labs y Tech se montan cuando el hilo principal queda libre —
  // mucho antes de que nadie pueda pulsar, así que el cambio sigue sin parpadeo.
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if (typeof window.requestIdleCallback !== 'function') {
      const timer = window.setTimeout(() => setIdle(true), 1200);
      return () => window.clearTimeout(timer);
    }
    const handle = window.requestIdleCallback(() => setIdle(true), { timeout: 3000 });
    return () => window.cancelIdleCallback(handle);
  }, []);

  const backgrounds = [
    { id: 'home', image: presentationImage },
    ...halves.map(({ id, image }) => ({ id, image })),
  ];

  return (
    <div className="home-backdrops" aria-hidden="true">
      {backgrounds.map(({ id, image }) => {
        // `active === id` cubre el clic que llega antes del hueco de idle:
        // ahí el fondo se monta ya, sin esperar.
        const mounted = id === 'home' || idle || active === id;
        return (
          <div key={id} className="home-backdrop" data-scene={id} data-visible={(active ?? 'home') === id}>
            {mounted && (
              <Image
                src={image.src}
                alt=""
                fill
                priority={id === 'home'}
                sizes="100vw"
                quality={90}
                className="home-photo"
              />
            )}
            {/* Gradacion de color. Va DESPUES de la foto y en este orden:
                `grade` levanta las sombras y `glow` mete la saturacion en los
                medios. Entre posicionados sin z-index manda el orden del arbol,
                asi que invertirlas cambia el resultado. */}
            <div className="home-grade" />
            <div className="home-glow" />
          </div>
        );
      })}
      {/* Velo neutro único, fuera de las escenas: no cambia con la división,
          así que no tiene por qué vivir dentro de cada backdrop. */}
      <div className="home-shade" />
    </div>
  );
}
