import type { CapacityItem, Certification, ServiceBlock } from '@/lib/types';

/**
 * VIRENS LABS — contenido extraído de lvirens.com/virens-labs (01/09/2026).
 * `literal` = texto exacto de la web. `rewritten` = reescritura aprobada del literal.
 */

// Título y subtítulo: traducción del claim real "Experts in food supplements"
// / "Contract manufacturing" — la web mezcla inglés en la versión ES, y el
// documento (§8.1) acuerda traducir solo por eso, sin cambiar el mensaje.
export const labsHero = {
  eyebrow: 'VIRENS LABS',
  title: 'Expertos en complementos alimenticios',
  subtitle: 'Fabricación por contrato',
  // LITERAL de la intro de Labs (§2.3).
  lead: 'En Virens Labs sabemos de la importancia de nuestros clientes con sus necesidades de calidad, servicio, competitividad y fidelidad de su fabricante. Virens Labs le ofrece todo ello para que nuestros clientes se preocupen únicamente de vender sus productos.',
  video: { poster: '/img/labs-hero-poster.jpg' },
} as const;

// LITERAL (§2.3): "CTA final: banner Visitar Tech -> /virens-tech".
export const crossLink = { label: 'Visitar Tech', href: '/virens-tech' } as const;

// LITERAL de la web: "– Servicio integral de producción / – Acondicionado
// primario & secundario / – Private label". El H2 "Usted vende. Nosotros
// fabricamos." del documento (§8.3) es una reescritura sin equivalente
// literal: se retira, la lista de puntos ya literal es el contenido.
export const labsIntro = {
  eyebrow: 'CONTRACT MANUFACTURING',
  points: [
    { index: '01', label: 'Servicio integral de producción' },
    { index: '02', label: 'Acondicionado primario y secundario' },
    { index: '03', label: 'Private label' },
  ],
} as const;

export const labsServices: ServiceBlock[] = [
  {
    // LITERAL (§2.3).
    id: 'private-label',
    index: '01',
    title: 'Private Label',
    body: [
      'En Virens contamos con una amplia experiencia en el desarrollo de fórmulas personalizadas y únicas.',
      'Nos adaptamos a los requerimientos técnicos y comerciales de nuestros clientes. Basándonos en la idea inicial y junto con nuestro equipo de I+D desarrollamos su fórmula garantizando la máxima seguridad y trazabilidad.',
    ],
    imageSide: 'left',
    imageRatio: 55,
    tone: 'white',
    image: { src: '/img/labs-private-label.jpg', alt: 'Envase neutro de complemento alimenticio sin marca sobre superficie limpia' },
    link: { label: 'Hablar de un proyecto de marca propia', href: '/contacto' },
  },
  {
    // LITERAL (§2.3).
    id: 'full-service',
    index: '02',
    title: 'Full Service',
    body: [
      'Virens ofrece un servicio integral. Desde el desarrollo del producto a su entrega como producto final para su puesta en el mercado.',
      'Interviniendo en fabricaciones parciales, entregando fabricaciones a granel, u ofreciendo servicio de acondicionamiento parcial o completo.',
    ],
    imageSide: 'right',
    imageRatio: 55,
    tone: 'surface',
    image: { src: '/img/labs-full-service.jpg', alt: 'Línea de acondicionamiento en funcionamiento en la planta de Laboratorios Virens' },
  },
];

// LITERAL (§2.3). El listado de formatos citado aquí (blíster, bote, stick,
// viales, drops) es el de la propia web: no coincide exactamente con el
// listado de 10 ítems de más abajo — es una inconsistencia real de la fuente,
// no se corrige por no ser un dato inventado.
export const galenicFormsIntro =
  'Fabricamos complementos alimenticios en diferentes formas galénicas: sólidas (comprimidos, cápsulas) y líquidos (jarabes) con distintos formatos: blíster, bote, stick, viales, drops.';

/**
 * Formas galénicas. La web actual lista 10 ítems mezclando formas galénicas
 * con operaciones de acondicionamiento. Aquí van separadas.
 */
export const galenicForms = [
  { id: 'capsulas', label: 'Cápsulas' },
  { id: 'comprimidos', label: 'Comprimidos' },
  { id: 'jarabes', label: 'Jarabes' },
  { id: 'viales', label: 'Viales' },
  { id: 'goteros', label: 'Goteros' },
  { id: 'sticks', label: 'Sticks' },
  { id: 'sobres', label: 'Sobres' },
  { id: 'blisters', label: 'Blísters' },
] as const;

/** Reubicado desde "formas galénicas": son acondicionamiento, no forma galénica. */
export const packagingOperations = [
  'Estuchado automático',
  'Envasado en frasco',
  'Acondicionado primario y secundario',
] as const;

