export default class Snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  snake: HTMLElement;

  constructor() {
    this.head = document.querySelector("#snake>div")!;
    this.snake = document.querySelector("#snake")!;
    this.bodies = this.snake.getElementsByTagName("div");
  }
  /* get and set head position */
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  set X(val: number) {
    if (val < 0 || val > 290) {
      throw new Error("Snake hit the border!");
    }
    //move up or down, so do not need to set X
    if (this.X === val) {
      return;
    }

    // forbid moving reversely
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
      if (val > this.X) {
        val = this.X - 10;
      } else {
        val = this.X + 10;
      }
    }
    this.moveBody();
    this.head.style.left = val + "px";
    this.checkHeadBody();
  }
  set Y(val: number) {
    if (val < 0 || val > 290) {
      throw new Error("Snake hits the border!");
    }
    //move left or right, so do not need to set Y
    if (this.Y === val) {
      return;
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
      if (val > this.Y) {
        val = this.Y - 10;
      } else {
        val = this.Y + 10;
      }
    }

    this.moveBody();
    this.head.style.top = val + "px";
    this.checkHeadBody();
  }

  //add body part when eating food
  addBody() {
    let tempDiv = document.createElement("div");
    this.snake.insertAdjacentElement("beforeend", tempDiv);
    // this.snake.appendChild(document.createElement("div"));
  }
  // moving body following one by one before setting head pos
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = x + "px";
      (this.bodies[i] as HTMLElement).style.top = y + "px";
    }
  }
  // check whether snake hit itself
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error("Snake hits ifself!");
      }
    }
  }
}
