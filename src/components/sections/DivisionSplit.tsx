'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Division } from '@/lib/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { KineticHeading } from '@/components/ui/KineticHeading';
import { divisionColor, divisionGlow, cn } from '@/lib/utils';

interface DivisionHalfData {
  id: Division;
  href: string;
  name: string;
  claim: string;
  body: string;
  image: { src: string; alt: string };
  /** Tira horizontal de fotogramas del isotipo 3D (ver `.molecule-sway`). */
  molecule: string;
  moleculeFrames: number;
  cta: string;
}

/**
 * Hero inmersivo Labs/Tech (HOME · bloque 01, sustituye al vídeo). Mitad y
 * mitad a sangre, siempre 50/50 (sin JS de layout): cada lado con el tono
 * de su marca (duotono vía mix-blend-mode sobre la foto) y la molécula de
 * su isotipo, a color.
 *
 * **2026-09-02, segunda vuelta — de "arrastre continuo" a "dos botones":**
 * la primera versión hacía que la costura siguiera la posición X del ratón
 * en tiempo real; feedback directo del cliente: "se marea mucho con
 * movimientos del mouse". Se retira ese sistema entero (rAF + flex-basis +
 * lerp) y se sustituye por dos botones explícitos, `DivisionButton`
 * ("Visitar Labs" / "Visitar Tech"), con estética glass (blur, borde,
 * pulso — CLAUDE.md regla 4, excepción "glass" ya sancionada). Al pasar
 * el ratón o el foco por un botón, ESE lado recibe una difusión de color
 * — `clip-path: circle()` creciendo desde la costura, como un tinte que se
 * esparce bajo el agua — mientras la imagen pasa de gris a color. Es un
 * cambio de estado discreto (React state + transición CSS), no una
 * animación por frame: no hay nada que "marear". Paridad de teclado
 * automática: los botones son el propio trigger de foco/hover, sin
 * necesitar simular posiciones extremas.
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
  const [active, setActive] = useState<Division | null>(null);

  return (
    <div className="division-split relative flex flex-col lg:h-[100svh] lg:min-h-[640px] lg:flex-row">
      {/* Mobile: banda normal, primero en el flujo (antes de las fotos) —
          el titular/CTA es lo primero que se lee, no algo que aparece tras
          dos pantallas completas de foto. Desktop (lg): se saca del flujo
          con `absolute` y se centra sobre la costura, así que el orden en
          el DOM deja de importar ahí (el z-10 ya fija el apilado). */}
      <div className="division-split-heading relative z-10 flex flex-col items-center bg-ink px-6 py-10 text-center text-white lg:absolute lg:inset-0 lg:justify-center lg:bg-transparent lg:py-0">
        {/* En mobile el logo del header queda justo encima y repetiria
            literalmente este rotulo: solo se muestra en desktop, donde el
            titular esta centrado y lejos del logo. */}
        {/* Texto secundario del hero en blanco (no en `mist`): sobre
            fotografía, el gris azulado de los tokens se apagaba demasiado
            — feedback del cliente 2026-09-02, "mejora la visibilidad de los
            textos en gris". `mist` sigue siendo el token para superficies
            planas (ink/surface); sobre imagen, blanco con opacidad alta. */}
        <Eyebrow className="hidden text-white/80 lg:block">{eyebrow}</Eyebrow>
        {/* Serif editorial (doc maestro §10.2), único H1 real de la página.
            Tamaño compacto (--text-display-compact, no el display general)
            y ancho generoso a propósito: a petición del cliente, el titular
            entero cabe en una sola línea entre las dos moléculas, sin
            tocarlas — nunca varias líneas cortadas a mitad de frase. */}
        <KineticHeading
          as="h1"
          text={title}
          className="mt-4 max-w-[62rem] font-serif text-[length:var(--text-display-compact)] font-semibold leading-[1.08] tracking-[-0.01em] lg:whitespace-nowrap"
        />
        <p className="mt-4 text-[length:var(--text-lead)] text-white/90">{subtitle}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <DivisionButton {...halves[0]} onActivate={() => setActive('labs')} onDeactivate={() => setActive(null)} />
          <DivisionButton {...halves[1]} onActivate={() => setActive('tech')} onDeactivate={() => setActive(null)} />
        </div>
      </div>

      {/* Las dos mitades reciben la división ACTIVA (no "si yo estoy
          activa"): al pasar por Labs, también la mitad Tech se tiñe de
          teal, y viceversa — petición del cliente 2026-09-02. */}
      <DivisionHalf {...halves[0]} side="left" activeDivision={active} />
      <DivisionHalf {...halves[1]} side="right" activeDivision={active} />
    </div>
  );
}

