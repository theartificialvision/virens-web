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
  eyebrow?: string;
  title: string;
  body: string;
  pillars?: readonly string[];
}) {
  // 27/09/2026 (cliente): franja baja —ritmo compacto y pilares pegados al
  // texto— aunque lleve los cuatro pilares.
  return (
    <Section tone="tech" rhythm="compact" className="relative overflow-hidden">
      <MolecularField variant="tech" className="hidden lg:block" />
      <Container className="relative text-center">
        <div className="mx-auto max-w-[56rem]">
          {eyebrow && (
            <p className="mb-8 text-[length:var(--text-eyebrow)] font-bold uppercase tracking-eyebrow text-blue">
              {eyebrow}
            </p>
          )}
          <Reveal>
            <h2 className="text-[length:var(--text-h2)] font-medium leading-tight tracking-[-0.015em]">
              {title}
            </h2>
          </Reveal>
          {/* Doc maestro §10.1: texto siempre blanco puro sobre #A2195B. */}
          <p className="mx-auto mt-5 max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85] text-white">{body}</p>
        </div>

        {pillars && (
        <ul className="mx-auto mt-8 grid max-w-[64rem] grid-cols-2 gap-x-8 gap-y-6 lg:mt-10 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p} className="flex flex-col items-center gap-2 text-[length:var(--text-small)] font-medium">
              <span className="text-[length:var(--text-note)] font-semibold tracking-label text-blue">{String(i + 1).padStart(2, '0')}</span>
              {p}
            </li>
          ))}
        </ul>
        )}
      </Container>
    </Section>
  );
}
