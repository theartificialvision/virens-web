/**
 * HOME — contenido extraído/derivado de lvirens.com (01/09/2026).
 *
 * OJO con este archivo: la home actual casi no tiene texto (es una pantalla
 * partida con un título y una línea por bloque, ver §2.1 del documento
 * maestro). Por eso, a diferencia de labs.ts/tech.ts/company.ts, aquí NO
 * todo puede ser literal — se marca explícitamente qué lo es y qué es
 * contenido nuevo sin equivalente en la web actual.
 */

// El cuerpo de cada tarjeta sigue siendo LITERAL (§2.1) de la pantalla
// partida original. El claim, no: por petición explícita del cliente
// (2026-09-02) pasa de "Contract manufacturing" / "Development" —el
// literal real— a "Contract Manufacturing" / "Contract Development", en
// paralelo, terminología estándar de CDMO. Excepción deliberada a la regla
// de copy literal (CLAUDE.md regla 3), no un descuido.
export const divisionCards = {
  labs: {
    claim: 'Contract Manufacturing',
    body: 'En formas sólidas y líquidos siguiendo los más estrictos estándares de calidad.',
  },
  tech: {
    claim: 'Contract Development',
    body: 'Nuevo concepto integrado de tecnología aplicada al desarrollo de producto.',
  },
} as const;

// NO LITERAL. La home actual no tiene hero, franja de datos ni ningún H2 de
// este tipo (§1.2 problema 01: "la home no comunica nada"). Este bloque es
// contenido nuevo pendiente de validar con el cliente — no hay una versión
// anterior de la que partir.
// Pivote 2026-09-02: el hero pasa a ser el split Labs/Tech (`DivisionSplit`,
// ver `app/page.tsx`); `eyebrow` se reutiliza ahí como rótulo sobre el
// titular compartido. `lead` deja de mostrarse en el hero (la composición
// centrada mitad/mitad no tiene sitio para un párrafo largo) — se queda
// definido aquí por si vuelve a hacer falta, no se ha borrado el dato.
export const homeHero = {
  eyebrow: 'Laboratorios Virens',
  lead: 'Desarrollamos, fabricamos y acondicionamos complementos alimenticios en instalaciones propias en Barcelona.',
} as const;

// NO LITERAL: fotografía candidata (carpeta de sesión Midjourney del
// cliente) a la espera de reportaje fotográfico propio.
// `cta`: solo el nombre de la división ("Labs" / "Tech", en mayúsculas vía
// CSS) — petición explícita del cliente (2026-09-02), sustituye al
// "Visitar Labs" / "Visitar Tech" literal que se reutilizaba antes.
export const divisionSplit = [
  {
    id: 'labs',
    href: '/virens-labs',
    name: 'Virens Labs',
    claim: divisionCards.labs.claim,
    body: divisionCards.labs.body,
    image: { src: '/img/labs-hero-mj.png', alt: '' },
    molecule: '/img/labs-molecule-3d-sprite.webp',
    moleculeFrames: 30,
    cta: 'Labs',
  },
  {
    id: 'tech',
    href: '/virens-tech',
    name: 'Virens Tech',
    claim: divisionCards.tech.claim,
    body: divisionCards.tech.body,
    image: { src: '/img/tech-hero-mj.png', alt: '' },
    molecule: '/img/tech-molecule-3d-sprite.webp',
    moleculeFrames: 30,
    cta: 'Tech',
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
