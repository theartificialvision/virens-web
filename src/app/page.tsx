import type { Metadata } from 'next';
import { Hero } from '@/components/v2/Hero';
import { DualServices } from '@/components/v2/DualServices';
import { GalenicBlock } from '@/components/v2/GalenicBlock';
import { CapacityBlock } from '@/components/v2/CapacityBlock';
import { AreasMarquee } from '@/components/v2/AreasMarquee';
import { CertStrip } from '@/components/v2/CertStrip';
import { CtaBand } from '@/components/v2/CtaBand';

export const metadata: Metadata = {
  title: 'Expertos en complementos alimenticios',
  description:
    'Fabricación por contrato y desarrollo de complementos alimenticios. Más de 2.000 m² de instalaciones propias en Sant Andreu de la Barca, Barcelona.',
};

/**
 * HOME V2 — reconstrucción de la maqueta del cliente (22/09/2026),
 * promovida a la raíz el 2026-09-22. Cabecera y pie viven en el layout raíz
 * y son los mismos en todas las páginas desde el 23/09/2026.
 *
 * Orden de bloques y ritmo de fondos, tal cual la maqueta:
 *   01 hero (foto/vídeo a sangre, velo azul)
 *   02 Private Label / Full service        blanco
 *   03 Formas galénicas                    teal + foto
 *   04 Capacidad productiva                blanco
 *   05 Áreas terapéuticas                  azul
 *   06 Certificaciones                     gris claro
 *   07 CTA                                 gris
 * Ningún bloque repite el fondo del anterior (regla 5 del proyecto).
 */
export default function HomePage() {
  return (
    <div className="v2-root">
      <div className="v2-page">
        <Hero />
        <DualServices />
        <GalenicBlock />
        <CapacityBlock />
        <AreasMarquee />
        <CertStrip />
        <CtaBand />
      </div>
    </div>
  );
}
