import Image from 'next/image';
import Link from 'next/link';
import { homeContent } from '@/content';
import { pathFor, type Locale } from '@/lib/i18n';

/** Una sola presentación del laboratorio; conserva las anclas de los servicios. */
export function DualServices({ locale }: { locale: Locale }) {
  const content = homeContent(locale).v2Laboratory;
  return (
    <section id="private-label" aria-labelledby="laboratory-title" className="laboratory">
      <div className="laboratory__inner">
        <div className="laboratory__intro">
          <div>
            <p className="laboratory__eyebrow">{content.eyebrow}</p>
            <h2 id="laboratory-title" className="laboratory__title">
              {content.title.map((line) => <span key={line}>{line}</span>)}
            </h2>
          </div>
          <div className="laboratory__description">
            <p>{content.body}</p>
            <a className="laboratory__link" href="#capacidad-productiva">
              {content.capabilitiesLink}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <figure className="laboratory__figure">
          <div className="laboratory__image">
            <Image src={content.image.src} alt={content.image.alt} fill
              sizes="(max-width: 1440px) 100vw, 1440px" className="object-cover" />
          </div>
          <figcaption className="laboratory__caption">{content.caption}</figcaption>
        </figure>
        <ol id="full-service" className="laboratory__capabilities">
          {content.capabilities.map((label, index) => (
            <li key={label}>
              <span className="laboratory__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span>{label}</span>
            </li>
          ))}
        </ol>
        <div className="laboratory__footer">
          <p>{content.closing}</p>
          <Link className="laboratory__link" href={pathFor('contact', locale)}>
            {content.contactLink}<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
