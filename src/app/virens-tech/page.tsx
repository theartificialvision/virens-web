import type { Metadata } from 'next';
import { AnchorNav } from '@/components/layout/AnchorNav';
import { DivisionIndex } from '@/components/sections/DivisionIndex';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { EditorialSplit } from '@/components/sections/EditorialSplit';
import { TypographicBlock } from '@/components/sections/TypographicBlock';
import { StatRow } from '@/components/sections/StatRow';
import { DivisionSwitch } from '@/components/sections/DivisionSwitch';
import { CtaContact } from '@/components/sections/CtaContact';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { techAnchors } from '@/config/navigation';
import { crossLink, integratedSolutions, techHero, techIntro, techServices, techStats } from '@/content/tech';

export const metadata: Metadata = {
  title: 'Virens Tech · I+D y formulación de complementos',
  description:
    'Formulación, R+D galénicos, centro de sabores, estabilidad, control de calidad y consultoría regulatoria.',
  alternates: { canonical: '/virens-tech' },
};

/**
 * ONE PAGE de Virens Tech.
 * Los seis servicios son bloques independientes alternados imagen/texto,
 * nunca tarjetas en dos columnas.
 */
export default function VirensTechPage() {
  return (
    <>
      {/* 01 */}
      <HeroVideo {...techHero} moleculeVariant="tech">
        <Magnetic className="inline-block">
          <Button href={crossLink.href} variant="labs">
            {crossLink.label} &rarr;
          </Button>
        </Magnetic>
      </HeroVideo>

      <AnchorNav items={techAnchors} division="tech" />

      {/* 02 */}
      <Section tone="ink" rhythm="base">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow className="text-tech">{techIntro.eyebrow}</Eyebrow>
              {/* Texto LITERAL (párrafo real, más largo que el de Compañía:
                  se queda en H3 para no desequilibrar frente a la columna). */}
              <h2 className="mt-6 text-[length:var(--text-h3)] font-semibold leading-[1.3] tracking-[-0.01em]">
                {techIntro.title}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-[var(--measure-max)] text-[length:var(--text-lead)] text-mist">
                {techIntro.body}
              </p>
              <ul className="mt-10 grid border-l border-t border-white/12 sm:grid-cols-2">
                {techIntro.points.map((p) => (
                  <li key={p.index} className="flex min-h-28 flex-col justify-between gap-5 border-b border-r border-white/12 p-5">
                    <span className="text-[length:var(--text-eyebrow)] font-bold tracking-[0.18em] text-tech">{p.index}</span>
                    <span className="font-medium leading-snug">{p.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 03 — pausa tipográfica antes de la serie de servicios */}
      <TypographicBlock {...integratedSolutions} />

      {/* 04–09 */}
      {techServices.map((block) => (
        <EditorialSplit key={block.id} block={block} accent="var(--color-tech)" />
      ))}

      {/* 10 */}
      <StatRow stats={techStats} tone="blue" accent="var(--color-labs)" />

      {/* 11 — no hay botón "Virens Tech" en esta página */}
      <DivisionSwitch to="labs" label={crossLink.label} href={crossLink.href} />

      {/* 12 */}
      <DivisionIndex current="tech" />

      <CtaContact />
    </>
  );
}
