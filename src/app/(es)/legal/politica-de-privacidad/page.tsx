import { LegalView } from '@/views/LegalView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('privacy', 'es');

export default function Page() {
  return <LegalView doc="privacy" locale="es" />;
}
