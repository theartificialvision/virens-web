import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import type { Division } from '@/lib/types';

const ACCENT: Record<Division, { variant: 'primary' | 'labs' }> = {
  labs: { variant: 'labs' },
  tech: { variant: 'primary' },
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
    <div className="relative bg-bone">
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
