import { LaboratoryCapabilities } from './LaboratoryCapabilities';
import { Button } from '@/components/ui/Button';
import { homeContent } from '@/content';
import { pathFor, type Locale } from '@/lib/i18n';

/** Una sola presentación del laboratorio; conserva las anclas de los servicios. */
export function DualServices({ locale }: { locale: Locale }) {
  const { v2Laboratory: content, v2Services, v2Cta } = homeContent(locale);
  return (
    <section id="private-label" aria-labelledby="laboratory-title" className="laboratory">
      <div className="laboratory__inner">
        <p className="laboratory__eyebrow">{content.eyebrow}</p>
        <div className="laboratory__intro">
          {v2Services.map((service, index) => (
            <div key={service.id} id={index === 1 ? service.id : undefined} className="laboratory__service">
              <h2 id={index === 0 ? 'laboratory-title' : undefined} className="laboratory__title">{service.title}</h2>
              <p className="laboratory__description">{content.serviceSummaries[index]}</p>
            </div>
          ))}
        </div>
        <LaboratoryCapabilities content={content} />
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
