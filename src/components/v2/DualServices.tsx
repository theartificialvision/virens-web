import { LaboratoryCapabilities } from './LaboratoryCapabilities';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from './SectionTitle';
import { homeContent } from '@/content';
import { pathFor, type Locale } from '@/lib/i18n';

/** Una sola presentación del laboratorio; conserva las anclas de los servicios
 *  (#private-label en la sección; #full-service abre el recorrido en Logística). */
export function DualServices({ locale }: { locale: Locale }) {
  const { v2Laboratory: content, v2Services, v2Cta } = homeContent(locale);
  return (
    <section id="private-label" aria-labelledby="laboratory-title" className="laboratory">
      <div className="laboratory__inner">
        {/* 29/09/2026: el antiguo rótulo pasa a título de sección, como el resto. */}
        <SectionTitle id="laboratory-title" className="laboratory__heading">{content.title}</SectionTitle>
        <LaboratoryCapabilities content={content} services={v2Services} />
        <div className="laboratory__footer">
          <p className="laboratory__closing">{content.closing.map((line) => <span key={line}>{line}</span>)}</p>
          <Button href={pathFor('contact', locale)} variant="labs" className="laboratory__cta">
            {v2Cta.button} <span aria-hidden>&rarr;</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
