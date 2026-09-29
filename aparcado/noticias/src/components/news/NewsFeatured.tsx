import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/Button';
import { newsIntro, type NewsPost } from '@/content/noticias';
import { newsHref } from '@/lib/news';
import { NewsMeta } from './NewsMeta';

/** Noticia destacada del índice: la más reciente, a gran formato.
 *  Imagen 7/12 + texto 5/12; en móvil la imagen va arriba (regla móvil). */
export function NewsFeatured({ post }: { post: NewsPost }) {
  const href = newsHref(post.slug);
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-7">
        <Link
          href={href}
          aria-label={post.title}
          className="news-media block overflow-hidden bg-blue-soft"
        >
          <span className="relative block aspect-[16/10]">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </span>
        </Link>
      </Reveal>
      <div className="lg:col-span-5">
        <Reveal>
          <p className="text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow text-tech">
            {newsIntro.featuredLabel}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <NewsMeta post={post} className="mt-6" />
          <h2 className="mt-4 text-[length:var(--text-h2)] font-semibold leading-[1.1] tracking-[-0.015em] [text-wrap:balance]">
            <Link href={href} className="news-title-link">
              {post.title}
            </Link>
          </h2>
          <p className="mt-6 max-w-[var(--measure-narrow)] text-[length:var(--text-lead)] leading-relaxed text-gray-700">
            {post.excerpt}
          </p>
          <p className="mt-8">
            <TextLink href={href}>{newsIntro.readMore}</TextLink>
          </p>
        </Reveal>
      </div>
    </article>
  );
}
