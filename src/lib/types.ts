export type Division = 'labs' | 'tech';

/** Fondo permitido para un bloque (pivote claro 2026-09-05). `white` es el
 * defecto y `surface` el descanso; `blue`/`labs`/`tech` son golpes puntuales. */
export type SectionTone = 'white' | 'surface' | 'blue' | 'labs' | 'tech';

/** Origen del dato. Nada se publica sin saber de dónde sale. */
export type SourceStatus =
  | 'literal'        // texto exacto de lvirens.com
  | 'rewritten'      // reescritura de un texto existente, sin cambiar el significado
  | 'image-only'     // dato que hoy solo existe dentro de una imagen
  | 'unverified';    // NO VERIFICADO: requiere confirmación del cliente

export interface ServiceBlock {
  id: string;
  index: string;            // '01' … '06'
  title: string;
  body: string[];
  highlight?: string;
  imageSide: 'left' | 'right';
  imageRatio: 45 | 50 | 55 | 60;   // % del ancho ocupado por la imagen
  tone: SectionTone;
  image: { src: string; alt: string };
  link?: { label: string; href: string };
}

export interface CapacityItem {
  id: string;
  label: string;
  units: string;            // '200M' — unidad pendiente de confirmar
  range?: string;
  icon: string;             // clave de la silueta SVG
}

export interface Certification {
  name: string;
  issuer?: string;
  scope?: string;
  status: SourceStatus;
}

export interface TimelineEntry {
  year: string;
  text: string;
}

/** Modelo del isotipo 3D: A es azul->magenta (Tech), B azul->turquesa (Labs). */
export type LogoKey = 'A' | 'B';

/** Una mitad del hero de Home (`DivisionSplit`). */
export interface DivisionHalfData {
  id: Division;
  href: string;
  name: string;
  claim: string;
  image: { src: string; alt: string };
  /** Modelo 3D del isotipo que se renderiza en vivo. */
  logoKey: LogoKey;
  /** PNG original del cliente: póster del 3D y alternativa sin WebGL. */
  molecule: string;
  cta: string;
}

/** Lo que se despliega bajo los botones al activar una división. */
export interface DivisionInfoData {
  lead: string;
  servicesLabel: string;
  services: readonly string[];
}
