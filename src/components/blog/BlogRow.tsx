import Link from 'next/link';
import { blogText } from '@/content/blog';
import { blogHref, formatPostDate, type PostSummary } from '@/lib/blog/post';
import { BlogCover } from './BlogCover';

/**
 * Fila del listado: fecha · titular · entradilla · imagen. Toda la fila es un
 * enlace; el filete superior la separa de la anterior. Rejilla de filete
 * compartido, no tarjetas: radio 0 y sin sombra (reglas 4 y 7). Diseño heredado
 * de la sección Noticias aparcada el 29/09/2026.
 */
export function BlogRow({ post, first }: { post: PostSummary; first?: boolean }) {
  return (
    <li>
      <Link
        href={blogHref(post.slug)}
        className="blog-row group grid gap-6 border-t border-gray-200 py-8 md:grid-cols-12 md:gap-10 md:py-10"
      >
        <BlogCover
          src={post.cover_image}
          priority={first}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 35vw, 100vw"
          className="blog-media aspect-[16/9] md:order-2 md:col-span-4 md:aspect-[4/3]"
        />
        <span className="md:order-1 md:col-span-8">
          <time dateTime={post.published_at ?? undefined} className="text-[length:var(--text-micro)] font-semibold uppercase tracking-eyebrow text-labs">
            {formatPostDate(post.published_at)}
          </time>
          <span className="blog-row-title mt-3 block max-w-[34ch] text-[length:var(--text-h4)] font-semibold leading-snug tracking-[-0.01em] text-blue [text-wrap:balance]">
            {post.title}
          </span>
          {post.subtitle && (
            <span className="mt-3 block max-w-[var(--measure-narrow)] text-[length:var(--text-body)] leading-relaxed text-gray-700">
              {post.subtitle}
            </span>
          )}
          <span className="mt-5 inline-block text-[length:var(--text-small)] font-semibold text-blue underline decoration-1 underline-offset-4">
            {blogText.index.readMore}
          </span>
        </span>
      </Link>
    </li>
  );
}
