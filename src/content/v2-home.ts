import type { SourceStatus } from '@/lib/types';

/**
 * HOME V2 — contenido transcrito de la maqueta del cliente (22/09/2026).
 *
 * `source` dice de dónde sale cada texto:
 *   'mockup'   — literal de la maqueta que entregó el cliente
 *   'literal'  — literal de lvirens.com (extracción 01/09/2026)
 *   'image-only' — hoy solo existe dentro de una imagen
 *   'unverified' — requiere confirmación antes de publicar
 *
 * OJO — erratas que vienen en la maqueta y se han transcrito TAL CUAL,
 * pendientes de que el cliente decida si se corrigen:
 *   1. hero.lead:  "con la más alta estándares de calidad"  (concordancia)
 *   2. privateLabel: "Nos adaptamos a las requerimientos"   (concordancia)
 * La web actual dice "a los requerimientos" y "desarrollamos su fórmula";
 * la maqueta tutea ("desarrollaremos tu fórmula"). Ver v2-home.notes.
 */

export const v2Hero = {
  title: 'Expertos en complementos alimenticios',
  subtitle: 'Fabricación por contrato y desarrollo',
  lead: 'Soluciones integrales de fabricación y desarrollo de complementos alimenticios con la más alta estándares de calidad.',
  video: { src: '/video/home-hero.mp4', poster: '/img/v2/hero-poster.jpg' },
  alt: 'Línea de llenado y dosificado en marcha en la planta de Laboratorios Virens',
} as const;

/** Botón de menú de la cabecera: rótulo visible y nombre accesible. */
export const v2Menu = {
  open: 'Menú',
  close: 'Cerrar',
  openAria: 'Abrir menú',
  closeAria: 'Cerrar menú',
} as const;

export const v2Services = [
  {
    id: 'private-label',
    icon: 'flask',
    title: 'Private Label',
    body: 'En Virens contamos con una amplia experiencia en el desarrollo de fórmulas personalizadas y únicas. Nos adaptamos a las requerimientos técnicos y comerciales de nuestros clientes. Basándonos en la idea inicial y junto con nuestro equipo de I+D desarrollaremos tu fórmula garantizando la máxima seguridad y trazabilidad.',
  },
  {
    id: 'full-service',
    icon: 'box',
    title: 'Full service',
    body: 'Virens ofrece un servicio integral. Desde el desarrollo del producto a su entrega como producto final para su puesta en el mercado; interviniendo en fabricaciones parciales; entregando “fabricaciones a granel”; o ofreciendo servicio de acondicionamiento parcial o completo.',
  },
] as const;

export const v2Galenic = {
  title: 'Formas galénicas',
  lead: 'En Laboratorios Virens fabricamos complementos alimenticios en diferentes formas galénicas: sólidas (comprimidos, cápsulas) y líquidas (pequeños en distintos formatos: blister, bote, stick, viales, dropper).',
  image: {
    src: '/img/v2/galenicas.jpg',
    alt: 'Línea de producción de Laboratorios Virens',
  },
  /** Orden exacto de la maqueta: dos filas de cinco. */
  items: [
    { id: 'capsulas', icon: 'capsule', label: 'Cápsulas' },
    { id: 'comprimidos', icon: 'tablet', label: 'Comprimidos' },
    { id: 'encapsulado', icon: 'autocapsule', label: 'Encapsulado automático' },
    { id: 'viales', icon: 'vial', label: 'Viales' },
    { id: 'blisters', icon: 'blister', label: 'Blísters' },
    { id: 'jarabes', icon: 'syrup', label: 'Jarabes' },
    { id: 'goteros', icon: 'dropper', label: 'Goteros' },
    { id: 'frasco', icon: 'jarfill', label: 'Envasado en frasco' },
    { id: 'sticks', icon: 'stick', label: 'Sticks' },
    { id: 'sobres', icon: 'sachet', label: 'Sobres' },
  ],
} as const;

