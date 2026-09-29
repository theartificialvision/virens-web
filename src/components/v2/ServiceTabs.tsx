'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

type Service = { id: string; title: string; accent: string };

/**
 * Pestañas Private Label / Full service. Un solo indicador se desliza de una a
 * otra y cambia al color del servicio (29/09/2026). Sin JS, subrayado fijo en
 * la pestaña activa (`:not([data-measured])` en globals.css).
 */
export function ServiceTabs({ services, summaries, active, onSelect }: {
  services: readonly Service[];
  summaries: readonly string[];
  active: number;
  onSelect: (index: number) => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const tab = el.querySelectorAll<HTMLElement>('.laboratory__service-tab')[active];
      if (!tab) return;
      const box = el.getBoundingClientRect();
      const r = tab.getBoundingClientRect();
      el.style.setProperty('--tab-x', `${r.left - box.left}px`);
      el.style.setProperty('--tab-y', `${r.bottom - box.top}px`);
      el.style.setProperty('--tab-w', `${r.width}px`);
      // Primera medida sin transición: el indicador aparece ya en su sitio.
      if (!el.dataset.measured) requestAnimationFrame(() => { el.dataset.measured = 'true'; });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  return (
    <div ref={wrap} className="laboratory__services" role="group"
      style={{ '--tab-accent': `var(--color-${services[active]?.accent ?? 'labs'})` } as CSSProperties}>
      {services.map((item, index) => (
        <div key={item.id} id={index === 1 ? item.id : undefined} className="laboratory__service"
          style={{ '--service-accent': `var(--color-${item.accent})` } as CSSProperties}>
          <h2 id={index === 0 ? 'laboratory-title' : undefined}>
            <button type="button" className="laboratory__service-tab" aria-pressed={active === index}
              aria-controls="laboratory-steps" onClick={() => onSelect(index)}>
              {item.title}
            </button>
          </h2>
          <p className="sr-only">{summaries[index]}</p>
        </div>
      ))}
      <span aria-hidden className="laboratory__tab-indicator" />
    </div>
  );
}
