import { TechView } from '@/views/TechView';
import { pageMetadata } from '@/lib/pageMeta';

export const metadata = pageMetadata('tech', 'es');

export default function Page() {
  return <TechView locale="es" />;
}
