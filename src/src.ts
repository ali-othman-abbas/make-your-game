import * as engine from "./gameEngine/engine.js";
import DrawComponent from "./gameEngine/components/DrawComponent.js";
import Game from "./game/game.js";

function main() {
  const gameEl = document.querySelector<HTMLElement>(".game");
  if (!gameEl) {
    throw new Error("the game html element isn't specified.");
  }
  const duckEl = document.querySelector<HTMLElement>("#duck");
  if (!duckEl) {
    throw new Error("the duck html element isn't specified.");
  }
  const crossHairEl = document.querySelector<HTMLElement>("#crossHair");
  if (!crossHairEl) {
    throw new Error("the crosshair html element isn't specified.");
  }
  //i don't care anymore
  const impactFrameEl = document.querySelector<HTMLElement>('.impactFrame')!;
  const flashEl = document.querySelector<HTMLElement>('.flash')!;
  
  const duckDrawComp = new DrawComponent(duckEl);
  const crossHairDrawComp = new DrawComponent(crossHairEl);
  const impactFrameDrawComp = new DrawComponent(impactFrameEl);
  const flashDrawComp = new DrawComponent(flashEl);
  
  const game = new Game(duckDrawComp, crossHairDrawComp, impactFrameDrawComp, flashDrawComp)
  engine.startGame(game);
}

main();
