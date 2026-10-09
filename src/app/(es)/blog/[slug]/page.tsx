import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArticleView } from '@/views/BlogArticleView';
import { blogHref } from '@/lib/blog/post';
import { getPublishedPost, listPublishedPosts } from '@/lib/blog/public';

export const revalidate = 60;

/**
 * Los artículos que ya existen se generan en la build. En Netlify, uno
 * publicado después se genera la primera vez que alguien lo visita.
 * La exportación estática (cdmon) exige al menos una ruta: si aún no hay
 * artículos, se genera una de relleno que responde «no encontrado».
 */
export async function generateStaticParams() {
  const posts = await listPublishedPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: 'sin-articulos' }];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.subtitle || undefined,
    alternates: { canonical: blogHref(post.slug) },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.subtitle || undefined,
      publishedTime: post.published_at ?? undefined,
      ...(post.cover_image ? { images: [post.cover_image] } : {}),
    },
  };
}

export default async function Page({ params }: Props) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  return <BlogArticleView post={post} />;
}
