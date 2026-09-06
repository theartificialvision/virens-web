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
//
// SIN USO desde el 06/09/2026: el hero de presentación no lleva rótulo ni
// párrafo, así que `eyebrow` corrió la misma suerte que `lead`. Se conserva
// como copy, no como código vivo — si a los tres meses sigue sin usarse, fuera.
export const homeHero = {
  eyebrow: 'Laboratorios Virens',
  lead: 'Desarrollamos, fabricamos y acondicionamos complementos alimenticios en instalaciones propias en Barcelona.',
} as const;

// NO LITERAL: fotografía candidata a la espera de reportaje propio.
// 06/09/2026 (2): los tres fondos pasan a las copias en BLANCO Y NEGRO que
// aportó el cliente (1920×1080). 06/09/2026 (5): el CSS ya no tiñe la escena
// —solo un velo neutro para legibilidad (ver `.home-shade` en globals.css)—
// así que la foto se lee tal cual entra. Sustituir el archivo no exige tocar
// código.
// `cta`: solo el nombre de la división ("Labs" / "Tech", en mayúsculas vía
// CSS) — petición explícita del cliente (2026-09-02), sustituye al
// "Visitar Labs" / "Visitar Tech" literal que se reutilizaba antes.
// `logoKey` + `molecule` (2026-09-04): el isotipo vuelve a moverse, ahora con
// el modelo three.js con giro que aportó el cliente (`lib/logoSpin.ts`). El PNG
// se queda como póster mientras carga el WebGL y como alternativa sin él.
// `body` deja de pasarse al hero: la línea corta de cada mitad la sustituye
// el bloque desplegado (`divisionInfo`), que dice lo mismo con más detalle.
export const divisionSplit = [
  {
    id: 'labs',
    href: '/virens-labs',
    name: 'Virens Labs',
    claim: divisionCards.labs.claim,
    image: { src: '/img/home-scene-labs.jpg', alt: '' },
    logoKey: 'B',
    molecule: '/img/labs-molecule.png',
    cta: 'labs',
  },
  {
    id: 'tech',
    href: '/virens-tech',
    name: 'Virens Tech',
    claim: divisionCards.tech.claim,
    image: { src: '/img/home-scene-tech.jpg', alt: '' },
    logoKey: 'A',
    molecule: '/img/tech-molecule.png',
    cta: 'tech',
  },
] as const;

// REWRITTEN. Información que la web original publica en la portada de cada
// división y que la home de acceso perdía por completo (§1.2 problema 01):
// vuelve al hero, desplegada bajo los botones al activar LABS o TECH.
// Textos facilitados por el cliente (2026-09-03): son una reescritura suya
// del literal —`labsHero.lead` en Labs, `techIntro.title` + `techIntro.body`
// en Tech—, no contenido nuevo. Los servicios son los de la web: los tres
// literales de `labsIntro.points` y, en Tech, la denominación larga que la
// página usa en el cuerpo (la corta, la de las pestañas, vive en
// `techIntro.points` y sigue rigiendo dentro de /virens-tech).
//
// SIN USO desde el 06/09/2026: el hero de presentación no despliega servicios
// —decisión del cliente, composición limpia—, así que ya no lo lee nadie. NO
// se borra: es copy que el cliente escribió a mano y no existe en ningún otro
// sitio del repo con esta redacción. Si vuelve un bloque de servicios en la
// home, sale de aquí.
export const divisionInfo = {
  labs: {
    lead: 'En Virens Labs ofrecemos la calidad, el servicio, la competitividad y la fidelidad que nuestros clientes necesitan de su fabricante. Nos ocupamos de la producción para que puedan centrarse en vender sus productos.',
    servicesLabel: 'Servicios',
    services: [
      'Servicio integral de producción',
      'Acondicionado primario y secundario',
      'Private label',
    ],
  },
  tech: {
    lead: 'En Virens Tech ayudamos a nuestros clientes a desarrollar los mejores productos, con exclusividad y fórmulas industrialmente viables. Realizamos ensayos en nuestras cámaras de estabilidad para responder a los requisitos de calidad interna y exportación, y ofrecemos controles y análisis avanzados.',
    servicesLabel: 'Servicios',
    services: [
      'Project management de formulaciones',
      'R+D y desarrollos galénicos',
      'Centro de sabores',
      'Estabilidad de productos',
      'Laboratorio de control de calidad',
      'Regulatory consulting',
    ],
  },
} as const;

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

/** Presentación del 06/09: copy y jerarquía de las tres referencias del cliente.
 * Los fondos son imágenes de presentación, no un reportaje de las instalaciones.
 */
export const homePresentation = {
  title: 'Experts in food supplements',
  subtitle: 'Contract Manufacturing & Development',
  brand: 'VIRENS',
  resetLabel: 'Back to both divisions',
  previewLabel: 'Explore',
  enterLabel: 'Enter',
  image: { src: '/img/home-scene-blue.jpg', alt: '' },
} as const;
