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
    <section id="formas-galenicas" className="bg-labs-ink text-white">
      <div className="grid lg:min-h-[48rem] lg:grid-cols-2">
        <div className="relative order-1 h-[42vh] min-h-80 overflow-hidden lg:order-2 lg:h-auto">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover grayscale contrast-105" />
          <span aria-hidden className="absolute inset-0 bg-labs-ink mix-blend-multiply opacity-75" />
          <span aria-hidden className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-labs-ink to-transparent lg:block" />
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

            <ul className="mt-14 grid grid-cols-2 border-l border-t border-white/25 sm:grid-cols-3">
              {forms.map((f, i) => (
                <li key={f.id} className="min-h-32 border-b border-r border-white/25">
                  <Reveal delay={(i % 5) * 0.04} className="flex h-full flex-col items-start justify-between gap-5 p-4 md:p-5">
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
