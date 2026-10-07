import Link from 'next/link';
import type { ReactNode } from 'react';
import { contactContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/**
 * Información básica de protección de datos + casillas (07/10/2026, documento
 * «Formularios web» del cliente). La información va ANTES de las casillas y
 * ninguna sale marcada, como pide el documento. RRHH equivale al formulario
 * «Trabaja con nosotros», que tiene su propio texto. Solo «Entiendo y acepto»
 * es obligatoria; las otras dos viajan al PHP solo si se marcan.
 */
export function ContactConsent({ uid, locale, jobs }: { uid: string; locale: Locale; jobs: boolean }) {
  const { contactForm: t } = contactContent(locale);
  const privacyLink = (label: string) => (
    <Link href={t.consent.href} className="font-semibold text-tech underline underline-offset-2">
      {label}
    </Link>
  );

  return (
    <div className="mt-6">
      <p className="text-[length:var(--text-micro)] leading-relaxed text-gray-600">
        <strong className="font-semibold text-gray-700">{t.privacyInfo.title}.</strong>{' '}
        {jobs ? t.privacyInfo.jobs : t.privacyInfo.general}
        {privacyLink(t.privacyInfo.link)}
        {t.privacyInfo.after}
      </p>

      <div className="mt-5 space-y-3">
        <Check id={`${uid}-consent`} name="consentimiento" required>
          {t.consent.before}
          {privacyLink(t.consent.link)}
          {t.consent.after}
        </Check>
        <Check id={`${uid}-marketing`} name="comunicaciones">{t.marketing}</Check>
        <Check id={`${uid}-newsletter`} name="newsletter">{t.newsletter}</Check>
      </div>
    </div>
  );
}

function Check({ id, name, required, children }: { id: string; name: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <input id={id} type="checkbox" name={name} required={required} className="contact-consent" />
      <label htmlFor={id} className="text-[length:var(--text-small)] leading-snug text-gray-700">
        {children}
      </label>
    </div>
  );
}
