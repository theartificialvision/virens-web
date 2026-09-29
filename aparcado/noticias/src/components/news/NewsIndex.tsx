'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { newsCategories, newsIntro, type NewsCategory, type NewsPost } from '@/content/noticias';
import { NewsRow } from './NewsRow';

type Filter = NewsCategory | 'todas';

/** Índice filtrable por categoría. Sin JS se ven todos (SSR); el filtro solo
 *  oculta. El recuento se anuncia a lectores de pantalla (`aria-live`). */
export function NewsIndex({ posts }: { posts: NewsPost[] }) {
  const [filter, setFilter] = useState<Filter>('todas');

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([['todas', posts.length]]);
    for (const post of posts) map.set(post.category, (map.get(post.category) ?? 0) + 1);
    return map;
  }, [posts]);

  const visible = filter === 'todas' ? posts : posts.filter((p) => p.category === filter);

  return (
    <div>
      <div role="group" aria-label={newsIntro.indexCrumb} className="flex flex-wrap gap-3">
        {newsCategories.map((cat) => {
          const active = filter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(cat.id)}
              className={cn(
                'news-filter inline-flex items-center gap-2 rounded-full border px-5 py-2.5',
                'text-[length:var(--text-small)] font-semibold leading-none',
                active
                  ? 'border-blue bg-blue text-white'
                  : 'border-gray-300 bg-transparent text-gray-700',
              )}
            >
              {cat.label}
              <span aria-hidden className={cn('text-[length:var(--text-micro)] font-medium tabular-nums', active ? 'text-white/70' : 'text-gray-500')}>
                {counts.get(cat.id) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-8 text-[length:var(--text-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-gray-500">
        {newsIntro.showing} {visible.length} {newsIntro.of} {posts.length} {newsIntro.articles}
      </p>

      <ol className="mt-4 border-b border-gray-200">
        {visible.map((post, i) => (
          <NewsRow key={post.slug} post={post} index={i} />
        ))}
      </ol>
    </div>
  );
}
