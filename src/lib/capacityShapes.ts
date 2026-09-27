/** Geometría y escalas de los siete formatos de Capacidad productiva. */
export interface CapacityShape {
  d: string;
  stages: readonly (readonly [number, number])[];
}

const blister = (() => {
  let d = 'M30 236 H90 Q94 236 94 232 V140 Q94 136 90 136 H30 Q26 136 26 140 V232 Q26 236 30 236 Z';
  [42, 60, 78].forEach((x) =>
    [153, 170, 187, 204, 221].forEach((y) => {
      d += ` M${x - 7} ${y} a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0`;
    }),
  );
  return d;
})();

export const CAPACITY_SHAPES: Record<string, CapacityShape> = {
  dropper: {
    stages: [[1, 1], [1.12, 1.3], [1.25, 1.62]],
    d: 'M42 236 H78 Q82 236 82 232 V178 Q82 172 76 166 L70 160 V152 H50 V160 L44 166 Q38 172 38 178 V232 Q38 236 42 236 Z M46 152 V138 Q46 136 48 136 H72 Q74 136 74 138 V152 Z M54 136 V124 Q54 117 60 117 Q66 117 66 124 V136',
  },
  vials: {
    stages: [[1, 1], [1.1, 1.4], [1.2, 1.8]],
    d: 'M44 236 H76 Q80 236 80 232 V158 Q80 154 76 154 H44 Q40 154 40 158 V232 Q40 236 44 236 Z M43 154 V150 H77 V154 M42 150 V130 Q42 126 46 126 H74 Q78 126 78 130 V150 Z',
  },
  jar: {
    stages: [[1, 1], [1.12, 1.4], [1.24, 1.8], [1.36, 2.2]],
    d: 'M36 236 H84 Q90 236 90 230 V180 Q90 172 82 172 H38 Q30 172 30 180 V230 Q30 236 36 236 Z M38 172 V164 H82 V172 M34 164 V146 Q34 142 38 142 H82 Q86 142 86 146 V164 Z M34 153 H86',
  },
  syrups: {
    stages: [[1, 1], [1.12, 1.45], [1.26, 1.95]],
    d: 'M40 236 H80 Q86 236 86 230 V196 Q86 180 72 172 V164 H48 V172 Q34 180 34 196 V230 Q34 236 40 236 Z M46 164 V158 H74 V164 M44 158 V144 Q44 140 48 140 H72 Q76 140 76 144 V158 Z',
  },
  blisters: { stages: [[1, 1], [1.16, 1.16]], d: blister },
  sticks: {
    stages: [[1, 1], [1.12, 1.55]],
    d: 'M50 236 H70 V120 H50 Z M50 128 H70 M50 228 H70 M52 128 A8 8 0 0 0 68 128 M52 228 A8 8 0 0 1 68 228',
  },
  sachets: { stages: [[1, 1]], d: 'M24 236 H96 V150 H36 L24 162 Z M34 226 H86 V160 H34 Z' },
};

export function softScale([sx, sy]: readonly [number, number]): [number, number] {
  const factor = 0.55;
  return [1 + (sx - 1) * factor, 1 + (sy - 1) * factor];
}
