'use client';

import { useEffect, useState, type RefObject } from 'react';

/** Contraste según la superficie bajo el trigger, incluida la barra sticky.
 * Se mide solo ante scroll, resize o cambio de ruta; no hay bucle ambiental.
 */
export function useHeaderSurface(ref: RefObject<HTMLButtonElement | null>, pathname: string) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const button = ref.current;
      if (!button) return;
      const rect = button.getBoundingClientRect();
      if (!rect.width) return;
      const surface = document.elementsFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
        .filter((element) => !element.closest('[data-menu-trigger], #menu-overlay'))
        .map((element) => element.closest<HTMLElement>('[data-header-tone]'))
        .find((element) => element !== null);
      setDark(surface?.dataset.headerTone === 'dark');
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, pathname]);

  return dark;
}
