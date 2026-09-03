import type { ServiceBlock } from '@/lib/types';

/**
 * VIRENS TECH — contenido extraído de lvirens.com/virens-tech (01/09/2026).
 * La web actual nombra los seis servicios de dos formas distintas en la misma
 * página. Aquí se usa la denominación oficial (la de las pestañas).
 */

// Título: traducción del claim real "Experts in food supplements" (§8.1,
// mismo criterio que Labs). Subtítulo: traducción literal de "Development".
export const techHero = {
  eyebrow: 'VIRENS TECH',
  title: 'Expertos en complementos alimenticios',
  subtitle: 'Desarrollo',
  lead: 'Desarrollamos fórmulas propias, verificamos su factibilidad industrial y las validamos antes de fabricar.',
  video: { poster: '/img/tech-hero-poster.jpg' },
} as const;

// LITERAL (§2.4): "CTA final: banner Visitar Labs -> /virens-labs".
export const crossLink = { label: 'Visitar Labs', href: '/virens-labs' } as const;

// LITERAL de la intro de Tech (§2.4), partido en título + cuerpo.
export const techIntro = {
  eyebrow: 'DEVELOPMENT',
  title:
    'En Virens Tech ayudamos a nuestros clientes a tener los mejores productos, con exclusividad en los desarrollos, asegurando que sus fórmulas son industrialmente factibles.',
  body: 'Les ayudamos también en testar los productos en nuestras cámaras de estabilidad para requerimientos de calidad interna y export, así como les ofrecemos los controles y análisis más avanzados.',
  points: [
    { index: '01', label: 'Formulación' },
    { index: '02', label: 'R+D galénicos' },
    { index: '03', label: 'Centro de sabores' },
    { index: '04', label: 'Estabilidad de productos' },
    { index: '05', label: 'Garantía de calidad' },
    { index: '06', label: 'Regulatory consulting' },
  ],
} as const;

/** Bloque tipográfico sobre #A2195B. Texto facilitado por el cliente. */
export const integratedSolutions = {
  eyebrow: 'SOLUCIONES INTEGRADAS',
  title: 'De la idea al producto final',
  body: 'Acompañamos cada etapa del desarrollo de tu producto con un enfoque integral, flexible y orientado a resultados.',
  pillars: [
    'Desarrollo a medida',
    'Alta calidad garantizada',
    'Cumplimiento normativo',
    'Innovación constante',
  ],
} as const;

/**
 * Seis bloques independientes, alternando imagen/texto.
 * No son tarjetas: cada uno ocupa una sección completa con su propio aire.
 */
export const techServices: ServiceBlock[] = [
  {
    // LITERAL (§2.4).
    id: 'formulacion',
    index: '01',
    title: 'Formulación',
    body: [
      'Nuestro departamento de I+D desarrolla nuevas fórmulas para cooperar eficazmente con nuestros clientes y sus departamentos técnicos y de desarrollo.',
      'Contamos con zonas de fabricación separadas y diferenciadas para asegurar el aislamiento de los distintos productos y evitar el contacto de unos procesos con otros.',
    ],
    highlight: 'Zonas de fabricación segregadas',
    imageSide: 'left',
    imageRatio: 55,
    tone: 'white',
    image: { src: '/img/tech-formulacion.jpg', alt: 'Técnico de laboratorio pipeteando una muestra sobre material de vidrio' },
  },
  {
    // LITERAL (§2.4).
    id: 'rd-galenicos',
    index: '02',
    title: 'R+D galénicos',
    body: [
      'Teniendo en cuenta la legislación vigente, el uso y la dosificación proporcionamos las formas galénicas más adecuadas para los proyectos de nuestros clientes.',
    ],
    imageSide: 'right',
    imageRatio: 55,
    tone: 'surface',
    image: { src: '/img/tech-galenicos.jpg', alt: 'Cápsulas, comprimidos y polvos en bandeja de laboratorio' },
    link: { label: 'Ver formas galénicas disponibles', href: '/virens-labs#formas-galenicas' },
  },
  {
    // LITERAL (§2.4).
    id: 'centro-de-sabores',
    index: '03',
    title: 'Centro de sabores',
    body: [
      'Espacio donde se hacen pruebas de gusto y aromas a los productos.',
      'De este modo nos aseguramos de que el producto ideado sea viable comercialmente.',
    ],
    highlight: 'Validación organoléptica antes de escalar',
    imageSide: 'left',
    imageRatio: 60,
    tone: 'white',
    image: { src: '/img/tech-sabores.jpg', alt: 'Extractos, goteros y ingredientes botánicos en una prueba organoléptica' },
  },
  {
    // LITERAL (§2.4).
    id: 'estabilidad',
    index: '04',
    title: 'Estabilidad de productos',
    body: [
      'Disponemos de cámara de estabilidad que nos permite obtener información sobre la estabilidad del producto.',
      'De esta forma disponemos de un conocimiento previo del tiempo de conservación y periodo de utilización en determinadas condiciones de envase y almacenamiento.',
    ],
    highlight: 'Cámara de estabilidad propia',
    imageSide: 'right',
    imageRatio: 55,
    tone: 'surface',
    image: { src: '/img/tech-estabilidad.jpg', alt: 'Interior de una cámara climática con bandejas de muestras etiquetadas' },
  },
  {
    // LITERAL (§2.4).
    id: 'garantia-de-calidad',
    index: '05',
    title: 'Garantía de calidad',
    body: [
      'En nuestros laboratorios realizamos controles microbiológicos y físico-químicos durante el proceso de fabricación así como en el producto acabado.',
    ],
    imageSide: 'left',
    imageRatio: 55,
    tone: 'white',
    image: { src: '/img/tech-calidad.jpg', alt: 'Análisis microbiológico con placas de cultivo y material de laboratorio' },
  },
  {
    // LITERAL (§2.4).
    id: 'regulatory-consulting',
    index: '06',
    title: 'Regulatory consulting',
    body: [
      'Nuestro departamento de Atención al Cliente le brindará todo el apoyo técnico comercial necesario con la elaboración de dosieres técnicos de productos y documentación comercial.',
      'También contamos con un servicio de regulatorio para registros y notificaciones de productos.',
    ],
    imageSide: 'right',
    imageRatio: 55,
    tone: 'surface',
    image: { src: '/img/tech-regulatory.jpg', alt: 'Documentación técnica y dosier de producto sobre una mesa de trabajo' },
  },
];

export const techStats = [
  { value: '2023', label: 'Creación de Virens Tech y nuevo laboratorio de calidad' },
  { value: '+20', label: 'Años de experiencia en formulación' },
  { value: '10', label: 'Áreas terapéuticas' },
] as const;
