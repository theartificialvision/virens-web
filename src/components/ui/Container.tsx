import { cn } from '@/lib/utils';

/** Contenedor de 1440 px con los márgenes laterales del sistema (§10.3). */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('mx-auto w-full max-w-[var(--container-max)] px-5 md:px-6 lg:px-12 2xl:px-20', className)}>
      {children}
    </div>
  );
}
