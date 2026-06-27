const gameOver = document.querySelector<HTMLElement>(".game-over")!;
const gameOverScore = document.querySelector<HTMLElement>(".game-over-score")!;
const tryAgainBtn = document.querySelector<HTMLElement>(
  ".game-over-restart-button",
)!;

let tryAgainLambda = () => {};

tryAgainBtn.addEventListener("click", () => tryAgainLambda());

export function putGameOver(onTryAgain: () => void, score: number) {
  gameOver.hidden = false;
  gameOverScore.textContent = `${score}`;
  tryAgainLambda = () => {
    gameOver.hidden = true;
    onTryAgain();
  };
}
