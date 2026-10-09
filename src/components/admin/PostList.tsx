'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { adminText } from '@/content/blog';
import { supabase } from '@/lib/blog/client';
import { blogHref, formatPostDate, type Post } from '@/lib/blog/post';

const t = adminText.list;
type Row = Pick<Post, 'id' | 'title' | 'slug' | 'status' | 'created_at' | 'published_at'>;

/** Listado del panel: todos los artículos, borradores incluidos, el más nuevo arriba. */
export function PostList() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    supabase()
      .from('posts')
      .select('id,title,slug,status,created_at,published_at')
      .order('created_at', { ascending: false })
      .then(({ data, error: e }) => (e ? setError(true) : setRows(data ?? [])));
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[length:var(--text-h3)] font-semibold">{t.title}</h1>
        <Link href="/admin/editar" className="admin-button admin-button--primary">+ {t.create}</Link>
      </div>

      {error && <p className="mt-8 text-tech">{t.error}</p>}
      {!error && rows === null && <p className="mt-8 text-gray-700">{t.loading}</p>}
      {rows?.length === 0 && <p className="mt-8 text-gray-700">{t.empty}</p>}

      {rows && rows.length > 0 && (
        <ul className="mt-8 divide-y divide-gray-200 border-y border-gray-200 bg-white">
          {rows.map((row) => {
            const scheduled = row.status === 'published' && row.published_at && new Date(row.published_at) > new Date();
            const label = row.status === 'draft' ? t.draft : scheduled ? t.scheduled : t.published;
            return (
              <li key={row.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-6">
                <span className={`admin-status admin-status--${row.status === 'draft' ? 'draft' : scheduled ? 'scheduled' : 'published'}`}>{label}</span>
                <Link href={`/admin/editar?id=${row.id}`} className="min-w-0 flex-1 font-semibold hover:text-labs">
                  <span className="block truncate">{row.title || t.untitled}</span>
                  <span className="mt-1 block text-[length:var(--text-micro)] font-normal text-gray-500">
                    {t.createdOn} {formatPostDate(row.created_at)}
                    {row.published_at && row.status === 'published' && ` · ${scheduled ? t.scheduledFor : t.publishedOn} ${formatPostDate(row.published_at)}`}
                  </span>
                </Link>
                <span className="flex gap-4 text-[length:var(--text-small)]">
                  <Link href={`/admin/editar?id=${row.id}`} className="underline underline-offset-4">{t.edit}</Link>
                  {row.status === 'published' && !scheduled && (
                    <a href={blogHref(row.slug)} target="_blank" rel="noopener" className="underline underline-offset-4">{t.view}</a>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
