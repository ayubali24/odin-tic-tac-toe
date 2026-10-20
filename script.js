'use strict';

function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("");
        }
    }

    // const getBoard = () => board;


    const getBoard = () => board.map(row => [...row]);

    const dropMark = (row, column, mark) => {
        // console.log(board.map(row => [...row]), board)
        if (row >= 0 && row <= 2 && column >= 0 && column <= 2) {
            if (board[row][column] === "") {
                board[row][column] = mark;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return { getBoard, dropMark };
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
            return "gameover";
        } else if (board.dropMark(row, column, getActivePlayer().mark)) {
            const result = detectWinner();
            if (result != null) {
                gameOver = true;
                return "win";
            } else if (isBoardFull()) {
                gameOver = true;
                return "tie";
            }
            else {
                switchPlayer();
                console.log(`${getActivePlayer().name}'s turn...`);
                return "valid";
            }

        } else {
            return "invalid";
        }
    };

    const getBoard = () => board.getBoard();

    const detectWinner = () => {

        // detecting horizontal wins
        for (const row of board.getBoard()) {
            if (row.includes("")) {
                continue;
            }
            if (row.every(mark => mark === row[0])) {
                return row[0];
            }
        }

        // detecting vertical wins

        for (let i = 0; i < 3; i++) {
            const arrayColumn = board.getBoard().map(row => row[i]);
            if (arrayColumn.includes("")) {
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

        for (const [index, row] of board.getBoard().entries()) {
            leftDiagonal.push(row[index]);
            rightDiagonal.push(row.toReversed()[index]);
        }

        if (!(leftDiagonal.includes("")) && leftDiagonal.every(mark => mark === leftDiagonal[0])) {
            return leftDiagonal[0];
        }

        if (!(rightDiagonal.includes("")) && rightDiagonal.every(mark => mark === rightDiagonal[0])) {
            console.log('right diagonal wins');
            return rightDiagonal[0];
        }

        return null
    }

    const isBoardFull = () => {
        for (const row of board.getBoard()) {
            if (row.includes("")) {
                return false;
            }
        }
        return true;
    }

    return { getActivePlayer, playRound, getBoard}
};

function screenController() {
    const firstPlayerName = prompt("First Player Enter Your Name: ")?.trim() || "Player One";
    const secondPlayerName = prompt("Second Player Enter Your Name: ")?.trim() || "Player Two";
    let game = gameController(firstPlayerName, secondPlayerName);
    const boardDiv = document.querySelector(".board");
    const playerTurnHeading = document.querySelector(".turn")


    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        playerTurnHeading.textContent = `${activePlayer.name}'s turn (You are ${activePlayer.mark})`;

        board.forEach((row, rowIndex) => {
            row.forEach((square, columnIndex) => {
                const squareButton = document.createElement("button");
                squareButton.classList.add("square");
                squareButton.dataset.row = rowIndex;
                squareButton.dataset.column = columnIndex;
                squareButton.textContent = square;
                boardDiv.appendChild(squareButton);

            })
        });
    }

    boardDiv.addEventListener('click', (e) => {
        const activePlayer = game.getActivePlayer();
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;


        if (!e.target.classList.contains("square")) return;
        const result = game.playRound(selectedRow, selectedColumn);
        switch (result) {
            case "valid":
                updateScreen();
                break;
            case "invalid":
                alert("Invalid move try again");
                break;
            case "tie":
                updateScreen();
                playerTurnHeading.textContent = "Game has ended in a tie";
                break;
            case "win":
                updateScreen();
                playerTurnHeading.textContent = `${activePlayer.name} has won this round`;
                break;
            case "gameover":
                alert("game is over bud");
        }



    })

    const restartBtn = document.querySelector("#restart");

    restartBtn.addEventListener('click', (e) => {
       game = gameController(firstPlayerName, secondPlayerName);
       updateScreen();
    })

   
    updateScreen();


}



screenController();
