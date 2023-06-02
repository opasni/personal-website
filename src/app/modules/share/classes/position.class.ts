export class Position {
  public top: number = 0;
  public bottom: number = 0;

  constructor(isTop?: boolean, isBottom?: boolean) {
    if (isTop === true) {
      this.top = 1;
    }
    if (isBottom === true) {
      this.bottom = 1;
    }
  }

  add(update: Position) {
    if (update.top === 0) {
      this.top = 0;
    } else {
      this.top += update.top;
    }
    if (update.bottom === 0) {
      this.bottom = 0;
    } else {
      this.bottom += update.bottom;
    }
  }
}