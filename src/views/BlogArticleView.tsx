import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { BlogCover } from '@/components/blog/BlogCover';
import { site } from '@/config/site';
import { blogText } from '@/content/blog';
import { blogHref, formatPostDate, type PublicPost } from '@/lib/blog/post';
import { sanitizePostHtml } from '@/lib/blog/sanitize';

/**
 * BLOG (09/10/2026) — plantilla única de artículo: imagen principal · título ·
 * subtítulo · cuerpo. El panel solo aporta el contenido; el diseño es siempre
 * este. Un solo h1 (el título); los subtítulos del cuerpo son h2/h3.
 */
export function BlogArticleView({ post }: { post: PublicPost }) {
  const t = blogText.article;
  return (
    <article className="bg-bone pb-[var(--v2-section)] pt-28 text-blue lg:pt-36">
      <Container>
        <nav aria-label="Ruta" className="text-[length:var(--text-micro)] font-medium text-gray-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="transition-colors hover:text-blue">{t.crumbHome}</Link></li>
            <li aria-hidden className="text-gray-300">/</li>
            <li><Link href="/blog" className="transition-colors hover:text-blue">{t.crumbBlog}</Link></li>
          </ol>
        </nav>

        {post.cover_image && (
          <BlogCover
            src={post.cover_image}
            priority
            sizes="(min-width: 1440px) 1296px, 92vw"
            className="mt-8 aspect-[16/9] md:mt-10"
          />
        )}

        <header className="mx-auto mt-12 max-w-[var(--measure-max)] md:mt-16">
          <time dateTime={post.published_at ?? undefined} className="text-[length:var(--text-micro)] font-semibold uppercase tracking-eyebrow text-labs">
            {formatPostDate(post.published_at)}
          </time>
          <h1 className="mt-4 text-[length:var(--text-h1)] font-semibold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-gray-700">{post.subtitle}</p>
          )}
        </header>

        {/* HTML del panel, limpiado en el servidor antes de pintarlo. */}
        <div
          className="article-body mx-auto mt-10 max-w-[var(--measure-max)] border-t border-gray-200 pt-10 md:mt-12 md:pt-12"
          dangerouslySetInnerHTML={{ __html: sanitizePostHtml(post.content) }}
        />

        <p className="mx-auto mt-16 max-w-[var(--measure-max)] md:mt-20">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[length:var(--text-small)] font-semibold text-blue">
            <span aria-hidden>&larr;</span>
            <span className="underline decoration-1 underline-offset-4">{t.back}</span>
          </Link>
        </p>
      </Container>
      <BlogPostingSchema post={post} />
    </article>
  );
}

/** Datos estructurados del artículo, para buscadores. */
function BlogPostingSchema({ post }: { post: PublicPost }) {
  const image = post.cover_image ? new URL(post.cover_image, site.url).toString() : undefined;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.subtitle,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    ...(image ? { image } : {}),
    mainEntityOfPage: `${site.url}${blogHref(post.slug)}`,
    author: { '@type': 'Organization', name: site.legalName, url: site.url },
    publisher: { '@type': 'Organization', name: site.legalName, url: site.url },
  };
  // `<` escapado: un título con «</script>» no puede cerrar la etiqueta.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
