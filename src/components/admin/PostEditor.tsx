'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { adminText } from '@/content/blog';
import { blogHref, slugify } from '@/lib/blog/post';
import { usePostForm, type SaveIntent } from '@/lib/blog/usePostForm';
import { CoverField } from './CoverField';
import { RichTextEditor } from './RichTextEditor';
import { AdminMessage } from './AdminGuard';

const t = adminText.editor;
const OK: Record<SaveIntent, string> = { draft: t.saved, update: t.saved, publish: t.publishedOk, unpublish: t.unpublishedOk };

/**
 * Pantalla de escribir/editar. El orden es el del trabajo real: foto → título →
 * subtítulo → cuerpo → Publicar. Dirección y fecha quedan plegadas porque casi
 * nunca hacen falta.
 */
export function PostEditor() {
  const router = useRouter();
  const id = useSearchParams().get('id');
  const form = usePostForm(id, (newId) => router.replace(`/admin/editar?id=${newId}`));
  const { draft, update } = form;
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  if (form.loading) return <AdminMessage>{t.loading}</AdminMessage>;
  if (form.missing) return <AdminMessage>{t.notFound}</AdminMessage>;

  const published = draft.status === 'published';

  async function run(intent: SaveIntent) {
    setNotice(null);
    const error = await form.save(intent);
    setNotice(error ? { ok: false, text: error } : { ok: true, text: OK[intent] });
  }

  async function onDelete() {
    if (!window.confirm(t.confirmDelete)) return;
    if (await form.remove()) router.replace('/admin');
    else setNotice({ ok: false, text: t.errors.save });
  }

  function leave(event: React.MouseEvent) {
    if (form.dirty && !window.confirm(t.unsaved)) event.preventDefault();
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/admin" onClick={leave} className="text-[length:var(--text-small)] underline underline-offset-4">← {t.back}</Link>
        <span className={`admin-status admin-status--${published ? 'published' : 'draft'}`}>{published ? t.statusPublished : t.statusDraft}</span>
      </div>
      <h1 className="text-[length:var(--text-h3)] font-semibold">{id ? t.editTitle : t.newTitle}</h1>

      <section className="space-y-8 bg-white p-6 sm:p-8">
        <CoverField value={draft.cover_image} onChange={(cover_image) => update({ cover_image })} />

        <div>
          <label htmlFor="post-title" className="admin-label">{t.title}</label>
          <input id="post-title" value={draft.title} onChange={(e) => update({ title: e.target.value })} className="admin-input admin-input--title" />
        </div>

        <div>
          <label htmlFor="post-subtitle" className="admin-label">{t.subtitle}</label>
          <textarea id="post-subtitle" rows={2} value={draft.subtitle} onChange={(e) => update({ subtitle: e.target.value })} className="admin-input" />
        </div>

        <div>
          <p id="post-body-label" className="admin-label">{t.body}</p>
          <RichTextEditor value={draft.content} onChange={(content) => update({ content })} placeholder={t.bodyPlaceholder} labelId="post-body-label" />
        </div>

        <details className="admin-details">
          <summary>{t.more}</summary>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="post-slug" className="admin-label">{t.slug}</label>
              <input id="post-slug" value={draft.slug} onChange={(e) => update({ slug: slugify(e.target.value), slugManual: true })} className="admin-input" />
              <p className="mt-2 text-[length:var(--text-micro)] text-gray-500">
                /blog/{draft.slug || '…'} · {t.slugHint}{' '}
                {draft.slugManual && (
                  <button type="button" className="underline underline-offset-4" onClick={() => update({ slug: slugify(draft.title), slugManual: false })}>{t.slugReset}</button>
                )}
              </p>
            </div>
            <div>
              <label htmlFor="post-date" className="admin-label">{t.date}</label>
              <input id="post-date" type="date" value={draft.date} onChange={(e) => update({ date: e.target.value })} className="admin-input" />
              <p className="mt-2 text-[length:var(--text-micro)] text-gray-500">{t.dateHint}</p>
            </div>
          </div>
        </details>
      </section>

      <div className="sticky bottom-0 -mx-5 flex flex-wrap items-center gap-3 border-t border-gray-200 bg-gray-100/95 px-5 py-4 backdrop-blur">
        {published ? (
          <>
            <button type="button" disabled={form.saving} onClick={() => run('update')} className="admin-button admin-button--primary">{form.saving ? t.saving : t.update}</button>
            <button type="button" disabled={form.saving} onClick={() => run('unpublish')} className="admin-button">{t.unpublish}</button>
            <a href={blogHref(draft.slug)} target="_blank" rel="noopener" className="admin-button admin-button--ghost">{t.view}</a>
          </>
        ) : (
          <>
            <button type="button" disabled={form.saving} onClick={() => run('publish')} className="admin-button admin-button--primary">{form.saving ? t.saving : t.publish}</button>
            <button type="button" disabled={form.saving} onClick={() => run('draft')} className="admin-button">{t.saveDraft}</button>
          </>
        )}
        {id && <button type="button" onClick={onDelete} className="admin-button admin-button--danger ml-auto">{t.delete}</button>}
        <p role="status" className={`w-full text-[length:var(--text-small)] font-semibold empty:hidden ${notice?.ok ? 'text-labs' : 'text-tech'}`}>{notice?.text}</p>
      </div>
    </form>
  );
}
