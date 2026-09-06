import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Mismo cubic-bezier que --ease-out-quart (globals.css), para Framer Motion. */
export const EASE_OUT_QUART = [0.4, 0, 0.2, 1] as const;
