import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Isotipo3D } from './Isotipo3D';

/**
 * Lockup de cabecera: isotipo + wordmark.
 *
 * El isotipo es el 3D en vivo desde el 23/09/2026 (`Isotipo3D`). PENDIENTE:
 * el wordmark sigue compuesto en Montserrat hasta que llegue el SVG oficial.
 */
export function Logo({ className, division = 'labs' }: { className?: string; division?: 'labs' | 'tech' }) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-end gap-3', className)}
      aria-label={division === 'labs' ? 'Virens Labs — inicio' : 'Virens Tech — inicio'}
    >
      <Isotipo3D division={division} className="-mx-5 -my-4 size-[var(--v2-logo-3d)]" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'self-end text-[length:var(--text-note)] font-semibold uppercase tracking-[0.3em] leading-none',
            division === 'labs' ? 'text-blue' : 'text-tech',
          )}
        >
          {division === 'labs' ? 'Labs' : 'Tech'}
        </span>
        <span className="mt-1 text-[length:var(--v2-wordmark)] font-bold lowercase tracking-[-0.02em] leading-none text-blue">
          virens
        </span>
      </span>
    </Link>
  );
}
