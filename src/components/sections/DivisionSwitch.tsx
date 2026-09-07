import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import type { Division } from '@/lib/types';

const ACCENT: Record<Division, { from: string; to: string; variant: 'primary' | 'labs' }> = {
  labs: { from: 'var(--color-tech)', to: 'var(--color-labs)', variant: 'labs' },
  tech: { from: 'var(--color-labs)', to: 'var(--color-tech)', variant: 'primary' },
};

/**
 * Único acceso cruzado entre divisiones (§06 bloque 10 / §07 bloque 11).
 * El literal de la web actual es solo un banner de link ("Visitar Tech" /
 * "Visitar Labs"), sin titular ni cuerpo: se mantiene así, sin inventar
 * una pregunta de venta encima.
 */
export function DivisionSwitch({ to, label, href }: { to: Division; label: string; href: string }) {
  const a = ACCENT[to];
  return (
    <div className="relative bg-white">
      <span aria-hidden className="absolute inset-x-0 top-0 h-0.5" style={{ background: `linear-gradient(90deg, ${a.from}, ${a.to})` }} />
      <Section tone="white" rhythm="compact">
        <Container className="flex flex-col items-center text-center">
          <Eyebrow className="text-gray-500">La otra mitad del proceso</Eyebrow>
          <Button href={href} variant={a.variant} className="mt-8">
            {label} &rarr;
          </Button>
        </Container>
      </Section>
    </div>
  );
}
