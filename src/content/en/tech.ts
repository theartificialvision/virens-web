import type * as es from '../tech';
import type { ServiceBlock } from '@/lib/types';
import type { Loosen } from '@/lib/i18n';

/**
 * VIRENS TECH — inglés (27/09/2026). Mismas claves que `../tech.ts`.
 * [EN] literal de lvirens.com/en/virens-tech · [TR] traducción de Claude,
 * PENDIENTE DE REVISIÓN.
 */

export const techHero = {
  eyebrow: 'VIRENS TECH',
  title: 'Food supplement development and formulation', // [TR] del titular propio de Tech
  video: { poster: '/img/tech-hero-portada.webp' },
} as const satisfies Loosen<typeof es.techHero>;

export const techIntro = {
  title:
    'At Virens Tech we help our clients to have the best products, with exclusive development, ensuring that their formulas are industrially feasible.', // [EN]
} as const satisfies Loosen<typeof es.techIntro>;

export const integratedSolutions = {
  title: 'From idea to final product', // [TR]
  body: "We support every stage of your product's development with a comprehensive, flexible and results-driven approach.", // [TR]
  pillars: [
    'Tailor-made development', // [TR]
    'Guaranteed high quality', // [TR]
    'Regulatory compliance', // [TR]
    'Constant innovation', // [TR]
  ],
} as const satisfies Loosen<typeof es.integratedSolutions>;

export const techServices: ServiceBlock[] = [
  {
    id: 'formulacion',
    index: '01',
    title: 'Formulation', // [EN]
    body: [
      'Our R&D department develops new formulations to cooperate effectively with our customers and their technical and development departments.', // [EN]
    ],
    imageSide: 'left',
    imageRatio: 55,
    tone: 'white',
    image: { src: '/img/tech-formulacion.jpg', alt: 'Laboratory technician pipetting a sample over glassware' }, // [TR]
  },
  {
    id: 'rd-galenicos',
    index: '02',
    title: 'Galenic R+D', // [EN]
    body: [
      "Considering current legislation of use and dosage, we provide the most suitable dosage forms for our customers' projects.", // [EN]
    ],
    imageSide: 'right',
    imageRatio: 55,
    tone: 'gray',
    image: { src: '/img/tech-galenicos.jpg', alt: 'Capsules, tablets and powders on a laboratory tray' }, // [TR]
    link: { label: 'See available galenic forms', href: '/en#formas-galenicas' }, // [TR]
  },
  {
    id: 'centro-de-sabores',
    index: '03',
    title: 'Taste centre', // [EN]
    body: [
      'A space where products are tested for taste and flavour.', // [EN]
      'This way we make sure that the desired product is commercially viable.', // [EN]
    ],
    imageSide: 'left',
    imageRatio: 60,
    tone: 'white',
    image: { src: '/img/tech-sabores.jpg', alt: 'Extracts, droppers and botanical ingredients in a sensory test' }, // [TR]
  },
  {
    id: 'estabilidad',
    index: '04',
    title: 'Product stability', // [EN]
    body: [
      'We have a stability chamber that allows us to obtain information on the stability of the product.', // [EN]
      'This gives us prior knowledge of the shelf life and period of use under certain packaging and storage conditions.', // [EN]
    ],
    imageSide: 'right',
    imageRatio: 55,
    tone: 'gray',
    image: { src: '/img/tech-estabilidad.jpg', alt: 'Inside a climate chamber with trays of labelled samples' }, // [TR]
  },
  {
    id: 'garantia-de-calidad',
    index: '05',
    title: 'Quality assurance', // [EN]
    body: [
      // [EN] segunda frase del literal inglés, que es la que corresponde al texto español.
      'We carry out microbiological and physicochemical controls during the manufacturing process as well as on the final product.',
    ],
    imageSide: 'left',
    imageRatio: 55,
    tone: 'white',
    image: { src: '/img/tech-calidad.jpg', alt: 'Microbiological analysis with culture plates and laboratory material' }, // [TR]
  },
  {
    id: 'regulatory-consulting',
    index: '06',
    title: 'Regulatory consulting', // [EN]
    body: [
      'Our Customer Service department will provide you with the necessary technical and commercial support with the drafting of technical product dossiers and commercial documentation.', // [EN]
      'We also have a regulatory service for product registrations and notifications.', // [EN]
    ],
    imageSide: 'right',
    imageRatio: 55,
    tone: 'gray',
    image: { src: '/img/tech-regulatory.jpg', alt: 'Technical documentation and product dossier on a desk' }, // [TR]
  },
];

export const techServicesSlider = {
  label: 'Virens Tech services', // [TR]
} as const satisfies Loosen<typeof es.techServicesSlider>;
