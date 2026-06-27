import Vec from "./math/vector.js";


const bullets = document.querySelectorAll<HTMLElement>(".bullet")!;
const score = document.querySelector<HTMLElement>("#score")!;
const fps = document.querySelector<HTMLElement>("#fps")!;
const impactFrame = document.querySelector<HTMLElement>(".impactFrame")!;
const flash = document.querySelector<HTMLElement>(".flash")!;


export function setScore(num: number) {
  score.textContent = `${num}`;
}

export function setFPS(num: number) {
  fps.textContent = `${num}`;
}

export function displayAvailableBullets(available: number) {
  for (let j = 0; j < 3; j++) {
    bullets.item(j).hidden = false;
  }
  for (let j = 2; j > available - 1; j--) {
    bullets.item(j).hidden = true;
  }
}

