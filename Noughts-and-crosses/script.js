// An array to store current state squares of all 9 squares. Indicates it's currently empty.
let board = Array(9).fill('') //represents 9 empty squares
let currentPlayer = 'X' //defaults to Player X to always start first
let gameActive = true //To activate/switch game on. Indacator that the game is ready to play 

// An array to represent different winning patterns
const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]              // diagonal
]

// DOM to find and store elements from index.html. To interact with, and update HTML page.
const cells = document.querySelectorAll('.cell')
const gameStatus = document.getElementById('gameStatus')
const resetBtn = document.getElementById('resetBtn')

function handleCellClick(index) {                           //indicates which cell has been clicked
    if (!gameActive || board[index] !== '') return

    // Using an array to update the board when a square is clicked
    board[index] = currentPlayer
    updateCell(index)

    const winningPattern = checkWin()                  //Checks if a player won

    if (winningPattern) {                              //if a win was found, 
        highlightWinner(winningPattern)               //visually highlights the winning cells
        endGame(`Player ${currentPlayer} Wins!`)
    } else if (board.every(cell => cell !== '')) {
        endGame("It's a Draw!")                       //stops the game and shows a message
    } else {
        // switches the player
        if (currentPlayer === 'X') {
            currentPlayer = 'O'
        } else {
            currentPlayer = 'X'
        }
    }
}

function updateCell(index) {
    // DOM - updating the square on the page to show X or O
    const cell = cells[index]
    cell.textContent = currentPlayer
    cell.classList.add('taken', currentPlayer.toLowerCase())
}

function checkWin() {
    // An array to loop through the winningPatterns to check for a winner
    return winningPatterns.find(pattern => {
        const [a, b, c] = pattern
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c]
    }) || null
}

function highlightWinner(winningPattern) {
    // An array to loop through the winning squares to highlight them
    // DOM to update each winning cell's appearance on the page
    winningPattern.forEach(index => {
        cells[index].classList.add(`winner-${currentPlayer.toLowerCase()}`)
    })
}

function endGame(message) {
    gameActive = false
    // selects the winner message colour. 
    //If X wins use eg. 'winner-message x-wins'
    //changes text colour, background, styling to correspond with winner's colour
    let messageClass
    if (currentPlayer === 'X') {
        messageClass = 'winner-message x-wins'
    } else {
        messageClass = 'winner-message o-wins'
    }
    // DOM - displaying the winner or draw message on the page
    gameStatus.innerHTML = `<div class="${messageClass}">${message}</div>`
}


//Clears the game data (board)
//Resets the player to X
//Reactivates the game
//Clears the screen (board, messages, styles)
function resetGame() {
    // An array to reset the board back to 9 empty slots
    board = Array(9).fill('')
    currentPlayer = 'X'
    gameActive = true
    // DOM to clear squares. Set it to a blank board.
    gameStatus.textContent = ''
    cells.forEach(cell => {
        cell.textContent = ''
        cell.classList.remove('taken', 'x', 'o', 'winner-x', 'winner-o')
    })

function initialiseGame() {
    // Event listener to listen for a click on each square and trigger handleCellClick
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index))
    })
    //Event Listener to listen for a click on the restart button and triggers resetGame
    resetBtn.addEventListener('click', resetGame)
}

// Event listener - will wait for page to fully load before starting the game
document.addEventListener('DOMContentLoaded', initialiseGame)

























//Brainstorm notes:
// 9 squares (array)
// 10 buttons
// 2 player game (Player X and player O)
// Players must always alternate - player can only select one square at a time
// 2 distinct colours to represent each player
// Restrict players from clicking "filled" square (reminder: use .fill method for blank squares)
// Players can win or draw: display message iif player wins OR display message if player draws
// Winner tiles should be highlighted in corresponding colour
// Players can only click emptyt/blank squares
// All squares must be clickable - reminder: add event listener to activate each click
// Add button to reset game/clear the board
// Accessibility testing: styling choices (colours) - WAVE

//During this demo, I willl showcase a game of Noughts and crosses to simlulate a real-life example
// of the Noughts and Crosses Game.

//2 player game represented by Player X and Player O
//I've designed it so that players alternate to take turns
//And I've allocated distinct colours to each player - player X is red and Player O is blue
//Players can select any tile that is blank, and when a player wins or they draw:
//a correspoding message will appear to eith indicate that PLayer X has won,
// Player O has one or it's a draw
//Also, depending on which player wins, the tiles should be highlighted in their corresponding colour
//media query
//Accessibility testing using Wave. 
