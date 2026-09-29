import { HeroVideo } from '@/components/sections/HeroVideo';
import { TechProcess } from '@/components/sections/TechProcess';
import { TypographicBlock } from '@/components/sections/TypographicBlock';
import { CtaBand } from '@/components/v2/CtaBand';
import { CertStrip } from '@/components/v2/CertStrip';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { techContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/**
 * ONE PAGE de Virens Tech. 27/09/2026 (cliente: «siento que se repiten
 * cosas»): cada idea se dice una vez. Cinco bloques:
 *   hero (azul) → intro (hueso) → frase puente (magenta) → proceso de los cinco
 *   servicios (proceso molecular, azul profundo) → certificaciones (gris claro) → CTA.
 * Fuera la lista de servicios de la intro, los pilares genéricos del bloque
 * magenta, la franja de cifras (repetía datos de Home y Compañía) y el
 * puente «Visitar Labs» (Labs es la Home, a un toque desde el menú).
 */
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

      <TypographicBlock {...integratedSolutions} />

      {/* 29/09/2026: los servicios como proceso — una molécula que se
          construye con el scroll (antes, slide de diapositivas). */}
      <TechProcess services={techServices} label={techServicesSlider.label} phase={techServicesSlider.phase} />

      <CertStrip locale={locale} />

      <CtaBand locale={locale} />
    </>
  );
}
