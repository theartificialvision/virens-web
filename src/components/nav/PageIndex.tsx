'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { routes, type Locale } from '@/lib/i18n';
import type { ui } from '@/content';

type Nav = (typeof ui)['es']['nav'];

const clean = (path: string) => path.replace(/\/$/, '') || '/';

/**
 * Índice de la página (30/09/2026), a la manera de la barra secundaria de
 * apple.com: vidrio fino bajo la cabecera con el nombre de la página y sus
 * secciones. Aparece al pasar el hero y marca la sección en curso. Solo en
 * Home y Compañía (Virens Tech ya trae el suyo; Contacto y legales son de
 * una pantalla). Mientras está montada, `html:has([data-page-index])` sube el
 * margen de anclas para que un salto no quede tapado por la barra.
 */
export function PageIndex({ locale, nav }: { locale: Locale; nav: Nav }) {
  const pathname = clean(usePathname());
  const key = pathname === routes.home[locale] ? 'home' : pathname === routes.company[locale] ? 'company' : null;
  const config = key ? nav.index[key] : undefined;
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(-1);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!config) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = -1;
      config.items.forEach((item, index) => {
        const el = document.getElementById(item.track ?? item.id);
        if (el && el.getBoundingClientRect().top <= line) current = index;
      });
      // Se muestra al pasar el hero y mientras haya una sección en curso.
      setVisible(current >= 0 || window.scrollY > window.innerHeight * 0.85);
      setActive(current);
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
  }, [config]);

  // En móvil la lista se desplaza: mantener a la vista el elemento activo.
  useEffect(() => {
    const rail = list.current;
    const item = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !item || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: item.offsetLeft - (rail.clientWidth - item.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);

  if (!config) return null;
  return (
    <nav className="nav-index" data-page-index data-visible={visible || undefined} aria-label={nav.indexAria}
      aria-hidden={visible ? undefined : true} inert={visible ? undefined : true}>
      <div className="nav-index__inner">
        <p className="nav-index__title">{config.title}</p>
        <ol ref={list} className="nav-index__list">
          {config.items.map((item, index) => (
            <li key={item.id}>
              <a href={`#${item.id}`} aria-current={index === active ? 'location' : undefined}>{item.label}</a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
