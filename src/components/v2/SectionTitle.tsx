import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Título de sección de la home V2. Único estilo para todos los bloques
 * (23/09/2026, decisión del cliente): antes convivían tres tamaños —h2 en
 * formas galénicas y capacidad, h3 en Private Label / Full service y en el
 * CTA, y cuerpo pequeño en áreas terapéuticas—. Cualquier bloque nuevo usa
 * este componente en lugar de repetir clases.
 *
 * Desde el 29/09/2026 (cliente: «los títulos de sección todos con el mismo
 * tamaño y formato, con línea arriba del texto») el filete teal va SIEMPRE;
 * al entrar en pantalla crece de izquierda a derecha (`.v2-accent`). Sobre
 * fondo teal el filete va en blanco (`rule="white"`) para que se vea.
 */
export function SectionTitle({
  children,
  rule = 'labs',
  id,
  className,
}: {
  children: React.ReactNode;
  rule?: 'labs' | 'white';
  id?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <span aria-hidden className={cn('v2-accent block h-[3px] w-14', rule === 'white' ? 'bg-white' : 'bg-labs')} />
      <h2
        id={id}
        className="mt-6 text-[length:var(--text-h2)] font-medium leading-tight tracking-[-0.015em]"
      >
        {children}
      </h2>
    </Reveal>
  );
}
