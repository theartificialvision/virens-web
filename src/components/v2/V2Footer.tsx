import Link from 'next/link';
import { site } from '@/config/site';
import { v2FooterNav } from '@/content/v2-home';
import { Isotipo3D } from './Isotipo3D';

/**
 * Pie de la home V2 (§ maqueta): lockup de las dos divisiones a la izquierda y
 * cuatro columnas de enlaces. La línea inferior lleva el año en curso, no el
 * "© 2024" fijo de la maqueta — ese venía heredado de la web actual, que lleva
 * dos años sin actualizarlo.
 */
export function V2Footer() {
  return (
    <footer className="bg-blue text-white">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-16 md:px-8 lg:px-12 lg:py-20 2xl:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <div className="flex items-end gap-5">
              <Lockup division="labs" />
              <span aria-hidden className="mb-1 h-8 w-px bg-white/25" />
              <Lockup division="tech" />
            </div>
            <address className="mt-8 not-italic text-[length:var(--text-note)] leading-relaxed text-white/60">
              {site.contact.street}
              <br />
              {site.contact.postalCode} {site.contact.city}
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
          <p>&copy; {new Date().getFullYear()} Virens Labs &amp; Tech. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            <li>
              <Link href="/legal/aviso-legal" className="hover:text-white">Aviso legal</Link>
            </li>
            <li>
              <Link href="/legal/politica-de-privacidad" className="hover:text-white">Política de privacidad</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function Lockup({ division }: { division: 'labs' | 'tech' }) {
  return (
    <span className="flex items-end gap-2">
      <Isotipo3D division={division} className="-mx-4 -my-3 size-[var(--v2-logo-3d-sm)]" />
      <span className="flex flex-col leading-none">
        <span className="self-end text-[10px] font-semibold uppercase tracking-[0.28em] leading-none text-white/70">
          {division === 'labs' ? 'Labs' : 'Tech'}
        </span>
        <span className="mt-1 text-[length:var(--text-body)] font-bold lowercase leading-none tracking-[-0.02em]">
          virens
        </span>
      </span>
    </span>
  );
}
