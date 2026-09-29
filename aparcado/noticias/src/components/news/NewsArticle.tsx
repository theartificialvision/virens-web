import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/config/site';
import { newsIntro, type NewsPost } from '@/content/noticias';
import { newsHref } from '@/lib/news';
import { NewsMeta } from './NewsMeta';

/** Plantilla de artículo: miga · cabecera · imagen · cuerpo (HTML saneado en la
 *  extracción) · anterior/siguiente. Un solo h1, el titular. */
export function NewsArticle({
  post,
  prev,
  next,
}: {
  post: NewsPost;
  prev: NewsPost | null;
  next: NewsPost | null;
}) {
  return (
    <article>
      <nav aria-label="breadcrumb" className="text-[length:var(--text-micro)] font-medium text-gray-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-blue">
              {newsIntro.homeCrumb}
            </Link>
          </li>
          <li aria-hidden className="text-gray-300">
            /
          </li>
          <li>
            <Link href="/noticias" className="transition-colors hover:text-blue">
              {newsIntro.indexCrumb}
            </Link>
          </li>
          <li aria-hidden className="text-gray-300">
            /
          </li>
          <li aria-current="page" className="max-w-[32ch] truncate text-blue">
            {post.title}
          </li>
        </ol>
      </nav>

      <header className="mt-10 max-w-[var(--measure-max)] md:mt-14">
        <NewsMeta post={post} />
        <h1 className="mt-5 text-[length:var(--text-h1)] font-bold leading-[1.08] tracking-[-0.02em] [text-wrap:balance]">
          {post.title}
        </h1>
        <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-gray-700">
          {post.excerpt}
        </p>
      </header>

      <figure className="mt-10 md:mt-14">
        <span className="relative block aspect-[16/10] overflow-hidden bg-blue-soft">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            priority
            sizes="(min-width: 1440px) 1296px, 92vw"
            className="object-cover"
          />
        </span>
      </figure>

      {/* HTML saneado en la extracción (ver src/content/noticias.ts): sin
          scripts, estilos ni atributos de WP; solo texto, listas y media. */}
      <div
        className="article-body mx-auto mt-12 max-w-[var(--measure-max)] md:mt-16"
        dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
      />

      <footer className="mt-16 md:mt-24">
        <nav aria-label="news" className="grid gap-px border-y border-gray-200 bg-gray-200 md:grid-cols-2">
          <Pager post={prev} label={newsIntro.prevLabel} align="left" />
          <Pager post={next} label={newsIntro.nextLabel} align="right" />
        </nav>
        <p className="mt-10 text-center">
          <Link
            href="/noticias"
            className="text-link inline-flex items-center gap-2 text-[length:var(--text-small)] font-semibold text-blue"
          >
            <span aria-hidden className="text-link-arrow inline-block rotate-180">
              &rarr;
            </span>
            <span className="underline decoration-1 underline-offset-4">{newsIntro.backToIndex}</span>
          </Link>
        </p>
      </footer>

      <BlogPostingSchema post={post} />
    </article>
  );
}

function Pager({
  post,
  label,
  align,
}: {
  post: NewsPost | null;
  label: string;
  align: 'left' | 'right';
}) {
  if (!post) return <span aria-hidden className="hidden bg-bone md:block" />;
  return (
    <Link
      href={newsHref(post.slug)}
      className={`news-pager group block bg-bone p-8 transition-colors hover:bg-blue-soft md:p-10 ${align === 'right' ? 'md:text-right' : ''}`}
    >
      <span className="text-[length:var(--text-micro)] font-bold uppercase tracking-[var(--tracking-label)] text-gray-500">
        {label}
      </span>
      <span className="news-row-title mt-3 block max-w-[30ch] text-[length:var(--text-h4)] font-semibold leading-snug tracking-[-0.01em] [text-wrap:balance]">
        {post.title}
      </span>
    </Link>
  );
}

/** Datos estructurados del artículo (§14.5). */
function BlogPostingSchema({ post }: { post: NewsPost }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    image: `${site.url}${post.image.src}`,
    mainEntityOfPage: `${site.url}${newsHref(post.slug)}`,
    author: { '@type': 'Organization', name: site.legalName, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.legalName,
      url: site.url,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
