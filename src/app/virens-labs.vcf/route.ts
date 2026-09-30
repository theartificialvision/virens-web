import { site } from '@/config/site';
import { cphiPopup } from '@/content/cphi';

export const dynamic = 'force-static';

/**
 * Tarjeta de contacto (.vcf) de Laboratorios Virens (30/09/2026). Sustituye al
 * pase de Apple Wallet, que exige cuenta Apple Developer de pago. Se genera
 * desde `site.contact` para que teléfono, email y dirección tengan una sola
 * fuente. vCard 3.0: lo abren iOS, Android, macOS y Outlook. Líneas con CRLF
 * y las comas/punto y coma de los valores escapadas, como pide RFC 6350.
 */
const esc = (v: string) => v.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,');

export function GET() {
  const c = site.contact;
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${esc(site.name)}`,
    `N:${esc(site.name)};;;;`,
    `ORG:${esc(site.legalName)}`,
    `TEL;TYPE=WORK,VOICE:${c.phone}`,
    `EMAIL;TYPE=WORK:${c.email}`,
    `URL:${site.url}`,
    `ADR;TYPE=WORK:;;${esc(c.street)};${esc(c.city)};${esc(c.region)};${c.postalCode};${esc(c.country)}`,
    `GEO:${c.geo.lat};${c.geo.lng}`,
    `NOTE:${esc(`CPHI Milan 6–8 October 2026 · ${cphiPopup.stand}`)}`,
    'END:VCARD',
  ];
  return new Response(`${lines.join('\r\n')}\r\n`, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="virens-labs.vcf"',
    },
  });
}
