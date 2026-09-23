import { cn } from '@/lib/utils';

/**
 * Glifos definitivos de formas galénicas y envases (23/09/2026): vectorización
 * de los PNG del cliente (`WEB VIRENS/PNG a VEctor`), con el grosor de trazo
 * igualado en todo el juego (≈2,1 % de la caja). Los originales iban del 1 % al
 * 3,3 %: a 40–56 px unos salían como un pelo y otros en negrita.
 *
 * Los SVG viven en `public/img/galenicas/` y se pintan como máscara sobre
 * `bg-current`, en lugar de ir en línea: juntos pesan ~64 KB de trazados y en
 * línea viajarían dos veces (HTML + payload RSC) en cada página que los use
 * (regla 9, rendimiento). Así se cachean una vez y siguen heredando el color
 * del texto, igual que el `currentColor` de los iconos de trazo anteriores.
 */
export const GALENIC_GLYPHS = [
  'capsule',
  'tablet',
  'autocapsule',
  'vial',
  'blister',
  'dropper',
  'jarfill',
  'stick',
  'sachet',
  'syrup',
] as const;

export type GalenicGlyphName = (typeof GALENIC_GLYPHS)[number];

/** Claves heredadas de V1 que apuntan al mismo dibujo. */
const ALIAS: Record<string, GalenicGlyphName> = {
  bottle: 'jarfill',
};

export function resolveGalenicGlyph(name: string): GalenicGlyphName | null {
  if ((GALENIC_GLYPHS as readonly string[]).includes(name)) return name as GalenicGlyphName;
  return ALIAS[name] ?? null;
}

export function GalenicGlyph({ name, className }: { name: string; className?: string }) {
  const glyph = resolveGalenicGlyph(name);
  if (!glyph) return null;

  const mask = `url(/img/galenicas/${glyph}.svg) center / contain no-repeat`;
  return (
    <span
      aria-hidden
      className={cn('block bg-current', className)}
      style={{ mask, WebkitMask: mask }}
    />
  );
}
