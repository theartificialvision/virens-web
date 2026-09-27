import { cn } from '@/lib/utils';

/** Contenedor de 1440 px con los márgenes laterales de la home (27/09/2026: md 32 px, igual que V2). */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('mx-auto w-full max-w-[var(--container-max)] px-5 md:px-8 lg:px-12 2xl:px-20', className)}>
      {children}
    </div>
  );
}
