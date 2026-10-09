import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Imagen principal de un artículo. Sirve igual para las fotos subidas desde el
 * panel (Supabase Storage) y para las de las noticias antiguas (`/img/noticias`).
 * `alt` vacío: la foto acompaña al titular, que ya dice de qué va.
 */
export function BlogCover({ src, sizes, priority, className }: { src: string | null; sizes: string; priority?: boolean; className?: string }) {
  return (
    <span className={cn('relative block overflow-hidden bg-blue-soft', className)}>
      {src && <Image src={src} alt="" fill priority={priority} sizes={sizes} className="object-cover" />}
    </span>
  );
}
