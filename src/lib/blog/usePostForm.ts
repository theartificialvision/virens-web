'use client';

import { useCallback, useEffect, useState } from 'react';
import { adminText } from '@/content/blog';
import { supabase } from './client';
import { deleteBlogImage } from './upload';
import { dateToTimestamp, slugify, timestampToDate, todayDate, type Post } from './post';

const e = adminText.editor.errors;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export interface PostDraft {
  title: string;
  subtitle: string;
  slug: string;
  /** false mientras la dirección se genere sola desde el título. */
  slugManual: boolean;
  cover_image: string | null;
  content: string;
  /** AAAA-MM-DD, vacío = hoy al publicar. */
  date: string;
  status: Post['status'];
}

const EMPTY: PostDraft = { title: '', subtitle: '', slug: '', slugManual: false, cover_image: null, content: '', date: '', status: 'draft' };

export type SaveIntent = 'draft' | 'publish' | 'update' | 'unpublish';

/**
 * Estado y guardado de un artículo del panel. `id` null = artículo nuevo; tras
 * el primer guardado, `onCreated` recibe su id para cambiar la URL.
 */
export function usePostForm(id: string | null, onCreated: (id: string) => void) {
  const [draft, setDraft] = useState<PostDraft>(EMPTY);
  const [loading, setLoading] = useState(Boolean(id));
  const [missing, setMissing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase().from('posts').select('*').eq('id', id).maybeSingle().then(({ data }) => {
      const p = data as Post | null;
      if (!p) setMissing(true);
      else setDraft({ title: p.title, subtitle: p.subtitle, slug: p.slug, slugManual: true, cover_image: p.cover_image, content: p.content, date: timestampToDate(p.published_at), status: p.status });
      setLoading(false);
    });
  }, [id]);

  // Aviso del navegador si se cierra la pestaña con cambios sin guardar.
  useEffect(() => {
    if (!dirty) return;
    const warn = (ev: BeforeUnloadEvent) => ev.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = useCallback((patch: Partial<PostDraft>) => {
    setDirty(true);
    setDraft((d) => {
      const next = { ...d, ...patch };
      if (!next.slugManual && 'title' in patch) next.slug = slugify(next.title);
      return next;
    });
  }, []);

  /** Devuelve un mensaje de error o '' si ha ido bien. */
  async function save(intent: SaveIntent): Promise<string> {
    const status: Post['status'] = intent === 'publish' || intent === 'update' ? 'published' : 'draft';
    if (status === 'published' && !draft.title.trim()) return e.title;
    // Un borrador sin título también necesita dirección única.
    const slug = draft.slug || slugify(draft.title) || `borrador-${crypto.randomUUID().slice(0, 8)}`;
    if (!SLUG.test(slug)) return e.slug;
    const date = draft.date || (status === 'published' ? todayDate() : '');
    const row = {
      title: draft.title.trim(),
      subtitle: draft.subtitle.trim(),
      slug,
      cover_image: draft.cover_image,
      content: draft.content,
      status,
      published_at: date ? dateToTimestamp(date) : null,
    };
    setSaving(true);
    const sb = supabase();
    const { data, error } = id
      ? await sb.from('posts').update(row).eq('id', id).select('id').single()
      : await sb.from('posts').insert(row).select('id').single();
    setSaving(false);
    if (error) return error.code === '23505' ? e.slugTaken : error.code === 'PGRST301' || error.message.includes('JWT') ? e.session : e.save;
    setDraft((d) => ({ ...d, slug, date, status }));
    setDirty(false);
    if (!id && data) onCreated((data as { id: string }).id);
    return '';
  }

  async function remove(): Promise<boolean> {
    if (!id) return false;
    const { error } = await supabase().from('posts').delete().eq('id', id);
    if (error) return false;
    await deleteBlogImage(draft.cover_image).catch(() => undefined);
    setDirty(false);
    return true;
  }

  return { draft, update, save, remove, loading, missing, dirty, saving };
}
