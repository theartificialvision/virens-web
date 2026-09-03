import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { site } from '@/config/site';
import { labsAnchors, legalNav, techAnchors } from '@/config/navigation';

/**
 * Pivote 2026-09-05: el pie deja de ser una plancha azul de ancho completo
 * —la mayor superficie de color de la web— y pasa al gris de descanso del
 * sistema, con el azul reservado al texto.
 */
export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface text-blue">
      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.24em]">{site.legalName}</p>
            <address className="mt-5 not-italic text-[15px] leading-relaxed text-muted">
              {site.contact.street}
              <br />
              {site.contact.postalCode} {site.contact.city}
              <br />
              {site.contact.region} ({site.contact.country})
            </address>
          </div>

          <FooterColumn title="Virens Labs" href="/virens-labs" items={labsAnchors.map((a) => ({ ...a, href: `/virens-labs${a.href}` }))} />
          <FooterColumn title="Virens Tech" href="/virens-tech" items={techAnchors.map((a) => ({ ...a, href: `/virens-tech${a.href}` }))} />

          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.24em]">Contacto</p>
            <ul className="mt-5 space-y-2 text-[15px] text-muted">
              <li><a href={`tel:${site.contact.phone}`} className="transition-colors hover:text-blue">{site.contact.phoneDisplay}</a></li>
              <li><a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-blue">{site.contact.email}</a></li>
              <li><Link href="/compania" className="transition-colors hover:text-blue">Compañía</Link></li>
              <li><Link href="/noticias" className="transition-colors hover:text-blue">Noticias</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline-2 pt-8 text-[13px] text-subtle lg:flex-row lg:items-center lg:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.legalName}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-blue">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, href, items }: { title: string; href: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <Link href={href} className="text-[13px] font-bold uppercase tracking-[0.24em] transition-opacity hover:opacity-70">
        {title}
      </Link>
      <ul className="mt-5 space-y-2 text-[15px] text-muted">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="transition-colors hover:text-blue">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
