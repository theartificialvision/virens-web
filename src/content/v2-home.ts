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
 *   1. (resuelta el 29/09/2026: el cliente dio el texto nuevo del hero)
 *   2. privateLabel: "Nos adaptamos a las requerimientos"   (concordancia)
 * La web actual dice "a los requerimientos" y "desarrollamos su fórmula";
 * la maqueta tutea ("desarrollaremos tu fórmula"). Ver v2-home.notes.
 */

export const v2Hero = {
  /** 29/09/2026 (cliente): título y subtítulo van SIEMPRE en inglés, también
   *  en la versión española; mismo texto que lvirens.com/en. */
  title: 'Experts in food supplements',
  subtitle: 'Contract Manufacturing & Development',
  lead: 'Soluciones integrales de fabricación y desarrollo de complementos alimenticios con los más altos estándares de calidad.',
  /** Vídeo corporativo del cliente, versión de 40 s (01/10/2026), sin audio.
   *  Dos cortes: horizontal 1920×1080 para ≥ 768 px y vertical 720×1280 para
   *  móvil. AV1 primero; H.264 para Safari antiguo y el resto. Nombres nuevos
   *  para no servir la versión anterior desde caché. */
  video: {
    av1: '/video/hero-corporativo-40s.webm',
    mp4: '/video/hero-corporativo-40s.mp4',
    av1Mobile: '/video/hero-corporativo-40s-vertical.webm',
    mp4Mobile: '/video/hero-corporativo-40s-vertical.mp4',
    poster: '/img/v2/hero-poster-40s.jpg',
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
/** 30/09/2026 (cliente): Full service va primero, antes que Private Label.
 *  El orden de `v2Laboratory.serviceSummaries` sigue a este. */
export const v2Services = [
  {
    id: 'full-service',
    title: 'Full Service',
    accent: 'tech',
    body: 'Te acompañamos en todo el proceso: desde el desarrollo y la formulación, hasta la fabricación, el control de calidad, el envasado y la logística. Una solución integral y flexible para llevar tu producto del concepto al consumidor final.',
    image: {
      src: '/img/v2/full-service-16x9.jpg',
      alt: 'Taponadora automática cerrando frascos de vidrio ámbar en una línea de envasado',
    },
  },
  {
    id: 'private-label',
    title: 'Private Label',
    accent: 'blue',
    body: 'Desarrollamos y fabricamos complementos alimenticios para tu marca, con fórmulas a medida, calidad certificada y total confidencialidad. Convertimos tus ideas en productos listos para el mercado, cuidando cada detalle.',
    image: {
      src: '/img/v2/private-label-16x9.jpg',
      alt: 'Técnica de laboratorio con un agitador de varilla en un vaso de precipitados con una mezcla blanca',
    },
  }
] as const;

export const v2Galenic = {
  title: 'Formas galénicas',
  lead: 'En Laboratorios Virens fabricamos complementos alimenticios en diferentes formas galénicas: sólidas (comprimidos, cápsulas) y líquidas (pequeños en distintos formatos: blister, bote, stick, viales, dropper).',
  image: {
    src: '/img/v2/galenicas-4k.jpg',
    alt: 'Cápsulas blancas avanzando por una línea farmacéutica de acero inoxidable',
  },
  swipeHint: 'Desliza',
  /** Orden de la maqueta. 28/09/2026 (cliente): fuera «Encapsulado
   *  automático»; quedan los nueve formatos con capacidad en `v2Capacity`,
   *  cuya cifra se pinta bajo cada forma (el `id` es la clave común). */
  items: [
    { id: 'capsulas', icon: 'capsule', label: 'Cápsulas' },
    { id: 'comprimidos', icon: 'tablet', label: 'Comprimidos' },
    { id: 'viales', icon: 'vial', label: 'Viales' },
    { id: 'blisters', icon: 'blister', label: 'Blísters' },
    { id: 'jarabes', icon: 'syrup', label: 'Jarabes' },
    { id: 'goteros', icon: 'dropper', label: 'Goteros' },
    { id: 'frascos', icon: 'jarfill', label: 'Envasado en frasco' },
    { id: 'sticks', icon: 'stick', label: 'Sticks' },
    { id: 'sobres', icon: 'sachet', label: 'Sobres' },
  ],
} as const;

export const v2Capacity = {
  /** 29/09/2026 (cliente): la sección de las siluetas pasa a llamarse «Formatos». */
  title: 'Formatos',
  lead: 'Contamos con más de 2.000 m² de instalaciones donde llevamos a cabo la fabricación, acondicionamiento primario y secundario.',
  hint: {
    pointer: 'Pasa el cursor para ver cada formato',
    touch: 'Toca un formato para ver sus tamaños',
  },
  /** Siete formatos del diseño interactivo del cliente (27/09/2026). */
  formats: [
    { id: 'dropper', label: 'Dropper bottles', range: '30 ml a 60 ml' },
    { id: 'vials', label: 'Vials', range: '10 ml a 25 ml' },
    { id: 'jar', label: 'Jar filling', range: '50 ml a 500 ml' },
    { id: 'syrups', label: 'Syrups', range: '50 ml a 1000 ml' },
    { id: 'blisters', label: 'Blisters', range: 'PVDC-PVC/Alu + Alu/Alu' },
    { id: 'sticks', label: 'Sticks', range: '3 g a 7 g' },
    { id: 'sachets', label: 'Sachets', range: '5 g a 10 g' },
  ],
  /** 29/09/2026 (cliente): antes «Escala industrial propia»; va ahora como
   *  sección propia encima de Formas galénicas (`ProductionScale`). */
  scaleTitle: 'Capacidad productiva',
  /** Cifras literales del material de Labs, ahora integrado en la home. */
  stats: [
    { value: '+2.000', unit: 'm²', label: 'Instalaciones propias' },
    { value: '9', unit: '', label: 'Formatos de producción' },
    { value: '3', unit: '', label: 'Niveles de acondicionamiento' },
  ],
  items: [
    { id: 'capsulas', label: 'Cápsulas', units: '200M', icon: 'capsule' },
    { id: 'comprimidos', label: 'Comprimidos', units: '300M', icon: 'tablet' },
    { id: 'viales', label: 'Viales', units: '20M', range: '10 ml a 25 ml', icon: 'vial' },
    { id: 'blisters', label: 'Blísters', units: '15M', range: 'PVDC-PVC/Alu + Alu/Alu', icon: 'blister' },
    { id: 'sticks', label: 'Sticks', units: '10M', range: '3 g a 7 g', icon: 'stick' },
    { id: 'sobres', label: 'Sobres', units: '10M', range: '5 g a 10 g', icon: 'sachet' },
    { id: 'frascos', label: 'Llenado de frascos', units: '10M', range: '50 ml a 500 ml', icon: 'jarfill' },
    { id: 'goteros', label: 'Goteros', units: '5M', range: '30 ml a 60 ml', icon: 'dropper' },
    { id: 'jarabes', label: 'Jarabes', units: '5M', range: '50 ml a 1000 ml', icon: 'syrup' },
  ],
  operationsTitle: 'Acondicionamiento',
  operations: [
    'Estuchado automático',
    'Envasado en frasco',
    'Acondicionado primario y secundario',
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
  /** Aumento lineal sobre la superficie común. Iraq y Emiratos llevan texto
   *  dentro del sello y a tamaño normal no se leía (24/09/2026, cliente). */
  scale?: number;
  /** Rótulo visible bajo el sello. 30/09/2026 (cliente): los tres de SGS se
   *  parecen demasiado y su norma va pequeña en el arco; se rotulan debajo
   *  con el mismo nombre que ya lleva el sello dibujado. */
  caption?: string;
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
  title: '¿Hablamos de tu proyecto?',
  /** 29/09/2026, texto del cliente. */
  lead: '¿Quieres formar parte de Laboratorios Virens?',
  button: 'Contactar ahora',
  href: '/contacto',
} as const;

export const v2FooterNav = [
  {
    title: 'Virens Labs',
    /** 30/09/2026 (cliente): Private Label, Capacidad productiva y Formatos. */
    items: [
      { label: 'Private Label', href: '/#private-label' },
      { label: 'Capacidad productiva', href: '/#escala' },
      { label: 'Formatos', href: '/#capacidad-productiva' },
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
    /** 30/09/2026 (cliente): Quiénes somos, Qué hacemos y Contacto. */
    items: [
      { label: 'Quiénes somos', href: '/compania#quienes-somos' },
      { label: 'Qué hacemos', href: '/compania#que-hacemos' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  {
    /** 29/09/2026 (cliente): «Recursos» pasa a «Documentación» con los textos legales. */
    title: 'Documentación',
    items: [
      { label: 'Aviso legal', href: '/legal/aviso-legal' },
      { label: 'Protección de datos', href: '/legal/politica-de-privacidad' },
      { label: 'Política comercial', href: '/legal/condiciones-generales-de-venta' },
    ],
  },
] as const;

/** Dirección del pie (30/09/2026, imagen de la firma corporativa del cliente).
 *  image-only: transcrita de la imagen; «48-B» coincide con /contacto, pero la
 *  dirección definitiva sigue pendiente (48-A / 48-B, `site.pendingClientConfirmation`). */
export const v2FooterAddress = {
  source: 'image-only',
  sites: [
    { label: 'Producción', lines: ['Industria 48-B', 'Pol. Ind. Nord-Est'] },
    { label: 'Almacén / Oficina', lines: ['Industria 54 Nave 13', 'Pol. Ind. Nord-Est'] },
  ],
  locality: '08740 Sant Andreu de la Barca (Barcelona) SPAIN',
  phoneLabel: 'Telf.',
  phone: '+34 93 682 89 72',
} as const;

/** Reescritura de los servicios existentes según la maqueta aprobada (28/09/2026). */
export const v2Laboratory = {
  source: 'rewritten',
  navigation: { previous: 'Capacidad anterior', next: 'Siguiente capacidad', pause: 'Pausar el recorrido', play: 'Reanudar el recorrido', services: 'Servicio' },
  title: 'Ciencia, desarrollo y fabricación',
  serviceSummaries: ['De la formulación a la fabricación, el control de calidad, el envasado y la logística. Un servicio integral, de principio a fin.', 'Desarrollamos y fabricamos complementos alimenticios para tu marca, con fórmulas a medida y total confidencialidad.'],
  caption: 'DEL DESARROLLO AL PRODUCTO TERMINADO',
  capabilities: [
    { label: 'I+D y formulación', description: 'Desarrollamos fórmulas a medida en colaboración con tu equipo técnico y de desarrollo.', image: { src: '/img/laboratorio/pesaje-materias-primas-formulacion-complementos-alimenticios.webp', alt: 'Pesaje de materia prima en polvo en un vaso de precipitados sobre una balanza de laboratorio' } },
    { label: 'Fabricación', description: 'Fabricamos complementos alimenticios en formas sólidas y líquidas, adaptadas a cada proyecto.', image: { src: '/img/laboratorio/capsulas-blister-fabricacion-complementos-alimenticios.webp', alt: 'Cápsulas blancas en los alveolos de una blistera de acero inoxidable' } },
    { label: 'Control de calidad', description: 'En nuestro laboratorio realizamos analíticas bajo los más altos estándares.', image: { src: '/img/laboratorio/control-calidad-analisis-laboratorio-complementos-alimenticios.webp', alt: 'Analista con guantes midiendo una muestra con un pHmetro en el laboratorio de control de calidad' } },
    { label: 'Envasado', description: 'Realizamos el envasado primario y secundario de tu producto.', image: { src: '/img/laboratorio/envasado-botes-linea-complementos-alimenticios.webp', alt: 'Botes blancos avanzando por una línea de envasado automática' } },
    { label: 'Logística', description: 'Gestionamos el envío hasta tu almacén.', image: { src: '/img/laboratorio/logistica-almacen-complementos-alimenticios.webp', alt: 'Almacén con estanterías de palés y carretilla elevadora' } },
  ],
  closing: ['Todo un laboratorio.', 'Al servicio de tu marca.'],
} as const;
