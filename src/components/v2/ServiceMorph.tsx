import type { CSSProperties } from 'react';

type Service = { id: string; title: string; accent: string };

/**
 * Nombre del servicio que acompaña al recorrido (29/09/2026, 2.ª vuelta):
 * «Private Label» mientras la barra avanza y, al llegar a Logística, se
 * transforma en «Full service» —sale hacia arriba, entra desde abajo, cada uno
 * en su color—. Los dos nombres ocupan la misma celda, así el ancho no salta.
 * El lector de pantalla oye solo el activo y, aparte, el resumen de ambos.
 */
export function ServiceMorph({ services, full, summaries }: {
  services: readonly Service[];
  full: boolean;
  summaries: readonly string[];
}) {
  const active = full ? 1 : 0;
  return (
    <>
      <h3 className="lab-service">
        {services.slice(0, 2).map((item, index) => (
          <span key={item.id} className="lab-service__name" data-active={index === active || undefined}
            aria-hidden={index !== active} style={{ '--service-accent': `var(--color-${item.accent})` } as CSSProperties}>
            {item.title}
          </span>
        ))}
      </h3>
      <p className="sr-only">{summaries.join(' ')}</p>
    </>
  );
}
