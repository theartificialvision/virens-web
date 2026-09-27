/** Layout raíz del inglés (/en). */
import { RootShell } from '@/views/RootShell';
import { rootMetadata } from '@/lib/pageMeta';

export const metadata = rootMetadata('en');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
