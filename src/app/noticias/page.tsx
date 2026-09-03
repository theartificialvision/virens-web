import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Actualidad de Laboratorios Virens: ferias, divulgación y compañía.',
  alternates: { canonical: '/noticias' },
};

/**
 * TODO: conectar el CMS. Requisito del cliente: debe poder editar el blog
 * sin tocar código, con categorías (Ferias · Divulgación · Compañía).
 * Los slugs actuales de /noticias/* se conservan tal cual (§14.5).
 */
export default function NoticiasPage() {
  return (
    <Section tone="blue" rhythm="air" className="pt-40 lg:pt-52">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-9">
            <Eyebrow className="text-labs">Actualidad</Eyebrow>
            <h1 className="mt-6 max-w-[22ch] text-[length:var(--text-h1)] font-bold leading-[1.05] tracking-[-0.02em]">
              Noticias y actualidad de Laboratorios Virens
            </h1>
          </div>
          <div aria-hidden className="hidden border-l border-white/15 lg:col-span-3 lg:block">
            <span className="block h-28 w-1 bg-tech" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