function DivisionHalf({
  id,
  name,
  claim,
  body,
  image,
  molecule,
  moleculeFrames,
  side,
  activeDivision,
}: DivisionHalfData & { side: 'left' | 'right'; activeDivision: Division | null }) {
  const accent = divisionColor[id];
  const active = activeDivision !== null;
  // Color que inunda ESTA mitad al activar: el de la división activa, no
  // el propio — al pasar por Labs, la mitad Tech también se tiñe de teal
  // (y viceversa). En reposo no hay inundación, así que cae al propio.
  const flood = activeDivision ? divisionColor[activeDivision] : accent;
  // El tinte nace en la costura (borde interior de cada mitad) y crece
  // hacia afuera — de ahí que el origen del círculo esté en el lado
  // contrario al que da al exterior de la pantalla.
  const origin = side === 'left' ? '100% 50%' : '0% 50%';

  // Expansión (petición del cliente 2026-09-03): al activar un botón, ESA
  // mitad se lleva el ancho completo y la otra se repliega. Solo en
  // desktop (`lg`), donde el split es una fila; en mobile las mitades se
  // apilan y `flex-basis` gobernaría la altura, así que ahí no se toca.
  // Rápido y fluido: 620 ms con una curva de salida marcada.
  const own = activeDivision === id;
  const collapsed = activeDivision !== null && !own;
  const basis = !activeDivision ? '50%' : own ? '100%' : '0%';

  return (
    <div
      className={cn(
        'group/half relative flex min-h-[46svh] flex-1 flex-col items-center overflow-hidden p-8 text-center',
        'transition-[flex-basis,padding] duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-0',
        // El padding no colapsa con `flex-basis: 0`: sin esto, la mitad
        // replegada deja un resto de 96px y la otra nunca llega a ancho
        // completo. Se apaga a la vez y con la misma curva.
        collapsed ? 'lg:p-0' : 'lg:p-12 2xl:p-16',
      )}
      style={{ ['--half-basis' as string]: basis }}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={cn(
          'object-cover grayscale contrast-110 transition-[filter] duration-[1100ms] ease-[var(--ease-out-quart)]',
          active ? 'saturate-[1.3] brightness-100' : 'brightness-[0.92]',
        )}
      />
      {/* Reposo: cada mitad ya lleva su color de marca (petición explícita
          del cliente 2026-09-02 — "no quiero que empiece en B/N"), no un
          lavado neutro. La foto queda en escala de grises (arriba) para que
          el `mix-blend-mode: color` de aquí abajo la tiña por completo con
          el acento — el resultado es color desde el primer fotograma, no
          gris con un toque de color. */}
      <span aria-hidden className="absolute inset-0" style={{ background: accent, mixBlendMode: 'color', opacity: 0.55 }} />
      {/* Al activar un botón, el tinte "se unifica" en todo el hero: el
          color de la división activa (`flood`) se extiende desde la
          costura — como un tinte que se esparce bajo el agua — hasta
          cubrir ESTA mitad entera, sea la suya o la contraria. */}
      <span
        aria-hidden
        className="absolute inset-0 transition-[clip-path] duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          background: flood,
          mixBlendMode: 'color',
          opacity: 0.95,
          clipPath: `circle(${active ? '150%' : '0%'} at ${origin})`,
        }}
      />
      <span aria-hidden className="absolute inset-0 bg-black/15" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-black/60" />

      {/* Isotipo 3D (2026-09-02): render estático del modelo three.js que
          aportó el cliente (esferas + enlaces torneados, acabado metálico,
          degradado de marca), exportado a WebP transparente de 512px — sin
          meter three.js en el bundle (~600 KB) para una marca de 112px en
          el LCP. Halo suave a juego con el glass de los botones. Tamaño
          con presencia (el volumen metálico es la gracia) pero acotado:
          termina a ~170px del borde superior en desktop y el titular
          compartido no empieza hasta ~340px, así que no se tocan. Siempre
          arriba (nunca centrada en todo el panel): centrarla la hacía
          chocar con el titular. Fuera del flujo, no empuja el bloque que
          se ancla abajo. */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-6 flex justify-center lg:top-10 2xl:top-12">
        <span className="relative h-16 w-16 lg:h-28 lg:w-28 2xl:h-32 2xl:w-32">
          <span
            aria-hidden
            className="absolute inset-0 scale-150 rounded-full opacity-50 blur-2xl transition-opacity duration-700"
            style={{ background: divisionGlow[id], opacity: active ? 0.7 : 0.35 }}
          />
          {/* Balanceo 3D: la tira de fotogramas avanza con `steps()` (ver
              `.molecule-sway` en globals.css). Se acelera cuando su
              división está activa. */}
          <span className="molecule-sway">
            <span
              className="molecule-sway-strip"
              style={
                {
                  backgroundImage: `url(${molecule})`,
                  '--frames': moleculeFrames,
                  '--sway-ms': own ? '26ms' : '42ms',
                } as React.CSSProperties
              }
            />
          </span>
        </span>
      </span>

      <span className="relative mt-auto flex max-w-[26rem] flex-col items-center">
        <Eyebrow className="text-white/80">{name}</Eyebrow>
        <h2 className="mt-4 text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
          {claim}
        </h2>
        <p className="mt-4 max-w-[34ch] text-white/90">{body}</p>
      </span>
    </div>
  );
}

/**
 * Botón glass (CLAUDE.md regla 4): fondo translúcido + blur + borde +
 * pulso en dos capas en el color de su división (`--color-labs-glow` /
 * `--color-tech-glow`, ya calibrados para brillar sobre fondo oscuro; el
 * pulso vive en `.glass-pulse`, globals.css). Rótulo: solo el nombre de
 * la división en mayúsculas, sin flecha — petición del cliente
 * 2026-09-02. Al pasar el ratón o el foco, el pulso se para y queda un
 * brillo fijo; el estado activo lo comunica el tinte del hero.
 */
function DivisionButton({
  id,
  href,
  cta,
  onActivate,
  onDeactivate,
}: DivisionHalfData & { onActivate: () => void; onDeactivate: () => void }) {
  const accent = divisionColor[id];
  const glow = divisionGlow[id];

  return (
    <Link
      href={href}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onMouseLeave={onDeactivate}
      onBlur={onDeactivate}
      className="glass-pulse inline-flex items-center justify-center rounded-full border px-9 py-[length:var(--btn-py)] text-[length:var(--text-small)] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-500 ease-[var(--ease-out-quart)] hover:-translate-y-px focus-visible:-translate-y-px"
      style={
        {
          background: `color-mix(in srgb, ${accent} 30%, rgba(255,255,255,0.08))`,
          borderColor: 'rgba(255,255,255,0.28)',
          '--pulse-glow': glow,
        } as React.CSSProperties
      }
    >
      {cta}
    </Link>
  );
}
