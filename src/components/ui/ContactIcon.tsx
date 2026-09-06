import { cn } from '@/lib/utils';

/**
 * Iconos de línea de la página de contacto. Mismo criterio que `FormIcon`:
 * trazo de 1,5 px, sin relleno, `currentColor` — la firma gráfica del sistema
 * (§9.6). Rejilla de 24 en vez de la de 48 de `FormIcon` porque aquí
 * acompañan a una línea de texto, no son la pieza principal del bloque.
 */
const PATHS: Record<string, React.ReactNode> = {
  // Localización: chincheta clásica.
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  phone: (
    <path d="M6.3 3.5h3l1.5 3.8-2 1.4a11.5 11.5 0 0 0 5.5 5.5l1.4-2 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8A15.6 15.6 0 0 1 4.5 5.5a1.8 1.8 0 0 1 1.8-2Z" />
  ),
  // Coordenadas: la chincheta con retícula, para distinguirla de `pin`.
  gps: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <path d="M5.4 10h13.2M12 3.2v13.4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.2l2.3 10.4h9.6L19 7.2H6.2" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  users: (
    <>
      <circle cx="9.5" cy="8.4" r="3" />
      <path d="M3.6 19.4a6 6 0 0 1 11.8 0" />
      <path d="M16 5.8a3 3 0 0 1 0 5.6M17.2 14.6a6 6 0 0 1 3.2 4.8" />
    </>
  ),
  clip: (
    <path d="M15.8 8.2 9.4 14.6a2.4 2.4 0 0 0 3.4 3.4l6.8-6.8a4.4 4.4 0 0 0-6.2-6.2L6 12.4a6.4 6.4 0 0 0 9 9l5.2-5.2" />
  ),
};

export function ContactIcon({ name, className }: { name: string; className?: string }) {
  const path = PATHS[name];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
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
