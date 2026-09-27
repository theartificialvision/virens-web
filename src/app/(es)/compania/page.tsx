import { CompanyView } from '@/views/CompanyView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('company', 'es');

export default function Page() {
  return <CompanyView locale="es" />;
}
