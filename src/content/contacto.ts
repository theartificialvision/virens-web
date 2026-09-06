import { site } from '@/config/site';
import type { ContactDepartment, ContactDetail, ContactField } from '@/lib/types';

/**
 * CONTACTO — composición del mockup del cliente (`contactos.png`, pack
 * "virens_web_finales", 06/09/2026): columna izquierda con los datos de la
 * empresa sobre la fotografía de planta, panel blanco de formulario a la
 * derecha.
 *
 * Los datos de empresa NO se escriben aquí: salen de `config/site.ts`, que es
 * donde están verificados contra lvirens.com. Este archivo solo aporta los
 * rótulos y el copy de la página.
 *
 * OJO (§3.2, ya recogido en `site.pendingClientConfirmation`): la web actual
 * publica dos direcciones distintas —«Indústria 48B» en /contacto y «Calle
 * Industria 48-A» en el aviso legal— y el mockup dice 48B. Se sigue mostrando
 * lo que hay en `site.ts` hasta que el cliente unifique; no se adopta el 48B
 * del mockup como si fuera la confirmación.
 */
export const contactIntro = {
  // LITERAL: rótulo del menú y del mockup.
  eyebrow: 'Contacto',
  // LITERAL: razón social verificada (`site.legalName`).
  title: site.legalName,
  // Encabezado de la mitad izquierda. El mockup no lo dibuja —la jerarquía
  // visual la da el tamaño— pero §14.1 lo pide como H2 de la página, así que
  // va en el DOM para lectores de pantalla y se oculta visualmente.
  locationHeading: 'Dónde estamos',
  // IMAGE-ONLY: la frase completa solo existe dentro del mockup. `site.ts`
  // guarda la versión corta del dato ("A 20 km de Barcelona").
  note: 'Estamos ubicados a 20 km de Barcelona, en una zona industrial, nudo de infraestructuras de conexión de Barcelona con el resto del mundo.',
} as const;

/**
 * Bloque de datos de la izquierda. Cada entrada lleva su icono de línea; el
 * texto se compone aquí desde `site.ts` para no repetir el dato en dos sitios.
 */
export const contactDetails: readonly ContactDetail[] = [
  {
    id: 'address',
    icon: 'pin',
    label: 'Dirección',
    lines: [
      site.contact.street,
      `${site.contact.postalCode} ${site.contact.city}`,
      `${site.contact.region.toUpperCase()} (${site.contact.country})`,
    ],
  },
  {
    id: 'phone',
    icon: 'phone',
    label: 'Teléfono',
    lines: [`Telf: ${site.contact.phoneDisplay}`],
    href: `tel:${site.contact.phone}`,
  },
  {
    id: 'gps',
    icon: 'gps',
    label: 'Coordenadas',
    // IMAGE-ONLY: el sexagesimal sale del mockup; `site.contact.geo` guarda el
    // mismo punto en decimal (41.4578, 1.9692).
    lines: ['GPS: 41°27′28″ N  1°58′9″ E'],
  },
] as const;

/**
 * Departamentos. El documento maestro los da por buenos tal cual: «El
 * formulario de contacto segmenta por departamento (Comercial / Compras /
 * RRHH) y admite adjuntos. Es un buen formulario B2B» — es de lo poco de la
 * web actual que se conserva sin tocar.
 */
export const contactDepartments: readonly ContactDepartment[] = [
  { id: 'comercial', label: 'Comercial', icon: 'user' },
  { id: 'compras', label: 'Compras', icon: 'cart' },
  { id: 'rrhh', label: 'RRHH', icon: 'users' },
] as const;

/**
 * Campos. Son los cinco del mockup.
 *
 * DISCREPANCIA PENDIENTE con la recomendación 5 del documento maestro, que
 * pide «Nombre, Empresa, Email, País, Mensaje». Coinciden en el número (cinco
 * + departamento + adjunto, que es lo que buscaba la recomendación: acortar el
 * formulario de 13 campos), pero no en cuáles: el mockup cambia Empresa y País
 * por Teléfono y Asunto. Se sigue el mockup por ser la pieza más reciente y
 * venir del cliente; queda anotado para decidirlo al configurar el envío.
 */
export const contactFields: readonly ContactField[] = [
  { id: 'name', name: 'nombre', label: 'Nombre', type: 'text', autoComplete: 'name', required: true, span: 'half' },
  { id: 'email', name: 'email', label: 'e-mail', type: 'email', autoComplete: 'email', required: true, span: 'half' },
  { id: 'phone', name: 'telefono', label: 'Teléfono', type: 'tel', autoComplete: 'tel', required: false, span: 'half' },
  { id: 'subject', name: 'asunto', label: 'Asunto', type: 'text', required: false, span: 'half' },
  { id: 'message', name: 'mensaje', label: 'Mensaje', type: 'textarea', required: true, span: 'full' },
] as const;

/** Rótulos del panel. Todos IMAGE-ONLY: se leen del mockup. */
export const contactForm = {
  heading: 'Contactar con',
  departmentLegend: 'Departamento',
  attach: {
    label: 'Adjuntar archivo',
    hint: 'Arrastra tu archivo aquí o haz clic para buscar',
    max: 'Máx. 10MB',
    // 10 MB en bytes: el rótulo y el límite real salen del mismo sitio.
    maxBytes: 10 * 1024 * 1024,
    tooLarge: 'El archivo supera los 10MB.',
  },
  consent: {
    before: 'He leído y acepto la ',
    link: 'política de protección de datos',
    after: '.',
    href: '/legal/politica-de-privacidad',
  },
  submit: 'Enviar',
} as const;
