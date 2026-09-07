import { cn } from '@/lib/utils';

/** Rótulo superior. No es un encabezado: nunca usar <h*> aquí (§14.1). */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow', className)}>
      {children}
    </p>
  );
}
