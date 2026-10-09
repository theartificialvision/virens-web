'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isBlogConfigured } from '@/config/blog';
import { supabase } from './client';

export type AdminSession = { status: 'loading' } | { status: 'out' } | { status: 'in'; session: Session };

/** Sesión actual del panel; cambia sola al entrar, salir o caducar. */
export function useAdminSession(): AdminSession {
  const [state, setState] = useState<AdminSession>({ status: 'loading' });
  useEffect(() => {
    if (!isBlogConfigured) {
      setState({ status: 'out' });
      return;
    }
    const sb = supabase();
    sb.auth.getSession().then(({ data }) => setState(data.session ? { status: 'in', session: data.session } : { status: 'out' }));
    const { data } = sb.auth.onAuthStateChange((_event, session) =>
      setState(session ? { status: 'in', session } : { status: 'out' }),
    );
    return () => data.subscription.unsubscribe();
  }, []);
  return state;
}
