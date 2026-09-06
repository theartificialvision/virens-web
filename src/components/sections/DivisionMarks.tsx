'use client';

import type { Division, DivisionHalfData } from '@/lib/types';
import { LogoSpin } from '@/components/ui/LogoSpin';


/**
 * Isotipos y wordmarks del hero (dirección 06/09/2026 (5)).
 *
 * Los isotipos 3D se conservan: los aportó el cliente y su decisión sigue
 * vigente. Lo que cambia el 06/09 (9) es su acabado — pasan a vidrio líquido
 * blanco y **solo recuperan su color cuando esa división se abre**. Y lo que
 * vuelve es su degradado de marca original, entero, no una tinta plana (10).
 * En reposo la escena es monocroma; el color no decora, responde al gesto.
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
              branded={active === half.id}
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
