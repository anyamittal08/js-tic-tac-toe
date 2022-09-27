const squares = document.querySelectorAll('.square');
const gameInfo = document.querySelector('.game-info');


let gameboard = Array(9).fill(null);
let nextPlayer = 'X';

let winner = '';
let end = false;

const playerMove = (e) => {
    let currentIndex = parseInt(e.target.id)
    if (gameboard[currentIndex]) return;

    if (!end) {
    gameboard[currentIndex] = "X";
    e.target.innerText = "X";
    nextPlayer = "O";
    gameInfo.innerText = checkWinner() ? `${winner} wins!` : checkDraw() ? 'It\'s a draw' : 'Next Player: O';
    }
    aiMove();
}

const aiMove = () => {
    if (!end) {
        let played = false;
        while (!played) {
            let randomValidIndex = Math.floor(Math.random() * gameboard.length);
            if (!gameboard[randomValidIndex]) {
                gameboard[randomValidIndex] = 'O';
                document.getElementById(randomValidIndex).innerText = 'O';
                nextPlayer = 'X';
                played = true;
                gameInfo.innerText = checkWinner() ? `${winner} wins!` : checkDraw() ? 'It\'s a draw' : 'Next Player: X'
            }
        } 
    }
}

const checkWinner = () => {
    const winCases = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < winCases.length; i++) {
        let [a, b, c] = winCases[i];
        if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
            winCases[i].forEach((id) => document.getElementById(id).style.color = 'green');
            winner = gameboard[a];
            end = true;
            return true;
        }
    }
    return false;
}

const checkDraw = () => {
    let isDraw = true
    gameboard.forEach(square => {
      if (!square) isDraw = false;
    })
    if (isDraw) end = true;
    return isDraw
}

const restart = () => {
    gameboard = Array(9).fill(null);
    nextPlayer = 'X';

    winner = '';
    end = false;

    gameInfo.innerText = 'Click on a square to start'

    squares.forEach(square => {
        square.innerText = '';
        square.style.color = 'black';
    })
}

squares.forEach((square) => {
    square.addEventListener('click', e => {
        playerMove(e);
    })
})

document.querySelector('.restart-btn').addEventListener('click', restart);