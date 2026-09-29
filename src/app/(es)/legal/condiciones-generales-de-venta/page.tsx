import { LegalView } from '@/views/LegalView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('sales', 'es');

export default function Page() {
  return <LegalView doc="sales" locale="es" />;
}
