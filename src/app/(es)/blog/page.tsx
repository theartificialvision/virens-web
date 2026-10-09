import type { Metadata } from 'next';
import { BlogIndexView } from '@/views/BlogIndexView';
import { blogText } from '@/content/blog';
import { listPublishedPosts } from '@/lib/blog/public';

// Netlify vuelve a leer Supabase como mucho cada 60 s (= blogConfig.revalidate;
// aquí tiene que ser un número escrito, Next no acepta importarlo).
export const revalidate = 60;

export const metadata: Metadata = {
  title: blogText.index.metaTitle,
  description: blogText.index.metaDescription,
  alternates: { canonical: '/blog' },
};

export default async function Page() {
  return <BlogIndexView posts={await listPublishedPosts()} />;
}
