// Example with comments

const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const size = 100;
const gridSize = 2;
let tiles = [];
let empty = { x: 3, y: 3 };
let gameWon = false;
let randomNumber = null;

/*
    Initializes the tile grid:
    - Creates a 4x4 grid of numbered tiles.
    - The last tile (bottom-right corner) is set as empty (null).
    - Calls shuffleTiles() to randomize the positions.
*/
function initTiles() {
    tiles = [];  
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (x === 1 && y === 1) {
                tiles.push(null); // Set the last tile as empty
            } else {
                tiles.push({ number: y * gridSize + x + 1, x, y }); // Assign numbers in order
            }
        }   
    }
    shuffleTiles(); // Randomize the tile positions
}

/*
    Shuffles the tiles using the Fisher-Yates algorithm:
    - Iterates through the tile array in reverse.
    - Randomly swaps each tile with another tile earlier in the array.
    - Ensures a solvable configuration by leaving the empty tile in place.
*/
function shuffleTiles() {
    for (let i = tiles.length - 2; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        if (tiles[i] && tiles[j]) {
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]]; // Swap tiles
        }
    }
    updateEmptyPosition(); // Locate where the empty tile is after shuffling
}

/*
    Finds the empty tile's new position after shuffling:
    - Loops through the tile array to find the null tile.
    - Updates the `empty.x` and `empty.y` values.
*/
function updateEmptyPosition() {
    tiles.forEach((tile, index) => {
        if (!tile) {
            empty.x = index % gridSize;
            empty.y = Math.floor(index / gridSize);
        }
    });
}

/*
    Draws the current game state on the canvas:
    - Clears the canvas before drawing.
    - If the game is won, displays a 3-digit number.
    - Otherwise, draws each tile with a number and a border.
*/
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (gameWon) {
        // Display the winning message with a random 3-digit number
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.font = "50px 'Comic Sans MS', cursive"; // Cool font!
        ctx.fillText(randomNumber, canvas.width / 2 - 40, canvas.height / 2);
        return;
    }
    
    // Draw each tile
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

/*
    Handles tile movement when clicked:
    - Checks if the clicked tile is next to the empty space.
    - Swaps the clicked tile with the empty space if valid.
    - Updates the empty tile’s position and redraws the grid.
*/
function moveTile(x, y) {
    if (gameWon) return; // Prevent movement after winning
    
    const dx = Math.abs(x - empty.x);
    const dy = Math.abs(y - empty.y);
    
    // A tile can move only if it's adjacent to the empty space
    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
        let tileIndex = y * gridSize + x;
        let emptyIndex = empty.y * gridSize + empty.x;
        
        // Swap the clicked tile with the empty space
        [tiles[tileIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[tileIndex]];
        
        // Update empty tile's position
        empty.x = x;
        empty.y = y;
        
        draw(); // Redraw the updated board
        checkWin(); // Verify if the puzzle is solved
    }
}

/*
    Checks if the puzzle is solved:
    - Verifies that all tiles are in the correct order.
    - If so, sets `gameWon` to true and generates a random 3-digit number.
*/
function checkWin() {
    for (let i = 0; i < tiles.length - 1; i++) {
        if (!tiles[i] || tiles[i].number !== i + 1) return; // If any tile is misplaced, return
    }
    gameWon = true; // Puzzle solved!
    randomNumber = Math.floor(Math.random() * 1000); // Generate 3-digit number
    draw(); // Show the final screen
}

/*
    Listens for clicks on the canvas:
    - Converts mouse click position to grid coordinates.
    - Calls moveTile() to attempt a move.
*/
canvas.addEventListener("click", (e) => {
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / size);
    let y = Math.floor((e.clientY - rect.top) / size);
    moveTile(x, y);
});

// Setup canvas size and start the game
canvas.width = gridSize * size;
canvas.height = gridSize * size;
initTiles();
draw();
