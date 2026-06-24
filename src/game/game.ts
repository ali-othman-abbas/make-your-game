import * as engine from "../gameEngine/engine.js"
import Duck from "./entities/duck.js"
import CrossHair from "./entities/crossHair.js";
import DrawComponent from "./components/DrawComponent.js";
import Vec from "./math/vector.js";
import * as input from "../gameEngine/input.js"
import type { boundable } from "./entities/utils.js";

export default class Game implements engine.Game {
  duck: Duck;
  crossHair: CrossHair;
  bullets: number = 3;

  constructor(gameRoot: HTMLElement) {
    this.duck = new Duck(new DrawComponent(gameRoot));
    this.crossHair = new CrossHair(
      new DrawComponent(gameRoot),
      new Vec(window.innerWidth / 2, window.innerHeight / 2),
    );
  }
  update() {
    if (input.wasKeyPressed("Space") && this.bullets > 0) {
      this.bullets--;
      console.log(this.bullets)
      if (
        this.isIntersect(this.crossHair, this.duck)
      ) {
        this.duck.spawn();
        this.bullets = 3;
      }
    }
    this.crossHair.update();
    this.duck.update();
    
  }

  render() {
    this.crossHair.render();
    this.duck.render();
  }


  private isIntersect(entity1: boundable, entity2: boundable): boolean {
    const a = entity1.getBoundingBox();
    const b = entity2.getBoundingBox();
    return (
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
    );
  }

}