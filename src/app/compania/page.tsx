import type { Metadata } from 'next';
import { Timeline } from '@/components/sections/Timeline';
import { CtaContact } from '@/components/sections/CtaContact';
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
      <Section tone="white" rhythm="air" className="pt-40 lg:pt-52">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-9">
              <Eyebrow className="text-labs">Compañía</Eyebrow>
              {/* Texto LITERAL (frase real de "Quiénes somos", no un titular corto). */}
              <h1 className="mt-6 max-w-[26ch] text-[length:var(--text-h1)] font-bold leading-[1.15] tracking-[-0.015em]">
                {companyIntro.title}
              </h1>
              <p className="mt-8 max-w-[var(--measure-max)] text-[length:var(--text-lead)] text-gray-700">
                {companyIntro.lead}
              </p>
            </div>
            <div aria-hidden className="hidden border-l border-gray-200 lg:col-span-3 lg:block">
              <span className="block h-28 w-1 bg-labs" />
              <span className="mt-8 block h-px w-full bg-gray-200" />
              <span className="mt-4 block h-px w-2/3 bg-gray-200" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="blue" rhythm="base">
        <Container>
          <ul className="grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p, i) => (
              <li key={p} className="flex min-h-64 flex-col justify-between border-b border-r border-white/15 p-7 lg:p-8">
                <span className="text-[length:var(--text-h3)] font-bold leading-none tracking-[-0.03em] text-labs">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-12 text-[17px] font-medium leading-snug text-white">{p}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Timeline entries={timeline} />

      <CtaContact />
    </>
  );
}
