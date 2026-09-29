import { LegalView } from '@/views/LegalView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('sales', 'en');

export default function Page() {
  return <LegalView doc="sales" locale="en" />;
}
