'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isBlogConfigured } from '@/config/blog';
import { adminText } from '@/content/blog';
import { supabase } from '@/lib/blog/client';
import { useAdminSession } from '@/lib/blog/useAdminSession';

/**
 * Puerta de las páginas privadas: sin sesión, manda a /admin/entrar. Es la
 * parte visible; la protección real está en Supabase (RLS): sin sesión de
 * admin, la base de datos no devuelve borradores ni deja escribir.
 */
export function AdminGuard({ children }: { children: (session: Session) => React.ReactNode }) {
  const state = useAdminSession();
  const router = useRouter();

  useEffect(() => {
    if (state.status === 'out' && isBlogConfigured) {
      const next = window.location.pathname + window.location.search;
      router.replace(`/admin/entrar?volver=${encodeURIComponent(next)}`);
    }
  }, [state.status, router]);

  if (!isBlogConfigured) return <AdminMessage>{adminText.notConfigured}</AdminMessage>;
  if (state.status !== 'in') return <AdminMessage>{adminText.checking}</AdminMessage>;

  return (
    <>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/admin" className="text-[length:var(--text-body)] font-semibold">{adminText.bar.title}</Link>
          <nav className="flex items-center gap-5 text-[length:var(--text-small)]">
            <a href="/blog" target="_blank" rel="noopener" className="text-gray-700 underline-offset-4 hover:underline">{adminText.bar.site}</a>
            <span className="hidden text-gray-500 sm:inline">{state.session.user.email}</span>
            <button type="button" onClick={() => supabase().auth.signOut()} className="admin-button admin-button--ghost">
              {adminText.bar.logout}
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">{children(state.session)}</main>
    </>
  );
}

export function AdminMessage({ children }: { children: React.ReactNode }) {
  return <p className="mx-auto max-w-md px-5 py-24 text-center text-[length:var(--text-small)] text-gray-700">{children}</p>;
}
