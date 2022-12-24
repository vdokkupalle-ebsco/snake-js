import PlayerCell from "./playercell.js";
import theme from "./theme.js";
import DIRECTION from "./direction.js";

class Player {
  constructor() {
    this.length = 3;
    this.head = new PlayerCell(2, 0);
    this.playerCells = [this.head, new PlayerCell(1, 0), new PlayerCell(0, 0)];
  }

  move(direction) {
    let deltaX = 0;
    let deltaY = 0;
    switch (direction) {
      case DIRECTION.LEFT:
        deltaX = -1;
        break;
      case DIRECTION.UP:
        deltaY = -1;
        break;
      case DIRECTION.RIGHT:
        deltaX = 1;
        break;
      case DIRECTION.DOWN:
        deltaY = 1;
        break;
    }
    this.moveHead(deltaX, deltaY);
    this.moveOthers();
  }

  clamp(noOfCells) {
    const [x, y] = this.clampPosition(
      noOfCells,
      this.head.currentX,
      this.head.currentY
    );
    this.head.currentX = x;
    this.head.currentY = y;
  }

  clampPosition(noOfCells, x, y) {
    if (x < 0) {
      x = noOfCells - 1;
    }
    if (x >= noOfCells) {
      x = 0;
    }
    if (y < 0) {
      y = noOfCells - 1;
    }
    if (y >= noOfCells) {
      y = 0;
    }
    return [x, y];
  }

  grow() {
    this.length++;

    const newCellX = this.playerCells[this.playerCells.length - 1].prevX;
    const newCellY = this.playerCells[this.playerCells.length - 1].prevY;

    const newCell = new PlayerCell(newCellX, newCellY);

    this.playerCells.push(newCell);
  }

  moveHead(deltaX, deltaY) {
    this.head.updatePosition(deltaX, deltaY);
  }

  moveOthers() {
    for (let i = 1; i < this.playerCells.length; i++) {
      const currentCell = this.playerCells[i];
      const prevCell = this.playerCells[i - 1];
      currentCell.prevX = currentCell.currentX;
      currentCell.prevY = currentCell.currentY;
      currentCell.currentX = prevCell.prevX;
      currentCell.currentY = prevCell.prevY;
    }
  }

  render(board) {
    for (let i = 0; i < this.playerCells.length; i++) {
      const playerCell = this.playerCells[i];
      this.updateCellOnBoard(board, playerCell);
    }
  }

  checkCollision() {
    for (let i = 1; i < this.playerCells.length; i++) {
      const currentCell = this.playerCells[i];
      if (
        currentCell.currentX === this.head.currentX &&
        currentCell.currentY === this.head.currentY
      ) {
        return true;
      }
    }
  }

  updateCellOnBoard(board, playerCell) {
    board.cells[playerCell.currentY][
      playerCell.currentX
    ].view.style.backgroundColor = theme.colors.CELL_HIGHLIGHT;
    if (playerCell.prevX !== undefined) {
      board.cells[playerCell.prevY][
        playerCell.prevX
      ].view.style.backgroundColor = theme.colors.CELL_BACKGROUND;
    }
  }
}

export default Player;
