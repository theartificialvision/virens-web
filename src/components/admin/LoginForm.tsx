'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { isBlogConfigured } from '@/config/blog';
import { adminText } from '@/content/blog';
import { supabase } from '@/lib/blog/client';
import { useAdminSession } from '@/lib/blog/useAdminSession';
import { AdminMessage } from './AdminGuard';

const t = adminText.login;

/** Solo se vuelve a rutas del propio panel (evita redirecciones a otras webs). */
function safeNext(value: string | null) {
  return value && value.startsWith('/admin') && !value.startsWith('//') ? value : '/admin';
}

export function LoginForm() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get('volver'));
  const session = useAdminSession();
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  // Si ya hay sesión (otra pestaña, recarga), directo al panel.
  useEffect(() => {
    if (session.status === 'in' && !sending) router.replace(next);
  }, [session.status, sending, next, router]);

  if (!isBlogConfigured) return <AdminMessage>{adminText.notConfigured}</AdminMessage>;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSending(true);
    setError('');
    const sb = supabase();
    const { error: authError } = await sb.auth.signInWithPassword({
      email: String(data.get('email') ?? '').trim(),
      password: String(data.get('password') ?? ''),
    });
    if (authError) {
      setError(authError.status === 429 ? t.tooMany : authError.code === 'invalid_credentials' || authError.status === 400 ? t.wrong : t.error);
      setSending(false);
      return;
    }
    // Una cuenta válida pero que no está en la lista de admins no entra.
    const { data: isAdmin } = await sb.rpc('is_blog_admin');
    if (isAdmin !== true) {
      await sb.auth.signOut();
      setError(t.notAdmin);
      setSending(false);
      return;
    }
    router.replace(next);
  }

  return (
    <main className="flex min-h-svh items-center justify-center px-5 py-16">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-8 sm:p-10" noValidate={false}>
        <h1 className="text-[length:var(--text-h3)] font-semibold">{t.title}</h1>
        <p className="mt-2 text-[length:var(--text-small)] text-gray-700">{t.lead}</p>
        <label className="admin-label mt-8" htmlFor="admin-email">{t.email}</label>
        <input id="admin-email" name="email" type="email" autoComplete="username" required className="admin-input" />
        <label className="admin-label mt-5" htmlFor="admin-password">{t.password}</label>
        <input id="admin-password" name="password" type="password" autoComplete="current-password" required className="admin-input" />
        <p role="alert" className="mt-4 min-h-[1.5em] text-[length:var(--text-small)] font-medium text-tech">{error}</p>
        <button type="submit" disabled={sending} className="admin-button admin-button--primary mt-2 w-full">
          {sending ? t.sending : t.submit}
        </button>
      </form>
    </main>
  );
}
