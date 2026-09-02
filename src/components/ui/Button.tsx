import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'labs' | 'secondary' | 'onImage' | 'onDark';

const VARIANT: Record<Variant, string> = {
  primary: 'bg-tech text-white hover:brightness-90',
  labs: 'bg-labs text-white hover:brightness-90',
  secondary: 'border border-blue text-blue hover:bg-blue hover:text-white',
  onImage: 'border border-white/70 text-white hover:bg-white hover:text-blue',
  // Pivote 2026-09-01 — sobre fondos ink/surface del sistema oscuro.
  onDark: 'border border-white/30 text-white hover:bg-white/10',
};

interface ButtonProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

/** Botón único del sistema. Radio 999px, sin sombra, hover de 200 ms (§10.5). */
export function Button({ href, variant = 'primary', className, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-10 py-[length:var(--btn-py)]',
        'text-[length:var(--text-small)] font-semibold tracking-[0.04em] leading-none',
        'transition-all duration-200 ease-[var(--ease-out-quart)] hover:-translate-y-px',
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
