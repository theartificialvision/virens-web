import { cn } from '@/lib/utils';

export type CompanyIconName =
  | 'facilities' | 'team' | 'quality' | 'science' | 'international'
  | 'development' | 'samples' | 'manufacturing' | 'conditioning' | 'control'
  | 'logistics';

/**
 * Iconos de línea de Compañía (rediseño 27/09/2026, cliente: «que representen
 * bien cada apartado»). Rejilla de 48, trazo único de 1,5, remates redondos,
 * dibujo dentro de la caja 7–41 para que todos pesen lo mismo dentro del
 * disco, y un solo detalle que cuente cada idea. `pathLength="1"` en cada
 * trazo: la entrada los dibuja (`.company-stagger`, globals.css).
 */
export const companyGlyphs: Record<CompanyIconName, React.ReactNode> = {
  // 01 · Fabricación en instalaciones propias — nave con cubierta en diente
  // de sierra, chimenea y puerta: una planta industrial, no una casa.
  facilities: (
    <>
      <path pathLength="1" d="M6 39h36" />
      <path pathLength="1" d="M9 39V25l7-5v5l7-5v5l7-5v5h9v14" />
      <path pathLength="1" d="M33 25V11h4v14" />
      <path pathLength="1" d="M20.5 39v-6.5h7V39" />
      <path pathLength="1" d="M12.5 31.5h3.5M31.5 31.5h4" />
    </>
  ),
  // 02 · Equipo cualificado y orientado al cliente — tres personas, la del
  // centro adelantada.
  team: (
    <>
      <circle pathLength="1" cx="24" cy="15.5" r="5" />
      <path pathLength="1" d="M14.5 38a9.5 9.5 0 0 1 19 0" />
      <circle pathLength="1" cx="11.5" cy="20" r="3.5" />
      <path pathLength="1" d="M5 36a7 7 0 0 1 10.6-6" />
      <circle pathLength="1" cx="36.5" cy="20" r="3.5" />
      <path pathLength="1" d="M43 36a7 7 0 0 0-10.6-6" />
    </>
  ),
  // 03 · Altos estándares de calidad, seguridad y control — escudo con check.
  quality: (
    <>
      <path pathLength="1" d="M24 7l14 5.5v10c0 8.8-5.8 15.2-14 18.5-8.2-3.3-14-9.7-14-18.5v-10z" />
      <path pathLength="1" d="m17.5 23.5 4.5 4.5 8.5-9" />
    </>
  ),
  // 04 · Conocimiento científico de nutrición y fitoterapia — hoja (planta)
  // cuyos nervios terminan en nodos: botánica y ciencia en un mismo trazo,
  // con el lenguaje molecular de la marca.
  science: (
    <>
      <path pathLength="1" d="M10 38C10 21.5 20.5 10 38 10c0 17.5-11.5 28-28 28z" />
      <path pathLength="1" d="M10 38 31 17" />
      <path pathLength="1" d="M17 31v-6M17 31h6M24 24v-6M24 24h6" />
      <circle pathLength="1" cx="17" cy="23.5" r="1.5" />
      <circle pathLength="1" cx="24.5" cy="31" r="1.5" />
      <circle pathLength="1" cx="24" cy="16.5" r="1.5" />
      <circle pathLength="1" cx="31.5" cy="24" r="1.5" />
    </>
  ),
  // 05 · Vocación internacional — globo con meridiano y órbita que lo rodea.
  international: (
    <>
      <circle pathLength="1" cx="22" cy="26" r="13" />
      <path pathLength="1" d="M22 13c-4.3 3.5-6.5 8-6.5 13s2.2 9.5 6.5 13c4.3-3.5 6.5-8 6.5-13s-2.2-9.5-6.5-13z" />
      <path pathLength="1" d="M9 26h26M10.8 19.5h22.4M10.8 32.5h22.4" />
      <path pathLength="1" d="M29 8.4a18 18 0 0 1 11.6 11" />
      <path pathLength="1" d="m36.4 18.2 4.2 1.2 1-4.3" />
    </>
  ),

  // Cadena de valor (sección 02).
  // 01 · Desarrollo y formulación — matraz con fórmula en ebullición.
  development: (
    <>
      <path pathLength="1" d="M18.5 7h11M20.5 7v12L10.8 36.3A3.8 3.8 0 0 0 14.1 42h19.8a3.8 3.8 0 0 0 3.3-5.7L27.5 19V7" />
      <path pathLength="1" d="M14.6 30h18.8" />
      <circle pathLength="1" cx="20.5" cy="36" r="1.6" />
      <circle pathLength="1" cx="27" cy="34.5" r="1.1" />
      <circle pathLength="1" cx="24.5" cy="25" r="1" />
    </>
  ),
  // 02 · Elaboración de muestras — tres tubos de ensayo en gradilla, cada
  // uno con un nivel distinto: pruebas hasta dar con el producto.
  samples: (
    <>
      <path pathLength="1" d="M13 8v24a3 3 0 0 0 6 0V8M12 8h8" />
      <path pathLength="1" d="M21 8v24a3 3 0 0 0 6 0V8M20 8h8" />
      <path pathLength="1" d="M29 8v24a3 3 0 0 0 6 0V8M28 8h8" />
      <path pathLength="1" d="M13 26h6M21 20h6M29 29h6" />
      <path pathLength="1" d="M8 16h5M19 16h2M27 16h2M35 16h5M10 16v25M38 16v25M8 41h32" />
    </>
  ),
  // 03 · Fabricación y envasado — cinta transportadora con frascos y la
  // boquilla de llenado sobre uno de ellos.
  manufacturing: (
    <>
      <path pathLength="1" d="M9 34h30a3 3 0 0 1 0 6H9a3 3 0 0 1 0-6z" />
      <circle pathLength="1" cx="10" cy="37" r="1" />
      <circle pathLength="1" cx="24" cy="37" r="1" />
      <circle pathLength="1" cx="38" cy="37" r="1" />
      <path pathLength="1" d="M12 34V24.5l2.5-3V18h5v3.5l2.5 3V34" />
      <path pathLength="1" d="M26 34V24.5l2.5-3V18h5v3.5l2.5 3V34" />
      <path pathLength="1" d="M28 7.5h6v3.5l-2 2.5h-2L28 11z" />
      <path pathLength="1" d="M31 16.5v.5" />
    </>
  ),
  // 04 · Acondicionado primario y secundario — el envase (primario) dentro
  // de su estuche abierto (secundario).
  conditioning: (
    <>
      <path pathLength="1" d="M18.5 24V14.5l2-2.5V8h7v4l2 2.5V24" />
      <path pathLength="1" d="M8 24h32v17H8z" />
      <path pathLength="1" d="M8 24 5 18h13.5M40 24l3-6H29.5" />
      <path pathLength="1" d="M14 31h9M14 35h5" />
    </>
  ),
  // 05 · Control de calidad — protocolo (lista verificada) bajo la lupa.
  control: (
    <>
      <path pathLength="1" d="M15 10h-3a2 2 0 0 0-2 2v27a2 2 0 0 0 2 2h14M29 24V12a2 2 0 0 0-2-2h-3" />
      <path pathLength="1" d="M16 7.5h7a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" />
      <path pathLength="1" d="m14 20 2 2 3.5-3.5M22.5 20.5h2.5M14 28l2 2 3.5-3.5M22.5 28.5h2.5" />
      <circle pathLength="1" cx="33" cy="32" r="6" />
      <path pathLength="1" d="m37.3 36.3 4.7 4.7" />
    </>
  ),
  // Logística (esquema de servicios de la home, 29/09/2026) — camión de
  // reparto: caja de carga con el producto dentro y cabina.
  logistics: (
    <>
      <path pathLength="1" d="M9.5 32H6V13h22v19" />
      <path pathLength="1" d="M16.5 32h14" />
      <path pathLength="1" d="M37.5 32H41v-6l-6-7h-7" />
      <path pathLength="1" d="M31 22h3.5l3 3.5H31z" />
      <path pathLength="1" d="M11 19h12M11 24h8" />
      <circle pathLength="1" cx="13" cy="32" r="3.5" />
      <circle pathLength="1" cx="34" cy="32" r="3.5" />
    </>
  ),
};

export function CompanyIcon({ name, className }: { name: CompanyIconName; className?: string }) {
  return (
    <span className={cn('company-icon company-glass-disc flex size-[var(--company-icon)] shrink-0 items-center justify-center rounded-full', className)}>
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-[58%]">
        {companyGlyphs[name]}
      </svg>
    </span>
  );
}
