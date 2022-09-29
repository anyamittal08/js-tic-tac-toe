const squares = document.querySelectorAll('.square');
const gameInfo = document.querySelector('.game-info');


let gameboard = Array(9).fill(null);
let nextPlayer = 'X';
let winningSquares;

let end = false;

const scores = {
    X: 1,
    O: -1,
    tie: 0,
}

const playerMove = (e) => {
    let currentIndex = parseInt(e.target.id)
    if (gameboard[currentIndex]) return;

    if (!end) {
    gameboard[currentIndex] = "X";
    e.target.innerText = "X";
    nextPlayer = "O";
    let result = checkWinner();
    if (result.end) end = true;
    gameInfo.innerText = result.winner ? `${result.winner} wins!` : result.draw ? 'It\'s a draw' : 'Next Player: O';
    }
    aiMove();
}

const aiMove = () => {
    if (!end) {
        let bestScore = Infinity;
        let move;
        for (let i=0; i<9; i++){
            if (!gameboard[i]) {
                gameboard[i] = 'O';
                let score = minimax(gameboard, 0, true);
                gameboard[i] = null;
                if (score < bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        gameboard[move] = 'O';
        document.getElementById(move).innerText = 'O';
        nextPlayer = 'X';
        let result = checkWinner();
        if (result.end) end = true;
        gameInfo.innerText = result.winner ? `${result.winner} wins!` : result.draw ? 'It\'s a draw' : 'Next Player: X';
    }
}

const minimax = (board, depth, isMaximizing) => {
    let result = checkWinner();
    if (result.winner) {
        return scores[result.winner];
    } else if (result.draw) {
        return scores.tie;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i=0; i<9; i++) {
            if (gameboard[i] === null) {
                gameboard[i] = 'X';
                let score = minimax(board, depth + 1, false);
                gameboard[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i=0; i<9; i++) {
            if (gameboard[i] === null) {
                gameboard[i] = 'O';
                let score = minimax(board, depth + 1, true);
                gameboard[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
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
    ];

    let result = {
        winner: null,
        draw: false,
        end: false,
    };

    for (let i = 0; i < winCases.length; i++) {
        let [a, b, c] = winCases[i];
        if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
            winningSquares = [a, b, c];
            result.winner = gameboard[a];
            result.end = true;
        }
    }

    if (!result.winner) {
        if (!gameboard.includes(null)) {
            result.draw = true;
            result.end = true;
        }
    }
    return result;
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

// tie wins;