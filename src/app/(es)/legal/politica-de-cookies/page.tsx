import { LegalView } from '@/views/LegalView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('cookies', 'es');

export default function Page() {
  return <LegalView doc="cookies" locale="es" />;
}
