import Link from 'next/link';
import { site } from '@/config/site';
import { homeContent, ui } from '@/content';
import type { Locale } from '@/lib/i18n';
import { Isotipo3D } from './Isotipo3D';

/**
 * Pie de la home V2 (§ maqueta): lockup de las dos divisiones a la izquierda y
 * cuatro columnas de enlaces. La línea inferior lleva el año en curso, no el
 * "© 2024" fijo de la maqueta — ese venía heredado de la web actual, que lleva
 * dos años sin actualizarlo.
 */
export function V2Footer({ locale }: { locale: Locale }) {
  const { v2FooterNav, v2FooterAddress: address } = homeContent(locale);
  const t = ui[locale];
  return (
    <footer className="bg-blue text-white">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-16 md:px-8 lg:px-12 lg:py-20 2xl:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            {/* 29/09/2026 (cliente): solo el logo de Labs; fuera el de Tech. */}
            <div className="flex items-end gap-5">
              <Lockup division="labs" />
            </div>
            {/* 30/09/2026 (cliente): dirección de la firma corporativa —
                producción y almacén/oficina en dos bloques, localidad y teléfono/web debajo. */}
            {/* Alineación con las columnas (30/09/2026): mismo interlineado que los enlaces
                (12 px × 1,7) y arranque a la altura de su segunda fila (rótulo + margen
                + fila 1 + separación = 40 px bajo el logo); bloques separados 12 px
                como los ítems de las listas. */}
            <address className="mt-8 flex flex-col gap-3 not-italic text-[length:var(--text-note)] leading-[1.7] text-white/60 lg:mt-10">
              <div className="grid grid-cols-2 gap-x-4">
                {address.sites.map((place, index) => (
                  <p key={place.label} className={index > 0 ? 'border-l border-white/15 pl-4' : undefined}>
                    <strong className="block font-bold text-white/85">{place.label}</strong>
                    {place.lines.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </p>
                ))}
              </div>
              <p>{address.locality}</p>
              <p>
                {address.phoneLabel}{' '}
                <a href={`tel:${site.contact.phone}`} className="transition-colors duration-200 hover:text-white">{address.phone}</a>
                {' / '}
                <a href={site.url} className="font-semibold text-white/85 transition-colors duration-200 hover:text-white">{address.web}</a>
              </p>
            </address>
          </div>

          {v2FooterNav.map((col) => (
            <nav key={col.title} className="lg:col-span-2" aria-label={col.title}>
              <p className="text-[length:var(--text-note)] font-bold uppercase tracking-[0.2em]">{col.title}</p>
              <ul className="mt-5 space-y-3 text-[length:var(--text-note)] text-white/70">
                {col.items.map((item) => (
                  <li key={`${col.title}-${item.label}`}>
                    <Link href={item.href} className="transition-colors duration-200 hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-7 text-[length:var(--text-note)] text-white/55 md:flex-row md:items-center md:justify-between">
          {/* Los textos legales viven desde el 29/09/2026 en la columna
              «Documentación»; aquí ya no se repiten. */}
          <p>&copy; {new Date().getFullYear()} Virens Labs &amp; Tech. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

const WORDMARK_MASK = 'url(/img/v2/logo/virens-wordmark.svg) center / contain no-repeat';

function Lockup({ division }: { division: 'labs' | 'tech' }) {
  return (
    <span className="flex items-end gap-2">
      <Isotipo3D division={division} className="-mx-4 -my-3 size-[var(--v2-logo-3d-sm)]" />
      <span className="flex flex-col leading-none">
        <span className="self-end text-[10px] font-semibold uppercase tracking-[0.28em] leading-none text-white/70">
          {division === 'labs' ? 'Labs' : 'Tech'}
        </span>
        {/* «virens» oficial (vector del logo del cliente) pintado como máscara para que herede el blanco. */}
        <span
          role="img"
          aria-label="virens"
          className="mt-1 block aspect-[381.97/104.25] h-[var(--v2-wordmark-sm-h)] bg-current"
          style={{ mask: WORDMARK_MASK, WebkitMask: WORDMARK_MASK }}
        />
      </span>
    </span>
  );
}
