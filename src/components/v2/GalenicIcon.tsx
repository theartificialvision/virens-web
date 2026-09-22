import { cn } from '@/lib/utils';

/**
 * Iconografía del bloque "Formas galénicas": silueta de trazo fino dentro de
 * un círculo, como en la maqueta.
 *
 * Reutiliza el repertorio de V1 (`FormIcon`) y añade los dos que la maqueta
 * incorpora y V1 no tenía, porque son operaciones de acondicionamiento y no
 * formas galénicas: encapsulado automático y envasado en frasco.
 */
const PATHS: Record<string, React.ReactNode> = {
  capsule: (
    <>
      <rect x="9" y="19" width="30" height="14" rx="7" transform="rotate(-20 24 26)" />
      <path d="M20.5 16.5l7 19" transform="rotate(-20 24 26)" />
    </>
  ),
  tablet: (
    <>
      <circle cx="24" cy="24" r="12" />
      <path d="M16 16l16 16" />
    </>
  ),
  autocapsule: (
    <>
      <rect x="11" y="20" width="26" height="9" rx="4.5" />
      <path d="M24 20v9" />
      <path d="M17 14V9h14v5" />
      <path d="M17 35v5h14v-5" />
    </>
  ),
  vial: (
    <>
      <path d="M19 9h10v4H19z" />
      <path d="M20 13v22a3 3 0 003 3h2a3 3 0 003-3V13" />
    </>
  ),
  blister: (
    <>
      <rect x="12" y="9" width="24" height="30" rx="2" />
      <circle cx="20" cy="17" r="3" /><circle cx="28" cy="17" r="3" />
      <circle cx="20" cy="25" r="3" /><circle cx="28" cy="25" r="3" />
      <circle cx="20" cy="33" r="3" /><circle cx="28" cy="33" r="3" />
    </>
  ),
  syrup: (
    <>
      <path d="M20 8h8v5h-8z" />
      <path d="M18 13c-1.6 2.4-2.5 4.8-2.5 8v14a3 3 0 003 3h11a3 3 0 003-3V21c0-3.2-.9-5.6-2.5-8" />
    </>
  ),
  dropper: (
    <>
      <path d="M21 7h6v6h-6z" />
      <path d="M21 13v2.5c-1.7 1.7-2.5 3.4-2.5 5.5v14a2.5 2.5 0 002.5 2.5h5a2.5 2.5 0 002.5-2.5V21c0-2.1-.8-3.8-2.5-5.5V13" />
      <path d="M24 3v4" />
    </>
  ),
  jarfill: (
    <>
      <path d="M18 18h12v18a2 2 0 01-2 2h-8a2 2 0 01-2-2z" />
      <path d="M17 14h14v4H17z" />
      <path d="M24 4v7M21 8l3 3 3-3" />
    </>
  ),
  stick: (
    <>
      <rect x="20" y="8" width="8" height="32" rx="1" />
      <path d="M20 13h8M20 35h8" />
    </>
  ),
  sachet: (
    <>
      <path d="M13 12h22v24H13z" />
      <path d="M17 16h14v16H17z" />
    </>
  ),
};

export function GalenicIcon({ name, className }: { name: string; className?: string }) {
  const path = PATHS[name];
  return (
    <span
      className={cn(
        'flex size-[var(--v2-galenic-icon)] shrink-0 items-center justify-center rounded-full border border-current',
        className,
      )}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="size-[58%]"
      >
        {path}
      </svg>
    </span>
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
  name: 'flask' | 'handshake' | 'chat';
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
    handshake: (
      <>
        <path d="M6 18.5l7-4 8.5 4.5" />
        <path d="M42 18.5l-7-4-8 4.5-3.5 2a2.6 2.6 0 003 4.2l3.2-2.2" />
        <path d="M29.7 23l5.6 4.7M26 26.6l4.8 4M22.4 30.4l4 3.4" />
        <path d="M13 14.5v13.8l7.5 5.6" />
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
