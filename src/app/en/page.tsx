import { HomeView } from '@/views/HomeView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('home', 'en');

export default function Page() {
  return <HomeView locale="en" />;
}
