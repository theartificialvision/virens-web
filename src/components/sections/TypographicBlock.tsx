import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { MolecularField } from '@/components/ui/MolecularField';

/**
 * "Soluciones integradas" (§07 bloque 03).
 * Fondo #A2195B, sin fotografía. Grafismo molecular abstracto muy sutil.
 * El rótulo pequeño va en #00285C por indicación de marca: uso decorativo,
 * siempre en 13 px peso 700 con tracking amplio, nunca como texto de lectura.
 */
export function TypographicBlock({
  eyebrow,
  title,
  body,
  pillars,
}: {
  eyebrow: string;
  title: string;
  body: string;
  pillars: readonly string[];
}) {
  return (
    <Section tone="tech" rhythm="base" className="relative overflow-hidden">
      <MolecularField variant="tech" className="hidden lg:block" />
      <Container className="relative text-center">
        <div className="mx-auto max-w-[56rem]">
          <p className="text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow text-blue">
            {eyebrow}
          </p>
          <Reveal>
            <h2 className="mt-8 text-[length:var(--text-stat)] font-bold leading-[1.05] tracking-[-0.02em]">
              {title}
            </h2>
          </Reveal>
          {/* Doc maestro §10.1: texto siempre blanco puro sobre #A2195B. */}
          <p className="mx-auto mt-8 max-w-[var(--measure-max)] text-[length:var(--text-lead)] text-white">{body}</p>
        </div>

        <ul className="mt-8 grid lg:mt-16 grid-cols-2 gap-x-8 gap-y-8 lg:gap-y-12 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p} className="flex flex-col items-center gap-4 text-[length:var(--text-body)] font-semibold">
              <span className="text-[length:var(--text-eyebrow)] tracking-eyebrow text-blue">{String(i + 1).padStart(2, '0')}</span>
              {p}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
