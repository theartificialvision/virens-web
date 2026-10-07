import type * as es from '../v2-home';
import type { V2Cert } from '../v2-home';
import type { Loosen } from '@/lib/i18n';

/**
 * HOME — inglés (27/09/2026). Mismas claves que `../v2-home.ts`.
 *
 * Origen de cada texto (decisión del cliente: usar la web actual):
 *   [EN]  literal de lvirens.com/en (extracción 27/09/2026, docs/fuente-en-lvirens.md)
 *   [IMG] literal de la imagen en inglés de lvirens.com (img-eng.png)
 *   [TR]  traducción de Claude de un texto nuevo del rediseño, sin equivalente
 *         en la web actual — PENDIENTE DE REVISIÓN del cliente.
 */

export const v2Hero = {
  title: 'Experts in food supplements', // [EN]
  subtitle: 'Contract Manufacturing & Development', // [EN]
  lead: 'Comprehensive manufacturing and development solutions for food supplements, to the highest quality standards.', // [TR] (ES del cliente 29/09)
  video: {
    av1: '/video/hero-corporativo-40s.webm',
    mp4: '/video/hero-corporativo-40s.mp4',
    av1Mobile: '/video/hero-corporativo-40s-vertical.webm',
    mp4Mobile: '/video/hero-corporativo-40s-vertical.mp4',
    poster: '/img/v2/hero-poster-40s.jpg',
  },
  alt: 'Laboratorios Virens corporate video: production, quality control laboratory and warehouse', // [TR]
} as const satisfies Loosen<typeof es.v2Hero>;

export const v2Menu = {
  open: 'Menu',
  close: 'Close',
  openAria: 'Open menu',
  closeAria: 'Close menu',
} as const satisfies Loosen<typeof es.v2Menu>;

export const v2Services = [
  {
    id: 'full-service',
    title: 'Full Service',
    accent: 'tech',
    // [TR] del texto de la maqueta.
    body: 'We support you throughout the whole process: from development and formulation to manufacturing, quality control, packaging and logistics. A comprehensive, flexible solution to take your product from concept to the end consumer.',
    image: {
      src: '/img/v2/full-service-16x9.jpg',
      alt: 'Automatic capping machine sealing amber glass bottles on a packaging line', // [TR]
    },
  },
  {
    id: 'private-label',
    title: 'Private Label',
    accent: 'blue',
    // [TR] del texto de la maqueta (la web actual tiene otro texto en este bloque).
    body: 'We develop and manufacture food supplements for your brand, with tailor-made formulas, certified quality and complete confidentiality. We turn your ideas into market-ready products, taking care of every detail.',
    image: {
      src: '/img/v2/private-label-16x9.jpg',
      alt: 'Laboratory technician stirring a white mixture in a beaker', // [TR]
    },
  }
] as const satisfies Loosen<typeof es.v2Services>;

export const v2Galenic = {
  title: 'Galenic forms', // [EN]
  // [EN] literal de /en/virens-labs.
  lead: 'At Virens Labs we manufacture food supplements in different galenic forms: solids (tablets, capsules) and liquids (syrups) in different formats: blister, bottles, sticks, vials, drops, etc.',
  image: {
    src: '/img/v2/galenicas-4k.jpg',
    alt: 'White capsules moving along a stainless steel pharmaceutical line', // [TR]
  },
  swipeHint: 'Swipe', // [TR]
  items: [
    { id: 'capsulas', icon: 'capsule', label: 'Capsules' }, // [EN]
    { id: 'comprimidos', icon: 'tablet', label: 'Tablets' }, // [EN]
    { id: 'viales', icon: 'vial', label: 'Vials' }, // [EN]
    { id: 'blisters', icon: 'blister', label: 'Blisters' }, // [EN]
    { id: 'jarabes', icon: 'syrup', label: 'Syrups' }, // [EN]
    { id: 'goteros', icon: 'dropper', label: 'Droppers' }, // [EN]
    { id: 'frascos', icon: 'jarfill', label: 'Bottled' }, // [EN]
    { id: 'sticks', icon: 'stick', label: 'Sticks' }, // [EN]
    { id: 'sobres', icon: 'sachet', label: 'Sachets' }, // [IMG]
  ],
} as const satisfies Loosen<typeof es.v2Galenic>;

