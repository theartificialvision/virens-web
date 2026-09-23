import { cn } from '@/lib/utils';
import { GalenicGlyph } from '@/components/ui/GalenicGlyph';

/**
 * Iconografía del bloque "Formas galénicas": glifo definitivo del cliente
 * (`GalenicGlyph`, mismo juego que la página de Virens Labs), incluidos los
 * dos de acondicionamiento que V1 no tenía: encapsulado automático y envasado
 * en frasco. Sin círculo desde el 23/09/2026 (decisión del cliente): el
 * contorno restaba tamaño al dibujo, que es lo que tiene que leerse.
 */
export function GalenicIcon({ name, className }: { name: string; className?: string }) {
  return (
    <GalenicGlyph
      name={name}
      className={cn('size-[var(--v2-galenic-icon)] shrink-0', className)}
    />
  );
}

/**
 * Icono de bloque dentro de un círculo. Dos variantes, las dos de la maqueta:
 * `solid` (disco azul, glifo en blanco) para Private Label / Full service, y
 * `outline` (solo filete) para el cierre de contacto.
 */
export function CircleIcon({
  name,
  variant = 'outline',
  className,
}: {
  name: 'flask' | 'box' | 'chat';
  variant?: 'solid' | 'outline';
  className?: string;
}) {
  const GLYPH: Record<string, React.ReactNode> = {
    flask: (
      <>
        <path d="M19 6h10" />
        <path d="M21 6v11.5L13.5 34a4 4 0 003.6 5.7h13.8a4 4 0 003.6-5.7L27 17.5V6" />
        <path d="M17.2 27h13.6" />
      </>
    ),
    // Full service (23/09/2026): caja de envío en isométrica con el precinto.
    // Sustituye al apretón de manos, que a 37 px no se leía. Dice «producto
    // final listo para el mercado», que es lo que ofrece el servicio, y hace
    // pareja con el matraz de Private Label: un objeto, mismo trazo.
    box: (
      <>
        <path d="M24 6.5l15 7.5v19.5L24 41 9 33.5V14z" />
        <path d="M9 14l15 7.5L39 14" />
        <path d="M24 21.5V41" />
        <path d="M16.5 10.25l15 7.5v6.5" />
      </>
    ),
    chat: (
      <>
        <path d="M11 12h26a3 3 0 013 3v15a3 3 0 01-3 3H24l-8 7v-7h-5a3 3 0 01-3-3V15a3 3 0 013-3z" />
        <path d="M18 20h12M18 26h8" />
      </>
    ),
  };

  return (
    <span
      className={cn(
        'flex size-[var(--v2-block-icon)] shrink-0 items-center justify-center rounded-full',
        variant === 'solid' ? 'bg-blue text-white' : 'border border-current',
        className,
      )}
    >
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-[52%]">
        {GLYPH[name]}
      </svg>
    </span>
  );
}
