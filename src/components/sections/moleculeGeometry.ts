/**
 * Geometría de la molécula de Virens Tech (29/09/2026, 2.ª vuelta): fórmula
 * esquelética de verdad —cadena en zigzag a 120°, como se dibuja un
 * hidrocarburo—, no un gráfico de nodos. Diez vértices; los servicios ocupan
 * los impares (columna derecha, con su rótulo al lado) y de los pares salen
 * sustituyentes cortos hacia fuera. Dos enlaces dobles, como en la notación.
 */
export const VIEW = { w: 520, h: 790 } as const;
const L = 160;
const DX = L * Math.sin(Math.PI / 3);
const DY = L / 2;
const X0 = 64;
const Y0 = 34;

export const VERTICES = Array.from({ length: 10 }, (_, k) => ({
  x: k % 2 === 0 ? X0 : X0 + DX,
  y: Y0 + k * DY,
}));

/** Vértice de cada servicio (1, 3, 5, 7, 9). */
export const serviceVertex = (i: number) => 1 + 2 * i;

/** Sustituyentes: desde los vértices pares, hacia la izquierda. */
export const STUBS = [0, 2, 4, 6, 8].map((k) => ({ k, dx: -46, dy: 0 }));

/** Enlaces dobles (índice del enlace k→k+1). */
export const DOUBLE = new Set([2, 6]);

type P = { x: number; y: number };
/** Segundo trazo de un enlace doble: paralelo a `off` unidades y un 16 % más
 *  corto por cada lado, como en la notación química. */
export function offsetLine(a: P, b: P, off: number) {
  const nx = -(b.y - a.y), ny = b.x - a.x, len = Math.hypot(nx, ny) || 1;
  const s = 0.16;
  return {
    x1: a.x + (b.x - a.x) * s + (nx / len) * off,
    y1: a.y + (b.y - a.y) * s + (ny / len) * off,
    x2: b.x - (b.x - a.x) * s + (nx / len) * off,
    y2: b.y - (b.y - a.y) * s + (ny / len) * off,
  };
}
