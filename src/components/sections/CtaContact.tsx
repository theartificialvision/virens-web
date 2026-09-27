import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CircleIcon } from '@/components/v2/GalenicIcon';
import { site } from '@/config/site';

/** CTA global. Un único objetivo de conversión en toda la web (§13.7). */
export function CtaContact() {
  return (
    <Section tone="gray" rhythm="compact">
      <Container>
        <div className="grid items-center gap-6 md:gap-8 md:grid-cols-[auto_1fr_auto] md:text-left lg:gap-12">
          {/* 27/09/2026 (cliente): el mismo icono que el CTA de la home
              («¿Hablamos de tu proyecto?»), en lugar del bocadillo en vidrio. */}
          <CircleIcon name="chat" className="text-blue/70" />
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
          <div className="w-full md:w-auto">
            <Button href="/contacto" className="w-full md:w-auto">
              {site.ctaContact.button} <span aria-hidden>&rarr;</span>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
