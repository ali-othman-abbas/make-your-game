export type Game = {
  update(): void;
  render(): void;
}

export function startGame(game: Game, { tps = 120}: { tps?: number} = {}) {
  //fixed updates
  setInterval(() => {
    game.update();
  }, 1000 / tps);

  //makes the game update once every frameStep
  let lastFrameCheck = performance.now();
  let frameCount = 0;
  function frame(now: number) {
    frameCount++;
    game.render();

    //if a second passes, print the framerate
    if (now - lastFrameCheck >= 1000) {
      console.log(`FPS: ${frameCount}`)
      lastFrameCheck = now;
      frameCount = 0;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// export function startGame(game: Game, { tps = 120, fps = 60 }: { tps?: number; fps?: number; } = {}) {
//   //fixed updates
//   setInterval(() => {
//     game.update();
//   }, 1000 / tps);

//   //makes the game update once every frameStep
//   const frameStep = 1000 / fps;
//   let lastRender = performance.now();
//   let lastFrameCheck = performance.now();
//   let frameCount = 0;
//   function frame(now: number) {
//     if (now - lastRender >= frameStep ) {
//       frameCount++;
//       game.render();
//       lastRender = lastRender + frameStep
//       //if we go to a different tab, frames stop going out, now becomes really big
//       if (now - lastRender >= frameStep * 5) {
//         lastRender = now;
//       }
//     }

//     //if a second passes, print the framerate
//     if (now - lastFrameCheck >= 1000) {
//       console.log(`FPS: ${frameCount}`)
//       lastFrameCheck = now;
//       frameCount = 0;
//     }
//     requestAnimationFrame(frame);
//   }
//   requestAnimationFrame(frame);
// }