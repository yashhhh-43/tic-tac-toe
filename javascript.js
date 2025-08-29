// Select DOM elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');

// Game state variables
let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = true;

// Winning combinations
const winConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

// Handle player click
function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;

  makeMove(index, 'X');
  if (gameActive) setTimeout(aiMove, 500); // AI responds after short delay
}

// Make a move
function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;

  if (checkWin(player)) {
    statusText.textContent = `Player ${player} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== '')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = player === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// AI move (random)
function aiMove() {
  const emptyIndices = board
    .map((val, idx) => val === '' ? idx : null)
    .filter(idx => idx !== null);

  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, 'O');
}

// Check for win
function checkWin(player) {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] === player && board[b] === player && board[c] === player;
  });
}

// Reset game
function resetGame() {
  board.fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);