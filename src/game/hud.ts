import type { Box } from "../gameEngine/collision.js";
import Vec from "./math/vector.js";

const bullets = document.querySelectorAll<HTMLHtmlElement>(".bullet")!;
const score = document.querySelector<HTMLHtmlElement>("#score")!;
const impactFrame = document.querySelector<HTMLHtmlElement>(".impactFrame")!;
const flash = document.querySelector<HTMLHtmlElement>(".flash")!;

export function setScore(num: number) {
  score.textContent = `${num}`;
}

export function displayAvailableBullets(available: number) {
  for (let j = 0; j < 3; j++) {
    bullets.item(j).hidden = false;
  }
  for (let j = 2; j > available - 1; j--) {
    bullets.item(j).hidden = true;
  }
}

export function PutImpactFrame({ x, y }: Vec, width: number, height: number) {
  impactFrame.hidden = false;
  flash.style.transform = `translate(${x}px, ${y}px)`;
  flash.style.width = `${width}px`;
  flash.style.height = `${height}px`;
  return () => {
    impactFrame.hidden = true;
  };
}

export function endImpactFrame() {
  impactFrame.hidden = true;
}