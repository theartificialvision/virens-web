import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import type { SectionTone } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Stat { value: string; unit?: string; label: string }

/** El filete cambia según el fondo: gris sobre claro, blanco translúcido sobre color. */
const DIVIDER: Record<string, string> = {
  white: 'divide-hairline',
  gray: 'divide-gray-300',
  blue: 'divide-white/15',
  labs: 'divide-white/25',
  tech: 'divide-white/25',
  surface: 'divide-hairline-2',
};

/** Franja de grandes números. Filete vertical entre columnas, sin cajas. */
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
        <dl className={cn('grid divide-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x', DIVIDER[tone])}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="px-0 py-8 lg:px-10 lg:py-2 lg:first:pl-0">
              <dd className="text-[length:var(--text-stat-compact)] font-bold leading-[1.05] tracking-[-0.02em]">
                {s.value}
                {s.unit && <span className="ml-1 text-[0.45em] align-top">{s.unit}</span>}
              </dd>
              <dt
                className="mt-4 text-[length:var(--text-eyebrow)] font-bold uppercase tracking-[0.24em] opacity-70"
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
