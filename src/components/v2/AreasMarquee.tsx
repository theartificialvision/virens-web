import { v2Areas } from '@/content/v2-home';
import { SectionTitle } from './SectionTitle';

/**
 * Áreas terapéuticas (§ maqueta, bloque 05): una sola línea tipográfica de
 * gran cuerpo que recorre el ancho, con los nombres alternando blanco, teal y
 * magenta —los dos colores de división— separados por barras.
 *
 * El desplazamiento es CSS puro: dos copias de la misma lista, la segunda
 * `aria-hidden`, y una traslación del 50%. Sin JS y, bajo
 * `prefers-reduced-motion`, la animación se detiene (regla global de
 * globals.css) y queda una línea estática legible.
 */
const ACCENT = ['text-white', 'text-labs-glow', 'text-white', 'text-tech-glow'] as const;

export function AreasMarquee() {
  const items = v2Areas.items;

  return (
    <section id="areas-terapeuticas" className="overflow-hidden bg-blue py-[var(--v2-section-tight)] text-white">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 md:px-8 lg:px-12 2xl:px-20">
        <span aria-hidden className="block h-[3px] w-14 bg-labs" />
        <SectionTitle className="mt-6">{v2Areas.label}</SectionTitle>
      </div>

      <div className="mt-10 flex w-full overflow-hidden">
        <Track items={items} />
        <Track items={items} ariaHidden />
      </div>
    </section>
  );
}

function Track({ items, ariaHidden = false }: { items: readonly string[]; ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="v2-marquee flex shrink-0 items-center gap-[0.6em] whitespace-nowrap pr-[0.6em] text-[length:var(--v2-marquee)] font-normal uppercase tracking-[-0.01em]"
    >
      {items.map((area, i) => (
        <li key={area} className="flex items-center gap-[0.6em]">
          <span className={ACCENT[i % ACCENT.length]}>{area}</span>
          <span aria-hidden className="text-white/30">/</span>
        </li>
      ))}
    </ul>
  );
}
