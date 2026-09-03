import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/config/site';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Laboratorios Virens · Fabricación de complementos alimenticios',
    template: '%s · Laboratorios Virens',
  },
  description:
    'Fabricación por contrato y desarrollo de complementos alimenticios en Barcelona. Más de 2.000 m², nueve formatos, ISO 22000 y GMP.',
  alternates: { canonical: '/', languages: { 'es-ES': '/', en: '/en' } },
  openGraph: { type: 'website', locale: 'es_ES', siteName: site.name },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <OrganizationSchema />
      </body>
    </html>
  );
}

/** Datos estructurados (§14.5). */
function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    url: site.url,
    telephone: site.contact.phoneDisplay,
    email: site.contact.email,
    taxID: site.taxId,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.street,
      postalCode: site.contact.postalCode,
      addressLocality: site.contact.city,
      addressRegion: site.contact.region,
      addressCountry: 'ES',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.contact.geo.lat, longitude: site.contact.geo.lng },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
