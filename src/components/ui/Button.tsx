import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'labs' | 'secondary' | 'onImage' | 'onDark';

/**
 * Pivote 2026-09-05: relleno sólido y sombra del sistema en lugar de
 * `brightness-90`, que en hover apagaba el color en vez de asentarlo. Cada
 * variante define reposo, hover y pulsado; el foco lo pone el anillo azul
 * global. `onDark` se conserva para las contadas franjas de color.
 */
const VARIANT: Record<Variant, string> = {
  primary:
    'bg-tech text-white shadow-[var(--shadow-1)] hover:bg-[color-mix(in_srgb,var(--color-tech)_88%,#000)] hover:shadow-[var(--shadow-2)] active:bg-[color-mix(in_srgb,var(--color-tech)_78%,#000)] active:shadow-[var(--shadow-1)]',
  labs:
    'bg-labs-ink text-white shadow-[var(--shadow-1)] hover:bg-[color-mix(in_srgb,var(--color-labs-ink)_88%,#000)] hover:shadow-[var(--shadow-2)] active:bg-[color-mix(in_srgb,var(--color-labs-ink)_78%,#000)] active:shadow-[var(--shadow-1)]',
  secondary:
    'border border-hairline-2 bg-canvas text-blue shadow-[var(--shadow-1)] hover:border-blue hover:shadow-[var(--shadow-2)] active:shadow-none',
  onImage: 'border border-white/70 text-white backdrop-blur-sm hover:bg-white hover:text-blue',
  onDark: 'border border-white/40 text-white hover:bg-white hover:text-blue',
};

interface ButtonProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

/** Botón único del sistema. Píldora, sombra corta y hover de 200 ms. */
export function Button({ href, variant = 'primary', className, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-10 py-[length:var(--btn-py)]',
        'text-[length:var(--text-small)] font-semibold tracking-[0.04em] leading-none',
        'transition-[background-color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-out-quart)]',
        'hover:-translate-y-px active:translate-y-0',
        VARIANT[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Enlace de texto con flecha. La flecha se desplaza 4 px en hover. */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn('group inline-flex items-center gap-2 text-[length:var(--text-small)] font-semibold', className)}>
      <span className="underline decoration-1 underline-offset-[6px] group-hover:decoration-2">{children}</span>
      <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
    </Link>
  );
}
