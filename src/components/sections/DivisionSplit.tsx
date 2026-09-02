'use client';

import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useEffect, useRef } from 'react';
import type { Division } from '@/lib/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { KineticHeading } from '@/components/ui/KineticHeading';
import { Magnetic } from '@/components/ui/Magnetic';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';
import { divisionColor } from '@/lib/utils';

interface DivisionHalfData {
  id: Division;
  href: string;
  name: string;
  claim: string;
  body: string;
  image: { src: string; alt: string };
  molecule: string;
}

const REST = 50;
const LERP = 0.14;
const SNAP_THRESHOLD = 0.05;

/**
 * Hero inmersivo Labs/Tech (HOME · bloque 01, sustituye al vídeo). Mitad y
 * mitad a sangre: cada lado con el tono de su marca (duotono vía
 * mix-blend-mode sobre la foto, nunca un degradado decorativo) y la
 * molécula de su isotipo, grande y centrada en el propio panel.
 *
 * **2026-09-02, petición directa del cliente — el gesto pasa de discreto a
 * continuo:** ya no es "hover en una mitad = esa mitad gana espacio fijo".
 * La costura sigue la posición X real del ratón dentro de todo el bloque:
 * ratón en el borde derecho → la mitad derecha ocupa el 100% (la izquierda
 * desaparece); ratón en el centro → 50/50; ratón en el borde izquierdo → la
 * izquierda ocupa el 100%. `requestAnimationFrame` con interpolación lineal
 * (lerp) sobre `flex-basis`, escrito directamente en el DOM vía refs (no en
 * estado de React) para no re-renderizar a 60 fps. El foco por teclado
 * simula la misma posición extrema (borde) que produciría ese resultado con
 * el ratón, así un usuario de teclado ve exactamente el mismo efecto.
 * Efecto solo en desktop con puntero fino (`hover: hover` + `pointer: fine`
 * + `min-width: 1024px`); en mobile/táctil las mitades se apilan a igual
 * altura sin JS. Comprobación explícita de `prefers-reduced-motion` (regla
 * 8): con la preferencia activa, no se engancha ningún listener y las
 * mitades se quedan fijas en 50/50.
 *
 * El titular compartido (`title`/`subtitle`) es el H1 de la página,
 * centrado sobre la costura, y se desvanece según cuánto se haya movido la
 * costura del centro (misma interpolación, sin transición CSS aparte para
 * no duplicar el suavizado).
 */
export function DivisionSplit({
  halves,
  eyebrow,
  title,
  subtitle,
}: {
  halves: readonly [DivisionHalfData, DivisionHalfData];
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLAnchorElement>(null);
  const rightRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const heading = headingRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!container || !left || !right) return;

    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
    let active = mq.matches;
    let target = REST;
    let current = REST;
    let raf = 0;

    function apply(value: number) {
      left!.style.flexBasis = `${value}%`;
      right!.style.flexBasis = `${100 - value}%`;
      // Se apaga del todo bastante antes del extremo (a 40pp del centro, no
      // a 50) para no solaparse con el nombre/claim de la mitad que gana la
      // pantalla — a diferencia del salto discreto de antes, aquí el rango
      // recorrido llega hasta el 100%, así que hace falta más margen.
      if (heading) heading.style.opacity = `${Math.max(0, 1 - Math.abs(value - REST) / 40)}`;
    }

    function tick() {
      current += (target - current) * LERP;
      if (Math.abs(target - current) < SNAP_THRESHOLD) current = target;
      apply(current);
      raf = requestAnimationFrame(tick);
    }

    // Ratón en el borde izquierdo del contenedor (ratio→0) debe hacer que la
    // mitad IZQUIERDA (primer hijo) llegue al 100%: la relación es inversa
    // a la posición del ratón, no directa.
    function onPointerMove(e: PointerEvent) {
      if (!active) return;
      const rect = container!.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      target = 100 - Math.min(100, Math.max(0, ratio * 100));
    }
    function onPointerLeave() {
      target = REST;
    }
    function onFocusLeft() {
      if (active) target = 100;
    }
    function onFocusRight() {
      if (active) target = 0;
    }
    function onBlurHalf() {
      if (active) target = REST;
    }
    function onMQChange() {
      active = mq.matches;
      if (!active) target = REST;
    }

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);
    left.addEventListener('focus', onFocusLeft);
    right.addEventListener('focus', onFocusRight);
    left.addEventListener('blur', onBlurHalf);
    right.addEventListener('blur', onBlurHalf);
    mq.addEventListener('change', onMQChange);
    raf = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      left.removeEventListener('focus', onFocusLeft);
      right.removeEventListener('focus', onFocusRight);
      left.removeEventListener('blur', onBlurHalf);
      right.removeEventListener('blur', onBlurHalf);
      mq.removeEventListener('change', onMQChange);
      cancelAnimationFrame(raf);
      left.style.flexBasis = '';
      right.style.flexBasis = '';
      if (heading) heading.style.opacity = '';
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="division-split relative flex flex-col lg:h-[100svh] lg:min-h-[640px] lg:flex-row">
      {/* Mobile: banda normal, apilada antes que las mitades (cada una ya
          lleva su propio nombre/claim, no compite por el mismo espacio).
          Desktop (lg): se saca del flujo y se centra sobre la costura. */}
      <div
        ref={headingRef}
        className="division-split-heading relative z-10 flex flex-col items-center bg-ink px-6 py-10 text-center text-white lg:pointer-events-none lg:absolute lg:inset-0 lg:justify-center lg:bg-transparent lg:py-0"
      >
        {/* En mobile el logo del header queda justo encima y repetiria
            literalmente este rotulo: solo se muestra en desktop, donde el
            titular esta centrado y lejos del logo. */}
        <Eyebrow className="hidden text-white/80 lg:block">{eyebrow}</Eyebrow>
        <KineticHeading
          as="h1"
          text={title}
          className="mt-4 max-w-[20ch] text-[length:var(--text-display)] font-bold leading-[0.98] tracking-[-0.02em]"
        />
        <p className="mt-4 text-[length:var(--text-lead)] text-white/85">{subtitle}</p>
      </div>

      <DivisionHalf ref={leftRef} {...halves[0]} />
      <DivisionHalf ref={rightRef} {...halves[1]} />
    </div>
  );
}

