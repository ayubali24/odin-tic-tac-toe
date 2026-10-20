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
        if (row >= 0 && row <= 2 && column >= 0 && column <= 2) {
            if (board[row][column] === 0) {
                board[row][column] = mark;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return { getBoard, printBoard, dropMark};
};

function gameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    let gameOver = false;
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
        if (gameOver) {
            console.log('game is over buddy');
        } else if (board.dropMark(row, column, getActivePlayer().mark)) {
            const result = detectWinner();
            if (result != null) {
                console.log(`${getActivePlayer().name} has won this round`);
                printRound();
                gameOver = true;
            } else if (isBoardFull()) {
                gameOver = true;
                printRound();
                console.log("Game has ended in a tie...");
            }
            else {
                printRound();
                switchPlayer();
                console.log(`${getActivePlayer().name}'s turn...`)
            }

        } else {
            printRound();
            console.log("Play was unsuccessful...Please try a new square");
        }
    };

    const printRound = () => {
        board.printBoard();
    };

    const detectWinner = () => {

        // detecting horizontal wins
        for (const row of board.getBoard()) {
            if (row.includes(0)) {
                continue;
            }
            if (row.every(mark => mark === row[0])) {
                return row[0];
            }
        }

        // detecting vertical wins

        for (let i = 0; i < 3; i++) {
            const arrayColumn = board.getBoard().map(row => row[i]);
            if (arrayColumn.includes(0)) {
                continue;
            }
            if (arrayColumn.every(mark => mark === arrayColumn[0])) {
                console.log(arrayColumn);
                return arrayColumn[0];
            }
        }

        // detecting diagnonal wins

        const leftDiagonal = []
        const rightDiagonal = []

        for (const row of board.getBoard()) {
            leftDiagonal.push(row[board.getBoard().indexOf(row)])
            rightDiagonal.push(row.toReversed()[board.getBoard().indexOf(row)])

        }

        if (!(leftDiagonal.includes(0)) && leftDiagonal.every(mark => mark === leftDiagonal[0])) {
            console.log('left diagonal wins');
            return leftDiagonal[0];
        }

        if (!(rightDiagonal.includes(0)) && rightDiagonal.every(mark => mark === rightDiagonal[0])) {
            console.log('right diagonal wins');
            return rightDiagonal[0];
        }

        return null
    }

    const isBoardFull = () => {
        for (const row of board.getBoard()) {
            if (row.includes(0)) {
                return false;
            }
        }
        return true;
    }

    return { getActivePlayer, playRound, printRound}
};



// const game = gameController();
