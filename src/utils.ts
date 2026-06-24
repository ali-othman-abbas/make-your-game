export type Vec = {
  x: number;
  y: number;
};
export function add(v1: Vec, v2: Vec): Vec {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  };
}

export function scale(v: Vec, k: number): Vec {
  return {
    x: v.x * k,
    y: v.y * k,
  };
}

export function length(v: Vec): number {
  return Math.sqrt(v.x * v.x + v.y + v.y);
}

export function normalize(v: Vec): Vec {
  return scale(v, 1 / length(v));
}
