import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Lockup de cabecera: isotipo + wordmark.
 *
 * PENDIENTE: el isotipo es el PNG original del cliente (`labs-molecule.png`,
 * recortado y con fondo transparente) y el wordmark está compuesto en
 * Montserrat. Sustituir ambos por el SVG oficial de marca en cuanto llegue —
 * las medidas de esta caja no cambian al hacerlo.
 */
export function Logo({ className, division = 'labs' }: { className?: string; division?: 'labs' | 'tech' }) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-end gap-3', className)}
      aria-label={division === 'labs' ? 'Virens Labs — inicio' : 'Virens Tech — inicio'}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={division === 'labs' ? '/img/v2/isotipo-labs.png' : '/img/v2/isotipo-tech.png'}
        alt=""
        aria-hidden
        className="h-[var(--v2-logo)] w-auto"
      />
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
