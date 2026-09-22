import { Reveal } from '@/components/ui/Reveal';
import { v2Certifications } from '@/content/v2-home';

/**
 * Franja de certificaciones (§ maqueta, bloque 06).
 *
 * En la maqueta son los sellos oficiales en imagen. Aquí van como marcas
 * tipográficas por dos razones: los sellos son marcas de terceros y tienen que
 * llegar del cliente en vectorial, y en texto quedan indexables y accesibles
 * —hoy en lvirens.com viven dentro de un PNG—. La caja de cada uno es la misma
 * que ocupará el sello cuando exista, así que sustituirlos no mueve el layout.
 *
 * `showPending` saca además los marcados `unverified` (hoy: "FDA Approved",
 * claim de riesgo — la FDA no aprueba complementos alimenticios).
 */
export function CertStrip({ showPending = false }: { showPending?: boolean }) {
  const visible = showPending
    ? v2Certifications
    : v2Certifications.filter((c) => c.status !== 'unverified');

  return (
    <section id="calidad" className="border-y border-gray-200 bg-gray-50 text-blue">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-[var(--v2-section-tight)] md:px-8 lg:px-12 2xl:px-20">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:flex lg:items-start lg:justify-between lg:gap-8">
          {visible.map((c, i) => (
            <li key={c.id} className="lg:max-w-[9rem]">
              <Reveal delay={(i % 4) * 0.05} className="flex flex-col items-center gap-3 text-center">
                <span
                  aria-hidden
                  className="flex size-[var(--v2-seal)] items-center justify-center rounded-full border border-blue/25 text-[length:var(--text-note)] font-bold uppercase tracking-[0.08em]"
                >
                  {c.issuer?.startsWith('Manufacturing') ? initials(c.name) : (c.issuer ?? initials(c.name))}
                </span>
                <span className="text-[length:var(--text-note)] font-semibold leading-tight">{c.name}</span>
                {c.issuer && !c.issuer.startsWith('Manufacturing') ? null : c.issuer ? (
                  <span className="text-[length:var(--text-note)] leading-tight text-gray-500">{c.issuer}</span>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0] ?? '')
    .join('')
    .slice(0, 3)
    .toUpperCase();
}
