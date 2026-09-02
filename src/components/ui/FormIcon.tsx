import { cn } from '@/lib/utils';

/**
 * Siluetas de envase y forma galénica. Trazo de 1,5 px, sin relleno,
 * `currentColor`: es la firma gráfica del sistema (§9.6).
 * Sustituir por los SVG definitivos del diseñador manteniendo estas claves.
 */
const PATHS: Record<string, React.ReactNode> = {
  capsule: (
    <>
      <rect x="5" y="14" width="38" height="20" rx="10" />
      <path d="M24 14v20" />
    </>
  ),
  tablet: (
    <>
      <circle cx="24" cy="24" r="14" />
      <path d="M15 15l18 18" />
    </>
  ),
  vial: (
    <>
      <path d="M18 6h12v5H18z" />
      <path d="M19 11v27a4 4 0 004 4h2a4 4 0 004-4V11" />
    </>
  ),
  blister: (
    <>
      <rect x="10" y="6" width="28" height="36" rx="2" />
      <circle cx="19" cy="15" r="3.5" /><circle cx="29" cy="15" r="3.5" />
      <circle cx="19" cy="24" r="3.5" /><circle cx="29" cy="24" r="3.5" />
      <circle cx="19" cy="33" r="3.5" /><circle cx="29" cy="33" r="3.5" />
    </>
  ),
  stick: (
    <>
      <rect x="19" y="5" width="10" height="38" rx="1" />
      <path d="M19 10h10M19 38h10" />
    </>
  ),
  sachet: (
    <>
      <rect x="8" y="8" width="32" height="32" rx="1" />
      <rect x="13" y="13" width="22" height="22" />
    </>
  ),
  bottle: (
    <>
      <path d="M17 5h14v6H17z" />
      <path d="M18 11v6c-2 2-3 4-3 7v14a4 4 0 004 4h10a4 4 0 004-4V24c0-3-1-5-3-7v-6" />
    </>
  ),
  dropper: (
    <>
      <path d="M20 4h8v7h-8z" />
      <path d="M21 11v3c-2 2-3 4-3 6v18a3 3 0 003 3h6a3 3 0 003-3V20c0-2-1-4-3-6v-3" />
    </>
  ),
  syrup: (
    <>
      <path d="M19 4h10v6H19z" />
      <path d="M17 10c-2 3-3 6-3 10v20a4 4 0 004 4h12a4 4 0 004-4V20c0-4-1-7-3-10" />
    </>
  ),
};

const ALIAS: Record<string, string> = {
  capsulas: 'capsule', comprimidos: 'tablet', jarabes: 'syrup', viales: 'vial',
  goteros: 'dropper', sticks: 'stick', sobres: 'sachet', blisters: 'blister',
};

export function FormIcon({ name, className }: { name: string; className?: string }) {
  const key = ALIAS[name] ?? name;
  const path = PATHS[key];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn('block', className)}
    >
      {path}
    </svg>
  );
}
