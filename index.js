import Board from "./board.js";
import direction from "./direction.js";
import Player from "./player.js";

const NO_CELLS = 20;
const CELL_SIZE = 20;

let dir = direction.RIGHT;
let foodX, foodY;
let dirStack = [];

const canvas = document.querySelector("#canvas");

const board = new Board(NO_CELLS, CELL_SIZE, canvas);

const player = new Player();
createRandomFood();

function createRandomFood() {
  const x = Math.floor(Math.random() * NO_CELLS);
  const y = Math.floor(Math.random() * NO_CELLS);
  foodX = x;
  foodY = y;
}

let maxSpeed = 100;
let minSpeed = 300;
let speedIncrement = 10;
let currentSpeed = minSpeed;

//player.grow();

let lastTimeStamp;
let dead = false;

function loop(timestamp) {
  if (
    lastTimeStamp === undefined ||
    (timestamp - lastTimeStamp > currentSpeed && !dead)
  ) {
    lastTimeStamp = timestamp;

    dir = dirStack.shift() || dir;
    player.move(dir);
    if (player.head.currentX === foodX && player.head.currentY === foodY) {
      player.grow();
      player.move(dir);
      currentSpeed = Math.max(maxSpeed, currentSpeed - speedIncrement);
      createRandomFood();
    }
    player.clamp(NO_CELLS);
    player.render(board);
    board.renderFood(foodX, foodY);
    dead = player.checkCollision();
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

document.addEventListener("keydown", (event) => {
  let newDirection;
  switch (event.key) {
    case "ArrowLeft":
      if (dir !== direction.RIGHT) newDirection = direction.LEFT;
      break;
    case "ArrowUp":
      if (dir !== direction.DOWN) newDirection = direction.UP;
      break;
    case "ArrowRight":
      if (dir !== direction.LEFT) newDirection = direction.RIGHT;
      break;
    case "ArrowDown":
      if (dir !== direction.UP) newDirection = direction.DOWN;
      break;
  }
  if (newDirection !== undefined) {
    dirStack.push(newDirection);
  }
});
