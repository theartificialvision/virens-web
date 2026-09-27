import Image from 'next/image';
import type { CSSProperties } from 'react';
import { CompanyHero } from '@/components/sections/CompanyHero';
import { CompanyIcon, type CompanyIconName } from '@/components/sections/CompanyIcon';
import { CompanySectionHeading } from '@/components/sections/CompanySectionHeading';
import { CompanyTimeline } from '@/components/sections/CompanyTimeline';
import { CtaBand } from '@/components/v2/CtaBand';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { companyContent } from '@/content';
import type { Locale } from '@/lib/i18n';

export function CompanyView({ locale }: { locale: Locale }) {
  const { companyIntro, companyResearch, companySections, companyImages, pillars, timeline, valueChain } = companyContent(locale);
  return (
    <>
      <CompanyHero locale={locale} />

      <Section id="quienes-somos" tone="white" rhythm="air">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <CompanySectionHeading {...companySections.identity} />
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="text-[length:var(--text-lead)] font-medium leading-[1.55] text-blue">
                  {companyIntro.title}
                </p>
              </Reveal>
              <div className="mt-7 space-y-5">
                {companyIntro.body.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={(index + 1) * 0.06}>
                    <p className="max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <Reveal className="company-stagger mt-16 lg:mt-24">
            <ul className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
              {pillars.map((pillar, index) => (
                <li key={pillar.label} className="company-stagger-item flex flex-col items-center text-center" style={{ '--i': index } as CSSProperties}>
                  <CompanyIcon name={pillar.icon as CompanyIconName} className="size-[var(--company-icon-lg)] text-labs" />
                  <p className="mt-6 max-w-[18rem] text-[length:var(--text-small)] font-medium leading-snug text-blue">
                    {pillar.label}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <section id="que-hacemos" className="company-process relative isolate overflow-hidden bg-blue text-white" data-header-tone="dark">
        <Image src="/img/labs-planta.jpg" alt={companyImages.process} fill sizes="100vw" className="-z-30 object-cover grayscale" />
        <span aria-hidden className="absolute inset-0 -z-20 bg-blue/[0.92] mix-blend-multiply" />
        <span aria-hidden className="absolute inset-0 -z-10 bg-blue/[0.35]" />
        <Container className="py-[var(--v2-section)]">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <CompanySectionHeading index={companySections.work.index} title={companySections.work.title} inverse />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7">
              <p className="text-[length:var(--text-lead)] font-medium leading-snug">{companySections.work.intro}</p>
              <p className="mt-5 max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85] text-white/75">
                {companySections.work.body}
              </p>
            </Reveal>
          </div>

          <Reveal className="company-stagger mt-14 lg:mt-20">
            <ol className="company-liquid-panel grid overflow-hidden text-blue md:grid-cols-5 md:divide-x md:divide-blue/12">
              {valueChain.map((step, index) => (
                <li key={step.index} className="company-stagger-item relative z-10 flex flex-col border-b border-blue/12 p-6 last:border-b-0 md:min-h-[var(--company-process-h)] md:border-b-0 lg:p-8" style={{ '--i': index } as CSSProperties}>
                  <div className="flex items-start justify-between gap-4">
                    <CompanyIcon name={step.icon as CompanyIconName} className="text-labs" />
                    <span className="text-[length:var(--text-note)] font-semibold tracking-label text-blue/35">{step.index}</span>
                  </div>
                  <h3 className="mt-7 text-[length:var(--text-h4)] font-medium leading-tight tracking-[-0.015em]">{step.title}</h3>
                  <p className="mt-4 text-[length:var(--text-note)] leading-[1.65] text-gray-700">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <Section id="investigacion" tone="soft" rhythm="air">
        <Container>
          <h2 className="sr-only">{companyResearch.title}</h2>
          <div className="company-research-grid grid items-center lg:grid-cols-12">
            <Reveal className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
              <div className="company-research-media relative aspect-[4/3] overflow-hidden">
                <Image src={companyResearch.image.src} alt={companyResearch.image.alt} fill sizes="(max-width: 1024px) 100vw, 58vw" className="v2-media object-cover" />
              </div>
            </Reveal>
            <Reveal className="company-research-copy company-liquid-panel lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-center">
              <span aria-hidden className="company-section-index block font-semibold leading-[0.75] tracking-normal text-blue/10">
                {companySections.research.index}
              </span>
              <p className="mt-9 text-[length:var(--text-lead)] font-normal leading-[1.72] text-blue">
                {companyResearch.body.map((segment, index) => (
                  <span key={`${segment.text}-${index}`} className={segment.accent ? 'font-semibold text-labs' : undefined}>{segment.text}</span>
                ))}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CompanyTimeline heading={companySections.history} entries={timeline} imageAlt={companyImages.history} />

      <CtaBand locale={locale} />
    </>
  );
}
