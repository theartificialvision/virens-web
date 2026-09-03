import type { SectionTone } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Pivote 2026-09-05 (claro): el blanco es el fondo por defecto y `surface`
 * —un gris de 3 % — es el único descanso habitual. `blue`, `labs` y `tech`
 * quedan para golpes puntuales: una franja de color por página como mucho,
 * nunca dos seguidas. Con el blanco dominando, dos secciones blancas
 * consecutivas son lo normal; el ritmo lo dan el aire y la medida.
 */
const TONE: Record<SectionTone, string> = {
  white: 'bg-canvas text-blue',
  surface: 'bg-surface text-blue',
  blue: 'bg-blue text-white',
  // El teal plano da 3,24:1 con texto blanco; como superficie de sección se
  // usa la variante oscurecida (5,2:1), que pasa AA sin perder intensidad.
  labs: 'bg-labs-ink text-white',
  tech: 'bg-tech text-white',
};

const RHYTHM = {
  compact: 'py-[var(--section-compact)]',
  base: 'py-[var(--section-base)]',
  air: 'py-[var(--section-air)]',
} as const;

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  rhythm?: keyof typeof RHYTHM;
  className?: string;
  children: React.ReactNode;
}

/** Envoltorio de bloque: fondo, color de texto y ritmo vertical. */
export function Section({ id, tone = 'white', rhythm = 'base', className, children }: SectionProps) {
  return (
    <section id={id} className={cn(TONE[tone], RHYTHM[rhythm], className)}>
      {children}
    </section>
  );
}
