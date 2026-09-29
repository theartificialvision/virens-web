import { notFound } from 'next/navigation';
import { LegalHeader } from '@/components/legal/LegalHeader';
import { LegalToc } from '@/components/legal/LegalToc';
import { LegalArticle } from '@/components/legal/LegalArticle';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { legalContent } from '@/content';
import type { LegalKey } from '@/content/legal';
import type { Locale } from '@/lib/i18n';

/**
 * TEXTOS LEGALES (29/09/2026): Aviso legal, Protección de datos y Condiciones
 * de venta, en español e inglés. Banda azul con pestañas entre documentos,
 * índice lateral fijo y el texto a una medida cómoda de lectura.
 */
export function LegalView({ doc: key, locale }: { doc: LegalKey; locale: Locale }) {
  const { legalDocs, legalUi } = legalContent(locale);
  const doc = legalDocs.find((d) => d.key === key);
  if (!doc) notFound();
  return (
    <>
      <LegalHeader doc={doc} docs={legalDocs} ui={legalUi} locale={locale} />
      <Section tone="white" rhythm="air">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4 xl:col-span-3">
              <LegalToc sections={doc.sections} label={legalUi.toc} />
            </aside>
            <div className="lg:col-span-8 xl:col-start-5">
              <LegalArticle sections={doc.sections} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
