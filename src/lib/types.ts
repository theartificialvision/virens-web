export type Division = 'labs' | 'tech';

/** Fondo permitido para un bloque. El ritmo de la página se construye alternándolos.
 * `ink`/`surface` son el pivote oscuro 2026-09-01 (Home/Labs/Tech); `white`/`gray`
 * se mantienen intactos para Compañía/Contacto/Noticias. */
export type SectionTone = 'white' | 'gray' | 'blue' | 'labs' | 'tech' | 'ink' | 'surface';

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
