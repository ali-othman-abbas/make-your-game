import * as engine from "../gameEngine/engine.js";
import * as input from "../gameEngine/input.js";
import Duck from "./entities/duck.js";
import CrossHair from "./entities/crossHair.js";
import DrawComponent from "../gameEngine/components/DrawComponent.js";
import Vec from "./math/vector.js";
import { bothIntersect } from "../gameEngine/collision.js";
import * as hud from "./hud.js";

export default class Game implements engine.Game {
  duck: Duck;
  crossHair: CrossHair;
  bullets: number = 3;
  kills: number = 0;
  SinceShot: number = -1;

  constructor(gameRoot: HTMLElement) {
    this.duck = new Duck(new DrawComponent(gameRoot));
    this.crossHair = new CrossHair(
      new DrawComponent(gameRoot),
      new Vec(window.innerWidth / 2, window.innerHeight / 2),
    );
  }
  update() {
    if (this.SinceShot > -1 && performance.now() - this.SinceShot >= 200) {
      hud.endImpactFrame();
      this.SinceShot = -1;
      return;
    }
    if (input.wasKeyPressed("Space") && this.bullets > 0) {
      this.shoot();
      if (bothIntersect(this.crossHair, this.duck)) {
        this.kills++;
        this.duck.spawn();
        this.reload();
      }
    }
    this.crossHair.update();
    this.duck.update();
  }

  render() {
    this.crossHair.render();
    this.duck.render();
  }

  private shoot() {
    this.bullets--;
    hud.setScore(this.kills);
    hud.displayAvailableBullets(this.bullets);
    hud.PutImpactFrame(
      this.crossHair.position,
      this.crossHair.width,
      this.crossHair.height,
    );
    this.SinceShot = performance.now()
  }
  private reload() {
    this.bullets = 3;
    hud.displayAvailableBullets(this.bullets);
  }
}
