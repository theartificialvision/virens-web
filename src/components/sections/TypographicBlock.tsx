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
          <p className="text-[length:var(--text-eyebrow)] font-bold uppercase tracking-[0.24em] text-blue">
            {eyebrow}
          </p>
          <Reveal>
            <h2 className="mt-8 text-[clamp(2.75rem,1.6rem+3.6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em]">
              {title}
            </h2>
          </Reveal>
          <p className="mx-auto mt-8 max-w-[var(--measure-max)] text-[length:var(--text-lead)] text-white/90">{body}</p>
        </div>

        <ul className="mt-16 grid grid-cols-2 divide-x divide-y divide-white/25 border-y border-white/25 lg:grid-cols-4 lg:divide-y-0">
          {pillars.map((p, i) => (
            <li key={p} className="flex min-h-32 flex-col items-center justify-center gap-4 px-4 py-8 text-[16px] font-semibold lg:px-8">
              <span className="text-[length:var(--text-eyebrow)] tracking-[0.2em] text-blue">{String(i + 1).padStart(2, '0')}</span>
              {p}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
