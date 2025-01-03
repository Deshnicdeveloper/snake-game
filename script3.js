// Target the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Size of each grid square
const tileCountX = canvas.width / gridSize; // Number of grid squares in x direction
const tileCountY = canvas.height / gridSize; // Number of grid squares in y direction

// Initialize game variables
let snake = [{ x: 10, y: 10 }]; // Snake starts at the center
let food = { x: 15, y: 15 }; // Food starts at the center
let direction = { x: 1, y: 0 }; // Snake starts moving to the right
let score = 0;
let isGameRunning = true;

// Draw the snake
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

// Draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check for collision with the wall or itself
  if (
    head.x < 0 ||
    head.x >= tileCountX ||
    head.y < 0 ||
    head.y >= tileCountY ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    isGameRunning = false;
    return;
  }

  snake.unshift(head); // Add the new head to the snake array

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = `Score: ${score}`;
    placeFood();
  } else {
    snake.pop(); // Remove the tail
  }
}

// Place the food randomly on the grid
function placeFood() {
  do {
    food.x = Math.floor(Math.random() * tileCountX);
    food.y = Math.floor(Math.random() * tileCountY);
  } while (
    snake.some((segment) => segment.x === food.x && segment.y === food.y)
  );
}

// Handle keyboard inputs
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Reset the game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  score = 0;
  isGameRunning = true;
  document.getElementById("score").innerText = "Score: 0";
  placeFood();
}

// Main game loop
function gameLoop() {
  if (isGameRunning) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
  } else {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
    ctx.fillText(
      `Score: ${score}`,
      canvas.width / 2 - 50,
      canvas.height / 2 + 40
    );
    return;
  }

  setTimeout(gameLoop, 100);
}

// Initialize the game
resetGame();
gameLoop();
