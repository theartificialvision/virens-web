'use client';

import Link from 'next/link';
import { buttonStyles } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useId, useState, type CSSProperties } from 'react';
import type { ContactDepartment, ContactField } from '@/lib/types';
import { ContactIcon } from '@/components/ui/ContactIcon';
import { ContactAttach } from './ContactAttach';
import { contactContent } from '@/content';
import { site } from '@/config/site';
import { useContactSubmit } from '@/lib/useContactSubmit';
import type { Locale } from '@/lib/i18n';

/**
 * Panel del formulario (mockup `contactos.png`, mitad derecha).
 *
 * Envío (01/10/2026): `useContactSubmit` manda el formulario al PHP del
 * hosting Apache (`static-host/api/contacto.php`), que lo reenvía por email.
 * El email de destino está pendiente del cliente (ver `site.ts`); mientras
 * falte, el PHP responde error y aquí se muestra el aviso con el email general.
 *
 * Las etiquetas van ocultas visualmente, no ausentes: el mockup solo dibuja el
 * placeholder, pero un placeholder no es una etiqueta —desaparece al escribir
 * y muchos lectores de pantalla no lo anuncian— así que cada campo lleva su
 * `<label>` real (regla 8).
 */
export function ContactForm({
  departments,
  fields,
  locale,
}: {
  departments: readonly ContactDepartment[];
  fields: readonly ContactField[];
  locale: Locale;
}) {
  const { contactForm } = contactContent(locale);
  const uid = useId();
  const [department, setDepartment] = useState(departments[0]?.id ?? '');
  const { state, sent, onSubmit } = useContactSubmit(site.contactForm.endpoint);
  const status = contactForm.status;

  return (
    <form
      className="contact-panel"
      noValidate
      onSubmit={onSubmit}
      aria-busy={state === 'sending'}
    >
      <h2 className="text-[length:var(--text-h2)] font-medium leading-tight tracking-[-0.015em] text-blue">
        {contactForm.heading}
      </h2>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="sr-only">{contactForm.departmentLegend}</legend>
        <div className="contact-departments" style={{ '--seg': Math.max(0, departments.findIndex((d) => d.id === department)) } as CSSProperties}>
          {departments.map((d) => (
            <button
              key={d.id}
              type="button"
              className="contact-department"
              aria-pressed={department === d.id}
              onClick={() => setDepartment(d.id)}
            >
              <ContactIcon name={d.icon} className="contact-department-icon size-5 shrink-0" />
              {d.label}
            </button>
          ))}
        </div>
      </fieldset>
      <input type="hidden" name="departamento" value={department} />
      {/* Trampa para bots: oculta a personas y a lectores de pantalla; si llega
          rellena, el PHP descarta el envío sin avisar. */}
      <input type="text" name="web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id} className={field.span === 'full' ? 'sm:col-span-2' : undefined}>
            <label htmlFor={`${uid}-${field.id}`} className="sr-only">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={`${uid}-${field.id}`}
                name={field.name}
                className="contact-field"
                placeholder={field.label}
                required={field.required}
                rows={5}
              />
            ) : (
              <input
                id={`${uid}-${field.id}`}
                name={field.name}
                type={field.type}
                className="contact-field"
                placeholder={field.label}
                required={field.required}
                autoComplete={field.autoComplete}
              />
            )}
          </div>
        ))}
      </div>

      <ContactAttach key={sent} locale={locale} />

      <div className="mt-6 flex items-start gap-3">
        <input id={`${uid}-consent`} type="checkbox" name="consentimiento" required className="contact-consent" />
        <label htmlFor={`${uid}-consent`} className="text-[length:var(--text-small)] leading-snug text-gray-700">
          {contactForm.consent.before}
          <Link href={contactForm.consent.href} className="font-semibold text-tech underline underline-offset-2">
            {contactForm.consent.link}
          </Link>
          {contactForm.consent.after}
        </label>
      </div>

      <button
        type="submit"
        // Ancho: en el mockup el botón no llega al borde derecho del panel —ocupa
        // unos dos tercios y ancla a la izquierda, alineado con los campos.
        className={cn(buttonStyles(), 'mt-7 w-full uppercase tracking-label sm:w-2/3')}
        disabled={state === 'sending'}
      >
        <span>{state === 'sending' ? status.sending : contactForm.submit}</span>
      </button>

      {/* `role="status"`: el resultado se anuncia sin mover el foco. */}
      <p role="status" className="mt-4 text-[length:var(--text-small)] leading-snug text-gray-700 empty:hidden">
        {state === 'sent' && status.sent}
        {state === 'invalid' && status.invalid}
        {state === 'error' && (
          <>
            {status.error}
            <a href={`mailto:${site.contact.email}`} className="font-semibold text-tech underline underline-offset-2">
              {site.contact.email}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
