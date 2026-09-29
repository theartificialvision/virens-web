import { Montserrat } from 'next/font/google';
import { V2Header } from '@/components/v2/V2Header';
import { V2Footer } from '@/components/v2/V2Footer';
import { Grain } from '@/components/ui/Grain';
import { CphiPopup } from '@/components/cphi/CphiPopup';
import { site } from '@/config/site';
import { ui } from '@/content';
import type { Locale } from '@/lib/i18n';
import '@/app/globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'], // 800: pop-up CPHI
  variable: '--font-montserrat',
  display: 'swap',
});

/**
 * Documento completo de un idioma (27/09/2026). Cada idioma tiene su propio
 * layout raíz (`app/(es)` y `app/en`) para que `<html lang>` sea el correcto
 * desde el primer byte; los dos montan esta misma carcasa.
 */
export function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = ui[locale];
  return (
    <html lang={t.htmlLang} className={montserrat.variable}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-blue focus:px-4 focus:py-2 focus:text-white"
        >
          {t.skipLink}
        </a>
        {/* 23/09/2026: una sola cabecera y un solo pie para toda la web —los de
            la home V2, con el isotipo 3D y el menú 3D—. Antes las páginas
            interiores seguían con los de V1 (sin logo, trigger de vidrio). */}
        <V2Header locale={locale} />
        <main id="contenido">{children}</main>
        <V2Footer locale={locale} />
        <Grain />
        {/* 29/09/2026: pop-up de CPHI Milán; se desmonta solo tras la feria. */}
        <CphiPopup locale={locale} />
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
