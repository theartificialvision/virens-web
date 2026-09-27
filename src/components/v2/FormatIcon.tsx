import { softScale, type CapacityShape } from '@/lib/capacityShapes';

/**
 * Silueta de un formato con sus tamaños (diseño del cliente, 27/09/2026).
 * El trazo sólido es el tamaño `stage`; los demás tamaños quedan como
 * contornos punteados («fantasmas»). Todo escala desde la base del envase.
 */
export function FormatIcon({ shape, stage, active }: { shape: CapacityShape; stage: number; active: boolean }) {
  const [sx, sy] = softScale(shape.stages[stage] ?? [1, 1]);
  return (
    <svg viewBox="0 0 120 240" className="block size-full overflow-visible" aria-hidden>
      {shape.stages.map((st, j) => {
        const [gx, gy] = softScale(st);
        return (
          <path
            key={j}
            d={shape.d}
            vectorEffect="non-scaling-stroke"
            fill="none"
            strokeWidth={1}
            strokeDasharray="2.5 2.5"
            className="cap-shape cap-ghost"
            data-active={active || undefined}
            style={{ transform: `scale(${gx},${gy})`, opacity: j === stage ? 0 : undefined }}
          />
        );
      })}
      <path
        d={shape.d}
        vectorEffect="non-scaling-stroke"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        className="cap-shape cap-solid"
        data-active={active || undefined}
        style={{ transform: `scale(${sx},${sy})` }}
      />
    </svg>
  );
}
