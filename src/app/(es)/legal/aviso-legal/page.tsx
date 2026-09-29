import { LegalView } from '@/views/LegalView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('legalNotice', 'es');

export default function Page() {
  return <LegalView doc="legalNotice" locale="es" />;
}
