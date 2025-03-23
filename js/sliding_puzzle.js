const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const size = 100;
const gridSize = 2;
let tiles = [];
let empty = { x: 3, y: 3 };
let gameWon = false;
const secretCode = 'alohomora';

// Initialize tiles
function initTiles() {
    tiles = [];
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (x === 1 && y === 1) {
                tiles.push(null);
            } else {
                tiles.push({ number: y * gridSize + x + 1, x, y });
            }
        }
    }
    shuffleTiles();
}

// Shuffle using Fisher-Yates Algorithm
function shuffleTiles() {
    for (let i = tiles.length - 2; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        if (tiles[i] && tiles[j]) {
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
    }
    updateEmptyPosition();
}

// Update empty tile position
function updateEmptyPosition() {
    tiles.forEach((tile, index) => {
        if (!tile) {
            empty.x = index % gridSize;
            empty.y = Math.floor(index / gridSize);
        }
    });
}

// Draw the puzzle
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (gameWon) {
        ctx.fillStyle = "#d3a625";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ae0001";
        ctx.font = "30px 'Mystery Quest', system-ui"; // Adjusted font size for better visibility
        ctx.textAlign = "center"; // Align text to the center
        ctx.fillText("Alohomora", canvas.width / 2, canvas.height / 2); // Center the text
        return ;
    }

    
    tiles.forEach((tile, index) => {
        if (tile) {
            let x = index % gridSize;
            let y = Math.floor(index / gridSize);
            ctx.fillStyle = "lightblue";
            ctx.fillRect(x * size, y * size, size, size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(x * size, y * size, size, size);
            ctx.fillStyle = "black";
            ctx.font = "30px Arial";
            ctx.fillText(tile.number, x * size + size / 2 - 10, y * size + size / 2 + 10);
        }
    });
}

// Move tile if adjacent to empty space
function moveTile(x, y) {
    if (gameWon) return;
    
    const dx = Math.abs(x - empty.x);
    const dy = Math.abs(y - empty.y);
    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
        let tileIndex = y * gridSize + x;
        let emptyIndex = empty.y * gridSize + empty.x;
        [tiles[tileIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[tileIndex]];
        empty.x = x;
        empty.y = y;
        draw();
        checkWin();
    }
}

// Check if the puzzle is solved
function checkWin() {
    for (let i = 0; i < tiles.length - 1; i++) {
        if (!tiles[i] || tiles[i].number !== i + 1) return;
    }
    gameWon = true;
    secretCode = 'alohomora'; // Generate 3-digit number
    draw();
}

// Handle canvas clicks
canvas.addEventListener("click", (e) => {
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / size);
    let y = Math.floor((e.clientY - rect.top) / size);
    moveTile(x, y);
});

// Initialize game
canvas.width = gridSize * size;
canvas.height = gridSize * size;
initTiles();
draw();
