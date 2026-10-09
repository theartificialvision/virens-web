'use client';

import { AdminGuard } from '@/components/admin/AdminGuard';
import { PostList } from '@/components/admin/PostList';

export default function Page() {
  return <AdminGuard>{() => <PostList />}</AdminGuard>;
}
