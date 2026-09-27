import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ui } from '@/content';
import type { Locale } from '@/lib/i18n';

/**
 * TODO: conectar el CMS. Requisito del cliente: debe poder editar el blog
 * sin tocar código, con categorías (Ferias · Divulgación · Compañía).
 * Los slugs actuales de /noticias/* se conservan tal cual (§14.5).
 */
export function NewsView({ locale }: { locale: Locale }) {
  const t = ui[locale].news;
  return (
    <Section tone="white" rhythm="air">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-9">
            <Eyebrow className="text-labs">{t.eyebrow}</Eyebrow>
            <h1 className="mt-6 max-w-[22ch] text-[length:var(--v2-hero-title)] font-normal leading-[1.08] tracking-[-0.02em]">
              {t.title}
            </h1>
          </div>
        </div>
      </Container>
    </Section>
  );
}
