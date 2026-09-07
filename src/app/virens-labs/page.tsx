import type { Metadata } from 'next';
import { AnchorNav } from '@/components/layout/AnchorNav';
import { DivisionIndex } from '@/components/sections/DivisionIndex';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { EditorialSplit } from '@/components/sections/EditorialSplit';
import { GalenicForms } from '@/components/sections/GalenicForms';
import { CapacityGrid } from '@/components/sections/CapacityGrid';
import { FullBleedImage } from '@/components/sections/FullBleedImage';
import { Certifications } from '@/components/sections/Certifications';
import { TherapeuticAreas } from '@/components/sections/TherapeuticAreas';
import { DivisionSwitch } from '@/components/sections/DivisionSwitch';
import { CtaContact } from '@/components/sections/CtaContact';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { labsAnchors } from '@/config/navigation';
import {
  capacities, capacityIntro, capacityUnitNote, certifications, crossLink, facilityCaption, facilityStats,
  galenicForms, galenicFormsIntro, labsHero, labsIntro, labsServices, packagingOperations, quality,
  therapeuticAreas, therapeuticAreasIntro,
} from '@/content/labs';

export const metadata: Metadata = {
  title: 'Virens Labs · Contract manufacturing de complementos',
  description:
    'Private label y full service en formas sólidas y líquidas. Cápsulas, comprimidos, jarabes, viales, sticks, sobres y blísters.',
  alternates: { canonical: '/virens-labs' },
};

/**
 * ONE PAGE de Virens Labs.
 * Ritmo de fondos (pivote oscuro 2026-09-01): vídeo → ink → ink → surface →
 * verde (labs) → surface → foto → ink → azul → ink → surface.
 * Ninguna estructura ni fondo se repite en dos bloques consecutivos.
 */
export default function VirensLabsPage() {
  return (
    <>
      {/* 01 */}
      <HeroVideo {...labsHero} moleculeVariant="labs" />

      <AnchorNav items={labsAnchors} division="labs" />

      {/* 02 — declaración de división: solo el eyebrow + los 3 puntos, ambos literales */}
      <Section tone="white" rhythm="base">
        <Container>
          <Eyebrow className="text-labs">{labsIntro.eyebrow}</Eyebrow>
          <ul className="mt-10 grid border-l border-t border-gray-200 sm:grid-cols-3">
            {labsIntro.points.map((p) => (
              <li key={p.index} className="flex min-h-52 flex-col justify-between border-b border-r border-gray-200 p-7 lg:p-9">
                <span className="text-[length:var(--text-h3)] font-bold leading-none tracking-[-0.03em] text-labs">{p.index}</span>
                <span className="mt-10 max-w-[18ch] text-[length:var(--text-lead)] font-medium leading-snug">{p.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 03 · 04 — Private Label / Full Service */}
      {labsServices.map((block) => (
        <EditorialSplit key={block.id} block={block} accent="var(--color-labs)" />
      ))}

      {/* 05 */}
      <GalenicForms
        intro={galenicFormsIntro}
        forms={galenicForms}
        image={{ src: '/img/labs-planta.jpg', alt: 'Línea de producción de la planta de Laboratorios Virens' }}
      />

      {/* 06 */}
      <CapacityGrid
        eyebrow={capacityIntro.eyebrow}
        title={capacityIntro.title}
        stats={facilityStats}
        items={capacities}
        operations={packagingOperations}
        note={capacityUnitNote}
      />

      {/* 07 */}
      <FullBleedImage
        caption={facilityCaption}
        image={{ src: '/img/labs-instalaciones.jpg', alt: 'Instalaciones de Laboratorios Virens en Sant Andreu de la Barca' }}
      />

      {/* 08 */}
      <Certifications
        eyebrow={quality.eyebrow}
        title={quality.title}
        body={quality.body}
        items={certifications}
      />

      {/* 09 */}
      <TherapeuticAreas
        eyebrow={therapeuticAreasIntro.eyebrow}
        title={therapeuticAreasIntro.title}
        lead={therapeuticAreasIntro.lead}
        areas={therapeuticAreas}
      />

      {/* 10 — único acceso cruzado: no hay botón "Virens Labs" en esta página */}
      <DivisionSwitch to="tech" label={crossLink.label} href={crossLink.href} />

      {/* 11 */}
      <DivisionIndex current="labs" />

      <CtaContact />
    </>
  );
}
