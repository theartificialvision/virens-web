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
  molecule: string;
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
        <Eyebrow className="hidden text-mist-dim lg:block">{eyebrow}</Eyebrow>
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
        <p className="mt-4 text-[length:var(--text-lead)] text-mist">{subtitle}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <DivisionButton {...halves[0]} onActivate={() => setActive('labs')} onDeactivate={() => setActive(null)} />
          <DivisionButton {...halves[1]} onActivate={() => setActive('tech')} onDeactivate={() => setActive(null)} />
        </div>
      </div>

      <DivisionHalf {...halves[0]} side="left" active={active === 'labs'} />
      <DivisionHalf {...halves[1]} side="right" active={active === 'tech'} />
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
  side,
  active,
}: DivisionHalfData & { side: 'left' | 'right'; active: boolean }) {
  const accent = divisionColor[id];
  // El tinte nace en la costura (borde interior de cada mitad) y crece
  // hacia afuera — de ahí que el origen del círculo esté en el lado
  // contrario al que da al exterior de la pantalla.
  const origin = side === 'left' ? '100% 50%' : '0% 50%';

  return (
    <div className="group/half relative flex min-h-[46svh] flex-1 flex-col items-center overflow-hidden p-8 text-center lg:min-h-0 lg:p-12 2xl:p-16">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={cn(
          'object-cover contrast-110 transition-[filter] duration-[1100ms] ease-[var(--ease-out-quart)]',
          active ? 'grayscale-0 saturate-[1.3] brightness-100' : 'grayscale brightness-[0.82]',
        )}
      />
      {/* En reposo la mitad queda neutra/apagada (lavado de --color-ink, no
          del color de marca): la foto ya tiene un cian natural por la luz
          de planta que se confundía con el teal si el lavado de reposo
          también era de color — apenas se notaba el cambio al activar. Solo
          el círculo de difusión lleva el acento, para que "llegue" el color
          en vez de simplemente subir de intensidad. */}
      <span aria-hidden className="absolute inset-0 bg-ink/55" />
      {/* Difusión de tinte: crece desde la costura al activar el botón de
          esta división — "como un tinte que se esparce bajo el agua". */}
      <span
        aria-hidden
        className="absolute inset-0 transition-[clip-path] duration-[1200ms] ease-[var(--ease-out-quart)]"
        style={{
          background: accent,
          mixBlendMode: 'color',
          opacity: 0.95,
          clipPath: `circle(${active ? '150%' : '0%'} at ${origin})`,
        }}
      />
      <span aria-hidden className="absolute inset-0 bg-black/15" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-black/60" />

      {/* Molécula del isotipo a color (petición del cliente 2026-09-02:
          antes blanca por defecto, coloreada solo al hover). Halo suave a
          juego con el glass de los botones. Tamaño moderado a propósito —
          a color y a la escala anterior (160px+) competía demasiado con el
          texto. Siempre arriba (nunca centrada en todo el panel): el
          titular compartido ya vive centrado en esa misma franja media, y
          centrar la molécula ahí también las hacía chocar — visto en la
          propia captura al comprimir el H1 a una línea. Arriba, fuera del
          flujo, no empuja el bloque que se ancla abajo. */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-6 flex justify-center lg:top-10 2xl:top-12">
        <span className="relative h-12 w-12 lg:h-16 lg:w-16 2xl:h-20 2xl:w-20">
          <span
            aria-hidden
            className="absolute inset-0 scale-150 rounded-full opacity-50 blur-2xl transition-opacity duration-700"
            style={{ background: divisionGlow[id], opacity: active ? 0.7 : 0.35 }}
          />
          <img src={molecule} alt="" className="relative h-full w-full object-contain" />
        </span>
      </span>

      <span className="relative mt-auto flex max-w-[26rem] flex-col items-center">
        <Eyebrow className="text-mist-dim">{name}</Eyebrow>
        <h2 className="mt-4 text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
          {claim}
        </h2>
        <p className="mt-4 max-w-[34ch] text-mist">{body}</p>
      </span>
    </div>
  );
}

/**
 * Botón glass (CLAUDE.md regla 4): fondo translúcido + blur + borde +
 * pulso suave en el color de su división (`--color-labs-glow` /
 * `--color-tech-glow`, ya calibrados para brillar sobre fondo oscuro). Al
 * activarse, el fondo vira hacia el color de la división y el pulso se
 * detiene (el brillo fijo del `boxShadow` ya comunica el estado activo).
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
      className="glass-pulse inline-flex items-center gap-2 rounded-full border px-8 py-[length:var(--btn-py)] text-[length:var(--text-small)] font-semibold tracking-[0.04em] text-white backdrop-blur-md transition-all duration-500 ease-[var(--ease-out-quart)] hover:-translate-y-px focus-visible:-translate-y-px"
      style={
        {
          background: `color-mix(in srgb, ${accent} 30%, rgba(255,255,255,0.08))`,
          borderColor: 'rgba(255,255,255,0.28)',
          '--pulse-glow': glow,
        } as React.CSSProperties
      }
    >
      {cta}
      <span aria-hidden>&rarr;</span>
    </Link>
  );
}
