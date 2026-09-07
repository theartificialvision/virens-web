import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { site } from '@/config/site';

/** CTA global. Un único objetivo de conversión en toda la web (§13.7). */
export function CtaContact() {
  return (
    <Section tone="gray" rhythm="compact">
      <Container>
        <div className="grid items-center gap-8 border-y border-gray-200 py-10 md:grid-cols-[auto_1fr_auto] md:text-left lg:gap-12">
          <ContactGlyph />
          <div>
            {/* Tamaño de rol H3: doc maestro §10.2 asigna peso 600 (no 700)
                a ese escalón — coherente con el resto de titulares H3
                (`EditorialSplit`), antes en bold por descuido. */}
            <h2 className="max-w-[24ch] text-[length:var(--text-h3)] font-semibold leading-[1.15] tracking-[-0.015em]">
              {site.ctaContact.title}
            </h2>
            <p className="mt-4 text-[length:var(--text-small)] text-gray-500">
              <a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a>
              {' · '}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </p>
          </div>
          <Magnetic className="w-full md:w-auto">
            <Button href="/contacto" className="w-full md:w-auto">
              {site.ctaContact.button} <span aria-hidden>&rarr;</span>
            </Button>
          </Magnetic>
        </div>
      </Container>
    </Section>
  );
}

/* "Glass" puntual (CLAUDE.md regla 4, excepción añadida 2026-09-01). */
function ContactGlyph() {
  return (
    <span
      className="inline-flex size-16 items-center justify-center rounded-[length:var(--radius-surface)] border border-gray-200 bg-gray-50 text-blue"
      style={{ boxShadow: 'var(--shadow-elevate)' }}
      aria-hidden
    >
      <svg viewBox="0 0 48 48" className="size-8" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 12h28v20H22l-8 6v-6h-4z" />
        <path d="M17 22h.01M24 22h.01M31 22h.01" />
      </svg>
    </span>
  );
}
