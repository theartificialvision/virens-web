'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

/** Entrada corta al llegar al viewport, una sola vez. El CSS conserva el
 * contenido visible con movimiento reducido y evita un segundo scroll vacío.
 */
export function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveal = () => { element.dataset.visible = 'true'; };
    const rect = element.getBoundingClientRect();
    // El contenido ya visible y el HTML sin JS nunca esperan a una animación.
    if (media.matches || (rect.top < window.innerHeight && rect.bottom > 0)) {
      reveal();
      return;
    }
    element.dataset.visible = 'false';
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        reveal();
        observer.disconnect();
      }
    }, { rootMargin: '0px 0px 24px 0px', threshold: 0 });
    observer.observe(element);
    const onPreference = () => {
      if (media.matches) { reveal(); observer.disconnect(); }
    };
    media.addEventListener('change', onPreference);
    return () => { observer.disconnect(); media.removeEventListener('change', onPreference); };
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}
      style={{ '--reveal-delay': `${Math.min(delay, 0.12)}s` } as CSSProperties}>
      {children}
    </div>
  );
}
