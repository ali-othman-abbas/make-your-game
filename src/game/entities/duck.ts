import type DrawComponent from "../../gameEngine/components/DrawComponent.js";
import Vec from "../math/vector.js";
import type { Boundable, Box } from "../../gameEngine/collision.js";

export default class Duck implements Boundable {
  position!: Vec;
  velocity!: Vec;
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
    this.spawn();
    this.drawComp = drawComp;
    this.drawComp.setWidth(width);
    this.drawComp.setHeight(height);
    this.drawComp.setColor("yellow");
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

  spawn() {
    this.position = new Vec(
      Math.random() * (window.innerWidth - this.width),
      Math.random() * (window.innerHeight - this.height),
    );
    const angle = Math.random() * Math.PI * 2;
    this.velocity = new Vec(Math.cos(angle), Math.sin(angle));
  }

  getBoundingBox(): Box {
    return {
      top: this.position.y,
      bottom: this.position.y + this.height,
      left: this.position.x,
      right: this.position.x + this.width,
    };
  }
}