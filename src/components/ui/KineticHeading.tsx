import type { CSSProperties } from 'react';

/** Entrada única del titular: se lee completo desde el primer momento.
 * Sin fragmentar palabras ni esperar una cadena de animaciones en móvil.
 * prefers-reduced-motion se resuelve en el CSS de heading-enter.
 */
export function KineticHeading({ as: Tag = 'h1', text, className = '', delay = 0 }: {
  as?: 'h1' | 'h2' | 'h3';
  text: string;
  className?: string;
  delay?: number;
}) {
  return <Tag className={`heading-enter ${className}`}
    style={{ animationDelay: `${Math.min(delay, 0.12)}s` } as CSSProperties}>{text}</Tag>;
}
