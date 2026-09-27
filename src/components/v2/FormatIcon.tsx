import { softScale, type CapacityShape } from '@/lib/capacityShapes';

/** Silueta activa y contornos de referencia para cada tamaño fabricable. */
export function FormatIcon({ shape, stage, active }: { shape: CapacityShape; stage: number; active: boolean }) {
  const [sx, sy] = softScale(shape.stages[stage] ?? [1, 1]);
  return (
    <svg viewBox="0 0 120 240" className="block size-full overflow-visible" aria-hidden>
      {shape.stages.map((size, index) => {
        const [gx, gy] = softScale(size);
        return (
          <path
            key={index}
            d={shape.d}
            vectorEffect="non-scaling-stroke"
            fill="none"
            strokeWidth={1}
            strokeDasharray="2.5 2.5"
            className="cap-shape cap-ghost"
            data-active={active || undefined}
            style={{ transform: `scale(${gx},${gy})`, opacity: index === stage ? 0 : undefined }}
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
