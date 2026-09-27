import { ContactView } from '@/views/ContactView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('contact', 'en');

export default function Page() {
  return <ContactView locale="en" />;
}
