import { cn } from '@/lib/utils';

/** Círculo numerado. Solo se usa en el listado de áreas terapéuticas (§10.6). */
export function NumberBadge({ n, className }: { n: number | string; className?: string }) {
  const label = typeof n === 'number' ? String(n).padStart(2, '0') : n;
  return (
    <span
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-labs',
        'text-[14px] font-bold leading-none text-white md:size-11',
        className,
      )}
    >
      {label}
    </span>
  );
}
