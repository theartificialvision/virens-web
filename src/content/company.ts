import type { TimelineEntry } from '@/lib/types';

/** COMPAÑÍA — extraído de lvirens.com/compania (01/09/2026). */

// LITERAL de "Quiénes somos" (§2.2). El H1 y la entradilla propuestos en el
// documento (§08.5) son una reescritura nueva sin equivalente en la web
// actual: se sustituyen por el texto real, partido en título + cuerpo.
export const companyIntro = {
  title: 'Laboratorios Virens es una empresa con más de 20 años de experiencia en la fabricación de complementos alimenticios.',
  lead: 'En Virens entendemos la salud como un estado de bienestar físico, mental y social y no solo como la ausencia de enfermedades. Somos expertos en elaborar productos de alta calidad y valor añadido satisfaciendo así las exigencias de nuestros clientes.',
} as const;

/** Literal de la web. */
export const pillars = [
  'Fabricación en instalaciones propias',
  'Equipo altamente cualificado y orientado al cliente',
  'Altos estándares de calidad, seguridad y control',
  'Conocimiento científico de nutrición y fitoterapia',
  'Empresa con vocación internacional',
] as const;

/** Literal de la web. Se reutiliza también en la home ("Cómo trabajamos"). */
export const valueChain = [
  {
    index: '01',
    title: 'Desarrollo y formulación',
    items: [
      'Elaboración de la fórmula siguiendo las directrices establecidas',
      'Elaboración de muestras',
      'Realización de tests para conseguir el producto deseado por el cliente',
    ],
  },
  {
    index: '02',
    title: 'Fabricación y envasado',
    items: ['Transformación de la idea inicial en producto'],
  },
  {
    index: '03',
    title: 'Acondicionado',
    items: ['Acondicionado primario y secundario'],
  },
  {
    index: '04',
    title: 'Control de calidad',
    items: ['Definición y supervisión de protocolos para asegurar la calidad del producto y procesos'],
  },
] as const;

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
];