const DivisionHalf = forwardRef<HTMLAnchorElement, DivisionHalfData>(function DivisionHalf(
  { id, href, name, claim, body, image, molecule },
  ref,
) {
  const accent = divisionColor[id];
  return (
    <Link
      ref={ref}
      href={href}
      data-half={id}
      className="group relative flex min-h-[46svh] flex-1 flex-col items-center overflow-hidden p-8 text-center lg:min-h-0 lg:p-12 2xl:p-16"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover grayscale contrast-110 transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.04]"
      />
      <span aria-hidden className="absolute inset-0" style={{ background: accent, mixBlendMode: 'color', opacity: 0.92 }} />
      <span aria-hidden className="absolute inset-0 bg-black/15" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-black/60" />

      {/* Molécula del isotipo: watermark de marca, fuera del flujo para no
          empujar el bloque de texto que se ancla abajo. En desktop (lg+),
          centrada en todo el panel — hay espacio de sobra por encima del
          bloque de texto. En mobile el panel mide solo 46svh: centrarla del
          todo la solaparía con el nombre/claim de abajo, así que se queda
          arriba, un poco más grande que antes pero sin invadir el texto. */}
      {/* lg:inset-0 ya fija top:0 (y anula el top-8 de mobile por el propio
          orden de las media queries) — un lg:top-auto adicional aquí
          quedaba por delante de inset-0 en el orden interno de Tailwind y
          volvía a anclar el elemento abajo: bug real visto en producción
          (la molécula se solapaba con el texto en vez de centrarse). */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-8 flex justify-center lg:inset-0 lg:items-center">
        <span className="relative h-14 w-14 lg:h-40 lg:w-40 2xl:h-48 2xl:w-48">
          <img
            src={molecule}
            alt=""
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 group-hover:opacity-0"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <img
            src={molecule}
            alt=""
            className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </span>
      </span>

      <span className="relative mt-auto flex max-w-[26rem] flex-col items-center">
        <Eyebrow className="text-white/80">{name}</Eyebrow>
        <h2 className="mt-4 text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
          {claim}
        </h2>
        <p className="mt-4 max-w-[34ch] text-white/85">{body}</p>
        <Magnetic className="mt-8 inline-block">
          <span
            className="inline-flex items-center gap-2 rounded-full px-8 py-[length:var(--btn-py)] text-[length:var(--text-small)] font-semibold tracking-[0.04em] text-white transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:-translate-y-px"
            style={{ background: accent }}
          >
            Ver división
            <span aria-hidden>&rarr;</span>
          </span>
        </Magnetic>
      </span>
    </Link>
  );
});
