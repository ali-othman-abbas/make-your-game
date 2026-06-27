export type Game = {
  update(): void;
  render(fps: number): void;
}

export function startGame(game: Game, { tps = 120}: { tps?: number} = {}) {
  //fixed updates
  setInterval(() => {
    game.update();
  }, 1000 / tps);

  //makes the game update once every frameStep
  let lastFrameCheck = performance.now();
  let fps = 0;
  let frameCount = 0;
  function frame(now: number) {
    frameCount++;
    game.render(fps);

    //if a second passes, update the frame rate
    if (now - lastFrameCheck >= 1000) {
      fps = frameCount;
      lastFrameCheck = now;
      frameCount = 0;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}