export const v2Capacity = {
  title: 'Formats', // [TR] (29/09: «Formatos»)
  // [EN] literal de /en/virens-labs.
  lead: 'We have more than 2,000 m² of facilities where we carry out manufacturing, both primary and secondary conditioning.',
  hint: {
    pointer: 'Hover to see each format', // [TR] (no se muestra)
    touch: 'Tap a format to see its sizes', // [TR] (no se muestra)
  },
  formats: [
    { id: 'dropper', label: 'Droppers', range: '30 ml to 60 ml' }, // [IMG]
    { id: 'vials', label: 'Vials', range: '10 ml to 25 ml' }, // [IMG]
    { id: 'jar', label: 'Bottled', range: '50 ml to 500 ml' }, // [IMG]
    { id: 'syrups', label: 'Syrups', range: '50 ml to 1000 ml' }, // cliente 29/09
    { id: 'blisters', label: 'Blisters', range: 'PVDC-PVC/Alu + Alu/Alu' }, // [IMG]
    { id: 'sticks', label: 'Sticks', range: '3 g to 7 g' }, // cliente 29/09
    { id: 'sachets', label: 'Sachets', range: '5 g to 10 g' }, // [IMG]
  ],
  scaleTitle: 'Productive capacity', // [EN]
  stats: [
    { value: '+2,000', unit: 'm²', label: 'In-house facilities' }, // [TR]
    { value: '9', unit: '', label: 'Production formats' }, // [TR]
    { value: '3', unit: '', label: 'Packaging levels' }, // [TR]
  ],
  items: [
    { id: 'capsulas', label: 'Capsules', units: '200M', icon: 'capsule' }, // [IMG]
    { id: 'comprimidos', label: 'Tablets', units: '300M', icon: 'tablet' }, // cliente 29/09
    { id: 'viales', label: 'Vials', units: '20M', range: '10 ml to 25 ml', icon: 'vial' }, // [IMG]
    { id: 'blisters', label: 'Blisters', units: '15M', range: 'PVDC-PVC/Alu + Alu/Alu', icon: 'blister' }, // [IMG]
    { id: 'sticks', label: 'Sticks', units: '10M', range: '3 g to 7 g', icon: 'stick' }, // cliente 29/09
    { id: 'sobres', label: 'Sachets', units: '10M', range: '5 g to 10 g', icon: 'sachet' }, // [IMG]
    { id: 'frascos', label: 'Bottle filling', units: '10M', range: '50 ml to 500 ml', icon: 'jarfill' }, // [IMG] («Bottled»)
    { id: 'goteros', label: 'Droppers', units: '5M', range: '30 ml to 60 ml', icon: 'dropper' }, // [IMG]
    { id: 'jarabes', label: 'Syrups', units: '5M', range: '50 ml to 1000 ml', icon: 'syrup' }, // cliente 29/09
  ],
  operationsTitle: 'Packaging', // [TR] (ES: «Acondicionamiento»)
  operations: [
    'Automatic cartoning', // [EN]
    'Bottling', // [TR]
    'Primary & secondary packaging', // [EN]
  ],
} as const satisfies Loosen<typeof es.v2Capacity>;

export const v2Areas = {
  label: 'Therapeutic areas', // [EN] («Therapeutical areas» en la web actual, corregido)
  items: [
    'Weight management', // [EN]
    'Nervous system', // [EN]
    'Joints', // [EN]
    'Digestive', // [EN]
    'Kids', // [EN]
    'Cardiovascular', // [EN]
    'Immune system', // [EN]
    "Women's health", // [EN]
    'Pets', // [EN]
    'Sports nutrition', // [EN]
  ],
} as const satisfies Loosen<typeof es.v2Areas>;

export const v2CertificationsTitle = 'Our certifications'; // [TR] (web actual: «Our quality»)

/** Los sellos son los mismos; solo cambian los nombres accesibles que lo necesitan (ninguno). */
export const v2Certifications: V2Cert[] = [
  { id: 'iso22000', name: 'ISO 22000', caption: 'ISO 22000', issuer: 'SGS', status: 'image-only', ratio: 1.027 },
  { id: 'gmp', name: 'GMP', caption: 'GMP', issuer: 'SGS', status: 'image-only', ratio: 1.027 },
  { id: 'haccp', name: 'HACCP', caption: 'HACCP', issuer: 'SGS', status: 'image-only', ratio: 1.025 },
  { id: 'eu', name: 'European Manufactured', status: 'image-only', ratio: 0.955 },
  { id: 'vet', name: 'Veterinary Products', status: 'image-only', ratio: 0.767 },
  { id: 'iraq', name: 'Republic of Iraq', issuer: 'Manufacturing Site Registration', status: 'image-only', ratio: 1.338, scale: 1.3 },
  { id: 'uae', name: 'United Arab Emirates', issuer: 'Manufacturing Site Registration', status: 'image-only', ratio: 2.911, scale: 1.3 },
  // 02/10/2026: el cliente pide mostrarlo (antes `unverified`, oculto).
  { id: 'fda', name: 'FDA Approved', status: 'image-only', ratio: 1.636 },
];

