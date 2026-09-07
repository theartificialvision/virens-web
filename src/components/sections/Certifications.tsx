import type { Certification } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Certificaciones en HTML (§06 bloque 08), no como imagen.
 * Los marcados `unverified` NO deben publicarse hasta confirmar la
 * denominación real del certificado con el cliente.
 */
export function Certifications({
  eyebrow,
  title,
  body,
  items,
  showUnverified = false,
}: {
  eyebrow: string;
  title: string;
  body: readonly string[];
  items: Certification[];
  showUnverified?: boolean;
}) {
  const visible = showUnverified ? items : items.filter((c) => c.status !== 'unverified');

  return (
    <Section id="calidad" tone="white" rhythm="base">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow className="text-gray-500">{eyebrow}</Eyebrow>
            <h2 className="mt-6 text-[length:var(--text-h2)] font-bold leading-[1.1] tracking-[-0.015em]">{title}</h2>
            <div className="mt-6 space-y-4 text-gray-700">
              {body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          {/* 07/09 (22): sin caja de celda; un filete corto sustituye al recuadro
              como ancla del item — el mismo lenguaje que ya usa el H1 de
              Compañía, no un recurso nuevo. */}
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:grid-cols-3">
            {visible.map((c, i) => (
              <li key={c.name}>
                <Reveal delay={(i % 3) * 0.05} className="flex flex-col gap-4">
                  <span aria-hidden className="block h-0.5 w-8 bg-labs" />
                  <span className="text-[length:var(--text-h4)] font-semibold leading-tight text-blue">{c.name}</span>
                  <span className="text-[12px] leading-relaxed text-gray-500">
                    {[c.issuer, c.scope].filter(Boolean).join(' · ') || ' '}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
