const startMenu = document.querySelector<HTMLElement>(".game-start")!;
const startGameBtn = document.querySelector<HTMLElement>(".start-game-button")!;

let startGameLambda = () => {};

startGameBtn.addEventListener("click", () => startGameLambda());

export function putStartMenu(onStartGame: () => void) {
  startMenu.hidden = false;
  startGameLambda = () => {
    startMenu.hidden = true;
    onStartGame();
  };
}
