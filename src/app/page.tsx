import { HeroVideo } from '@/components/sections/HeroVideo';
import { StatRow } from '@/components/sections/StatRow';
import { DivisionSplit } from '@/components/sections/DivisionSplit';
import { CtaContact } from '@/components/sections/CtaContact';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { valueChain } from '@/content/company';
import { divisionSplit, divisionsIntro, homeHero, homeStats, processIntro } from '@/content/home';
import { site } from '@/config/site';

/**
 * HOME. La web actual es una pantalla de acceso con dos palabras en inglés:
 * aquí informa antes de bifurcar (§13.1).
 */
export default function HomePage() {
  return (
    <>
      <HeroVideo
        eyebrow={homeHero.eyebrow}
        title={site.claim}
        subtitle={site.subclaim}
        lead={homeHero.lead}
        video={{ mp4: '/video/home-hero.mp4', poster: '/img/home-hero-poster.jpg' }}
        moleculeVariant="neutral"
      />

      <StatRow stats={homeStats} tone="ink" />

      {/* Las dos divisiones */}
      <Section tone="surface" rhythm="base">
        <Container>
          <div className="max-w-[var(--measure-max)]">
            <Eyebrow className="text-mist-dim">{divisionsIntro.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-[length:var(--text-h2)] font-bold leading-[1.1] tracking-[-0.015em]">
              {divisionsIntro.title}
            </h2>
          </div>
        </Container>

        <div className="mt-16">
          <DivisionSplit halves={divisionSplit} />
        </div>
      </Section>

      {/* Cómo trabajamos */}
      <Section tone="ink" rhythm="base">
        <Container>
          <div className="max-w-[var(--measure-max)]">
            <Eyebrow className="text-mist-dim">{processIntro.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-[length:var(--text-h2)] font-bold leading-[1.1] tracking-[-0.015em]">
              {processIntro.title}
            </h2>
          </div>

          <ol className="mt-16 grid border-l border-t border-white/12 lg:grid-cols-4">
            {valueChain.map((step, i) => (
              <li key={step.index} className="min-h-72 border-b border-r border-white/12 bg-surface">
                <Reveal delay={i * 0.06} className="flex h-full flex-col p-7 lg:p-8">
                  <span className="text-[length:var(--text-h3)] font-bold leading-none tracking-[-0.03em] text-labs">{step.index}</span>
                  <h3 className="mt-10 text-[length:var(--text-h4)] font-semibold">{step.title}</h3>
                  <ul className="mt-6 space-y-2 text-[15px] text-mist">
                    {step.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaContact />
    </>
  );
}
