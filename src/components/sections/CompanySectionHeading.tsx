import { cn } from '@/lib/utils';

export function CompanySectionHeading({
  index,
  title,
  inverse = false,
  className,
}: {
  index: string;
  title: string;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex items-end gap-5 md:gap-7', className)}>
      <span aria-hidden className={cn('company-section-index font-semibold leading-[0.75] tracking-normal', inverse ? 'text-white/28' : 'text-blue/10')}>
        {index}
      </span>
      <h2 className={cn('pb-1 text-[length:var(--text-h2)] font-medium leading-none tracking-[-0.015em]', inverse ? 'text-white' : 'text-blue')}>
        {title}
      </h2>
    </div>
  );
}
