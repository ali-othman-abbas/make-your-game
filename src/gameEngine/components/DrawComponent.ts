type Color = "blue" | "red" | "orange" | "green" | "yellow" | "brown" | "white" | "black";
export default class DrawComponent {
  el: HTMLElement;
  constructor(ele: HTMLElement) {
    this.el = ele;
    this.el.style.position = `absolute`;
    this.el.style.inset = `0`;
  }

  moveTo(x: number, y: number) {
    this.el.style.transform = `translate(${x}px, ${y}px)`;
  }

  setText(text: string, fontSize: number, center: boolean = true) {
    this.el.textContent = text;
    this.el.style.fontSize = `${fontSize}px`;
    if (center) {
      this.el.style.display = "flex";
      this.el.style.justifyContent = "center";
      this.el.style.alignItems = "center";
    }
  }

  setWidth(width: number) {
    this.el.style.width = `${width}px`;
  }

  setHeight(height: number) {
    this.el.style.height = `${height}px`;
  }

  setFullWidth() {
    this.el.style.width = `100%`;
  }

  setFullHeight() {
    this.el.style.height = `100%`;
  }

  setColor(color: Color) {
    this.el.style.background = `${color}`;
  }

  setHidden(bool: boolean) {
    this.el.hidden = bool;
  }

  setForgroundColor(color: Color) {
    this.el.style.color = color;
  }
}
