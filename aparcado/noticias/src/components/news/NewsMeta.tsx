import { cn } from '@/lib/utils';
import { newsIntro, type NewsPost } from '@/content/noticias';
import { formatNewsDate, newsCategoryLabel } from '@/lib/news';

/** Punto de color por categoría: el único acento cromático de la ficha.
 *  Ferias -> Tech, Divulgación -> Labs, Compañía -> corporativo. */
const DOT: Record<NewsPost['category'], string> = {
  ferias: 'bg-tech',
  divulgacion: 'bg-labs',
  compania: 'bg-blue',
};

/** Línea de metadatos de una noticia: categoría · fecha · lectura. */
export function NewsMeta({ post, className }: { post: NewsPost; className?: string }) {
  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-1 text-[length:var(--text-micro)] font-medium text-gray-500',
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 uppercase tracking-[var(--tracking-label)]">
        <span aria-hidden className={cn('size-2 rounded-full', DOT[post.category])} />
        {newsCategoryLabel(post.category)}
      </span>
      <time dateTime={post.dateISO}>{formatNewsDate(post.dateISO)}</time>
      <span aria-hidden className="text-gray-300">
        ·
      </span>
      <span>
        {post.readingMinutes} {newsIntro.minRead}
      </span>
    </p>
  );
}