export const v2Cta = {
  title: "Let's talk about your project", // [TR]
  lead: 'Would you like to be part of Laboratorios Virens?', // [TR] (ES del cliente 29/09)
  button: 'Contact us now', // [TR]
  href: '/en/contact',
} as const satisfies Loosen<typeof es.v2Cta>;

export const v2FooterNav = [
  {
    title: 'Virens Labs',
    items: [
      { label: 'Private Label', href: '/en#private-label' },
      { label: 'Productive capacity', href: '/en#escala' }, // [EN] (mismo título que la sección)
      { label: 'Formats', href: '/en#capacidad-productiva' }, // [TR]
    ],
  },
  {
    title: 'Virens Tech',
    items: [
      { label: 'Product development', href: '/en/virens-tech#formulacion' }, // [TR]
      { label: 'R&D&I', href: '/en/virens-tech#rd-galenicos' }, // [TR]
      { label: 'Innovation', href: '/en/virens-tech' }, // [TR]
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About us', href: '/en/company#quienes-somos' }, // [TR] («Who are we?»)
      { label: 'What we do', href: '/en/company#que-hacemos' }, // [TR]
      { label: 'Contact', href: '/en/contact' }, // [EN]
    ],
  },
  {
    title: 'Documentation', // [TR]
    items: [
      { label: 'Legal notice', href: '/en/legal/legal-notice' },
      { label: 'Privacy policy', href: '/en/legal/privacy-policy' },
      { label: 'Cookie policy', href: '/en/legal/cookie-policy' },
      { label: 'Commercial policy', href: '/en/legal/sales-terms-and-conditions' },
    ],
  },
] as const satisfies Loosen<typeof es.v2FooterNav>;

export const v2FooterAddress = {
  source: 'image-only',
  sites: [
    { label: 'Production', lines: ['Industria 48-B', 'Pol. Ind. Nord-Est'] }, // [TR]
    { label: 'Warehouse / Office', lines: ['Industria 54 Nave 13', 'Pol. Ind. Nord-Est'] }, // [TR]
  ],
  locality: '08740 Sant Andreu de la Barca (Barcelona) SPAIN',
  phoneLabel: 'Tel.', // [TR]
  phone: '+34 93 682 89 72',
} as const satisfies Loosen<typeof es.v2FooterAddress>;

/** [TR] Traducción de la maqueta aprobada; pendiente de revisión editorial. */
export const v2Laboratory = {
  source: 'rewritten',
  navigation: { previous: 'Previous capability', next: 'Next capability', pause: 'Pause the tour', play: 'Resume the tour', services: 'Service' }, // [TR]
  title: 'Science, development and manufacturing',
  serviceSummaries: ['From formulation to manufacturing, quality control, packaging and logistics. An integrated service, from start to finish.', 'We develop and manufacture food supplements for your brand, with tailored formulas and complete confidentiality.'],
  caption: 'FROM DEVELOPMENT TO FINISHED PRODUCT',
  /** Ver el español: del paso 4 (Logistics) en adelante, Full service. */
  capabilities: [
    { label: 'R&D and formulation', description: 'We develop tailored formulas in collaboration with your technical and development teams.', image: { src: '/img/laboratorio/pesaje-materias-primas-formulacion-complementos-alimenticios.webp', alt: 'Weighing powdered raw material in a beaker on a laboratory scale' } },
    { label: 'Manufacturing', description: 'We manufacture food supplements in solid and liquid forms, adapted to each project.', image: { src: '/img/laboratorio/capsulas-blister-fabricacion-complementos-alimenticios.webp', alt: 'White capsules in the cavities of a stainless-steel blister machine' } },
    { label: 'Quality control', description: 'In our laboratory we carry out analyses to the highest standards.', image: { src: '/img/laboratorio/control-calidad-analisis-laboratorio-complementos-alimenticios.webp', alt: 'Gloved analyst measuring a sample with a pH meter in the quality control laboratory' } },
    { label: 'Packaging', description: 'We carry out the primary and secondary packaging of your product.', image: { src: '/img/laboratorio/envasado-botes-linea-complementos-alimenticios.webp', alt: 'White bottles moving along an automatic packaging line' } },
    { label: 'Logistics', description: 'We manage shipping all the way to your warehouse.', image: { src: '/img/laboratorio/logistica-almacen-complementos-alimenticios.webp', alt: 'Warehouse with pallet racking and a forklift' } },
  ],
  closing: ['A complete laboratory.', 'At the service of your brand.'],
} as const satisfies Loosen<typeof es.v2Laboratory>;
