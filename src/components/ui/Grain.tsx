'use client';

import { usePathname } from 'next/navigation';
import { DARK_ROUTES } from '@/config/navigation';

const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
  <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>
  <rect width='100%' height='100%' filter='url(%23n)'/>
</svg>`;

/**
 * Grano global, una sola capa fija (no por sección). Sin animación, por eso
 * queda exenta del chequeo JS de prefers-reduced-motion (CLAUDE.md regla 8).
 * Se autolimita a DARK_ROUTES, igual que Cursor.
 */
export function Grain() {
  const pathname = usePathname();
  if (!DARK_ROUTES.includes(pathname as (typeof DARK_ROUTES)[number])) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70]"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`,
        mixBlendMode: 'overlay',
        opacity: 'var(--opacity-grain)',
      }}
    />
  );
}
