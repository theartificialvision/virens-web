'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import type { CapacityHandle } from '@/lib/capacity3d';
import { v2Capacity } from '@/content/v2-home';

/**
 * Escaparate 3D de «Capacidad productiva» (24/09/2026, diseño del cliente en
 * Claude Design): los siete envases en porcelana mate sobre una bandeja gris,
 * cada uno con su nombre y su rango debajo. Al pasar el ratón el envase hace
 * su gesto y el filete de debajo crece y se vuelve teal.
 *
 * - El motor (`@/lib/capacity3d`, con `three`) se pide con `import()` cuando
 *   la sección está a ~600 px de entrar en pantalla: no toca el bundle inicial
 *   ni el LCP (regla 9). Los canvas entran con un fundido; hasta entonces la
 *   bandeja se ve vacía (sin póster: una silueta distinta del 3D se notaría
 *   al cambiar, como pasaba con el isotipo antiguo en los hero).
 * - Sin WebGL, o si falla la carga, se muestran las siluetas vectoriales.
 * - Fuera de pantalla el bucle se detiene; con movimiento reducido se pinta un
 *   fotograma quieto y no hay gestos (regla 8).
 * - La entrada de la sección (`.v2-cap`, globals.css) sigue igual: cada
 *   envase se «llena» de abajo arriba en cascada y después bajan filete y
 *   textos.
 */
export function CapacityStage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const hostRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleRef = useRef<CapacityHandle | null>(null);
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<'idle' | 'ready' | 'failed'>('idle');
  const [hov, setHov] = useState(-1);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let alive = true;

    const boot = () => {
      import('@/lib/capacity3d')
        .then(({ mount }) => {
          const hosts = hostRefs.current.filter((h): h is HTMLDivElement => h !== null);
          if (!alive || hosts.length !== v2Capacity.items.length) return;
          try {
            handleRef.current = mount(
              hosts,
              v2Capacity.items.map((it) => it.file),
              { reduced },
            );
            setState('ready');
          } catch {
            setState('failed');
          }
        })
        .catch(() => alive && setState('failed'));
    };

    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          near.disconnect();
          boot();
        }
      },
      { rootMargin: '600px 0px' },
    );
    near.observe(root);

    const seen = new IntersectionObserver((entries) => {
      const vis = entries.some((e) => e.isIntersecting);
      handleRef.current?.setVisible(vis);
    });
    seen.observe(root);

    return () => {
      alive = false;
      near.disconnect();
      seen.disconnect();
      handleRef.current?.dispose();
      handleRef.current = null;
    };
  }, [reduced]);

  const enter = (i: number) => {
    setHov(i);
    handleRef.current?.hover(i);
  };
  const leave = (i: number) => {
    setHov((h) => (h === i ? -1 : h));
    handleRef.current?.hover(-1);
    handleRef.current?.pointer(i, 0, 0);
  };
  const move = (i: number, e: React.MouseEvent<HTMLLIElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    handleRef.current?.pointer(i, ((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <div ref={rootRef} className="v2-cap-stage -mx-5 overflow-x-auto md:mx-0">
      <ul className="grid min-w-[46rem] auto-cols-[minmax(6.5rem,1fr)] grid-flow-col px-3 lg:min-w-0">
        {v2Capacity.items.map((item, i) => (
          <li
            key={item.id}
            className="relative flex flex-col items-center pb-11"
            style={{ '--i': i } as CSSProperties}
            onMouseEnter={() => enter(i)}
            onMouseLeave={() => leave(i)}
            onMouseMove={(e) => move(i, e)}
          >
            <div className="v2-cap-vessel relative h-[var(--v2-cap3d-h)] w-full">
              <div
                ref={(el) => {
                  hostRefs.current[i] = el;
                }}
                aria-hidden
                className={cn(
                  'absolute inset-0 transition-opacity duration-700',
                  state === 'ready' ? 'opacity-100' : 'opacity-0',
                )}
              />
              {state === 'failed' ? (
                <span className="absolute inset-x-0 bottom-6 top-16 flex items-end justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/img/v2/objetos/${item.file}.svg`} alt="" aria-hidden className="max-h-full w-auto" />
                </span>
              ) : null}
            </div>

            <div className="v2-cap-stem flex h-16 items-start justify-center">
              <span
                aria-hidden
                className={cn(
                  'block w-px transition-[height,background-color] duration-500 ease-[var(--motion-ease)]',
                  hov === i ? 'h-14 bg-labs' : 'h-10 bg-gray-300',
                )}
              />
            </div>

            <div className="v2-cap-text flex flex-col items-center gap-1.5 px-1 text-center">
              <span className="text-[length:var(--text-note)] leading-tight text-blue">{item.label}</span>
              <span className="text-balance text-[length:var(--text-note)] font-semibold leading-tight text-labs">
                {item.range}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
