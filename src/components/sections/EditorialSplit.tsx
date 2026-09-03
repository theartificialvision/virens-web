import Image from 'next/image';
import type { ServiceBlock } from '@/lib/types';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * Bloque editorial imagen/texto (§06–07).
 * La imagen ocupa entre el 45 % y el 60 % del ancho y sangra por su borde.
 * NO es una tarjeta: sin borde, sin sombra, sin radio.
 */
export function EditorialSplit({ block, accent = 'var(--color-labs)' }: { block: ServiceBlock; accent?: string }) {
  const imageFirst = block.imageSide === 'left';

  return (
    <Section id={block.id} tone={block.tone} rhythm="base">
      <div className="group mx-auto grid max-w-[var(--container-max)] items-stretch gap-10 lg:grid-cols-12 lg:gap-0">
        <div
          className={cn(
            'relative aspect-[4/5] w-full overflow-hidden lg:aspect-[4/3]',
            imageFirst ? 'lg:order-1 lg:col-span-7' : 'lg:order-2 lg:col-span-7',
          )}
          style={{ ['--split' as string]: `${block.imageRatio}%` }}
        >
          <Image
            src={block.image.src}
            alt={block.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.02]"
          />
          <span
            aria-hidden
            className={cn('absolute bottom-0 h-1 w-24', imageFirst ? 'right-0' : 'left-0')}
            style={{ background: accent }}
          />
        </div>

        <div className={cn('flex items-center lg:col-span-5', imageFirst ? 'lg:order-2' : 'lg:order-1')}>
          <Reveal className="w-full px-5 md:px-6 lg:px-14 2xl:px-16">
            <div className="flex items-center gap-5 border-b border-white/15 pb-6">
              <p className="text-[length:var(--text-eyebrow)] font-bold tracking-[0.24em]" style={{ color: accent }}>
                {block.index}
              </p>
              <span aria-hidden className="h-px flex-1" style={{ background: accent, opacity: 0.35 }} />
            </div>
            <h3 className="mt-7 text-[length:var(--text-h3)] font-semibold leading-tight tracking-[-0.01em]">
              {block.title}
            </h3>
            <div className="mt-6 max-w-[var(--measure-max)] space-y-4 text-mist">
              {block.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {block.highlight && (
              <p className="mt-8 border-t border-white/15 pt-4 text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>
                {block.highlight}
              </p>
            )}
            {block.link && (
              <div className="mt-8">
                <TextLink href={block.link.href}>{block.link.label}</TextLink>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
