import type { CSSProperties } from 'react';

/**
 * Molécula del proceso de Virens Tech (29/09/2026): cada servicio es un átomo
 * y el scroll dibuja el enlace hacia el siguiente (`--proc-p`, ver
 * `useProcessProgress`). El paso activo late en el magenta de Tech; los ya
 * recorridos quedan encendidos con sus átomos satélite. Es la identidad
 * molecular del isotipo (CLAUDE.md, «Identidad molecular») hecha recorrido.
 */
const NODES: readonly (readonly [number, number])[] = [[92, 70], [250, 186], [104, 316], [262, 446], [118, 574]];
/** Átomos satélite de cada nodo: dan lectura de molécula, no de gráfico. */
const SATELLITES: readonly (readonly (readonly [number, number])[])[] = [
  [[36, 34], [40, 128]],
  [[322, 140], [318, 250]],
  [[36, 286], [58, 390]],
  [[330, 404], [318, 516]],
  [[48, 620], [196, 626]],
];

export function ProcessMolecule({ labels, hrefs, active, label }: {
  labels: readonly string[];
  hrefs: readonly string[];
  active: number;
  label: string;
}) {
  const nodes = NODES.slice(0, labels.length);
  return (
    <nav aria-label={label} className="proc-mol">
      <svg viewBox="0 0 360 660" className="proc-mol__svg" role="presentation">
        {nodes.slice(0, -1).map(([x1, y1], i) => {
          const [x2, y2] = nodes[i + 1] ?? [x1, y1];
          return (
            <g key={`b${i}`} style={{ '--b': i } as CSSProperties}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} className="proc-mol__track" />
              <line x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} className="proc-mol__bond" />
            </g>
          );
        })}
        {nodes.map(([x, y], i) => {
          const state = i < active ? 'done' : i === active ? 'current' : 'next';
          const right = x > 180;
          return (
            <a key={labels[i]} href={hrefs[i]} data-state={state} className="proc-mol__atom" aria-current={i === active ? 'step' : undefined}>
              {(SATELLITES[i] ?? []).map(([sx, sy]) => (
                <g key={`${sx}-${sy}`} className="proc-mol__sat">
                  <line x1={x} y1={y} x2={sx} y2={sy} />
                  <circle cx={sx} cy={sy} r={4} />
                </g>
              ))}
              <circle cx={x} cy={y} r={22} className="proc-mol__halo" />
              <circle cx={x} cy={y} r={11} className="proc-mol__core" />
              <text x={right ? x - 34 : x + 34} y={y - 6} textAnchor={right ? 'end' : 'start'} className="proc-mol__num">
                {String(i + 1).padStart(2, '0')}
              </text>
              <text x={right ? x - 34 : x + 34} y={y + 16} textAnchor={right ? 'end' : 'start'} className="proc-mol__name">
                {labels[i]}
              </text>
            </a>
          );
        })}
      </svg>
    </nav>
  );
}
