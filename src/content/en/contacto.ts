import { site } from '@/config/site';
import type * as es from '../contacto';
import type { ContactDepartment, ContactDetail, ContactField } from '@/lib/types';
import type { Loosen } from '@/lib/i18n';

/**
 * CONTACT — inglés (27/09/2026). Mismas claves que `../contacto.ts`.
 * [EN] literal de lvirens.com/en/contact · [TR] traducción de Claude,
 * PENDIENTE DE REVISIÓN. Los datos de empresa siguen saliendo de `site.ts`.
 */
export const contactIntro = {
  eyebrow: 'Contact', // [EN]
  title: site.legalName,
  locationHeading: 'Where we are', // [TR]
  directions: 'Get directions', // [TR]
  note: 'We are located 20 km from Barcelona, in an industrial area, a hub of infrastructures connecting Barcelona with the rest of the world.', // [EN]
} as const satisfies Loosen<typeof es.contactIntro>;

export const contactDetails: readonly ContactDetail[] = [
  {
    id: 'address',
    icon: 'pin',
    label: 'Address', // [TR]
    lines: [
      site.contact.street,
      `${site.contact.postalCode} ${site.contact.city}`,
      `${site.contact.region.toUpperCase()} (Spain)`, // [EN]
    ],
  },
  {
    id: 'phone',
    icon: 'phone',
    label: 'Phone', // [EN]
    lines: [site.contact.phoneDisplay],
    href: `tel:${site.contact.phone}`,
  },
  {
    id: 'email',
    icon: 'mail',
    label: 'Email',
    lines: [site.contact.email],
    href: `mailto:${site.contact.email}`,
  },
  {
    id: 'gps',
    icon: 'gps',
    label: 'Coordinates', // [TR]
    lines: ['41°27′28″ N  1°58′9″ E'],
  },
] as const;

export const contactDepartments: readonly ContactDepartment[] = [
  { id: 'comercial', label: 'Commercial', icon: 'user' }, // [EN]
  { id: 'compras', label: 'Purchasing', icon: 'cart' }, // [EN]
  { id: 'rrhh', label: 'HR', icon: 'users' }, // [EN] («Human Resources», abreviado como «RRHH» en español)
] as const;

/** Mismos `name` que en español: el envío (fase E) recibe los mismos campos en los dos idiomas. */
export const contactFields: readonly ContactField[] = [
  { id: 'name', name: 'nombre', label: 'Name', type: 'text', autoComplete: 'name', required: true, span: 'half' },
  { id: 'email', name: 'email', label: 'e-mail', type: 'email', autoComplete: 'email', required: true, span: 'half' },
  { id: 'phone', name: 'telefono', label: 'Phone', type: 'tel', autoComplete: 'tel', required: false, span: 'half' },
  { id: 'subject', name: 'asunto', label: 'Subject', type: 'text', required: false, span: 'half' },
  { id: 'message', name: 'mensaje', label: 'Message', type: 'textarea', required: true, span: 'full' },
] as const;

export const contactForm = {
  heading: 'Contact with', // [EN]
  departmentLegend: 'Department', // [TR]
  attach: {
    label: 'Attach file', // [TR]
    hint: 'Drag your file here or click to browse', // [TR]
    max: 'Max. 10MB', // [TR]
    maxBytes: 10 * 1024 * 1024,
    tooLarge: 'The file exceeds 10MB.', // [TR]
  },
  consent: {
    before: 'I have read and accept the ', // [EN]
    link: 'data protection policy', // [EN]
    after: '.',
    href: '/en/legal/privacy-policy',
  },
  submit: 'Send', // [TR]
  status: {
    sending: 'Sending…', // [TR]
    sent: 'Thank you. We have received your message.', // [TR]
    error: 'The message could not be sent. Please try again or write to us at ', // [TR]
    invalid: 'Please check the required fields and accept the data protection policy.', // [TR]
  },
} as const satisfies Loosen<typeof es.contactForm>;
