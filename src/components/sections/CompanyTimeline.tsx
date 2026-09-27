import Image from 'next/image';
import type { TimelineEntry } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { CompanySectionHeading } from './CompanySectionHeading';
import { CompanyHistoryList } from './CompanyHistoryList';

export function CompanyTimeline({
  heading,
  entries,
  imageAlt,
}: {
  heading: { index: string; title: string };
  entries: TimelineEntry[];
  imageAlt: string;
}) {
  return (
    <section id="historia" className="relative isolate overflow-hidden text-white" data-header-tone="dark">
      <Image
        src="/img/tech-formulacion.jpg"
        alt={imageAlt}
        fill
        sizes="100vw"
        className="-z-20 object-cover grayscale"
      />
      <span aria-hidden className="absolute inset-0 -z-10 bg-labs/[0.88] mix-blend-multiply" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-blue/[0.18]" />

      <Container className="py-[var(--v2-section)]">
        <Reveal>
          <CompanySectionHeading index={heading.index} title={heading.title} inverse />
        </Reveal>

        <div className="mt-14">
          <CompanyHistoryList entries={entries} />
        </div>
      </Container>
    </section>
  );
}
