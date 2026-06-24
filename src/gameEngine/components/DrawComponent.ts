export default class DrawComponent {
  el: HTMLElement;
  constructor(gameRoot: HTMLElement) {
    this.el = document.createElement('div');
    gameRoot.append(this.el);
  }

  moveTo(x: number, y: number) {
    this.el.style.transform = `translate(${x}px, ${y}px)`;
  }
  addClass(className: string) {
    this.el.classList.add(className);
  }

  setText(text: string) {
    this.el.textContent = text;
  }
}
