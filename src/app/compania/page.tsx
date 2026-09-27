import type { Metadata } from 'next';
import { Timeline } from '@/components/sections/Timeline';
import { CtaBand } from '@/components/v2/CtaBand';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { companyIntro, pillars, timeline } from '@/content/company';

export const metadata: Metadata = {
  title: 'Compañía',
  description: 'Laboratorio propio en Sant Andreu de la Barca desde 2000. Historia, calidad, certificaciones e instalaciones.',
  alternates: { canonical: '/compania' },
};

export default function CompaniaPage() {
  return (
    <>
      <Section tone="white" rhythm="air">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-9">
              <Eyebrow className="text-labs">Compañía</Eyebrow>
              {/* Texto LITERAL (frase real de "Quiénes somos", no un titular corto). */}
              <h1 className="mt-6 max-w-[26ch] text-[length:var(--v2-hero-title)] font-normal leading-[1.08] tracking-[-0.02em]">
                {companyIntro.title}
              </h1>
              <p className="mt-8 max-w-[var(--measure-max)] text-[length:var(--text-body)] leading-relaxed text-gray-700">
                {companyIntro.lead}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="soft" rhythm="base">
        <Container>
          <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p, i) => (
              <li key={p} className="flex flex-col gap-4 lg:gap-6">
                <span className="text-[length:var(--text-note)] font-semibold tracking-label text-labs">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[length:var(--text-small)] font-medium leading-snug text-blue">{p}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Timeline entries={timeline} />

      <CtaBand />
    </>
  );
}
