import { LogoSpin } from '@/components/ui/LogoSpin';
import { cn } from '@/lib/utils';

/**
 * Isotipo 3D pequeño para los lockups de la home V2 —cabecera y pie—
 * (23/09/2026, decisión del cliente). Es el mismo motor que los isotipos
 * grandes de V1 (`LogoSpin`): el PNG de marca hace de póster mientras llega
 * three.js y se queda si no hay WebGL, así que la cabecera nunca aparece sin
 * logo ni cambia de tamaño.
 *
 * Diferencias con el uso grande, pensadas para un logo de 40–56 px que está a
 * la vista todo el rato:
 * - `branded`: con su rampa de color. El vidrio blanco de V1 desaparece sobre
 *   la cabecera blanca, y en el pie es lo que distingue Labs de Tech.
 * - Giro y ciclo de apertura más lentos que en los héroes: se tiene que
 *   notar que está vivo sin llamar la atención cada segundo.
 * - Labs y Tech desfasados medio ciclo para que en el pie no vayan a la par.
 */
const MARK = {
  labs: { logo: 'B', poster: '/img/labs-molecule.png', phase: 0 },
  tech: { logo: 'A', poster: '/img/tech-molecule.png', phase: 0.5 },
} as const;

export function Isotipo3D({ division, className }: { division: 'labs' | 'tech'; className?: string }) {
  const mark = MARK[division];
  return (
    <LogoSpin
      logo={mark.logo}
      poster={mark.poster}
      spin={16}
      assemble={28}
      hold={6}
      phase={mark.phase}
      branded
      className={cn('shrink-0', className)}
      posterClassName="scale-[0.62]"
      sizes="64px"
    />
  );
}
