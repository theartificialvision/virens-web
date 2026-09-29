import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { CtaContact } from '@/components/sections/CtaContact';
import { NewsArticle } from '@/components/news/NewsArticle';
import { newsPosts } from '@/content/noticias';
import { newsHref } from '@/lib/news';

/** Los 18 slugs se conservan tal cual (§14.5): /<slug> -> /noticias/<slug>. */
export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const url = newsHref(post.slug);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.dateISO,
      images: [{ url: post.image.src, alt: post.image.alt }],
      url,
    },
  };
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = newsPosts.findIndex((p) => p.slug === slug);
  const post = newsPosts[index];
  if (!post) notFound();

  return (
    <>
      <Section tone="white" rhythm="air" className="pt-20 md:pt-28 lg:pt-52">
        <Container>
          <NewsArticle
            post={post}
            prev={newsPosts[index - 1] ?? null}
            next={newsPosts[index + 1] ?? null}
          />
        </Container>
      </Section>

      <CtaContact />
    </>
  );
}
