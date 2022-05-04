const gameBoard = (function () {
  let board = [];
  let turn = true;
  function init() {
    const startingBoard = document.querySelectorAll(".inner");
    for (let i = 0; i < startingBoard.length; i++) {
      board[i] = startingBoard[i].innerText;
    }
  }
  function reset() {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
    turn = true;
    display();
  }
  function display() {
    displayBoard = document.querySelectorAll(".inner");
    displayBoard.forEach(function (space) {
      space.innerText = board[Array.from(displayBoard).indexOf(space)];
    });
  }
  function write(space) {
    if (board[space] === "") {
      if (turn) board[space] = "X";
      else board[space] = "O";
      turn = !turn;
      display();
      winCheck();
    }
  }
  function winCheck() {
    if (
      (board[0] === board[1] && board[0] === board[2] && board[0] !== "") ||
      (board[3] === board[4] && board[3] === board[5] && board[3] !== "") ||
      (board[6] === board[7] && board[6] === board[8] && board[6] !== "") ||
      (board[0] === board[3] && board[0] === board[6] && board[0] !== "") ||
      (board[1] === board[4] && board[1] === board[7] && board[1] !== "") ||
      (board[2] === board[5] && board[2] === board[8] && board[2] !== "") ||
      (board[0] === board[4] && board[0] === board[8] && board[0] !== "") ||
      (board[2] === board[4] && board[2] === board[6] && board[2] !== "")
    ) {
      if (turn) {
        document.querySelector(".message").innerText = "O WINS!";
      } else {
        document.querySelector(".message").innerText = "X WINS!";
      }
      document.querySelector(".popup").classList.toggle("show");
    } else if (!board.includes("")) {
      document.querySelector(".message").innerText = "DRAW";
      document.querySelector(".popup").classList.toggle("show");
    }
  }
  return {
    write,
    init,
    reset,
  };
})();

// click events
(function () {
  const board = document.querySelectorAll(".inner");
  const btn = document.querySelector(".new-game");
  const exitBtn = document.querySelector(".icon");
  board.forEach(function (space) {
    space.setAttribute("data-number", Array.from(board).indexOf(space));
    space.addEventListener("click", () =>
      gameBoard.write(space.getAttribute("data-number"))
    );
  });
  btn.addEventListener("click", () => gameBoard.reset());
  exitBtn.addEventListener("click", () => {
    document.querySelector(".popup").classList.toggle("show");
    gameBoard.reset();
  });
})();

gameBoard.init();
