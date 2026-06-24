
export type box = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
export type boundable = {
  getBoundingBox(): box;
};