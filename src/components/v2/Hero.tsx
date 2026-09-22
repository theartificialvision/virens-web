import { v2Hero } from '@/content/v2-home';

/**
 * Hero a sangre: vídeo real de la línea de llenado bajo un velo azul que baja
 * de intensidad hacia la derecha — el texto vive en el tercio izquierdo, como
 * en la maqueta, y la máquina queda legible al otro lado.
 *
 * El vídeo es el mismo activo de V1 (`/video/home-hero.mp4`), mudo, en bucle y
 * con póster: sin JS, y con `prefers-reduced-motion` el navegador se queda en
 * el póster porque `autoPlay` solo arranca la reproducción, no la exige.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[clamp(30rem,72vh,44rem)] items-end overflow-hidden bg-blue">
      {/* El material real tira a verde (luz de la nave): se desatura y se sube
          un punto el contraste ANTES del velo azul. Sin esto el hero pelea con
          el teal de marca en vez de asentarlo. */}
      <video
        className="absolute inset-0 -z-10 size-full object-cover [filter:saturate(0.32)_contrast(1.08)_brightness(0.95)]"
        src={v2Hero.video.src}
        poster={v2Hero.video.poster}
        autoPlay
        muted
        loop
        playsInline
        aria-label={v2Hero.alt}
      />
      {/* Velo: opaco a la izquierda para que el texto asiente, transparente a
          la derecha para no matar la fotografía. */}
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-blue/92 via-blue/55 to-blue/10" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-blue/60 to-transparent" />

      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 pb-[var(--v2-hero-pad)] pt-32 md:px-8 lg:px-12 2xl:px-20">
        <div className="max-w-[var(--measure-max)] text-white">
          <h1 className="text-[length:var(--v2-hero-title)] font-normal leading-[1.08] tracking-[-0.02em]">
            {v2Hero.title}
          </h1>
          <p className="mt-5 text-[length:var(--v2-hero-sub)] font-normal leading-snug text-white/90">{v2Hero.subtitle}</p>
          <p className="mt-8 max-w-[var(--measure-narrow)] text-[length:var(--text-body)] leading-relaxed text-white/75">
            {v2Hero.lead}
          </p>
        </div>
      </div>
    </section>
  );
}
