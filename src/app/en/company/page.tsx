import { CompanyView } from '@/views/CompanyView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('company', 'en');

export default function Page() {
  return <CompanyView locale="en" />;
}
