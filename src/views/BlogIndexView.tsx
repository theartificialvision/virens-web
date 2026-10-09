import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { BlogRow } from '@/components/blog/BlogRow';
import { blogText } from '@/content/blog';
import type { PostSummary } from '@/lib/blog/post';

/**
 * BLOG (09/10/2026) — listado de artículos publicados, del más reciente al más
 * antiguo. Cabecera en la banda azul de los textos legales; debajo, las filas.
 */
export function BlogIndexView({ posts }: { posts: readonly PostSummary[] }) {
  const t = blogText.index;
  return (
    <>
      <section className="relative isolate overflow-hidden bg-blue text-white" data-header-tone="dark">
        <span aria-hidden className="absolute -right-1/4 -top-1/2 -z-10 size-[60rem] rounded-full bg-[radial-gradient(closest-side,var(--color-labs)_0%,transparent_70%)] opacity-20" />
        <Container className="pb-16 pt-36 lg:pb-20 lg:pt-44">
          <Eyebrow className="text-labs-glow">{t.eyebrow}</Eyebrow>
          <h1 className="mt-6 text-[length:var(--v2-hero-title)] font-normal leading-[1.08] tracking-[-0.02em]">{t.title}</h1>
          <p className="mt-5 max-w-[var(--measure-narrow)] text-[length:var(--text-lead)] text-white/70">{t.lead}</p>
        </Container>
      </section>
      <Section tone="white" rhythm="air">
        <Container>
          {posts.length === 0 ? (
            <p className="text-[length:var(--text-body)] text-gray-700">{t.empty}</p>
          ) : (
            <ol className="border-b border-gray-200">
              {posts.map((post, i) => (
                <BlogRow key={post.slug} post={post} first={i === 0} />
              ))}
            </ol>
          )}
        </Container>
      </Section>
    </>
  );
}
