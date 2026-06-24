import * as engine from "./gameEngine/engine.js";
import * as input from "./gameEngine/input.js";
import DrawComponent from "./gameEngine/components/DrawComponent.js";

class Vec {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  scale(k: number): Vec {
    return new Vec(this.x * k, this.y * k);
  }
  add(u: Vec): Vec {
    return new Vec(this.x + u.x, this.y + u.y);
  }
  normalize() {
    return this.scale(1 / this.length());
  }
}

class Duck {
  position: Vec;
  velocity: Vec;
  baseSpeed: number = 5;
  width: number;
  height: number;
  drawComp: DrawComponent;

  constructor(
    drawComp: DrawComponent,
    width: number = 50,
    height: number = 50,
  ) {
    this.width = width;
    this.height = height;
    this.drawComp = drawComp;
    this.drawComp.addClass("duck");
    this.position = new Vec(
      Math.random() * (window.innerWidth - this.width),
      Math.random() * (window.innerHeight - this.height),
    );
    const angle = Math.random() * Math.PI * 2;
    this.velocity = new Vec(Math.cos(angle), Math.sin(angle));
  }

  update() {
    if (this.position.x + this.width > window.innerWidth) {
      this.position.x = window.innerWidth - this.width;
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.y + this.height > window.innerHeight) {
      this.position.y = window.innerHeight - this.height;
      this.velocity.y = -this.velocity.y;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y = -this.velocity.y;
    }
    this.position = this.position.add(this.velocity.scale(this.baseSpeed));
  }

  render() {
    const { x, y } = this.position;
    this.drawComp.moveTo(x, y);
  }
}

class CrossHair {
  position: Vec;
  speed: number = 5;
  drawComp: DrawComponent;
  constructor(drawComp: DrawComponent, position: Vec) {
    this.position = position;
    this.drawComp = drawComp;
    this.drawComp.setText("+");
    this.drawComp.addClass("crossHair");
  }

  update() {
    let velocity: Vec = new Vec(0, 0);
    if (input.isKeyDown("w")) {
      velocity.y -= 1;
    }
    if (input.isKeyDown("a")) {
      velocity.x -= 1;
    }
    if (input.isKeyDown("s")) {
      velocity.y += 1;
    }
    if (input.isKeyDown("d")) {
      velocity.x += 1;
    }

    this.position.add(velocity.normalize().scale(this.speed));
  }

  render() {
    const { x, y } = this.position;
    this.drawComp.moveTo(x, y);
  }
}

class Game implements engine.Game {
  duck: Duck;
  crossHair: CrossHair;
  constructor(gameRoot: HTMLElement) {
    this.duck = new Duck(new DrawComponent(gameRoot));
    this.crossHair = new CrossHair(
      new DrawComponent(gameRoot),
      new Vec(window.innerWidth / 2, window.innerHeight / 2),
    );
  }
  update() {
    if (input.isKeyDown(' ') && isIntersect(this.duck, this.crossHair)) {
      
    }
    this.crossHair.update();
    this.duck.update();
  }

  render() {
    this.crossHair.render();
    this.duck.render();
  }
}

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
