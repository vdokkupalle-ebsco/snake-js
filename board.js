import BoardCell from "./boardcell.js";
import theme from "./theme.js";

class Board {
  constructor(noOfCells, cellSize, canvas) {
    this.noOfCells = noOfCells;
    this.cellSize = cellSize;
    this.canvas = canvas;
    this.cells = [];
    this.canvas.style.width = `${noOfCells * cellSize}px`;
    this.canvas.style.height = `${noOfCells * cellSize}px`;
    this.canvas.style.display = "flex";
    this.canvas.style.flexWrap = "wrap";
    for (let i = 0; i < noOfCells; i++) {
      this.cells.push([]);
      for (let j = 0; j < noOfCells; j++) {
        const cell = new BoardCell(i, j, cellSize);
        this.cells[i].push(cell);
        this.canvas.appendChild(cell.view);
      }
    }
  }
  renderFood(foodX, foodY) {
    this.cells[foodY][foodX].view.style.backgroundColor =
      theme.colors.CELL_HIGHLIGHT;
  }
}

export default Board;
