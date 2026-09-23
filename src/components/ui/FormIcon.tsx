import type { CSSProperties } from 'react';
import { GalenicGlyph } from '@/components/ui/GalenicGlyph';

/**
 * Siluetas de envase y forma galénica (§9.6). Desde el 23/09/2026 usan los
 * glifos definitivos del cliente (`GalenicGlyph`), con las mismas claves que
 * los provisionales de trazo a los que sustituyen, así que `labs.ts` no cambia.
 */
const ALIAS: Record<string, string> = {
  capsulas: 'capsule', comprimidos: 'tablet', jarabes: 'syrup', viales: 'vial',
  goteros: 'dropper', sticks: 'stick', sobres: 'sachet', blisters: 'blister',
};

export function FormIcon({ name, className, style }: { name: string; className?: string; style?: CSSProperties }) {
  return <GalenicGlyph name={ALIAS[name] ?? name} className={className} style={style} />;
}
