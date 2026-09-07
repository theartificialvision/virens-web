import { StatRow } from '@/components/sections/StatRow';
import { DivisionSplit } from '@/components/sections/DivisionSplit';
import { CtaContact } from '@/components/sections/CtaContact';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { valueChain } from '@/content/company';
import { divisionSplit, homePresentation, homeStats, processIntro } from '@/content/home';

/** Home: hero de presentación (referencias del cliente, 06/09/2026).
 * Composición limpia en inglés; se conserva el contenido corporativo inferior.
 */
export default function HomePage() {
  return (
    <>
      <DivisionSplit
        halves={divisionSplit}
        presentation={homePresentation}
      />

      <StatRow stats={homeStats} tone="gray" />

      {/* Cómo trabajamos */}
      <Section tone="white" rhythm="base">
        <Container>
          <div className="max-w-[var(--measure-max)]">
            <Eyebrow className="text-gray-500">{processIntro.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-[length:var(--text-h2)] font-bold leading-[1.1] tracking-[-0.015em]">
              {processIntro.title}
            </h2>
          </div>

          <ol className="mt-16 grid border-l border-t border-gray-200 lg:grid-cols-4">
            {valueChain.map((step, i) => (
              <li key={step.index} className="min-h-72 border-b border-r border-gray-200 bg-gray-50">
                <Reveal delay={i * 0.06} className="flex h-full flex-col p-7 lg:p-8">
                  <span className="text-[length:var(--text-h3)] font-bold leading-none tracking-[-0.03em] text-labs">{step.index}</span>
                  <h3 className="mt-10 text-[length:var(--text-h4)] font-semibold">{step.title}</h3>
                  <ul className="mt-6 space-y-2 text-[15px] text-gray-700">
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
