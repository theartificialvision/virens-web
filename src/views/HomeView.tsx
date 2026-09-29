import { Hero } from '@/components/v2/Hero';
import { DualServices } from '@/components/v2/DualServices';
import { ProductionScale } from '@/components/v2/ProductionScale';
import { GalenicBlock } from '@/components/v2/GalenicBlock';
import { CapacityBlock } from '@/components/v2/CapacityBlock';
import { AreasMarquee } from '@/components/v2/AreasMarquee';
import { CertStrip } from '@/components/v2/CertStrip';
import { CtaBand } from '@/components/v2/CtaBand';
import type { Locale } from '@/lib/i18n';

/**
 * HOME V2 — reconstrucción de la maqueta del cliente (22/09/2026),
 * promovida a la raíz el 2026-09-22. Cabecera y pie viven en el layout raíz
 * y son los mismos en todas las páginas desde el 23/09/2026.
 *
 * Orden de bloques y ritmo de fondos, tal cual la maqueta:
 *   01 hero (foto/vídeo a sangre, velo azul)
 *   02 Laboratorio integral / capacidades        blanco
 *   03 Capacidad productiva (escala)       gris claro (29/09/2026)
 *   04 Formas galénicas                    teal + foto → gris
 *   05 Formatos (capacidad por tamaños)    blanco
 *   06 Áreas terapéuticas                  azul
 *   07 Certificaciones                     gris claro
 *   08 CTA                                 gris
 * Ningún bloque repite el fondo del anterior (regla 5 del proyecto).
 */
export function HomeView({ locale }: { locale: Locale }) {
  return (
    <div className="v2-root">
      <div className="v2-page">
        <Hero locale={locale} />
        <DualServices locale={locale} />
        <ProductionScale locale={locale} />
        <GalenicBlock locale={locale} />
        <CapacityBlock locale={locale} />
        <AreasMarquee locale={locale} />
        <CertStrip locale={locale} />
        <CtaBand locale={locale} />
      </div>
    </div>
  );
}
