import type { SectionTone } from '@/lib/types';
import { cn } from '@/lib/utils';

const TONE: Record<SectionTone, string> = {
  white: 'bg-white text-blue',
  gray: 'bg-gray-100 text-blue',
  // 07/09 (18): tercer fondo claro. Con solo blanco y gris, una pagina de diez
  // bloques no puede alternar sin repetir; este da el respiro azul sin volver
  // al fondo oscuro.
  soft: 'bg-blue-soft text-blue',
  blue: 'bg-blue text-white',
  labs: 'bg-labs text-white',
  tech: 'bg-tech text-white',
  // Pivote oscuro 2026-09-01 (Home/Labs/Tech) — ver CLAUDE.md regla 4/7.
  ink: 'bg-ink text-white',
  surface: 'bg-surface text-white',
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

/**
 * Envoltorio de bloque. El ritmo de la página se compone alternando `tone`:
 * nunca dos secciones consecutivas con el mismo fondo.
 */
export function Section({ id, tone = 'white', rhythm = 'base', className, children }: SectionProps) {
  return (
    <section id={id} className={cn(TONE[tone], RHYTHM[rhythm], className)}>
      {children}
    </section>
  );
}
