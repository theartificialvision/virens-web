import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'labs' | 'secondary' | 'onImage' | 'onDark';

/**
 * 07/09 (21): los CTA pasan al material `.glass` del sistema, el mismo de los
 * botones del hero, el trigger y la franja del menu.
 *
 * El color de marca NO se pierde: se convierte en el CUERPO del vidrio, con un
 * porcentaje alto (86-88 %). Es la diferencia entre un CTA y los botones del
 * hero: alli el vidrio identifica y basta un 24 %; aqui el boton tiene que
 * pesar como accion principal, asi que el color manda y el vidrio solo le pone
 * el filo especular, el reflejo y la sombra de contacto.
 *
 * `relative` explicito porque `.glass` ya no posiciona (ver globals.css).
 */
const VARIANT: Record<Variant, string> = {
  primary: 'glass relative text-white [--glass-body:color-mix(in_srgb,var(--color-tech)_88%,transparent)] [--glass-body-strong:var(--color-tech)]',
  labs: 'glass relative text-white [--glass-body:color-mix(in_srgb,var(--color-labs)_88%,transparent)] [--glass-body-strong:var(--color-labs)]',
  // Secundario: vidrio de verdad, casi sin cuerpo. Sobre fondo claro tiñe de
  // azul (`glass-ink`), que si no desaparece.
  secondary: 'glass glass-ink relative text-blue',
  onImage: 'glass relative text-white [--glass-body:rgba(255,255,255,0.16)]',
  onDark: 'glass relative text-white [--glass-body:rgba(255,255,255,0.12)]',
};

interface ButtonProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

/** Botón único del sistema. Radio 999px, hover de 200 ms (§10.5). Desde el
 *  07/09 lleva el material `.glass`, así que la "sombra" que tiene es la de
 *  contacto del material, no una sombra decorativa. */
export function Button({ href, variant = 'primary', className, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-10 py-[length:var(--btn-py)]',
        'text-[length:var(--text-small)] font-semibold tracking-[0.04em] leading-none',
        'transition-all duration-200 ease-[var(--ease-out-quart)] hover:-translate-y-px',
        // Por encima del filo y el reflejo, que son absolutos.
        '[&>*]:relative [&>*]:z-[1]',
        // `.glass` transiciona el fondo pero no lo cambia solo: el estado de
        // hover lo declara quien usa el material.
        'hover:bg-[var(--glass-body-strong)]',
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
