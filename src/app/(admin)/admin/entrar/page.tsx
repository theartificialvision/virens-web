import { Suspense } from 'react';
import { LoginForm } from '@/components/admin/LoginForm';

export default function Page() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
