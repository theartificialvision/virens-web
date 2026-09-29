import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { CtaContact } from '@/components/sections/CtaContact';
import { NewsFeatured } from '@/components/news/NewsFeatured';
import { NewsIndex } from '@/components/news/NewsIndex';
import { newsIntro, newsPosts } from '@/content/noticias';

export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Actualidad de Laboratorios Virens: ferias, divulgación y compañía.',
  alternates: { canonical: '/noticias' },
  openGraph: { title: 'Noticias', description: 'Actualidad de Laboratorios Virens: ferias, divulgación y compañía.' },
};

/** Índice de noticias: cabecera · destacada (la más reciente) · índice
 *  filtrable por categoría · CTA. Tono: white → gray → white → gray. */
export default function NoticiasPage() {
  const [featured] = newsPosts;
  const oldestYear = newsPosts[newsPosts.length - 1]?.dateISO.slice(0, 4);
  const newestYear = newsPosts[0]?.dateISO.slice(0, 4);

  return (
    <>
      <Section tone="white" rhythm="air" className="pt-20 md:pt-28 lg:pt-52">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-9">
              <Reveal>
                <Eyebrow className="text-labs">{newsIntro.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-6 text-[length:var(--text-h1)] font-bold leading-[1.05] tracking-[-0.02em]">
                  {newsIntro.title}
                </h1>
                <p className="mt-8 max-w-[var(--measure-max)] text-[length:var(--text-lead)] text-gray-700">
                  {newsIntro.lead}
                </p>
                <p className="mt-6 text-[length:var(--text-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-gray-500">
                  {newsPosts.length} {newsIntro.articles} · {oldestYear}–{newestYear}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {featured && (
        <Section tone="gray" rhythm="base">
          <Container>
            <NewsFeatured post={featured} />
          </Container>
        </Section>
      )}

      <Section tone="white" rhythm="base">
        <Container>
          <Reveal>
            <h2 className="text-[length:var(--text-h2)] font-medium leading-tight tracking-[-0.015em]">
              {newsIntro.backToIndex}
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-10 md:mt-14">
            {/* El índice lista las 18: la destacada también ocupa su fila 01,
                como en cualquier cabecera editorial — si no, los recuentos
                por categoría no cuadrarían. */}
            <NewsIndex posts={newsPosts} />
          </Reveal>
        </Container>
      </Section>

      <CtaContact />
    </>
  );
}
