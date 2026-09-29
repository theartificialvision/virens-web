import type { CSSProperties } from 'react';

type Service = { id: string; title: string; accent: string };

/**
 * Private Label y Full service (29/09/2026, 3.ª vuelta del cliente: «los dos
 * títulos visibles; la línea de color en el que está activo, cada uno con su
 * color; hover en los títulos; los dos comprenden todas las fases»).
 * El activo lleva su color y el filete debajo; el otro queda en gris y se
 * tiñe al pasar el cursor. Pulsar uno cambia el servicio del recorrido.
 */
export function ServiceTabs({ services, active, label, summaries, onSelect }: {
  services: readonly Service[];
  active: number;
  label: string;
  summaries: readonly string[];
  onSelect: (index: number) => void;
}) {
  return (
    <>
      <div className="lab-services" role="group" aria-label={label}>
        {services.slice(0, 2).map((item, index) => (
          <button key={item.id} type="button" className="lab-services__tab" aria-pressed={index === active}
            aria-controls="laboratory-visual laboratory-detail" onClick={() => onSelect(index)}
            style={{ '--service-accent': `var(--color-${item.accent})` } as CSSProperties}>
            {item.title}
          </button>
        ))}
      </div>
      <p className="sr-only">{summaries.join(' ')}</p>
    </>
  );
}
