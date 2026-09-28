import { homeContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { SectionTitle } from './SectionTitle';
import { areaPictograms, type AreaPictogram } from './areaPictograms';

/**
 * Áreas terapéuticas (§ maqueta, bloque 05): una sola línea tipográfica de
 * gran cuerpo que recorre el ancho, con los nombres alternando blanco, teal y
 * magenta —los dos colores de división— separados por barras.
 *
 * 28/09/2026 (cliente): cada palabra lleva delante su pictograma animado de
 * línea (`areaPictograms`, diseñados en Claude Design), del mismo color que la
 * palabra y a la altura de sus mayúsculas.
 *
 * El desplazamiento es CSS puro: dos copias de la misma lista, la segunda
 * `aria-hidden`, y una traslación del 50%. Sin JS y, bajo
 * `prefers-reduced-motion`, la animación se detiene (regla global de
 * globals.css) y queda una línea estática legible.
 */
const ACCENT = ['text-white', 'text-labs-glow', 'text-white', 'text-tech-glow'] as const;

export function AreasMarquee({ locale }: { locale: Locale }) {
  const { v2Areas } = homeContent(locale);
  const items = v2Areas.items;

  return (
    <section id="areas-terapeuticas" className="overflow-hidden bg-blue py-[var(--v2-section-tight)] text-white">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 md:px-8 lg:px-12 2xl:px-20">
        <SectionTitle accent>{v2Areas.label}</SectionTitle>
      </div>

      <div className="mt-10 flex w-full overflow-hidden">
        <Track items={items} />
        <Track items={items} ariaHidden />
      </div>
    </section>
  );
}

interface AreaItem { id: string; label: string }

function Track({ items, ariaHidden = false }: { items: readonly AreaItem[]; ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="v2-marquee flex shrink-0 items-center gap-[0.6em] whitespace-nowrap pr-[0.6em] text-[length:var(--v2-marquee)] font-normal uppercase tracking-[-0.01em]"
    >
      {items.map((area, i) => (
        <li key={area.id} className="flex items-center gap-[0.6em]">
          <span className={`flex items-center gap-[var(--v2-area-gap)] ${ACCENT[i % ACCENT.length]}`}>
            <Pictogram id={area.id} />
            {area.label}
          </span>
          <span aria-hidden className="text-white/30">/</span>
        </li>
      ))}
    </ul>
  );
}

/** SVG propio del proyecto (no contenido de terceros): se inserta en línea
 *  para que su animación CSS funcione y herede `currentColor`. */
function Pictogram({ id }: { id: string }) {
  const svg = areaPictograms[id as AreaPictogram];
  if (!svg) return null;
  return <span aria-hidden className="v2-area-icon block shrink-0" dangerouslySetInnerHTML={{ __html: svg }} />;
}
