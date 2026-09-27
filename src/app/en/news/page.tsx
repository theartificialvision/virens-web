import { NewsView } from '@/views/NewsView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('news', 'en');

export default function Page() {
  return <NewsView locale="en" />;
}
