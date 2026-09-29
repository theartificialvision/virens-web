import { HeroVideo } from '@/components/sections/HeroVideo';
import { TechProcess } from '@/components/sections/TechProcess';
import { CtaBand } from '@/components/v2/CtaBand';
import { CertStrip } from '@/components/v2/CertStrip';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { techContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/** Tech: hero e intro existentes; recorrido editorial con los cinco servicios. */
export function TechView({ locale }: { locale: Locale }) {
  const { integratedSolutions, techHero, techIntro, techServices, techServicesSlider } = techContent(locale);
  return (
    <>
      <HeroVideo {...techHero} moleculeVariant="tech" />

      {/* Intro: una sola frase, a lo ancho. Texto LITERAL (§2.4). */}
      <Section tone="white" rhythm="base">
        <Container>
          <Reveal>
            <span aria-hidden className="v2-accent block h-[3px] w-14 bg-tech" />
            <h2 className="mt-6 max-w-[34ch] text-[length:var(--text-h2)] font-medium leading-snug tracking-[-0.015em]">
              {techIntro.title}
            </h2>
          </Reveal>
        </Container>
      </Section>

      <TechProcess services={techServices} label={techServicesSlider.label}
        phase={techServicesSlider.phase} introduction={integratedSolutions} />

      <CertStrip locale={locale} />

      <CtaBand locale={locale} />
    </>
  );
}
