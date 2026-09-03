import type { TimelineEntry } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Línea de tiempo en HTML.
 * En la web actual este contenido solo existía dentro de un PNG.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <Section id="historia" tone="white" rhythm="base">
      <Container>
        <div className="max-w-[var(--measure-max)]">
          <Eyebrow className="text-subtle">Nuestra historia</Eyebrow>
          <h2 className="mt-6 text-[length:var(--text-h2)] font-bold leading-[1.1] tracking-[-0.015em]">
            Seis hitos, 2000&ndash;2023
          </h2>
        </div>

        <ol className="mt-16 grid gap-px bg-hairline md:grid-cols-3 lg:grid-cols-6">
          {entries.map((e, i) => (
            <li key={e.year} className="bg-canvas">
              <Reveal delay={(i % 6) * 0.05} className="flex h-full flex-col gap-4 py-8 md:px-6 lg:px-5">
                <span className="text-[clamp(1.75rem,1.3rem+1.2vw,2.5rem)] font-bold leading-none tracking-[-0.02em] text-labs-ink">
                  {e.year}
                </span>
                <p className="text-[15px] leading-relaxed text-muted">{e.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
