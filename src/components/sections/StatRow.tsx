import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import type { SectionTone } from '@/lib/types';

interface Stat { value: string; unit?: string; label: string }

/** Franja de cifras: el espacio separa los datos, sin filetes. */
export function StatRow({
  stats,
  tone = 'white',
  accent,
}: {
  stats: readonly Stat[];
  tone?: SectionTone;
  accent?: string;
}) {
  return (
    <Section tone={tone} rhythm="compact">
      <Container>
        <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="min-w-0">
              <dd className="text-[length:var(--text-stat-compact)] font-bold leading-[1.05] tracking-[-0.02em]">
                {s.value}
                {s.unit && <span className="ml-1 text-[0.45em] align-top">{s.unit}</span>}
              </dd>
              <dt
                className="mt-4 text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow opacity-70"
                style={accent ? { color: accent, opacity: 1 } : undefined}
              >
                {s.label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
