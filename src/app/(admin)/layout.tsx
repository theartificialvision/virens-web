import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { adminText } from '@/content/blog';
import '@/app/globals.css';

const montserrat = Montserrat({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600', '700'], variable: '--font-montserrat', display: 'swap' });

/**
 * Layout raíz del panel del blog (09/10/2026): documento propio, sin la
 * cabecera, el pie ni el pop-up de la web. Nunca se indexa.
 */
export const metadata: Metadata = {
  title: adminText.metaTitle,
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="admin min-h-svh bg-gray-100 text-blue">{children}</body>
    </html>
  );
}
