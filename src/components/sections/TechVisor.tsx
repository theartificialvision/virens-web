import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { ServiceBlock } from '@/lib/types';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Visor fijo del recorrido de Tech (30/09/2026, «laboratorio de vanguardia»).
 *
 * Escritorio: las cinco fotos apiladas; la del capítulo en curso y las
 * anteriores están abiertas, así que al avanzar la nueva se derrama sobre la
 * previa como una gota magenta que se expande y se aclara (CSS, §globals
 * «Tech»). Debajo, lectura «02 / 05 · Galénica» y cinco tramos que son el
 * índice navegable (enlaces a las anclas de siempre); cada tramo se llena
 * en continuo con la lectura (`--tech-progress`), como un instrumento.
 *
 * Móvil: el marco de fotos se oculta (cada capítulo trae la suya) y el visor
 * queda como barra fija con la lectura y los tramos.
 */
export function TechVisor({ services, active, label }: {
  services: ServiceBlock[];
  active: number;
  label: string;
}) {
  const current = services[active] ?? services[0];
  if (!current) return null;
  return (
    <aside className="tech-visor">
      <div className="tech-visor__frame">
        {services.map((service, index) => (
          <div key={service.id} className="tech-visor__layer" data-open={index <= active || undefined}>
            <Image src={service.image.src} alt={service.image.alt} fill
              sizes="(max-width: 900px) 1px, (max-width: 1440px) 52vw, 760px" className="tech-visor__image" />
          </div>
        ))}
      </div>
      <nav className="tech-visor__index" aria-label={label}>
        {/* La lectura repite el título visible del capítulo: solo visual. */}
        <p className="tech-visor__readout" aria-hidden="true">
          <span className="tech-visor__count">{current.index}<span> / {pad(services.length)}</span></span>
          <span className="tech-visor__title">{current.title}</span>
        </p>
        <ol className="tech-visor__segments">
          {services.map((service, index) => (
            <li key={service.id} style={{ '--i': index } as CSSProperties}>
              <a href={`#${service.id}`} aria-current={index === active ? 'step' : undefined}
                data-past={index < active || undefined}>
                <span className="sr-only">{service.index} {service.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
