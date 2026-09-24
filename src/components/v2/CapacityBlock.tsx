import { Reveal } from '@/components/ui/Reveal';
import { v2Capacity } from '@/content/v2-home';
import { SectionTitle } from './SectionTitle';
import { CapacityStage } from './CapacityStage';

/**
 * Capacidad productiva (§ maqueta, bloque 04): titular y párrafo arriba y,
 * debajo, a todo el ancho del contenedor, el escaparate 3D del cliente
 * (`CapacityStage`, 24/09/2026). Las siluetas vectoriales siguen como alternativa sin WebGL.
 *
 * Las siluetas son los vectores del propio cliente (`Objetosweb.ai`,
 * 22/09/2026), extraídos uno a uno a `/img/v2/objetos/*.svg`. Van en azul
 * corporativo desde el 24/09/2026: el trazo está fijado en el propio SVG
 * porque dentro de un <img> `currentColor` no hereda y salían en negro.
 *
 * Entrada (`.v2-cap`, globals.css): cada envase se llena de abajo arriba en
 * cascada, luego baja el filete y aparecen nombre y rango.
 */
export function CapacityBlock() {
  return (
    <section id="capacidad-productiva" className="bg-white text-blue">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-[var(--v2-section)] md:px-8 lg:px-12 2xl:px-20">
        <SectionTitle accent>{v2Capacity.title}</SectionTitle>
        <Reveal delay={0.06}>
          <p className="mt-6 max-w-[var(--measure-max)] text-[length:var(--text-small)] leading-[1.85] text-gray-700">
            {v2Capacity.lead}
          </p>
        </Reveal>

        {/* 24/09/2026 (cliente): la bandeja ocupa todo el contenedor, sin esquinas redondeadas. */}
        <Reveal className="v2-cap mt-14">
          <CapacityStage />
        </Reveal>
      </div>
    </section>
  );
}
