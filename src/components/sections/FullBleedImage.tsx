import Image from 'next/image';
import { Container } from '@/components/ui/Container';

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
    <section data-header-tone="dark" className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
      <span aria-hidden className="absolute inset-0 bg-[var(--image-veil)]" />
      <div className="absolute inset-x-0 bottom-8 md:bottom-12">
        <Container>
          <p className="max-w-[var(--measure-max)] text-[length:var(--text-lead)] font-medium text-white">
            {caption}
          </p>
        </Container>
      </div>
    </section>
  );
}
