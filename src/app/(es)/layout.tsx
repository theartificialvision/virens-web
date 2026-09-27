/** Layout raíz del español (sin prefijo en la URL). */
import { RootShell } from '@/views/RootShell';
import { rootMetadata } from '@/lib/pageMeta';

export const metadata = rootMetadata('es');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="es">{children}</RootShell>;
}
