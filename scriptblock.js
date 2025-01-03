// Targeting canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Grid settings
const gridSize = 30;
const columns = Math.floor(canvas.width / gridSize);
const rows = Math.floor(canvas.height / gridSize);

// const columns = canvas.width / gridSize;
// const rows = canvas.height / gridSize;

// Game variables
let score = 0;
let gameOver = false;
const tetrominoes = [
  // L-shape
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
  ],
  // T-shape
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
  ],
  // Square
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  // Line
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
];

let currentTetromino = [];
let grid = [];
let position = { x: 0, y: 0 };

// Initialize grid
function initializeGrid() {
  console.log(`Columns: ${columns}, Rows: ${rows}`);

  grid = Array.from({ length: rows }, () => Array(columns).fill(0));
}

// Create a new tetromino
function spawnTetromino() {
  const tetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
  currentTetromino = tetromino.map((block) => ({ ...block }));
  position = { x: Math.floor(columns / 2) - 1, y: 0 };

  // Check game over
  if (collision(0, 0)) {
    gameOver = true;
    document.getElementById("gameOverText").classList.remove("hidden");
  }
}

// Draw grid and tetrominoes
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw static blocks
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (grid[row][col] !== 0) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(col * gridSize, row * gridSize, gridSize, gridSize);
      }
    }
  }

  // Draw active tetromino
  currentTetromino.forEach((block) => {
    const x = position.x + block.x;
    const y = position.y + block.y;
    ctx.fillStyle = "lime";
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
  });
}

// Check for collision
function collision(offsetX, offsetY) {
  return currentTetromino.some((block) => {
    const x = position.x + block.x + offsetX;
    const y = position.y + block.y + offsetY;
    return x < 0 || x >= columns || y >= rows || (y >= 0 && grid[y][x] !== 0);
  });
}

// Merge tetromino into the grid
function mergeTetromino() {
  currentTetromino.forEach((block) => {
    const x = position.x + block.x;
    const y = position.y + block.y;
    grid[y][x] = 1;
  });
}

// Clear completed rows
function clearRows() {
  grid = grid.filter((row) => row.some((block) => block === 0));
  const newRows = Array.from({ length: rows - grid.length }, () =>
    Array(columns).fill(0)
  );
  grid = [...newRows, ...grid];
  score += newRows.length;
  document.getElementById("score").innerText = score;
}

// Game loop
function gameLoop() {
  if (gameOver) return;

  if (!collision(0, 1)) {
    position.y++;
  } else {
    mergeTetromino();
    clearRows();
    spawnTetromino();
  }

  drawGrid();
}

// Move tetromino
document.addEventListener("keydown", (event) => {
  if (gameOver) return;

  switch (event.key) {
    case "ArrowLeft":
      if (!collision(-1, 0)) position.x--;
      break;
    case "ArrowRight":
      if (!collision(1, 0)) position.x++;
      break;
    case "ArrowDown":
      if (!collision(0, 1)) position.y++;
      break;
    case " ":
      while (!collision(0, 1)) position.y++;
      break;
    case "r":
    case "R":
      if (gameOver) {
        initializeGrid();
        spawnTetromino();
        score = 0;
        document.getElementById("score").innerText = score;
        document.getElementById("gameOverText").classList.add("hidden");
        gameOver = false;
      }
      break;
  }
  drawGrid();
});

// Start the game
initializeGrid();
spawnTetromino();
setInterval(gameLoop, 500);
