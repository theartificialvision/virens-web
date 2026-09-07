import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { FormIcon } from '@/components/ui/FormIcon';
import { MolecularField } from '@/components/ui/MolecularField';

/**
 * Bloque #00A099 (§06 bloque 05).
 * La fotografía va en B/N + virado #00A099 para integrarse con el fondo:
 * grayscale + capa de color en `multiply`. Iconografía y texto en blanco.
 */
export function GalenicForms({
  intro,
  forms,
  image,
}: {
  intro: string;
  forms: readonly { id: string; label: string }[];
  image: { src: string; alt: string };
}) {
  return (
    <section id="formas-galenicas" className="bg-labs text-white">
      <div className="grid lg:min-h-[48rem] lg:grid-cols-2">
        <div className="relative order-1 h-[42vh] min-h-80 overflow-hidden lg:order-2 lg:h-auto">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover grayscale contrast-105" />
          <span aria-hidden className="absolute inset-0 bg-labs mix-blend-multiply opacity-75" />
          <span aria-hidden className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-labs to-transparent lg:block" />
        </div>

        <div className="relative order-2 flex items-center overflow-hidden lg:order-1">
          <MolecularField variant="labs" className="hidden lg:block" />
          <div className="relative mx-auto w-full max-w-[45rem] px-5 py-[var(--section-base)] md:px-8 lg:pl-12 lg:pr-14 2xl:pl-20">
            <div className="max-w-[var(--measure-max)]">
              {/* Doc maestro §10.1: "sobre #00A099 y #A2195B, el texto
                  siempre es blanco puro" — nunca semitransparente. */}
              <Eyebrow className="text-white">Formas galénicas</Eyebrow>
              <h2 className="mt-6 text-[length:var(--text-h2)] font-bold leading-[1.1] tracking-[-0.015em]">
                Sólidas y líquidas
              </h2>
              <p className="mt-5 text-white">{intro}</p>
            </div>

            {/* 07/09 (22): sin caja de celda, ni siquiera en blanco/25 — el
                icono ya ancla el item; el aire hace el resto. */}
            <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {forms.map((f, i) => (
                <li key={f.id}>
                  <Reveal delay={(i % 5) * 0.04} className="flex flex-col items-start gap-4">
                    <FormIcon name={f.id} className="size-10 md:size-12" />
                    <span className="text-[length:var(--text-small)] font-semibold leading-snug">{f.label}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
