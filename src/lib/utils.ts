import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const divisionColor = { labs: 'var(--color-labs)', tech: 'var(--color-tech)' } as const;
/** Variante oscurecida del acento: la plana no pasa contraste como texto sobre blanco. */
export const divisionInk = { labs: 'var(--color-labs-ink)', tech: 'var(--color-tech-ink)' } as const;
/** Fondo de apoyo muy claro de cada división, para realces de celda. */
export const divisionSoft = { labs: 'var(--color-labs-soft)', tech: 'var(--color-tech-soft)' } as const;

/** Mismo cubic-bezier que --ease-out-quart (globals.css), para Framer Motion. */
export const EASE_OUT_QUART = [0.4, 0, 0.2, 1] as const;
