import { notFound } from 'next/navigation';
import { LegalHeader } from '@/components/legal/LegalHeader';
import { LegalToc } from '@/components/legal/LegalToc';
import { LegalArticle, LegalParagraphs } from '@/components/legal/LegalArticle';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { legalContent } from '@/content';
import type { LegalKey } from '@/content/legal';
import type { Locale } from '@/lib/i18n';

/**
 * TEXTOS LEGALES (29/09/2026; cookies desde el 07/10/2026): Aviso legal,
 * Privacidad, Cookies y Condiciones de venta, en español e inglés. Banda azul
 * con pestañas entre documentos, índice lateral fijo y el texto a una medida
 * cómoda de lectura.
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
              {doc.intro && (
                <div className="mb-12 border-b border-gray-200 pb-12 lg:mb-14 lg:pb-14">
                  <LegalParagraphs paragraphs={doc.intro} />
                </div>
              )}
              <LegalArticle sections={doc.sections} />
              {doc.revised && (
                <p className="mt-4 border-t border-gray-200 pt-8 text-[length:var(--text-micro)] text-gray-500">{doc.revised}</p>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
