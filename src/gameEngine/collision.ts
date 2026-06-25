export type Box = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
export type Boundable = {
  getBoundingBox(): Box;
};

export function bothIntersect(entity1: Boundable, entity2: Boundable): boolean {
  const a = entity1.getBoundingBox();
  const b = entity2.getBoundingBox();
  return (
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  );
}