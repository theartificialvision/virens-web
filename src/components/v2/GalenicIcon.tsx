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
  };

  if (name === 'chat') return <ChatIcon variant={variant} className={className} />;

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

/**
 * Icono del CTA «¿Hablamos de tu proyecto?» (23/09/2026): diseño definitivo
 * del cliente (`WEB VIRENS/icono cta diseño correcto pasar a svg.png`),
 * redibujado a mano como geometría limpia —rectas, radios exactos y remates
 * redondos— en las coordenadas del PNG original (1050 × 1034), no trazado
 * automático. Superpuesto al PNG coincide salvo el antialias del borde.
 * Dos bocadillos: el grande con tres líneas de texto y el segundo detrás.
 */
function ChatIcon({ variant, className }: { variant: 'solid' | 'outline'; className?: string }) {
  return (
    <span
      className={cn(
        'flex size-[var(--v2-block-icon)] shrink-0 items-center justify-center rounded-full',
        variant === 'solid' ? 'bg-blue text-white' : 'border border-current',
        className,
      )}
    >
      <svg
        viewBox="196 182 700 700"
        fill="none"
        stroke="currentColor"
        strokeWidth={17}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="size-[64%]"
      >
        <path d="M280 599L378 736L379 599H697A50 50 0 0 0 747 549V248A50 50 0 0 0 697 198H262A50 50 0 0 0 212 248V554A45 45 0 0 0 257 599Z" />
        <path d="M346 331H613M346 398H613M346 465H513" />
        <path d="M813 398H835A45 45 0 0 1 880 443V688A45 45 0 0 1 835 733H818L716 867L715 733H495A48 48 0 0 1 447 685V665" />
      </svg>
    </span>
  );
}
