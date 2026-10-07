import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/utils';
import type { LegalDoc } from '@/content/legal';
import { pathFor, type Locale } from '@/lib/i18n';

/**
 * Cabecera de los textos legales: banda azul corporativa con el título y, abajo,
 * las pestañas de «Documentación» (la activa lleva el filete teal de los
 * títulos de sección). Mismo lenguaje que el resto de la web: sin tarjetas.
 */
export function LegalHeader({ doc, docs, ui, locale }: {
  doc: LegalDoc;
  docs: readonly LegalDoc[];
  ui: { eyebrow: string; docsAria: string; company: string };
  locale: Locale;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-blue text-white" data-header-tone="dark">
      <span aria-hidden className="absolute -right-1/4 -top-1/2 -z-10 size-[60rem] rounded-full bg-[radial-gradient(closest-side,var(--color-labs)_0%,transparent_70%)] opacity-20" />
      <Container className="pt-36 lg:pt-44">
        <Eyebrow className="text-labs-glow">{ui.eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-[18ch] text-[length:var(--v2-hero-title)] font-normal leading-[1.08] tracking-[-0.02em]">
          {doc.title}
        </h1>
        <p className="mt-5 text-[length:var(--text-small)] text-white/60">{ui.company}</p>

        <nav aria-label={ui.docsAria} className="mt-14 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <ul className="flex min-w-max gap-8 border-b border-white/15 md:gap-12">
            {docs.map((d) => {
              const active = d.key === doc.key;
              return (
                <li key={d.key}>
                  <Link
                    href={pathFor(d.key, locale)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative block py-5 text-[length:var(--text-small)] transition-colors duration-200',
                      active ? 'text-white' : 'text-white/55 hover:text-white',
                    )}
                  >
                    {d.nav}
                    <span aria-hidden className={cn('absolute inset-x-0 -bottom-px h-[3px] origin-left bg-labs transition-transform duration-300', active ? 'scale-x-100' : 'scale-x-0')} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
