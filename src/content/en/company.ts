import type * as es from '../company';
import type { TimelineEntry } from '@/lib/types';
import type { Loosen } from '@/lib/i18n';

/**
 * COMPANY — inglés (27/09/2026). Mismas claves que `../company.ts`.
 * [EN] literal de lvirens.com/en/company · [IMG] literal de historia-eng-*.png
 * · [TR] traducción de Claude, PENDIENTE DE REVISIÓN.
 */

export const companyHero = {
  prefix: 'Experts in', // [EN]
  title: 'Food supplements', // [EN]
  subtitle: 'Contract Manufacturing & Development', // [EN]
  body: 'At Laboratorios Virens we manufacture food supplements to the highest standards to improve physical, mental and social well-being.', // [TR]
  image: {
    src: '/img/labs-hero-poster.jpg',
    alt: 'Technician supervising a food supplement manufacturing line', // [TR]
  },
} as const satisfies Loosen<typeof es.companyHero>;

export const companyIntro = {
  title: 'Laboratorios Virens is a company with more than 20 years of experience in the manufacture of food supplements.', // [EN]
  body: [
    'At Virens we understand health as a state of physical, mental and social well-being and not only as the absence of sickness.', // [EN]
    'We are experts in producing high quality, value-added products that meet our customers’ requirements.', // [EN]
  ],
} as const satisfies Loosen<typeof es.companyIntro>;

export const pillars = [
  { icon: 'facilities', label: 'In-house manufacturing facilities' }, // [EN]
  { icon: 'team', label: 'Highly qualified and customer oriented team' }, // [EN]
  { icon: 'quality', label: 'High standards of quality, safety and control' }, // [EN]
  { icon: 'science', label: 'Scientific knowledge of nutrition and phytotherapy' }, // [EN]
  { icon: 'international', label: 'Company with international vocation' }, // [EN]
] as const satisfies Loosen<typeof es.pillars>;

export const companySections = {
  identity: { index: '01', title: 'Who are we?' }, // [EN]
  work: {
    index: '02',
    title: 'What do we do?', // [EN]
    intro: 'Laboratorios Virens offers integral solutions.', // [EN]
    body: 'From the development of the product to its delivery as a final product; through the formulation, production and packaging process.', // [EN]
  },
  research: { index: '03', title: 'R&D and quality control' }, // [TR]
  history: { index: '04', title: 'Our history' }, // [EN]
} as const satisfies Loosen<typeof es.companySections>;

export const valueChain = [
  { index: '01', icon: 'development', title: 'Development and formulation', body: 'Preparation of the formula according to established guidelines' }, // [EN]
  { index: '02', icon: 'samples', title: 'Preparation of samples', body: 'Carrying out tests to achieve the product desired' }, // [EN]
  { index: '03', icon: 'manufacturing', title: 'Manufacturing and packaging', body: 'Transformation of the initial idea into product' }, // [EN]
  { index: '04', icon: 'conditioning', title: 'Conditioning', body: 'Primary and secondary conditioning' }, // [EN]
  { index: '05', icon: 'control', title: 'Quality control', body: 'Definition and monitoring of protocols to ensure product quality and processes' }, // [EN]
] as const satisfies Loosen<typeof es.valueChain>;

export const companyResearch = {
  title: companySections.research.title,
  image: {
    src: '/img/tech-galenicos.jpg',
    alt: 'Dosage forms and raw materials prepared for development in the laboratory', // [TR]
  },
  // [EN] literal de /en/company, con los mismos dos acentos que en español.
  body: [
    { text: 'Our ', accent: false },
    { text: 'R&D team', accent: true },
    { text: ' has extensive experience in the development of new formulas and advises our customers on how to customise their own formulas. We also have a ', accent: false },
    { text: 'Quality Control Laboratory', accent: true },
    { text: ' equipped to guarantee compliance with the specifications and requirements requested. Also, we have the capacity to elaborate samples, carry out pilot tests and stability studies if the process so requires.', accent: false },
  ],
} as const satisfies Loosen<typeof es.companyResearch>;

/** Imágenes de fondo de «Qué hacemos» y de la historia (antes con alt fijo en español en el JSX). */
export const companyImages = {
  process: 'Laboratorios Virens production line', // [TR]
  history: 'Formulation work in the Laboratorios Virens laboratory', // [TR]
} as const satisfies Loosen<typeof es.companyImages>;

/** [IMG] Transcrito de historia-eng-mobile.png. */
export const timeline: TimelineEntry[] = [
  { year: '2000', text: 'The current facilities are built as a pharmaceutical laboratory' },
  { year: '2006', text: 'Virens Labs foundation; adaptation of the facilities to food supplements' },
  { year: '2010', text: "Achievement of ISO 22000 and GMP's in Food Safety" },
  { year: '2015', text: 'Eco and Veterinary Certification. International expansion in more than 20 countries' },
  { year: '2021', text: 'Enlargement of facilities, increase in production and warehouse capacity' },
  { year: '2023', text: 'Creation of Virens Tech, expansion of R&D and new quality laboratory' },
  // Igual que en español: la maqueta repite el hito de 2023 en 2026 (pendiente del cliente).
  { year: '2026', text: 'Creation of Virens Tech, expansion of R&D and new quality laboratory' },
];
