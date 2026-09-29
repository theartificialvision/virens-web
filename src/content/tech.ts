import type { ServiceBlock } from '@/lib/types';

/**
 * VIRENS TECH — contenido extraído de lvirens.com/virens-tech (01/09/2026).
 * La web actual nombra los seis servicios de dos formas distintas en la misma
 * página. Aquí se usa la denominación oficial (la de las pestañas).
 */

// 27/09/2026 (cliente): titular propio de Tech —antes repetía el de la Home y
// Compañía («Expertos en complementos alimenticios»)—. Redactado por Claude
// por encargo expreso del cliente (única excepción de copy). Sin subtítulo ni
// entradilla: decían lo mismo que la intro de debajo.
export const techHero = {
  eyebrow: 'VIRENS TECH',
  title: 'Desarrollo y formulación de complementos alimenticios',
  // 27/09/2026 (cliente): portada nueva, foto propia tintada en el azul de
  // marca (duotono #00285C) y servida en WebP. El isotipo 3D blanco sale del
  // hero: el cliente no lo quiere en ninguna parte.
  video: { poster: '/img/tech-hero-portada.webp' },
} as const;

// LITERAL de la intro de Tech (§2.4). 27/09/2026 (cliente): se queda solo la
// frase principal. Fuera el segundo párrafo (estabilidad y controles: ya son
// los servicios 04 y 05) y la lista de los seis servicios, que el slide
// presenta justo debajo.
export const techIntro = {
  title:
    'En Virens Tech ayudamos a nuestros clientes a tener los mejores productos, con exclusividad en los desarrollos, asegurando que sus fórmulas son industrialmente factibles.',
} as const;

/** Franja sobre #A2195B (texto facilitado por el cliente). 27/09/2026: sin
 *  rótulo y más baja; los cuatro pilares vuelven a petición del cliente. */
export const integratedSolutions = {
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
 * Los seis servicios. Desde el 27/09/2026 (cliente) se presentan en un slide
 * que avanza con el scroll (`ServicesSlider`), uno por diapositiva, en lugar
 * de seis bloques alternos. Los campos `imageSide`/`imageRatio`/`tone` solo
 * los usa la versión anterior (`EditorialSplit`).
 */
export const techServices: ServiceBlock[] = [
  {
    // LITERAL (§2.4).
    id: 'formulacion',
    index: '01',
    title: 'Formulación',
    body: [
      'Nuestro departamento de I+D desarrolla nuevas fórmulas para cooperar eficazmente con nuestros clientes y sus departamentos técnicos y de desarrollo.',
      // 27/09/2026 (cliente): fuera «Contamos con zonas de fabricación
      // separadas y diferenciadas…» — es de fabricación (Labs), no de
      // formulación.
    ],
    highlight: 'Zonas de fabricación segregadas',
    imageSide: 'left',
    imageRatio: 55,
    tone: 'white',
    image: { src: '/img/virens-tech/formulacion-microbiologia-virens-tech.webp', alt: 'Técnico pipeteando una muestra junto a placas de cultivo en una cabina de flujo laminar' },
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
    tone: 'gray',
    image: { src: '/img/virens-tech/llenado-jarabes-formas-galenicas-virens-tech.webp', alt: 'Llenado de jarabe en frascos de vidrio ámbar en una línea dosificadora' },
    link: { label: 'Ver formas galénicas disponibles', href: '/#formas-galenicas' },
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
    tone: 'gray',
    image: { src: '/img/virens-tech/comprimidos-estabilidad-producto-virens-tech.webp', alt: 'Comprimidos blancos en la tolva de una línea de producción' },
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
    image: { src: '/img/virens-tech/garantia-calidad-laboratorio-virens-tech.webp', alt: 'Dos técnicas con cofia revisando una muestra en un laboratorio de calidad' },
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
    tone: 'gray',
    image: { src: '/img/virens-tech/consultoria-regulatoria-complementos-alimenticios-virens-tech.webp', alt: 'Revisión de cápsulas sobre documentación técnica de producto' },
  },
];

/** Slide de servicios (27/09/2026). */
export const techServicesSlider = {
  label: 'Servicios de Virens Tech',
} as const;

// 27/09/2026 (cliente): fuera la franja de cifras de Tech. Las tres repetían
// datos de otras páginas (2023 y +20 años en la historia de Compañía; 10 áreas
// terapéuticas en la home).
