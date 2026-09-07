'use client';

import type { Division, DivisionHalfData } from '@/lib/types';
import { LogoSpin } from '@/components/ui/LogoSpin';


/**
 * Isotipos y wordmarks del hero (dirección 06/09/2026 (5)).
 *
 * Los isotipos 3D se conservan: los aportó el cliente y su decisión sigue
 * vigente. Lo que cambia el 06/09 (9) es su acabado: pasan a vidrio líquido
 * blanco. Y desde el 07/09 (17) lo son **en los dos estados**, también con su
 * división abierta — el color de división lo llevan el fondo, el filete y el
 * tinte del botón, así que el isotipo no tiene que repetirlo.
 */
export function DivisionMarks({ halves, brand, active }: {
  halves: readonly [DivisionHalfData, DivisionHalfData];
  brand: string;
  active: Division | null;
}) {
  return (
    <div className="home-marks">
      {halves.map((half) => (
        <div
          key={half.id}
          className="home-mark-slot"
          data-side={half.id}
          data-selected={active === half.id}
          data-hidden={active !== null && active !== half.id}
          aria-hidden={active !== null && active !== half.id}
        >
          <div className="home-mark" role="img" aria-label={half.name}>
            <LogoSpin
              logo={half.logoKey}
              poster={half.molecule}
              spin={12}
              assemble={18}
              hold={3}
              phase={half.id === 'labs' ? 0 : 0.5}
              // 07/09 (17): blancos SIEMPRE, tambien al abrir su division.
              // El 06/09 (10) se hizo justo lo contrario —recuperar la rampa de
              // marca al abrir— y el cliente lo ha revertido: quiere el isotipo
              // en vidrio blanco en los dos estados, igual que en los heroes de
              // Labs y Tech. La distincion entre divisiones ya la llevan el
              // fondo, el filete y el tinte del boton; el isotipo no tiene que
              // repetirla. `setBranded` sigue en el motor, sin uso: la decision
              // ha cambiado dos veces y borrarlo solo garantiza reescribirlo.
              branded={false}
              className="home-molecule"
              sizes="(max-width: 600px) 128px, (max-width: 1024px) 180px, 280px"
            />
            <span className="home-wordmark" aria-hidden="true">
              <span className="home-brand">{brand}</span>
              <span className="home-division">{half.cta}</span>
              <span className="home-rule" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
