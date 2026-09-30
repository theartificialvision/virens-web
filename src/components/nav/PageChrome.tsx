import { BackButton } from './BackButton';
import { ui } from '@/content';
import type { Locale } from '@/lib/i18n';

/** Ayuda de navegación flotante (30/09/2026): la flecha de volver, bajo la cabecera. */
export function PageChrome({ locale }: { locale: Locale }) {
  return <BackButton locale={locale} nav={ui[locale].nav} />;
}
