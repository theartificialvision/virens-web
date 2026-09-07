import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { NumberBadge } from '@/components/ui/NumberBadge';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Listado editorial sobre #00285C (§06 bloque 09).
 * Sin iconos, sin flechas, sin tarjetas: número + etiqueta y un filete.
 */
export function TherapeuticAreas({
  eyebrow,
  title,
  lead,
  areas,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  areas: readonly string[];
}) {
  return (
    <Section id="areas-terapeuticas" tone="soft" rhythm="base">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="max-w-[var(--measure-narrow)] lg:col-span-3 lg:self-center">
            <Eyebrow className="text-gray-500">{eyebrow}</Eyebrow>
            <h2 className="mt-6 text-[length:var(--text-h2)] font-bold leading-[1.1] tracking-[-0.015em]">
              {title}
            </h2>
            <p className="mt-5 text-gray-700">{lead}</p>
          </div>

          {/* 07/09 (22): sin caja de celda; NumberBadge ya es el ancla. */}
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-5">
            {areas.map((area, i) => (
              <li key={area}>
                <Reveal delay={(i % 5) * 0.04} className="flex flex-col items-start gap-5">
                  <NumberBadge n={i + 1} />
                  <span className="text-[length:var(--text-h4)] font-medium leading-snug">{area}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
