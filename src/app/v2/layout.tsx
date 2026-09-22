import type { Metadata } from 'next';
import { V2Header } from '@/components/v2/V2Header';
import { V2Footer } from '@/components/v2/V2Footer';

export const metadata: Metadata = {
  title: 'Expertos en complementos alimenticios',
  description:
    'Fabricación por contrato y desarrollo de complementos alimenticios. Más de 2.000 m² de instalaciones propias en Sant Andreu de la Barca, Barcelona.',
  robots: { index: false, follow: false }, // maqueta de trabajo: fuera de los buscadores
};

/**
 * Envoltorio de la home V2. La cabecera y el pie del sistema (V1) se apagan en
 * esta ruta desde `ChromeGate`, en el layout raíz: aquí se montan los propios.
 * `v2-root` es además el gancho que pone la página en claro (ver globals.css).
 */
export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2-root">
      <V2Header />
      {children}
      <V2Footer />
    </div>
  );
}
