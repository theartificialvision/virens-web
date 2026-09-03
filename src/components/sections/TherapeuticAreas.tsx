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
    <Section id="areas-terapeuticas" tone="blue" rhythm="base">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="max-w-[var(--measure-narrow)] lg:col-span-3 lg:self-center">
            <Eyebrow className="text-subtle">{eyebrow}</Eyebrow>
            <h2 className="mt-6 text-[length:var(--text-h2)] font-bold leading-[1.1] tracking-[-0.015em]">
              {title}
            </h2>
            <p className="mt-5 text-muted">{lead}</p>
          </div>

          <ul className="grid border-l border-t border-white/15 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-5">
            {areas.map((area, i) => (
              <li key={area} className="min-h-44 border-b border-r border-white/15">
                <Reveal delay={(i % 5) * 0.04} className="flex h-full flex-col items-start justify-between gap-8 p-6 lg:p-7">
                  <NumberBadge n={i + 1} />
                  <span className="text-[clamp(1rem,0.92rem+0.45vw,1.375rem)] font-medium leading-snug">{area}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
