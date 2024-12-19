const gameBoard = document.getElementById('game-board');
const tiles = [];
let currentRow = 0;
let currentTile = 0;
const wordLength = 5;
const numberOfRows = 6;
let currentGuess = "";
let gameOver = false;
const wordList = [
    "APPLE", "CRANE", "TABLE", "CHIRP", "GRAPE", // Add more words here
    "REACT", "QUERY", "LEARN", "MAGIC", " CODES"
];

// Word Selection
const targetWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

// Check Guesses
function checkGuess(guess) {
    const results = [];
    for (let i = 0; i < wordLength; i++) {
        if (guess[i] === targetWord[i]) {
            results.push("correct");
        } else if (targetWord.includes(guess[i])) {
            results.push("present");
        } else {
            results.push("absent");
        }
    }
    return results;
}

// Create game grid
for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < wordLength; j++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tiles.push(tile);
        gameBoard.appendChild(tile);
    }
}

// Event Listener
document.addEventListener('keydown', (event) => {
    if (gameOver) return; // Stop input after game over

    const key = event.key.toUpperCase();

    if (key >= 'A' && key <= 'Z' && currentTile < wordLength) {
        tiles[currentRow * wordLength + currentTile].textContent = key;
        currentGuess += key;
        currentTile++;
    } else if (key === 'BACKSPACE' && currentTile > 0) {
        currentTile--;
        tiles[currentRow * wordLength + currentTile].textContent = '';
        currentGuess = currentGuess.slice(0, -1);
    } else if (key === 'ENTER' && currentTile === wordLength) {
        const results = checkGuess(currentGuess);

        // Update tile colors
        for (let i = 0; i < wordLength; i++) {
            const tileIndex = currentRow * wordLength + i;
            tiles[tileIndex].classList.add(results[i]);
        }

        // Check for win/loss
        if (currentGuess === targetWord) {
            gameOver = true; // Set flag to stop further input
            setTimeout(() => { alert("You win!"); }, 100); // Delay for animation
        } else if (currentRow === numberOfRows - 1) {
            gameOver = true;
            setTimeout(() => { alert(`Game Over! The word was ${targetWord}`); }, 100);
        } else {
            currentGuess = '';
            currentRow++;
            currentTile = 0;
        }
    }
});