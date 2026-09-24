import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Isotipo3D } from './Isotipo3D';

/**
 * Lockup de cabecera: isotipo + wordmark.
 *
 * El isotipo es el 3D en vivo desde el 23/09/2026 (`Isotipo3D`). El wordmark
 * es el oficial desde el 24/09/2026: vectores del PDF de Illustrator del
 * cliente (`WEB VIRENS/logoVirens.pdf`), limpiados a mano, con sus colores de
 * marca (azul #014166 y «LABS» en #00A099). Tech no tiene aún wordmark
 * oficial y sigue compuesto en Montserrat.
 */
export function Logo({ className, division = 'labs' }: { className?: string; division?: 'labs' | 'tech' }) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-end gap-3', className)}
      aria-label={division === 'labs' ? 'Virens Labs — inicio' : 'Virens Tech — inicio'}
    >
      <Isotipo3D division={division} className="-mx-5 -my-4 size-[var(--v2-logo-3d)]" />
      {division === 'labs' ? (
        // eslint-disable-next-line @next/next/no-img-element -- SVG estático: next/image no aporta nada y añade envoltorio
        <img src="/img/v2/logo/virens-labs-wordmark.svg" alt="" className="h-[var(--v2-wordmark-h)] w-auto" />
      ) : (
        <span className="flex flex-col leading-none">
          <span className="self-end text-[length:var(--text-note)] font-semibold uppercase leading-none tracking-[0.3em] text-tech">
            Tech
          </span>
          <span className="mt-1 text-[length:var(--v2-wordmark)] font-bold lowercase leading-none tracking-[-0.02em] text-blue">
            virens
          </span>
        </span>
      )}
    </Link>
  );
}
