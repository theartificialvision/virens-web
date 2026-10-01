import type { TimelineEntry } from '@/lib/types';

/**
 * COMPAÑÍA — texto literal de lvirens.com y de la maqueta
 * `QuienesSomos copia.pdf` entregada por el cliente (27/09/2026).
 */

export const companyHero = {
  prefix: 'Expertos en',
  title: 'Complementos alimenticios',
  subtitle: 'Contract Manufacturing & Development',
  body: 'En Laboratorios Virens fabricamos complementos alimenticios con los más altos estándares para mejorar el bienestar físico, mental y social.',
  image: {
    src: '/img/compania/taponado-frascos-ambar-laboratorios-virens.webp',
    alt: 'Frascos de vidrio ámbar con tapón blanco en una línea de taponado',
  },
} as const;

// LITERAL de "Quiénes somos" (§2.2). El H1 y la entradilla propuestos en el
// documento (§08.5) son una reescritura nueva sin equivalente en la web
// actual: se sustituyen por el texto real, partido en título + cuerpo.
export const companyIntro = {
  title: 'Laboratorios Virens es una empresa con más de 20 años de experiencia en la fabricación de complementos alimenticios.',
  body: [
    'En Virens entendemos la salud como un estado de bienestar físico, mental y social y no solo como la ausencia de enfermedades.',
    'Somos expertos en elaborar productos de alta calidad y valor añadido satisfaciendo así las exigencias de nuestros clientes.',
  ],
} as const;

/** Literal de la web. */
export const pillars = [
  { icon: 'facilities', label: 'Fabricación en instalaciones propias' },
  { icon: 'team', label: 'Equipo altamente cualificado y orientado al cliente' },
  { icon: 'quality', label: 'Altos estándares de calidad, seguridad y control' },
  { icon: 'science', label: 'Conocimiento científico de nutrición y fitoterapia' },
  { icon: 'international', label: 'Empresa con vocación internacional' },
] as const;

export const companySections = {
  identity: { index: '01', title: 'Quiénes somos' },
  work: {
    index: '02',
    title: 'Qué hacemos',
    intro: 'Laboratorios Virens ofrece soluciones integrales.',
    body: 'Desde el desarrollo del producto a su entrega como producto final para su puesta en el mercado; pasando por el proceso de formulación, producción y acondicionamiento.',
  },
  research: { index: '03', title: 'I+D y control de calidad' },
  history: { index: '04', title: 'Nuestra historia' },
} as const;

/** Cinco etapas de la maqueta del cliente (imagen, 27/09/2026). */
export const valueChain = [
  {
    index: '01',
    icon: 'development',
    title: 'Desarrollo y formulación',
    body: 'Elaboración de la fórmula siguiendo las directrices establecidas',
  },
  {
    index: '02',
    icon: 'samples',
    title: 'Elaboración de muestras',
    body: 'Realización de muestras para conseguir el producto deseado por el cliente',
  },
  {
    index: '03',
    icon: 'manufacturing',
    title: 'Fabricación y envasado',
    body: 'Transformación de la idea en producto acabado',
  },
  {
    index: '04',
    icon: 'conditioning',
    title: 'Acondicionado',
    body: 'Acondicionado primario y secundario',
  },
  {
    index: '05',
    icon: 'control',
    title: 'Control de calidad',
    body: 'Definición y supervisión de protocolos para asegurar la calidad del producto y procesos',
  },
] as const;

export const companyResearch = {
  title: companySections.research.title,
  image: {
    src: '/img/compania/laboratorio-id-control-calidad-laboratorios-virens.webp',
    alt: 'Técnica de laboratorio con guantes preparando una muestra en un agitador',
  },
  body: [
    { text: 'Disponemos de un ', accent: false },
    { text: 'equipo de I+D', accent: true },
    { text: ' el cual cuenta con una amplia experiencia en el desarrollo de nuevas fórmulas y asesora a nuestros clientes a personalizar las suyas. Además contamos con un ', accent: false },
    { text: 'Laboratorio de Control de Calidad', accent: true },
    { text: ' equipado para garantizar el cumplimiento de las especificaciones y requerimientos solicitados. También tenemos la capacidad para elaborar muestras, realizar test piloto y estudios de estabilidad si el proceso lo requiere.', accent: false },
  ],
} as const;

/** Textos alternativos de las fotos de fondo de «Qué hacemos» y de la historia. */
export const companyImages = {
  process: 'Línea de producción de Laboratorios Virens',
  history: 'Investigadora examinando un tubo de ensayo junto a un microscopio',
} as const;

/**
 * Línea de tiempo. En la web actual este contenido SOLO existe dentro del PNG
 * `historia-desktop-1.png`: invisible para buscadores y lectores de pantalla.
 * Transcrito literalmente.
 */
export const timeline: TimelineEntry[] = [
  { year: '2000', text: 'Se construyen las instalaciones actuales como laboratorio farmacéutico' },
  { year: '2006', text: 'Fundación de Laboratorios Virens; adaptación de las instalaciones a complementos alimenticios' },
  { year: '2010', text: "Obtención de la ISO 22000 y GMP's en seguridad alimentaria" },
  { year: '2015', text: 'Certificación ECO y Veterinaria. Expansión internacional en más de 20 países' },
  { year: '2021', text: 'Ampliación de las instalaciones, aumento de capacidad productiva y almacén' },
  { year: '2023', text: 'Creación de Virens Tech, ampliación de I+D y nuevo laboratorio de calidad' },
  // 01/10/2026 (cliente): último hito «FDA-GMP Elevando la excelencia.» y su
  // año es siempre el año en curso (en 2027 pondrá 2027). `year` es solo el
  // valor de reserva al compilar; el navegador lo sustituye por el año real.
  { year: String(new Date().getFullYear()), currentYear: true, text: 'FDA-GMP Elevando la excelencia.' },
];
