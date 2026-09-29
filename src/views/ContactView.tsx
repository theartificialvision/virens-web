import { ContactForm } from '@/components/sections/ContactForm';
import { Container } from '@/components/ui/Container';
import { ContactIcon } from '@/components/ui/ContactIcon';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site } from '@/config/site';
import { contactContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/**
 * CONTACTO — desde el 29/09/2026 (cliente: «sin fondo de foto, Apple perfecta,
 * mínimos upgrades») sobre fondo claro liso: datos a la izquierda en filas con
 * rótulo y filete de medio tono, formulario a la derecha en un panel blanco.
 * Mejoras: correo visible, «Cómo llegar» a Google Maps y selector de
 * departamento como control segmentado. En móvil se apilan, datos primero.
 *
 * El envío del formulario NO está configurado: ver `ContactForm`.
 */
export function ContactView({ locale }: { locale: Locale }) {
  const { contactDepartments, contactDetails, contactFields, contactIntro } = contactContent(locale);
  const maps = `https://www.google.com/maps/search/?api=1&query=${site.contact.geo.lat},${site.contact.geo.lng}`;
  return (
    <section className="contact-stage" data-header-tone="light">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow className="text-labs">{contactIntro.eyebrow}</Eyebrow>
            <h1 className="mt-6 max-w-[14ch] text-[length:var(--v2-hero-title)] font-normal leading-[1.08] tracking-[-0.02em] text-blue">
              {contactIntro.title}
            </h1>
            <p className="mt-6 max-w-[var(--measure-narrow)] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
              {contactIntro.note}
            </p>

            {/* §14.1 pide «Dónde estamos» como H2; va oculto, la jerarquía la da el titular. */}
            <h2 className="sr-only">{contactIntro.locationHeading}</h2>

            <address className="contact-details not-italic">
              {contactDetails.map((detail) => (
                <div key={detail.id} className="contact-detail">
                  <ContactIcon name={detail.icon} className="contact-detail-icon" />
                  <div className="min-w-0">
                    <p className="contact-detail-label">{detail.label}</p>
                    {detail.href ? (
                      <a href={detail.href} className="contact-detail-link">{detail.lines[0]}</a>
                    ) : (
                      detail.lines.map((line) => <p key={line} className="contact-detail-value">{line}</p>)
                    )}
                    {detail.id === 'address' ? (
                      <a href={maps} target="_blank" rel="noopener noreferrer" className="contact-directions">
                        {contactIntro.directions}
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5.5 10.5 10.5 5.5M6.5 5.5h4v4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </address>
          </div>

          <div className="lg:col-span-7 xl:col-span-6 xl:col-start-7">
            <ContactForm departments={contactDepartments} fields={contactFields} locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}
