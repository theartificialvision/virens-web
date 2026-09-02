/**
 * HOME — contenido extraído/derivado de lvirens.com (01/09/2026).
 *
 * OJO con este archivo: la home actual casi no tiene texto (es una pantalla
 * partida con un título y una línea por bloque, ver §2.1 del documento
 * maestro). Por eso, a diferencia de labs.ts/tech.ts/company.ts, aquí NO
 * todo puede ser literal — se marca explícitamente qué lo es y qué es
 * contenido nuevo sin equivalente en la web actual.
 */

// LITERAL (§2.1): titular y texto de cada bloque de la pantalla partida
// original. El texto de Tech corrige el typo "desarollo" -> "desarrollo"
// (reconocido como error en el propio documento, §1.2 problema 07).
export const divisionCards = {
  labs: {
    claim: 'Contract manufacturing',
    body: 'En formas sólidas y líquidos siguiendo los más estrictos estándares de calidad.',
  },
  tech: {
    claim: 'Development',
    body: 'Nuevo concepto integrado de tecnología aplicada al desarrollo de producto.',
  },
} as const;

// NO LITERAL. La home actual no tiene hero, franja de datos ni ningún H2 de
// este tipo (§1.2 problema 01: "la home no comunica nada"). Este bloque es
// contenido nuevo pendiente de validar con el cliente — no hay una versión
// anterior de la que partir.
export const homeHero = {
  eyebrow: 'Laboratorios Virens',
  lead: 'Desarrollamos, fabricamos y acondicionamos complementos alimenticios en instalaciones propias en Barcelona.',
} as const;

export const divisionsIntro = {
  eyebrow: 'Arquitectura de marca',
  title: 'Dos divisiones, un mismo proceso',
} as const;

// NO LITERAL: imágenes de sustitución a la espera de reportaje fotográfico
// propio (mismo criterio que labs-hero-poster.jpg / tech-hero-poster.jpg).
export const divisionSplit = [
  {
    id: 'labs',
    href: '/virens-labs',
    name: 'Virens Labs',
    claim: divisionCards.labs.claim,
    body: divisionCards.labs.body,
    image: { src: '/img/labs-hero-poster.jpg', alt: '' },
    molecule: '/img/labs-molecule.png',
  },
  {
    id: 'tech',
    href: '/virens-tech',
    name: 'Virens Tech',
    claim: divisionCards.tech.claim,
    body: divisionCards.tech.body,
    image: { src: '/img/tech-hero-poster.jpg', alt: '' },
    molecule: '/img/tech-molecule.png',
  },
] as const;

export const processIntro = {
  eyebrow: 'Proceso',
  title: 'Cómo trabajamos',
} as const;

export const homeStats = [
  { value: 'Desde 2000', label: 'Instalaciones propias' },
  { value: '+2.000 m²', label: 'Superficie de producción' },
  { value: '+20 países', label: 'Exportación (dato de 2015)' },
  { value: '9 formatos', label: 'Formas y presentaciones' },
] as const;
