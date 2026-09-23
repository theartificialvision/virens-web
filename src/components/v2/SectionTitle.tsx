import { cn } from '@/lib/utils';

/**
 * Título de sección de la home V2. Único estilo para todos los bloques
 * (23/09/2026, decisión del cliente): antes convivían tres tamaños —h2 en
 * formas galénicas y capacidad, h3 en Private Label / Full service y en el
 * CTA, y cuerpo pequeño en áreas terapéuticas—. Cualquier bloque nuevo usa
 * este componente en lugar de repetir clases.
 */
export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn('text-[length:var(--text-h2)] font-medium leading-tight tracking-[-0.015em]', className)}>
      {children}
    </h2>
  );
}
