import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactForm } from '@/components/sections/ContactForm';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ContactIcon } from '@/components/ui/ContactIcon';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { contactDepartments, contactDetails, contactFields, contactIntro } from '@/content/contacto';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Sant Andreu de la Barca, Barcelona. (+34) 936 828 972. Cuéntenos su proyecto de fabricación o desarrollo.',
  alternates: { canonical: '/contacto' },
};

/**
 * CONTACTO — composición del mockup del cliente (`contactos.png`, 06/09/2026):
 * datos de empresa sobre la fotografía de planta a la izquierda, panel blanco
 * de formulario a la derecha. En mobile se apilan, con los datos primero.
 *
 * El envío del formulario NO está configurado: ver `ContactForm`.
 */
export default function ContactoPage() {
  return (
    <Section tone="white" rhythm="air" className="contact-stage pt-40 lg:pt-52">
      {/* 06/09 (8): fuera la de la sesión Midjourney. Era una nave genérica de
          IA y el cliente la rechazó por anticuada. Pasa a la línea de envasado
          en blanco y negro que aportó él mismo —la misma tanda que aprobó para
          el hero— así que la página deja de depender de material provisional y
          entra en la dirección visual vigente: fotografía B/N, nada de tinte.
          Decorativa —el contenido lo dan los datos de al lado—, de ahí el alt
          vacío. Sigue pendiente el reportaje propio de la planta (§9.2). */}
      <div className="contact-photo">
        <Image src="/img/home-scene-labs.jpg" alt="" fill priority sizes="100vw" quality={85} />
      </div>

      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-24">
          <div>
            <Eyebrow className="text-labs">{contactIntro.eyebrow}</Eyebrow>

            <h1 className="mt-6 max-w-[14ch] text-[length:var(--text-h1)] font-bold leading-[1.05] tracking-[-0.02em] text-blue">
              {contactIntro.title}
            </h1>
            <span aria-hidden className="contact-rule mt-8" />

            {/* §14.1 pide "Dónde estamos" como H2 de la página. El mockup no lo
                dibuja —la jerarquía la da el tamaño del titular— así que va en
                el DOM y se oculta visualmente; no se inventa un rótulo. */}
            <h2 className="sr-only">{contactIntro.locationHeading}</h2>

            <address className="mt-10 not-italic">
              <ul className="grid gap-6">
                {contactDetails.map((detail) => (
                  <li key={detail.id} className="flex items-start gap-4">
                    <ContactIcon name={detail.icon} className="mt-1 size-6 shrink-0 text-labs" />
                    <div className="text-[length:var(--text-body)] leading-relaxed text-blue">
                      {detail.href ? (
                        <a href={detail.href} className="font-medium hover:text-labs">
                          {detail.lines[0]}
                        </a>
                      ) : (
                        detail.lines.map((line) => <p key={line}>{line}</p>)
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </address>

            {/* Mismo filete que en Compañía: un bloque de 1 px, no un <hr> con
                borde — sobre el velo, el borde del <hr> no llegaba a verse. */}
            <span aria-hidden className="mt-10 block h-px w-full max-w-[var(--measure-narrow)] bg-gray-200" />
            <p className="mt-8 max-w-[var(--measure-narrow)] text-[length:var(--text-body)] leading-relaxed text-gray-700">
              {contactIntro.note}
            </p>
          </div>

          <ContactForm departments={contactDepartments} fields={contactFields} />
        </div>
      </Container>
    </Section>
  );
}
