import { ScrollTop } from './ScrollTop';
import { PageIndex } from './PageIndex';
import { ui } from '@/content';
import type { Locale } from '@/lib/i18n';

/** Ayudas de navegación flotantes (30/09/2026): índice de página y volver arriba. */
export function PageChrome({ locale }: { locale: Locale }) {
  const { nav } = ui[locale];
  return (
    <>
      <PageIndex locale={locale} nav={nav} />
      <ScrollTop label={nav.toTop} />
    </>
  );
}
