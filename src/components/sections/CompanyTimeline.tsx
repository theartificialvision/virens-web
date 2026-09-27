import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { TimelineEntry } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { CompanySectionHeading } from './CompanySectionHeading';

export function CompanyTimeline({
  heading,
  entries,
}: {
  heading: { index: string; title: string };
  entries: TimelineEntry[];
}) {
  return (
    <section id="historia" className="relative isolate overflow-hidden text-white" data-header-tone="dark">
      <Image
        src="/img/tech-formulacion.jpg"
        alt="Trabajo de formulación en el laboratorio de Laboratorios Virens"
        fill
        sizes="100vw"
        className="-z-20 object-cover grayscale"
      />
      <span aria-hidden className="absolute inset-0 -z-10 bg-labs/[0.88] mix-blend-multiply" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-blue/[0.18]" />

      <Container className="py-[var(--section-base)]">
        <Reveal>
          <CompanySectionHeading index={heading.index} title={heading.title} inverse />
        </Reveal>

        <Reveal className="company-history mt-14">
          <ol className="company-history-list">
            {entries.map((entry, index) => (
              <li
                key={`${entry.year}-${index}`}
                className="company-history-item"
                style={{ '--i': index } as CSSProperties}
              >
                <p className="company-history-copy text-[length:var(--text-note)] font-semibold leading-[1.35]">
                  {entry.text}
                </p>
                <span className="company-history-node text-[length:var(--text-small)] font-semibold">
                  {entry.year}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
