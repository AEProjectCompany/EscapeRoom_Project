const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const size = 100;
const gridSize = 3; // Changed to 3x3 for more challenge
let tiles = [];
let empty = { x: 2, y: 2 };
let gameWon = false;
const secretCode = 'alohomora';

// House colors
const houseColors = {
    gryffindor: '#740001', // Deep red
    slytherin: '#1a472a',  // Deep green
    ravenclaw: '#0e1a40',  // Deep blue
    hufflepuff: '#ecb939'  // Yellow
};

// Initialize tiles
function initTiles() {
    tiles = [];
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (x === 2 && y === 2) {
                tiles.push(null);
            } else {
                tiles.push({ 
                    number: y * gridSize + x + 1, 
                    x, 
                    y,
                    house: getHouseForTile(y * gridSize + x + 1)
                });
            }
        }
    }
    shuffleTiles();
}

// Assign houses to tiles
function getHouseForTile(number) {
    const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
    return houses[Math.floor((number - 1) / 2)];
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
        // Magical effect for winning
        ctx.fillStyle = "#d3a625";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add sparkle effect
        for (let i = 0; i < 10; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 5,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
        
        ctx.fillStyle = "#ae0001";
        ctx.font = "30px 'Mystery Quest', system-ui";
        ctx.textAlign = "center";
        ctx.fillText("Alohomora", canvas.width / 2, canvas.height / 2);
        return;
    }
    
    tiles.forEach((tile, index) => {
        if (tile) {
            let x = index % gridSize;
            let y = Math.floor(index / gridSize);
            
            // Draw house-colored background
            ctx.fillStyle = houseColors[tile.house];
            ctx.fillRect(x * size, y * size, size, size);
            
            // Add magical border effect
            ctx.strokeStyle = '#d3a625';
            ctx.lineWidth = 2;
            ctx.strokeRect(x * size, y * size, size, size);
            
            // Draw house symbol
            ctx.fillStyle = '#ffffff';
            ctx.font = "20px 'Mystery Quest', system-ui";
            ctx.textAlign = "center";
            ctx.fillText(tile.house[0].toUpperCase(), x * size + size / 2, y * size + size / 2 + 7);
            
            // Draw tile number
            ctx.fillStyle = '#ffffff';
            ctx.font = "12px Arial";
            ctx.fillText(tile.number, x * size + size / 2, y * size + size - 5);
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
    draw();
}

// Handle canvas clicks
canvas.addEventListener("click", (e) => {
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / size);
    let y = Math.floor((e.clientY - rect.top) / size);
    moveTile(x, y);
});

function openDoor() {
    let userAttempt = prompt('Repeat the spell you just read, it will open the door!').toLowerCase();
    if (userAttempt === secretCode) {
        // change background picture to next room
    } else {
        alert('No, no... I think it said "Alohomora" !');
    }
}

// Initialize game
canvas.width = gridSize * size;
canvas.height = gridSize * size;
initTiles();
draw();
