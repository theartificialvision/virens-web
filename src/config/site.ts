/**
 * Datos de empresa. Todos verificados en lvirens.com (01/09/2026).
 * `pendingClientConfirmation` recoge lo que NO puede publicarse sin confirmar.
 */
export const site = {
  name: 'Laboratorios Virens',
  legalName: 'LABORATORIOS VIRENS, S.L.',
  taxId: 'B-64294473',
  url: 'https://lvirens.com',
  defaultLocale: 'es',
  locales: ['es', 'en'] as const,

  claim: 'Expertos en complementos alimenticios',
  subclaim: 'Fabricación por contrato y desarrollo',

  // NO LITERAL: microcopy del CTA global (§08.6), sin equivalente en la web
  // actual (no existía un bloque de CTA de contacto destacado, solo el enlace
  // "Contacto" del menú). Pendiente de confirmar con el cliente.
  ctaContact: { title: '¿Hablamos de tu proyecto?', button: 'Contactar ahora' },

  contact: {
    // OJO: la web actual publica dos direcciones distintas.
    //  /contacto/     -> "Indústria 48B"
    //  /aviso-legal/  -> "Calle Industria 48-A"
    // Unificar con el cliente antes de publicar (§3.2).
    street: 'Indústria 48 · Polígono Industrial Nord-Est',
    postalCode: '08740',
    city: 'Sant Andreu de la Barca',
    region: 'Barcelona',
    country: 'España',
    phone: '+34936828972',
    phoneDisplay: '(+34) 936 828 972',
    email: 'csp@lvirens.com',
    geo: { lat: 41.4578, lng: 1.9692 }, // 41º27'28'' N 1º58'9'' E
    distanceNote: 'A 20 km de Barcelona',
  },

  pendingClientConfirmation: [
    'Unidad y periodo de las capacidades productivas ("M" = millones/año)',
    'Año de referencia de la trayectoria (2000 instalaciones / 2006 fundación)',
    'Denominación, entidad y alcance exactos de cada certificado',
    'Revisión del claim "FDA APPROVED"',
    'Número de países de exportación actualizado (el dato "+20" es de 2015)',
    'Dirección postal definitiva (48-A / 48B)',
  ],
} as const;

export type Locale = (typeof site.locales)[number];