export const v2Capacity = {
  title: 'Capacidad productiva',
  lead: 'Contamos con más de 2000 m² de instalaciones donde llevamos a cabo la fabricación, acondicionamiento primario y secundario.',
  /** Siluetas vectoriales del archivo Objetosweb.ai del cliente (22/09/2026). */
  items: [
    { id: 'dropper', file: 'dropper', label: 'Dropper bottles', range: '30ml a 60ml' },
    { id: 'vials', file: 'vial', label: 'Vials', range: '10ml a 25ml' },
    { id: 'jar', file: 'jar', label: 'Jar filling', range: '50ml a 500ml' },
    { id: 'syrups', file: 'syrup', label: 'Syrups', range: '100ml a 1000ml' },
    { id: 'blisters', file: 'blister', label: 'Blisters', range: 'PVDC-Pvc/Alu + Alu/Alu' },
    { id: 'sticks', file: 'stick', label: 'Sticks', range: '5grs a 20grs' },
    { id: 'sachets', file: 'sachet', label: 'Sachets', range: '5grs' },
  ],
} as const;

export const v2Areas = {
  label: 'Áreas terapéuticas',
  /** Denominaciones verificadas contra lvirens.com. No modificar sin aprobación. */
  items: [
    'Peso',
    'Sist. Nervioso',
    'Articulaciones',
    'Digestivo',
    'Infantil',
    'Cardiovascular',
    'Inmunitario',
    'Salud Mujer',
    'Mascotas',
    'Sport nutrition',
  ],
} as const;

export interface V2Cert {
  id: string;
  name: string;
  issuer?: string;
  status: SourceStatus;
  /** Ancho / alto del sello en `/img/v2/sellos/{id}.svg`: la franja lo usa
   *  para dar a todos la misma superficie, no la misma altura. */
  ratio: number;
}

/**
 * Certificaciones de la maqueta. Desde el 23/09/2026 se pintan con los sellos
 * oficiales que entregó el cliente en PNG (`WEB VIRENS/png iso a svg`),
 * vectorizados a `/img/v2/sellos/{id}.svg`. `name` queda como nombre
 * accesible del sello. `unverified` no se muestra por defecto (regla 3).
 */
export const v2Certifications: V2Cert[] = [
  { id: 'iso22000', name: 'ISO 22000', issuer: 'SGS', status: 'image-only', ratio: 1.027 },
  { id: 'gmp', name: 'GMP', issuer: 'SGS', status: 'image-only', ratio: 1.027 },
  { id: 'haccp', name: 'HACCP', issuer: 'SGS', status: 'image-only', ratio: 1.025 },
  { id: 'eu', name: 'European Manufactured', status: 'image-only', ratio: 0.955 },
  { id: 'organic', name: 'Organic Certified', status: 'image-only', ratio: 1.295 },
  { id: 'vet', name: 'Veterinary Products', status: 'image-only', ratio: 0.767 },
  { id: 'iraq', name: 'Republic of Iraq', issuer: 'Manufacturing Site Registration', status: 'image-only', ratio: 1.338 },
  { id: 'uae', name: 'United Arab Emirates', issuer: 'Manufacturing Site Registration', status: 'image-only', ratio: 2.911 },
  { id: 'fda', name: 'FDA Approved', status: 'unverified', ratio: 1.636 },
];

export const v2Cta = {
  title: '¿Hablamos de tu proyecto?',
  lead: 'Nuestro equipo está listo para ayudarte.',
  button: 'Contactar ahora',
  href: '/contacto',
} as const;

export const v2FooterNav = [
  {
    title: 'Virens Labs',
    items: [
      { label: 'Fórmulas sólidas', href: '/virens-labs#formas-galenicas' },
      { label: 'Fórmulas líquidas', href: '/virens-labs#formas-galenicas' },
      { label: 'Fabricación por contrato', href: '/virens-labs' },
    ],
  },
  {
    title: 'Virens Tech',
    items: [
      { label: 'Desarrollo de producto', href: '/virens-tech#formulacion' },
      { label: 'I+D+i', href: '/virens-tech#rd-galenicos' },
      { label: 'Innovación', href: '/virens-tech' },
    ],
  },
  {
    title: 'Empresa',
    items: [
      { label: 'Quiénes somos', href: '/compania' },
      { label: 'Calidad', href: '/virens-labs#calidad' },
      { label: 'Instalaciones', href: '/compania' },
    ],
  },
  {
    title: 'Recursos',
    items: [
      { label: 'Noticias', href: '/noticias' },
      { label: 'Documentación', href: '/contacto' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
] as const;
