import type { Metadata } from 'next';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { ServicesSlider } from '@/components/sections/ServicesSlider';
import { TypographicBlock } from '@/components/sections/TypographicBlock';
import { StatRow } from '@/components/sections/StatRow';
import { DivisionSwitch } from '@/components/sections/DivisionSwitch';
import { CtaBand } from '@/components/v2/CtaBand';
import { CertStrip } from '@/components/v2/CertStrip';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { crossLink, integratedSolutions, techHero, techIntro, techServices, techServicesSlider, techStats } from '@/content/tech';

export const metadata: Metadata = {
  title: 'Virens Tech · I+D y formulación de complementos',
  description:
    'Formulación, R+D galénicos, centro de sabores, estabilidad, control de calidad y consultoría regulatoria.',
  alternates: { canonical: '/virens-tech' },
};

/**
 * ONE PAGE de Virens Tech.
 * Los seis servicios van en un slide a pantalla completa guiado por el
 * scroll (27/09/2026, cliente), nunca tarjetas en dos columnas.
 */
export default function VirensTechPage() {
  return (
    <>
      {/* 01 */}
      {/* 27/09/2026 (cliente): sin botón «Visitar Labs» en el hero. */}
      <HeroVideo {...techHero} moleculeVariant="tech" />

      {/* 27/09/2026 (cliente): fuera la barra horizontal de anclas. */}

      {/* 02 */}
      <Section tone="white" rhythm="base">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow className="text-tech">{techIntro.eyebrow}</Eyebrow>
              {/* Texto LITERAL: párrafo real, no un titular corto. Con el
                  cuerpo H2 de la home ocupaba ocho líneas, así que baja un
                  escalón (H3) pero con el peso y el tracking de la home (27/09). */}
              <h2 className="mt-6 text-[length:var(--text-h3)] font-medium leading-snug tracking-[-0.015em]">
                {techIntro.title}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
                {techIntro.body}
              </p>
              <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {techIntro.points.map((p) => (
                  <li key={p.index} className="flex flex-col gap-3">
                    <span className="text-[length:var(--text-note)] font-semibold tracking-label text-tech">{p.index}</span>
                    <span className="text-[length:var(--text-small)] font-medium leading-snug">{p.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 03 — pausa tipográfica antes de la serie de servicios */}
      <TypographicBlock {...integratedSolutions} />

      {/* 04 — los seis servicios en un slide que avanza con el scroll
          (27/09/2026, cliente; antes seis bloques alternos imagen/texto) */}
      <ServicesSlider services={techServices} label={techServicesSlider.label} />

      {/* 10 */}
      <StatRow stats={techStats} tone="soft" accent="var(--color-labs)" />

      {/* 27/09/2026 (cliente): las certificaciones también en Tech. */}
      <CertStrip />

      {/* 11 — no hay botón "Virens Tech" en esta página */}
      <DivisionSwitch to="labs" label={crossLink.label} href={crossLink.href} />

      <CtaBand />
    </>
  );
}
