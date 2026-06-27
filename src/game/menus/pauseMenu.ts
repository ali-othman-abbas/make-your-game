const pauseMenu = document.querySelector<HTMLElement>(".pause-menu")!;
const conBtn = document.querySelector<HTMLElement>(".pause-menu-continue-button")!;
const restartBtn = document.querySelector<HTMLElement>(".pause-menu-restart-button")!;

let conLambda = () => {};
let restartLambda = () => {};

conBtn.addEventListener("click", () => conLambda());
restartBtn.addEventListener("click", () => restartLambda());

export function putPauseMenu(
  onContinue: () => void,
  onRestart: () => void,
) {
  pauseMenu.hidden = false;
  conLambda = () => {
    pauseMenu.hidden = true;
    onContinue();
  }
  restartLambda = () => {
    pauseMenu.hidden = true;
    onRestart();
  }
}

export function removePauseMenu() {
  pauseMenu.hidden = true;
}
