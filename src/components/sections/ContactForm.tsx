'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import type { ContactDepartment, ContactField } from '@/lib/types';
import { ContactIcon } from '@/components/ui/ContactIcon';
import { ContactAttach } from './ContactAttach';
import { contactForm } from '@/content/contacto';

/**
 * Panel del formulario (mockup `contactos.png`, mitad derecha).
 *
 * IMPORTANTE: **el envío no está configurado** — decisión del cliente
 * (06/09/2026), se deja para la fase E. Aquí solo vive la composición y el
 * comportamiento de interfaz: elegir departamento, escribir y adjuntar. El
 * `submit` no manda nada a ninguna parte.
 *
 * Las etiquetas van ocultas visualmente, no ausentes: el mockup solo dibuja el
 * placeholder, pero un placeholder no es una etiqueta —desaparece al escribir
 * y muchos lectores de pantalla no lo anuncian— así que cada campo lleva su
 * `<label>` real (regla 8).
 */
export function ContactForm({
  departments,
  fields,
}: {
  departments: readonly ContactDepartment[];
  fields: readonly ContactField[];
}) {
  const uid = useId();
  const [department, setDepartment] = useState(departments[0]?.id ?? '');

  return (
    <form
      className="contact-panel"
      noValidate
      // Sin `action`: un <form> sin destino recargaría la página contra su
      // propia URL y parecería que se ha enviado algo. Se corta aquí hasta
      // que el envío se configure.
      onSubmit={(event) => event.preventDefault()}
    >
      <h2 className="text-[length:var(--text-h2)] font-normal leading-tight tracking-[-0.02em] text-blue">
        {contactForm.heading}
      </h2>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="sr-only">{contactForm.departmentLegend}</legend>
        <div className="contact-departments">
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
      {/* El valor viaja en el propio formulario para cuando se configure el envío. */}
      <input type="hidden" name="departamento" value={department} />

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

      <ContactAttach />

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
        className="mt-7 w-full rounded-full bg-tech px-10 py-[length:var(--btn-py)] text-[length:var(--text-small)] font-semibold uppercase leading-none tracking-[0.12em] text-white transition-all duration-200 ease-[var(--ease-out-quart)] hover:-translate-y-px hover:brightness-90 sm:w-2/3"
      >
        {contactForm.submit}
      </button>
    </form>
  );
}
