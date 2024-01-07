        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = false;
        let playWithComputerMode = false;

        function playWithComputer() {
            playWithComputerMode = true;
            document.getElementById('message').textContent = "Playing with the computer. Your move (X).";
            startGame();
        }

        function playWithFriend() {
            playWithComputerMode = false;
            document.getElementById('message').textContent = "Playing with a friend. Player X's move.";
            startGame();
        }

        function startGame() {
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            updateBoard();
            gameActive = true;
            document.getElementById('message').textContent = "Game in progress...";
            document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
            // document.querySelector('button').disabled = true; // Remove this line
        }

        function handleCellClick(event) {
            if (!gameActive) return;

            const clickedCell = event.target;
            const cellIndex = clickedCell.dataset.index;

            if (gameBoard[cellIndex] === '') {
                gameBoard[cellIndex] = currentPlayer;
                clickedCell.textContent = currentPlayer;

                if (checkWinner()) {
                    document.getElementById('message').textContent = `Player ${currentPlayer} wins!`;
                    gameActive = false;
                } else if (gameBoard.every(cell => cell !== '')) {
                    document.getElementById('message').textContent = "It's a tie!";
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

                    if (playWithComputerMode && currentPlayer === 'O') {
                        computerMove();
                    }
                }
            }
        }

        function computerMove() {
            const emptyCells = gameBoard.reduce((acc, cell, index) => {
                if (cell === '') {
                    acc.push(index);
                }
                return acc;
            }, []);

            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const computerMoveIndex = emptyCells[randomIndex];

            gameBoard[computerMoveIndex] = 'O';
            const computerCell = document.querySelector(`.cell[data-index="${computerMoveIndex}"]`);
            computerCell.textContent = 'O';

            if (checkWinner()) {
                document.getElementById('message').textContent = "Computer wins!";
                gameActive = false;
            } else if (gameBoard.every(cell => cell !== '')) {
                document.getElementById('message').textContent = "It's a tie!";
                gameActive = false;
            } else {
                currentPlayer = 'X';
            }
        }

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];

            for (const combo of winningCombinations) {
                const [a, b, c] = combo;
                if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                    return true;
                }
            }

            return false;
        }

        function updateBoard() {
            const board = document.getElementById('board');
            board.innerHTML = "";

            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.index = i;
                board.appendChild(cell);
            }
        }
