'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ServiceBlock } from '@/lib/types';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { useSlideProgress } from '@/lib/useSlideProgress';
import { ServiceSlide } from './ServiceSlide';

const pad = (n: number) => String(n).padStart(2, '0');

/** Color del panel, alterno por diapositiva (27/09/2026, cliente: «uno verde
 *  y uno azul»). Empieza en azul como el primer slide de su diseño. */
const PANEL = ['var(--color-blue)', 'var(--color-green-deep)'] as const;
const panelColor = (i: number): string => PANEL[i % PANEL.length] ?? PANEL[0];
const DESKTOP = '(min-width: 1024px)';

/**
 * Slide de servicios de Virens Tech (27/09/2026, cliente): sustituye a los
 * seis bloques alternos. Desde lg la escena se queda fija y el scroll pasa
 * de servicio cada `--svc-step`; las transiciones (fundido del fondo, cortina
 * del panel, apertura de la foto, titular palabra a palabra) viven en CSS y
 * se disparan con `data-active`, así que el JS solo decide qué índice toca.
 * Bajo `prefers-reduced-motion` la regla global deja las animaciones en 0 ms.
 * En móvil no hay escena fija: los servicios se apilan como bloques normales.
 */
export function ServicesSlider({ services, label }: { services: ServiceBlock[]; label: string }) {
  const ref = useRef<HTMLElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [ready, setReady] = useState(false);
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set());
  const reduced = usePrefersReducedMotion();
  const n = services.length;
  const active = useSlideProgress(ref, n, desktop, reduced);

  // La cortina del panel necesita saber de qué color se viene.
  const [prev, setPrev] = useState(0);
  const [run, setRun] = useState(0);
  const last = useRef(0);
  useEffect(() => {
    if (active === last.current) return;
    setPrev(last.current);
    last.current = active;
    setRun((r) => r + 1);
  }, [active]);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const update = () => setDesktop(mq.matches);
    update();
    setReady(true);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Móvil: cada servicio se «monta» (foto que se abre, titular palabra a
  // palabra) al entrar en pantalla, una sola vez — las mismas animaciones que
  // en la escena fija, para que las dos versiones hablen el mismo idioma.
  useEffect(() => {
    const el = ref.current;
    if (!el || desktop) return;
    const slides = Array.from(el.querySelectorAll<HTMLElement>('.svc-slide'));
    const io = new IntersectionObserver((entries) => {
      const hit = entries.filter((e) => e.isIntersecting).map((e) => slides.indexOf(e.target as HTMLElement));
      if (hit.length) setSeen((old) => new Set([...old, ...hit]));
    }, { threshold: 0.25 });
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [desktop]);

  // Enlaces a un servicio (#formulacion, #rd-galenicos… desde el pie): en
  // escritorio el id cae dentro de la escena fija, así que se lleva el scroll
  // al tramo de ese servicio.
  useEffect(() => {
    const go = () => {
      const el = ref.current;
      const i = services.findIndex((s) => `#${s.id}` === window.location.hash);
      if (!el || i < 0 || !window.matchMedia(DESKTOP).matches) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const step = (el.offsetHeight - window.innerHeight) / Math.max(n - 1, 1);
      window.scrollTo({ top: top + i * step, behavior: 'auto' });
    };
    go();
    window.addEventListener('hashchange', go);
    return () => window.removeEventListener('hashchange', go);
  }, [services, n]);

  return (
    <section
      ref={ref}
      aria-label={label}
      data-ready={ready || undefined}
      className="svc-track relative"
      style={{ '--n': n } as CSSProperties}
    >
      <div className="lg:sticky lg:top-0 lg:h-[100svh] lg:overflow-hidden lg:bg-gray-100">
        {/* Fondo: la foto de cada servicio en gris, desenfocada y aclarada */}
        <div aria-hidden className="absolute inset-0 hidden lg:block">
          {services.map((s, i) => (
            <div key={s.id} data-active={i === active || undefined} className="svc-bg absolute inset-0">
              <Image src={s.image.src} alt="" fill sizes="70vw" className="scale-110 object-cover blur-md grayscale" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gray-100/75" />
        </div>

        {/* Panel de la derecha, azul y verde alternos: el color de la
            diapositiva que llega sube como una cortina sobre el de la que se
            va (GIF de referencia). Encima, la foto del servicio como textura. */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 hidden w-[var(--svc-panel-w)] overflow-hidden lg:block"
          style={{ background: panelColor(prev) }}
        >
          <div
            key={run}
            data-run={run > 0 || undefined}
            className="svc-curtain absolute inset-0"
            style={{ background: panelColor(active) }}
          />
          {services.map((s, i) => (
            <div key={s.id} data-active={i === active || undefined} className="svc-bg absolute inset-0">
              <Image src={s.image.src} alt="" fill sizes="30vw" className="scale-110 object-cover opacity-15 mix-blend-luminosity blur-lg grayscale" />
            </div>
          ))}
          <p className="absolute right-12 top-32 text-[length:var(--text-eyebrow)] font-bold tracking-eyebrow text-white 2xl:right-20">
            {pad(active + 1)} — {pad(n)}
          </p>
          <Ring n={n} />
        </div>

        {services.map((s, i) => (
          <div key={s.id} id={s.id} className="scroll-mt-24 lg:contents">
            <ServiceSlide
              block={s}
              active={desktop ? i === active : seen.has(i)}
              stacked={!desktop}
              index={i}
              counter={`${pad(i + 1)} — ${pad(n)}`}
              panel={panelColor(i)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/** Anillo de progreso del GIF de referencia, abajo a la derecha del panel.
 *  Sigue a `--svc-p` de forma continua, no a saltos por diapositiva. */
function Ring({ n }: { n: number }) {
  const c = 2 * Math.PI * 20;
  return (
    <svg viewBox="0 0 44 44" className="absolute bottom-12 right-12 size-[var(--svc-ring)] -rotate-90 text-white 2xl:right-20">
      <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <circle
        cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeDasharray={c}
        style={{ strokeDashoffset: `calc(${c.toFixed(3)} * (1 - (var(--svc-p, 0) + 1) / ${n}))` }}
      />
    </svg>
  );
}