// NO LITERAL: título de sección corto, sin equivalente literal directo
// (el literal es "Contamos con más de 2000 m de instalaciones...", falta el
// "²" en la web actual — error tipográfico reconocido, §1.2 problema 07).
// Pendiente de confirmar con el cliente si se prefiere este título o
// prescindir de él y dejar solo el eyebrow + los datos.
export const capacityIntro = {
  eyebrow: 'CAPACIDAD PRODUCTIVA',
  title: 'Escala industrial propia',
} as const;

// Dato LITERAL (§06 bloque 07): combina la ciudad real de contacto con el
// año de la timeline de Compañía (2000, "instalaciones actuales"). No es
// una frase de marketing nueva, son dos datos verificados combinados.
export const facilityCaption = 'Sant Andreu de la Barca, Barcelona. Instalaciones propias desde 2000.';

export const facilityStats = [
  { value: '+2.000', unit: 'm²', label: 'Instalaciones propias' },
  { value: '9', unit: '', label: 'Formatos de producción' },
  { value: '2', unit: '', label: 'Niveles de acondicionamiento' },
] as const;

/**
 * NO VERIFICADO — la web no indica qué significa "M" ni el periodo.
 * Las cifras son literales del PNG `img-es.png`. No publicar "unidades/año"
 * hasta que el cliente lo confirme (§3.2 del documento maestro).
 */
export const capacityUnitNote =
  'Capacidades orientativas. Unidad y periodo pendientes de confirmación.';

export const capacities: CapacityItem[] = [
  { id: 'capsulas', label: 'Cápsulas', units: '200M', icon: 'capsule' },
  { id: 'comprimidos', label: 'Comprimidos', units: '150M', icon: 'tablet' },
  { id: 'viales', label: 'Viales', units: '20M', range: '10 ml a 25 ml', icon: 'vial' },
  { id: 'blisters', label: 'Blísters', units: '15M', range: 'PVDC-PVC/Alu + Alu/Alu', icon: 'blister' },
  { id: 'sticks', label: 'Sticks', units: '10M', range: '5 g a 20 g', icon: 'stick' },
  { id: 'sobres', label: 'Sobres', units: '10M', range: '5 g a 10 g', icon: 'sachet' },
  { id: 'frascos', label: 'Llenado de frascos', units: '10M', range: '50 ml a 500 ml', icon: 'bottle' },
  { id: 'goteros', label: 'Goteros', units: '5M', range: '30 ml a 60 ml', icon: 'dropper' },
  { id: 'jarabes', label: 'Jarabes', units: '5M', range: '100 ml a 1000 ml', icon: 'syrup' },
];

// Body LITERAL (§2.3); el título de sección se mantiene, no reformula el mensaje.
export const quality = {
  eyebrow: 'GARANTÍA DE CALIDAD',
  title: 'Control propio en cada lote',
  body: [
    'Nuestro Laboratorio de Control de Calidad está equipado tecnológicamente para garantizar el cumplimiento de las más exigentes especificaciones y estándares de calidad de los productos.',
    'Siempre empleamos las exigencias más estrictas para la fabricación de nuestros productos (GMP).',
  ],
} as const;

/**
 * Certificaciones transcritas del PNG `calidad-virens-labs.png`.
 * Ninguna tiene número, alcance ni vigencia publicados en la web.
 * "FDA APPROVED" está marcado como no verificado: la FDA no aprueba
 * complementos alimenticios. Confirmar la denominación real del certificado.
 */
export const certifications: Certification[] = [
  { name: 'ISO 22000', issuer: 'SGS', scope: 'Seguridad alimentaria', status: 'image-only' },
  { name: 'GMP', issuer: 'SGS', status: 'image-only' },
  { name: 'HACCP', issuer: 'SGS', status: 'image-only' },
  { name: 'Certificación ECO', scope: 'Producto ecológico (UE)', status: 'image-only' },
  { name: 'Producto veterinario', status: 'image-only' },
  { name: 'European Manufactured', status: 'image-only' },
  { name: 'FDA Approved', status: 'unverified', scope: 'Revisar denominación real del certificado' },
];

// Lead LITERAL (§2.3). Título de sección no literal (sin equivalente en la
// web actual), pendiente de confirmar con el cliente igual que el resto de
// títulos cortos de sección de este documento.
export const therapeuticAreasIntro = {
  eyebrow: 'Áreas terapéuticas',
  title: 'Diez categorías de producto',
  lead: 'Nuestro expertise abarca las siguientes áreas:',
} as const;

/** Denominaciones verificadas contra la web. No modificar sin aprobación del cliente. */
export const therapeuticAreas = [
  'Control peso',
  'Sist. Nervioso',
  'Articulaciones',
  'Digestivo',
  'Infantil',
  'Cardiovascular',
  'Inmunitario',
  'Salud Mujer',
  'Mascotas',
  'Sport nutrition',
] as const;
