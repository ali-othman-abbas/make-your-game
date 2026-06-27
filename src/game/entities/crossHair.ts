import Vec from "../math/vector.js";
import type { Boundable, Box } from "../../gameEngine/collision.js";
import * as input from "../../gameEngine/input.js";
import type DrawComponent from "../../gameEngine/components/DrawComponent.js";

export default class CrossHair implements Boundable {
  position: Vec;
  speed: number = 5;
  drawComp: DrawComponent;
  width: number;
  height: number;
  constructor(drawComp: DrawComponent, position: Vec, width = 32, height = 32) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.drawComp = drawComp;
    this.drawComp.setText("+", this.width);
    this.drawComp.setForgroundColor('black');
    this.drawComp.setWidth(width);
    this.drawComp.setHeight(height);
  }

  update() {
    const velocity = this.getMovementDirection();

    if (velocity.length() > 0) {
      this.position = this.position.add(velocity.scale(this.speed));
    }

    this.restrictToBorders();
  }

  private getMovementDirection() {
    let velocity = new Vec(0, 0);
    if (input.isKeyDown("KeyW")) velocity.y -= 1;

    if (input.isKeyDown("KeyA")) velocity.x -= 1;

    if (input.isKeyDown("KeyS")) velocity.y += 1;

    if (input.isKeyDown("KeyD")) velocity.x += 1;

    if (velocity.length() > 0) {
      return velocity.normalize();
    }
    return velocity;
  }

  render() {
    const { x, y } = this.position;
    this.drawComp.moveTo(x, y);
  }

  getBoundingBox(): Box {
    return {
      top: this.position.y,
      bottom: this.position.y + this.height,
      left: this.position.x,
      right: this.position.x + this.width,
    };
  }

  private restrictToBorders() {
    if (this.position.x + this.width > window.innerWidth) {
      this.position.x = window.innerWidth - this.width;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.y + this.height > window.innerHeight) {
      this.position.y = window.innerHeight - this.height;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
    }
  }
}
