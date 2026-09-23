import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Título de sección de la home V2. Único estilo para todos los bloques
 * (23/09/2026, decisión del cliente): antes convivían tres tamaños —h2 en
 * formas galénicas y capacidad, h3 en Private Label / Full service y en el
 * CTA, y cuerpo pequeño en áreas terapéuticas—. Cualquier bloque nuevo usa
 * este componente en lugar de repetir clases.
 *
 * `accent` antepone el filete teal de la maqueta; al entrar en pantalla crece
 * de izquierda a derecha justo después del título (`.v2-accent`).
 */
export function SectionTitle({
  children,
  accent = false,
  className,
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      {accent ? <span aria-hidden className="v2-accent block h-[3px] w-14 bg-labs" /> : null}
      <h2
        className={cn(
          'text-[length:var(--text-h2)] font-medium leading-tight tracking-[-0.015em]',
          accent && 'mt-6',
        )}
      >
        {children}
      </h2>
    </Reveal>
  );
}
