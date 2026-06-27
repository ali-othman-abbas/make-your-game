import * as engine from "../gameEngine/engine.js";
import * as input from "../gameEngine/input.js";
import Duck from "./entities/duck.js";
import CrossHair from "./entities/crossHair.js";
import ImpactFrame from "./entities/impactFrame.js";
import DrawComponent from "../gameEngine/components/DrawComponent.js";
import Vec from "./math/vector.js";
import { bothIntersect } from "../gameEngine/collision.js";
import * as hud from "./hud.js";
import * as pauseMenu from "./menus/pauseMenu.js";
import { putGameOver } from "./menus/gameOver.js";
import { putStartMenu } from "./menus/startMenu.js";
import type { State } from "./states.js";


export default class Game implements engine.Game {
  duck: Duck;
  crossHair: CrossHair;
  impactFrame: ImpactFrame;
  bullets: number = 3;
  kills: number = 0;
  state: State = "pause";

  constructor(
    duckDrawComp: DrawComponent,
    crossHairDrawComp: DrawComponent,
    impactFrameDrawComp: DrawComponent,
    flashDrawComp: DrawComponent,
  ) {
    this.duck = new Duck(duckDrawComp);
    this.crossHair = new CrossHair(
      crossHairDrawComp,
      new Vec(window.innerWidth / 2, window.innerHeight / 2),
    );
    this.impactFrame = new ImpactFrame(impactFrameDrawComp, flashDrawComp);

    putStartMenu(() => (this.state = "play"));
  }

  update() {
    switch (this.state) {
      case "play":
        this.onPlayState();
        break;
      case "onPauseMenu":
        this.onPauseMenuState();
        break;
      case 'onImpactFrame':
        this.state = this.impactFrame.update()
        break
      case "pause":
        return;
    }
  }

  render(fps: number) {
    this.crossHair.render();
    this.duck.render();
    hud.setFPS(fps);
  }

  private onPlayState() {
    if (this.noAmmo()) {
      this.state = "pause";
      putGameOver(() => {
        this.state = "play";
        this.iniGameState();
      }, this.kills);
      return;
    }
    if (input.wasKeyPressed("Escape")) {
      pauseMenu.putPauseMenu(
        () => (this.state = "play"),
        () => {
          this.iniGameState();
          this.state = "play";
        },
      );
      this.state = "onPauseMenu";
      return;
    }
    if (input.wasKeyPressed("Space")) {
      if (bothIntersect(this.crossHair, this.duck)) {
        this.kills++;
        hud.setScore(this.kills);
        this.shoot(true);
        this.duck.spawn();
        this.reload();
      } else {
        this.shoot(false);
      }
    }
    this.crossHair.update();
    this.duck.update();
  }

  private onPauseMenuState() {
    if (input.wasKeyPressed("Escape")) {
      pauseMenu.removePauseMenu();
      this.state = "play";
    }
  }

  private noAmmo() {
    return this.bullets === 0;
  }

  private iniGameState() {
    this.bullets = 3;
    this.kills = 0;
    this.duck.spawn();
    this.crossHair.position.x = window.innerWidth / 2;
    this.crossHair.position.y = window.innerHeight / 2;
    hud.displayAvailableBullets(this.bullets);
    hud.setScore(this.kills);
  }

  private shoot(onTarget: boolean) {
    this.bullets--;
    hud.displayAvailableBullets(this.bullets);
    if (onTarget) {
      this.state = this.impactFrame.putImpactFrame(
        this.duck.position,
        this.duck.width,
        this.duck.height,
        "red",
      );
    } else {
      this.state = this.impactFrame.putImpactFrame(
        this.crossHair.position,
        this.crossHair.width,
        this.crossHair.height,
        "white",
      );
    }
  }
  private reload() {
    this.bullets = 3;
    hud.displayAvailableBullets(this.bullets);
  }
}
