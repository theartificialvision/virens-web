/** Símbolo de CPHI (nueve píldoras en anillo), redibujado en HTML como en el
 *  diseño del cliente para que escale nítido junto al wordmark. */
const PILLS: readonly [number, number, number, number][] = [
  [28.85, 0.75, 14.3, 25.9], [56.85, 0.75, 14.3, 25.9], [73.35, 28.85, 25.9, 14.3],
  [73.35, 56.85, 25.9, 14.3], [56.85, 73.35, 14.3, 25.9], [28.85, 73.35, 14.3, 25.9],
  [0.75, 56.85, 25.9, 14.3], [0.75, 28.85, 25.9, 14.3], [43.1, 43.1, 13.8, 13.8],
];

export function CphiMark() {
  return (
    <span aria-hidden className="cphi__mark">
      {PILLS.map(([left, top, width, height]) => (
        <span key={`${left}-${top}`} style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }} />
      ))}
    </span>
  );
}
