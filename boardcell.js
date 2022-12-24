import theme from "./theme.js";

class BoardCell {
  constructor(x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.cellSize = cellSize;
    this.view = document.createElement("div");
    //this.view.appendChild(document.createTextNode(`${x} ${y}`));
    this.view.style.width = `${cellSize}px`;
    this.view.style.height = `${cellSize}px`;
    this.view.style.backgroundColor = theme.colors.CELL_BACKGROUND;
    this.view.style.border = `1px solid ${theme.colors.CELL_BORDER}`;
    this.view.style.boxSizing = "border-box";
    //this.view.style.position = "absolute";
    //this.view.style.left = `${x * cellSize}px`;
    //this.view.style.top = `${y * cellSize}px`;
  }
}

export default BoardCell;
