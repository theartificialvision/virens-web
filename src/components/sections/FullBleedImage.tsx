import Image from 'next/image';

/**
 * Imagen a sangre con una sola línea de texto (§06 bloque 07).
 * Respiro visual entre dos bloques densos: sin CTA, sin más contenido.
 */
export function FullBleedImage({
  caption,
  image,
}: {
  caption: string;
  image: { src: string; alt: string };
}) {
  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
      <span aria-hidden className="absolute inset-0 bg-[rgba(0,40,92,0.25)]" />
      <p className="absolute bottom-8 left-5 max-w-[80vw] text-[length:var(--text-lead)] font-medium text-white md:bottom-12 md:left-12">
        {caption}
      </p>
    </section>
  );
}
