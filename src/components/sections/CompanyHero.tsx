import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Container } from '@/components/ui/Container';
import { companyHero } from '@/content/company';

export function CompanyHero() {
  return (
    <section className="company-hero relative isolate overflow-hidden bg-blue-deep text-white" data-header-tone="dark">
      <Container className="relative z-10 flex min-h-[var(--company-hero-min)] items-center">
        <div className="w-full py-[var(--company-hero-copy-y)] lg:w-[46%]">
          <h1 className="text-[length:var(--v2-hero-title)] font-semibold uppercase leading-[1.02] tracking-normal">
            <span className="v2-load block" style={{ '--i': 0 } as CSSProperties}>{companyHero.prefix}</span>
            <span className="v2-load mt-2 block text-labs" style={{ '--i': 1 } as CSSProperties}>{companyHero.title}</span>
          </h1>
          <p className="v2-load mt-7 text-[length:var(--v2-hero-sub)] font-medium leading-snug text-white" style={{ '--i': 2 } as CSSProperties}>
            {companyHero.subtitle}
          </p>
          <p className="v2-load mt-7 max-w-[var(--measure-narrow)] text-[length:var(--text-small)] leading-[1.85] text-white/75" style={{ '--i': 3 } as CSSProperties}>
            {companyHero.body}
          </p>
        </div>
      </Container>

      <div className="company-hero-media v2-fade relative min-h-[var(--company-hero-media-mobile)] overflow-hidden">
        <Image
          src={companyHero.image.src}
          alt={companyHero.image.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 54vw"
          className="object-cover object-center"
        />
        <span aria-hidden className="absolute inset-0 bg-blue/20 mix-blend-multiply" />
        <span aria-hidden className="company-hero-lens absolute inset-0" />
      </div>
    </section>
  );
}
