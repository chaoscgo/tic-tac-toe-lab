
//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.







/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
]

/*---------------------------- Variables (state) ----------------------------*/

let board; //represents the state of the squares on the board
let turn; //tracks whose turn it is
let winner; //represents if there is a winner yet
let tie; //represents if the game had ended in a tie

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
// console.log(squareEls);
const messageEl = document.querySelector('#message');
// console.log(messageEl);
const resetBtnEl = document.querySelector('#reset');
// console.log(resetBtnEl);

/*-------------------------------- Functions --------------------------------*/

const updateBoard = () => {
    board.forEach((square, idx) =>  {     
        if (square === 'X') {
        squareEls[idx].textContent = 'X'
    } else if (square === 'O') {
        squareEls[idx].textContent = 'O'
    } else {
        squareEls[idx].textContent = ''
    }
    // console.log(board);
});
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = `It is Player ${turn} 's turn now!`;
    } else if (winner === false && tie === true) {
        messageEl.textContent = 'Tie Game!';
    } else if (winner === true && tie === false) {
        messageEl.textContent = `Player ${turn} won!`;
    } 
}

const render = () => {
    updateBoard();
    updateMessage();
}

const init = () => {
    board = ['','','','','','','','',''];
    turn = 'X';
    winner = false;
    tie = false;
    messageEl.textContent = 'Player X starts';
    render();
    // console.log(board);
    // console.log(turn);
    // console.log(winner);
    // console.log(tie);
    // console.log(messageEl.textContent);
  };


init();



const placePiece = (index) => {
   board[index] = turn
    // console.log(board)
};


const handleClick = (event) => {
    const squareIndex = event.target.id;
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

const checkForWinner = () => {
    
    if (
        (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) ||
        (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) ||
        (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) ||
        (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) ||
        (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) ||
        (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) ||
        (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) ||
        (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) 
    ) {
        winner = true;
        // console.log(winner);
    }
};

const checkForTie = () => {
    if (winner === false) {
        if (!board.includes('')) {
            tie = true;
        }
    // console.log(tie);
    }
}

const switchPlayerTurn = () => {
    if (winner === false) {
        if (turn === 'X') {
            turn = 'O';
        } else if (turn === 'O') {
            turn = 'X';
        }
        // console.log(turn);
    }
}





/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);


