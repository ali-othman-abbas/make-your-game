export default class Vec {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  scale(k: number): Vec {
    return new Vec(this.x * k, this.y * k);
  }
  add(u: Vec): Vec {
    return new Vec(this.x + u.x, this.y + u.y);
  }
  normalize() {
    return this.scale(1 / this.length());
  }
}