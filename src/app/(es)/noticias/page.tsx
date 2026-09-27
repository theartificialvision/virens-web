import { NewsView } from '@/views/NewsView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('news', 'es');

export default function Page() {
  return <NewsView locale="es" />;
}
