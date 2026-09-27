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
  /** Vídeo corporativo del cliente, versión sin textos (24/09/2026), 1920×1080:
   *  empieza después de los logos y la transición de anillos y acaba antes
   *  del cierre (3,6 s → 109 s), sin audio. AV1 primero; H.264 para Safari
   *  antiguo y el resto. Nombre nuevo para no servir la versión anterior
   *  desde caché. */
  video: {
    av1: '/video/hero-corporativo-sin-texto.webm',
    mp4: '/video/hero-corporativo-sin-texto.mp4',
    poster: '/img/v2/hero-poster.jpg',
  },
  alt: 'Vídeo corporativo de Laboratorios Virens: producción, laboratorio de control y almacén',
} as const;

/** Botón de menú de la cabecera: rótulo visible y nombre accesible. */
export const v2Menu = {
  open: 'Menú',
  close: 'Cerrar',
  openAria: 'Abrir menú',
  closeAria: 'Cerrar menú',
} as const;

/**
 * Private Label / Full service (24/09/2026): texto e imágenes de la maqueta que
 * envió el cliente, que sustituye al copy literal de lvirens.com en este
 * bloque. El filete bajo el título va en azul corporativo en Private Label y
 * en el color de Tech en Full service, como en la maqueta.
 */
export const v2Services = [
  {
    id: 'private-label',
    title: 'Private Label',
    accent: 'blue',
    body: 'Desarrollamos y fabricamos complementos alimenticios para tu marca, con fórmulas a medida, calidad certificada y total confidencialidad. Convertimos tus ideas en productos listos para el mercado, cuidando cada detalle.',
    image: {
      src: '/img/v2/private-label-16x9.jpg',
      alt: 'Técnica de laboratorio con un agitador de varilla en un vaso de precipitados con una mezcla blanca',
    },
  },
  {
    id: 'full-service',
    title: 'Full service',
    accent: 'tech',
    body: 'Te acompañamos en todo el proceso: desde el desarrollo y la formulación, hasta la fabricación, el control de calidad, el envasado y la logística. Una solución integral y flexible para llevar tu producto del concepto al consumidor final.',
    image: {
      src: '/img/v2/full-service-16x9.jpg',
      alt: 'Taponadora automática cerrando frascos de vidrio ámbar en una línea de envasado',
    },
  },
] as const;

export const v2Galenic = {
  title: 'Formas galénicas',
  lead: 'En Laboratorios Virens fabricamos complementos alimenticios en diferentes formas galénicas: sólidas (comprimidos, cápsulas) y líquidas (pequeños en distintos formatos: blister, bote, stick, viales, dropper).',
  image: {
    src: '/img/v2/galenicas-4k.jpg',
    alt: 'Cápsulas blancas avanzando por una línea farmacéutica de acero inoxidable',
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
  hint: {
    pointer: 'Pasa el cursor para ver cada formato',
    touch: 'Toca un formato para ver sus tamaños',
  },
  /** Siete formatos del diseño interactivo del cliente (27/09/2026). */
  formats: [
    { id: 'dropper', label: 'Dropper bottles', range: '30ml a 60ml' },
    { id: 'vials', label: 'Vials', range: '10ml a 25ml' },
    { id: 'jar', label: 'Jar filling', range: '50ml a 500ml' },
    { id: 'syrups', label: 'Syrups', range: '100ml a 1000ml' },
    { id: 'blisters', label: 'Blisters', range: 'PVDC-Pvc/Alu + Alu/Alu' },
    { id: 'sticks', label: 'Sticks', range: '5grs a 20grs' },
    { id: 'sachets', label: 'Sachets', range: '5grs' },
  ],
  scaleTitle: 'Escala industrial propia',
  /** Cifras literales del material de Labs, ahora integrado en la home. */
  stats: [
    { value: '+2.000', unit: 'm²', label: 'Instalaciones propias' },
    { value: '9', unit: '', label: 'Formatos de producción' },
    { value: '2', unit: '', label: 'Niveles de acondicionamiento' },
  ],
  items: [
    { id: 'capsulas', label: 'Cápsulas', units: '200M', icon: 'capsule' },
    { id: 'comprimidos', label: 'Comprimidos', units: '150M', icon: 'tablet' },
    { id: 'viales', label: 'Viales', units: '20M', range: '10 ml a 25 ml', icon: 'vial' },
    { id: 'blisters', label: 'Blísters', units: '15M', range: 'PVDC-PVC/Alu + Alu/Alu', icon: 'blister' },
    { id: 'sticks', label: 'Sticks', units: '10M', range: '5 g a 20 g', icon: 'stick' },
    { id: 'sobres', label: 'Sobres', units: '10M', range: '5 g a 10 g', icon: 'sachet' },
    { id: 'frascos', label: 'Llenado de frascos', units: '10M', range: '50 ml a 500 ml', icon: 'jarfill' },
    { id: 'goteros', label: 'Goteros', units: '5M', range: '30 ml a 60 ml', icon: 'dropper' },
    { id: 'jarabes', label: 'Jarabes', units: '5M', range: '100 ml a 1000 ml', icon: 'syrup' },
  ],
  operationsTitle: 'Acondicionamiento',
  operations: [
    'Estuchado automático',
    'Envasado en frasco',
    'Acondicionado primario y secundario',
  ],
  note: 'Capacidades orientativas. Unidad y periodo pendientes de confirmación.',
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
  /** Aumento lineal sobre la superficie común. Iraq y Emiratos llevan texto
   *  dentro del sello y a tamaño normal no se leía (24/09/2026, cliente). */
  scale?: number;
}

/**
 * Certificaciones de la maqueta. Desde el 23/09/2026 se pintan con los sellos
 * oficiales que entregó el cliente en PNG (`WEB VIRENS/png iso a svg`),
 * vectorizados a `/img/v2/sellos/{id}.svg`. `name` queda como nombre
 * accesible del sello. `unverified` no se muestra por defecto (regla 3).
 */
/** Título del bloque de certificaciones (27/09/2026, texto del cliente). */
export const v2CertificationsTitle = 'Nuestras certificaciones';

export const v2Certifications: V2Cert[] = [
  { id: 'iso22000', name: 'ISO 22000', issuer: 'SGS', status: 'image-only', ratio: 1.027 },
  { id: 'gmp', name: 'GMP', issuer: 'SGS', status: 'image-only', ratio: 1.027 },
  { id: 'haccp', name: 'HACCP', issuer: 'SGS', status: 'image-only', ratio: 1.025 },
  { id: 'eu', name: 'European Manufactured', status: 'image-only', ratio: 0.955 },
  { id: 'organic', name: 'Organic Certified', status: 'image-only', ratio: 1.295 },
  { id: 'vet', name: 'Veterinary Products', status: 'image-only', ratio: 0.767 },
  { id: 'iraq', name: 'Republic of Iraq', issuer: 'Manufacturing Site Registration', status: 'image-only', ratio: 1.338, scale: 1.3 },
  { id: 'uae', name: 'United Arab Emirates', issuer: 'Manufacturing Site Registration', status: 'image-only', ratio: 2.911, scale: 1.3 },
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
      { label: 'Fórmulas sólidas', href: '/#formas-galenicas' },
      { label: 'Fórmulas líquidas', href: '/#formas-galenicas' },
      { label: 'Fabricación por contrato', href: '/#private-label' },
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
      { label: 'Calidad', href: '/#calidad' },
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
