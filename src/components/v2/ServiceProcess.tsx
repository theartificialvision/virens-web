'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { companyGlyphs, type CompanyIconName } from '@/components/sections/CompanyIcon';

type Service = { id: string; title: string; accent: string };

/**
 * Private Label y Full service como tramos de un mismo proceso (29/09/2026,
 * cliente: «no quiero texto; que se entienda el proceso de la formulación a la
 * logística y se destaquen las dos opciones»). Una línea con los cinco pasos
 * y, debajo, un corchete por servicio que abarca los pasos que incluye. Al
 * señalar un servicio se encienden sus pasos y la línea se tiñe de su color.
 * El resumen de cada servicio queda solo para lectores de pantalla.
 * Sin JS se ve completo; la entrada es CSS (movimiento reducido: estático).
 */
export function ServiceProcess({ services, summaries, stages, icons, scope }: {
  services: readonly Service[];
  summaries: readonly string[];
  stages: readonly string[];
  icons: readonly string[];
  scope: readonly number[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.ready = 'true';
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      el.dataset.inview = 'true';
      io.disconnect();
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const covered = focus === null ? stages.length : scope[focus] ?? stages.length;
  const accent = focus === null ? 'labs' : services[focus]?.accent ?? 'labs';

  return (
    <div
      ref={ref}
      className="process"
      data-focus={focus === null ? undefined : 'true'}
      style={{ '--stages': stages.length, '--covered': covered, '--process-accent': `var(--color-${accent})` } as CSSProperties}
    >
      <ol className="process__rail">
        {stages.map((stage, index) => (
          <li key={stage} className="process__stage" data-on={index < covered || undefined} style={{ '--i': index } as CSSProperties}>
            <span className="process__node">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {companyGlyphs[icons[index] as CompanyIconName]}
              </svg>
            </span>
            <span className="process__name">{stage}</span>
          </li>
        ))}
      </ol>

      <div className="process__options">
        {services.map((service, index) => (
          <div
            key={service.id}
            id={index === 1 ? service.id : undefined}
            tabIndex={0}
            className="process__option"
            data-active={focus === index || undefined}
            style={{ '--span': scope[index] ?? stages.length, '--option-accent': `var(--color-${service.accent})`, '--o': index } as CSSProperties}
            onPointerEnter={(event) => { if (event.pointerType !== 'touch') setFocus(index); }}
            onPointerLeave={(event) => { if (event.pointerType !== 'touch') setFocus(null); }}
            onFocus={() => setFocus(index)}
            onBlur={() => setFocus(null)}
            onClick={() => setFocus((current) => (current === index ? null : index))}
          >
            <span aria-hidden className="process__bracket" />
            <h2 id={index === 0 ? 'laboratory-title' : undefined} className="process__title">{service.title}</h2>
            <p className="sr-only">{summaries[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
