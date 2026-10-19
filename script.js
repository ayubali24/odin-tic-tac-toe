'use strict';

function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }

    const getBoard = () => board;

    const printBoard = () => console.log(board);

    const dropMark = (row, column, mark) => {
        if (board[row][column] === 0) {
            board[row][column] = mark;
            return true;
        } else {
            return false;
        }
    }

    return { getBoard, printBoard, dropMark};
};

function gameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = gameBoard();

    const players = [
        {
            name: playerOneName,
            mark: "X"
        },
        {
            name: playerTwoName,
            mark: "O"
        }
    ];

    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const playRound = (row, column) => {
        const result = board.dropMark(row, column, getActivePlayer().mark);
        if (result) {
            printNewRound();
            switchPlayer();
            console.log(`${getActivePlayer().name}'s turn...`)
        } else {
            printNewRound();
            console.log("Play was unsuccessful...Please try a new square");
        }
    }
    const printNewRound = () => {
        board.printBoard();
    };
    return {getActivePlayer, playRound}
};



const game = gameController();