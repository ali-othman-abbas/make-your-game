import * as engine from "./gameEngine/engine.js";
import Game from './game/game.js'


function main() {
  const gameRoot = document.querySelector<HTMLElement>(".game");
  if (gameRoot === null) {
    console.log("the game root doesn't exist");
    return;
  }
  const game = new Game(gameRoot);
  engine.startGame(game);
}

main();

