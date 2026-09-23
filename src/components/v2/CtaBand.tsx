import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { CircleIcon } from './GalenicIcon';
import { v2Cta } from '@/content/v2-home';
import { SectionTitle } from './SectionTitle';

/** Cierre de página (§ maqueta, bloque 07): icono, dos líneas y un botón. */
export function CtaBand() {
  return (
    <section className="bg-gray-100 text-blue">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-8 px-5 py-[var(--v2-section-tight)] md:flex-row md:items-center md:justify-between md:px-8 lg:px-12 2xl:px-20">
        <div className="flex items-center gap-7">
          <CircleIcon name="chat" className="text-blue/70" />
          <div>
            <SectionTitle>{v2Cta.title}</SectionTitle>
            <Reveal delay={0.06}>
              <p className="mt-2 text-[length:var(--text-small)] text-gray-700">{v2Cta.lead}</p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.12} className="self-start md:self-auto">
          <Button href={v2Cta.href} variant="labs">
            {v2Cta.button} <span aria-hidden>&rarr;</span>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
