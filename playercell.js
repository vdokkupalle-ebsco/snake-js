class PlayerCell {
  constructor(startX, startY) {
    this.currentX = startX;
    this.currentY = startY;
  }
  updatePosition(deltaX, deltaY) {
    this.prevX = this.currentX;
    this.prevY = this.currentY;

    this.currentX += deltaX;
    this.currentY += deltaY;
  }
}

export default PlayerCell;
