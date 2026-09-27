import { cn } from '@/lib/utils';

export type CompanyIconName =
  | 'facilities' | 'team' | 'quality' | 'science' | 'international'
  | 'development' | 'samples' | 'manufacturing' | 'conditioning' | 'control';

const glyphs: Record<CompanyIconName, React.ReactNode> = {
  facilities: (
    <>
      <path pathLength="1" d="M10 38V21l10 5V16l10 6v16" />
      <path pathLength="1" d="M30 25h8v13H10M15 31h4m5 0h4" />
      <circle pathLength="1" cx="36" cy="17" r="4" />
      <path pathLength="1" d="M36 10v3m0 8v3m-7-7h3m8 0h3" />
    </>
  ),
  team: (
    <>
      <circle pathLength="1" cx="24" cy="15" r="5" />
      <circle pathLength="1" cx="12.5" cy="20" r="3.5" />
      <circle pathLength="1" cx="35.5" cy="20" r="3.5" />
      <path pathLength="1" d="M15 37c.7-7 3.7-11 9-11s8.3 4 9 11M5.5 36c.5-5 2.7-8 7-8 2 0 3.6.7 4.8 2M42.5 36c-.5-5-2.7-8-7-8-2 0-3.6.7-4.8 2" />
    </>
  ),
  quality: (
    <>
      <circle pathLength="1" cx="24" cy="21" r="10" />
      <path pathLength="1" d="m19 21 3.2 3.2L29 17.5M17.5 30l-2 9 8.5-4 8.5 4-2-9" />
      <path pathLength="1" d="M24 8v3m-9.2.8 2.1 2.1m14.2 0 2.1-2.1" />
    </>
  ),
  science: (
    <>
      <path pathLength="1" d="M19 31c-4-2-6-6-6-10a11 11 0 0 1 22 0c0 4-2 8-6 10l-1 5h-8zM20 40h8" />
      <circle pathLength="1" cx="24" cy="21" r="2" />
      <path pathLength="1" d="M16.5 18c4-3 11-3 15 0m-15 6c4 3 11 3 15 0M24 13c-3 4-3 12 0 16m0-16c3 4 3 12 0 16" />
    </>
  ),
  international: (
    <>
      <circle pathLength="1" cx="24" cy="24" r="16" />
      <path pathLength="1" d="M8 24h32M24 8c5 5 7 10 7 16s-2 11-7 16c-5-5-7-10-7-16s2-11 7-16zM11 16h26M11 32h26" />
      <circle pathLength="1" cx="37" cy="12" r="2.5" />
    </>
  ),
  development: (
    <>
      <path pathLength="1" d="M17 8h14M20 8v11L11 36a4 4 0 0 0 3.5 6h19a4 4 0 0 0 3.5-6L28 19V8" />
      <path pathLength="1" d="M16 31h16M19 26h10" />
      <circle pathLength="1" cx="21" cy="35.5" r="1.5" />
    </>
  ),
  samples: (
    <>
      <path pathLength="1" d="M11 9h11M13 9v7l-3 6v17h15V22l-3-6V9M28 13h9M30 13v6l-2 5v15h12V24l-3-5v-6" />
      <path pathLength="1" d="M10 27h15m3 2h12" />
    </>
  ),
  manufacturing: (
    <>
      <path pathLength="1" d="M8 37h32M12 37V24h24v13M18 24V12h12v12M22 12V7h4v5" />
      <path pathLength="1" d="M18 30h12" />
      <circle pathLength="1" cx="16" cy="40" r="2" />
      <circle pathLength="1" cx="32" cy="40" r="2" />
    </>
  ),
  conditioning: (
    <>
      <path pathLength="1" d="m24 7 15 7.5v19L24 41 9 33.5v-19zM9 14.5 24 22l15-7.5M24 22v19" />
      <path pathLength="1" d="m16 11 15 7.5v7" />
      <circle pathLength="1" cx="15" cy="29" r="2" />
    </>
  ),
  control: (
    <>
      <path pathLength="1" d="M15 10h18v30H15zM20 7h8v6h-8z" />
      <path pathLength="1" d="m20 22 2.5 2.5L28 19m-8 12h8" />
      <circle pathLength="1" cx="34" cy="34" r="6" />
      <path pathLength="1" d="m38.5 38.5 4 4" />
    </>
  ),
};

export function CompanyIcon({ name, className }: { name: CompanyIconName; className?: string }) {
  return (
    <span className={cn('company-icon company-glass-disc flex size-[var(--company-icon)] shrink-0 items-center justify-center rounded-full', className)}>
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-[58%]">
        {glyphs[name]}
      </svg>
    </span>
  );
}
