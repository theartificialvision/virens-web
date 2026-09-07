export type Division = 'labs' | 'tech';

/** Fondo permitido para un bloque. El ritmo de la página se construye alternándolos.
 * `ink`/`surface` son el pivote oscuro 2026-09-01 (Home/Labs/Tech); `white`/`gray`
 * se mantienen intactos para Compañía/Contacto/Noticias. */
export type SectionTone =
  | 'white'
  | 'gray'
  | 'soft'      // azul muy claro (--color-blue-soft): el tercer fondo del sistema claro
  | 'blue'
  | 'labs'
  | 'tech'
  | 'ink'
  | 'surface';

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

/** Un dato de contacto de la columna izquierda: dirección, teléfono o GPS.
 *  `href` solo lo llevan los que son accionables (el teléfono). */
export interface ContactDetail {
  id: string;
  icon: string;               // clave de `ContactIcon`
  label: string;
  lines: readonly string[];
  href?: string;
}

/** Departamento al que se dirige el formulario de contacto. */
export interface ContactDepartment {
  id: string;
  label: string;
  icon: string;               // clave de `ContactIcon`
}

/** Campo del formulario de contacto. `span` es el reparto en la rejilla de dos
 *  columnas del panel: `half` ocupa una, `full` las dos. */
export interface ContactField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  autoComplete?: string;
  required: boolean;
  span: 'half' | 'full';
}
