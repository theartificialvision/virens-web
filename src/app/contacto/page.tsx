import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Sant Andreu de la Barca, Barcelona. (+34) 936 828 972. Cuéntenos su proyecto de fabricación o desarrollo.',
  alternates: { canonical: '/contacto' },
};

/** TODO: formulario corto (5 campos + departamento + adjunto) — §13.5. */
export default function ContactoPage() {
  return (
    <Section tone="white" rhythm="air" className="relative overflow-hidden pt-40 lg:pt-52">
      <Container>
        <div className="grid border-l border-t border-gray-200 lg:grid-cols-12">
          <div className="border-b border-r border-gray-200 p-8 lg:col-span-5 lg:p-14">
            <Eyebrow className="text-labs">Contacto</Eyebrow>
            <h1 className="mt-6 text-[length:var(--text-h1)] font-bold leading-[1.05] tracking-[-0.02em]">Contacto</h1>
            <span aria-hidden className="mt-8 block h-1 w-16 bg-labs" />
          </div>
          <div className="border-b border-r border-gray-200 bg-blue p-8 text-white lg:col-span-7 lg:p-14">
            <address className="not-italic text-[length:var(--text-lead)]">
              {site.legalName}
              <br />
              {site.contact.street}
              <br />
              {site.contact.postalCode} {site.contact.city}, {site.contact.region} ({site.contact.country})
            </address>
            <div className="mt-10 grid gap-4 border-t border-white/15 pt-8 sm:grid-cols-2">
              <a href={`tel:${site.contact.phone}`} className="text-[length:var(--text-h4)] font-semibold">{site.contact.phoneDisplay}</a>
              <a href={`mailto:${site.contact.email}`} className="text-[length:var(--text-h4)] font-semibold">{site.contact.email}</a>
            </div>
            <p className="mt-10 max-w-[var(--measure-max)] text-white/65">{site.contact.distanceNote}, en zona industrial.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
