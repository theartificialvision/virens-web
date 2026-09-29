import { LegalView } from '@/views/LegalView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('privacy', 'en');

export default function Page() {
  return <LegalView doc="privacy" locale="en" />;
}
