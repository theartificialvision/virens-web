import type { CSSProperties } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { homeContent } from '@/content';
import type { V2Cert } from '@/content/v2-home';
import type { Locale } from '@/lib/i18n';
import { SectionTitle } from './SectionTitle';

/**
 * Franja de certificaciones (§ maqueta, bloque 06).
 *
 * 23/09/2026 — con los sellos oficiales del cliente, vectorizados desde sus
 * PNG a `/img/v2/sellos/`. Cada sello lleva ya su nombre dibujado, así que el
 * texto de debajo desaparece y `name` pasa a ser el nombre accesible.
 *
 * Se pintan como máscara sobre `bg-current` (como `GalenicGlyph`): heredan el
 * azul de marca en lugar del #004066 de los PNG, y los SVG —hasta 150 KB el de
 * Emiratos— se cachean aparte en vez de ir dentro del HTML.
 *
 * Tamaño por superficie, no por altura: con la misma altura, el de Emiratos
 * (casi 3:1) se comería la fila y la huella de gato parecería diminuta. Cada
 * sello ocupa el área de un cuadrado de `--v2-seal`: alto = lado / √ratio,
 * ancho = lado · √ratio.
 *
 * Móvil (27/09/2026, cliente): filas de 3, 3 y 2, la última centrada — de
 * ahí `flex-wrap` con celdas de un tercio en vez de rejilla de dos columnas.
 *
 * `showPending` saca además los marcados `unverified` (hoy ninguno: el sello
 * «FDA Approved» se muestra desde el 02/10/2026 por decisión del cliente).
 */
export function CertStrip({ locale, showPending = false }: { locale: Locale; showPending?: boolean }) {
  const { v2Certifications, v2CertificationsTitle } = homeContent(locale);
  const visible = showPending
    ? v2Certifications
    : v2Certifications.filter((c) => c.status !== 'unverified');

  return (
    <section id="calidad" className="border-y border-gray-200 bg-gray-50 text-blue">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-[var(--v2-section-tight)] md:px-8 lg:px-12 2xl:px-20">
        <SectionTitle>{v2CertificationsTitle}</SectionTitle>
        <ul className="mt-14 flex flex-wrap items-center justify-center gap-y-10 sm:grid sm:grid-cols-4 sm:justify-items-center sm:gap-x-6 sm:gap-y-12 lg:flex lg:justify-between lg:gap-8">
          {visible.map((c, i) => (
            <li
              key={c.id}
              // En móvil la fila de los sellos rotulados necesita el aire del
              // rótulo (que va en absoluto) para no pegarse a la siguiente.
              className={`flex w-1/3 justify-center px-1.5 sm:w-auto sm:px-0 ${c.caption ? 'mb-6 sm:mb-0' : ''}`}
            >
              <Reveal delay={(i % 4) * 0.03}>
                <Seal cert={c} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Seal({ cert }: { cert: V2Cert }) {
  const k = Math.sqrt(cert.ratio);
  const z = cert.scale ?? 1;
  const mask = `url(/img/v2/sellos/${cert.id}.svg) center / contain no-repeat`;
  const style: CSSProperties = {
    width: `calc(var(--v2-seal) * ${(k * z).toFixed(3)})`,
    height: `calc(var(--v2-seal) * ${(z / k).toFixed(3)})`,
    mask,
    WebkitMask: mask,
  };
  const label = cert.issuer ? `${cert.name} — ${cert.issuer}` : cert.name;
  const seal = <span role="img" aria-label={label} className="block bg-current" style={style} />;
  if (!cert.caption) return seal;
  // El rótulo cuelga en absoluto bajo el sello para que la fila siga
  // alineada por el centro de los sellos y no por el conjunto sello + texto.
  // Cabe en el `gap-y` de la rejilla móvil. El lector de pantalla ya oye el
  // nombre en el sello: el rótulo se oculta para no leerlo dos veces.
  return (
    <span className="relative block">
      {seal}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-full mt-2 whitespace-nowrap text-center text-micro font-semibold tracking-label"
      >
        {cert.caption}
      </span>
    </span>
  );
}
