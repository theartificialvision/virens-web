'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Volver arriba (30/09/2026): círculo de vidrio abajo a la derecha (la
 * izquierda es de la cápsula de CPHI) con un anillo que se completa según lo
 * leído de la página. Aparece pasadas dos pantallas. El anillo se escribe en
 * `stroke-dashoffset` directamente, sin re-render por scroll; con movimiento
 * reducido el desplazamiento es inmediato y el aparecer, sin transición.
 */
export function ScrollTop({ label }: { label: string }) {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ring.current?.style.setProperty('--nav-progress', progress.toFixed(4));
      setVisible(window.scrollY > window.innerHeight * 2);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      className="nav-top glass glass-ink relative"
      data-visible={visible || undefined}
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : true}
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
    >
      <svg viewBox="0 0 44 44" className="nav-top__ring" aria-hidden="true" focusable="false">
        <circle className="nav-top__track" cx="22" cy="22" r="20" />
        <circle ref={ring} className="nav-top__bar" cx="22" cy="22" r="20" pathLength="1" />
      </svg>
      <svg viewBox="0 0 16 12" className="nav-top__arrow" aria-hidden="true" focusable="false">
        <path d="M2 9.5 8 3l6 6.5" />
      </svg>
    </button>
  );
}
