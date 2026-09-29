import Image from 'next/image';
import Link from 'next/link';
import { newsHref } from '@/lib/news';
import type { NewsPost } from '@/content/noticias';
import { NewsMeta } from './NewsMeta';

/** Fila del índice: número · titular + extracto · miniatura. Toda la fila es un
 *  único enlace; el filete superior la separa de la anterior (rejilla de filete
 *  compartido, no tarjetas: radio 0, sin sombra — regla 4/7). */
export function NewsRow({ post, index }: { post: NewsPost; index: number }) {
  return (
    <li>
      <Link
        href={newsHref(post.slug)}
        className="news-row group grid gap-6 border-t border-gray-200 py-8 md:grid-cols-12 md:gap-10 md:py-10"
      >
        <span
          aria-hidden
          className="hidden text-[length:var(--text-h4)] font-bold tabular-nums leading-none text-gray-300 md:col-span-1 md:block"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="md:col-span-7">
          <NewsMeta post={post} />
          <span className="news-row-title mt-3 block max-w-[34ch] text-[length:var(--text-h4)] font-semibold leading-snug tracking-[-0.01em] [text-wrap:balance]">
            {post.title}
          </span>
          <span className="mt-3 block max-w-[var(--measure-narrow)] text-[length:var(--text-body)] leading-relaxed text-gray-700">
            {post.excerpt}
          </span>
        </span>
        <span className="news-media relative block aspect-[16/9] overflow-hidden bg-blue-soft md:col-span-4 md:aspect-[4/3]">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 35vw, 100vw"
            className="object-cover"
          />
        </span>
      </Link>
    </li>
  );
}
