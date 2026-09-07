import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { divisionSections } from '@/config/navigation';
import type { Division } from '@/lib/types';

/**
 * Índice de cierre de /virens-labs y /virens-tech (07/09 (16), petición del
 * cliente): las secciones de las DOS divisiones al final de cada página.
 *
 * **Enlaces, no chips.** La pregunta era esa y la respuesta la da la función:
 * un chip comunica algo seleccionable —un filtro que se activa y se apaga— y
 * esto no selecciona nada, lleva a un sitio. Además un chip es una píldora, y
 * la regla 4 reserva el radio a los botones; una rejilla de doce píldoras se
 * leería como la rejilla de tarjetas que prohíbe la regla 7. Se resuelve con el
 * recurso que ya usa el menú y que el cliente dio por bueno: filete-guía que
 * crece al pasar el ratón.
 *
 * No duplica contenido: son las mismas anclas de la barra sticky. Dentro de su
 * propia página van como ancla suelta; hacia la otra división, con su ruta
 * delante — y ahí sí hay navegación de verdad, que es lo que aporta el bloque.
 */
export function DivisionIndex({ current }: { current: Division }) {
  return (
    <Section tone="blue" rhythm="base">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {divisionSections.map((division) => {
            const here = division.id === current;
            return (
              <nav key={division.id} aria-label={division.label}>
                <Eyebrow className={here ? 'text-white' : 'text-white/55'}>
                  {division.label}
                </Eyebrow>
                <ul className="mt-8 grid gap-1">
                  {division.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        // En su propia página el ancla va suelta: así el
                        // navegador salta sin recargar la ruta entera.
                        href={here ? item.href : `${division.href}${item.href}`}
                        className="group flex items-center gap-4 py-2 text-[length:var(--text-h4)] font-normal text-white/70 transition-colors duration-200 hover:text-white"
                      >
                        <span
                          aria-hidden
                          className="block h-px w-4 shrink-0 bg-current opacity-40 transition-all duration-300 ease-[var(--ease-out-quart)] group-hover:w-10 group-hover:opacity-100"
                        />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
