import { LegalView } from '@/views/LegalView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('cookies', 'en');

export default function Page() {
  return <LegalView doc="cookies" locale="en" />;
}
