//we target the canva
const canva = document.getElementById("gameCanvas");
const ctx = canva.getContext("2d"); // 2d rendering context

const gridSize = 20; // size of each grid square
const tileCountX = canva.width / gridSize; // number of grid squares in x direction

console.table(tileCountX);
console.table(canva.width);

// let's create the snake and food
let snake = [{ x: 10, y: 10 }]; // snake starts at the center
let food = { x: 15, y: 15 }; // food starts at the center
let direction = { x: 0, y: 0 }; // snake starts moving to the right
let score = 0;

//Draw the snake and food
function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * gridSize,
      segment.y * gridSize,
      gridSize,
      gridSize
    );
  });
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}
