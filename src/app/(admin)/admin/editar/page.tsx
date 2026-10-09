'use client';

import { Suspense } from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { PostEditor } from '@/components/admin/PostEditor';

/** /admin/editar = nueva noticia · /admin/editar?id=… = editar una existente. */
export default function Page() {
  return (
    <AdminGuard>
      {() => (
        <Suspense>
          <PostEditor />
        </Suspense>
      )}
    </AdminGuard>
  );
}
