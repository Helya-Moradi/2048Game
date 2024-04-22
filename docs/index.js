import Board from "./classes/board.js";

// const newGameButtons = document.querySelectorAll('.newGameButton');
var board = new Board();
function keyDownHandler(e) {
  if (e.code.startsWith("Arrow")) {
    var direction = e.code.substring(5).toLowerCase();
    board.moveHandler(direction);
  }
}
window.addEventListener("keydown", keyDownHandler);

// newGameButtons.forEach(newButton => {
//     newButton.addEventListener('click', () => {
//         board.resetGame();
//     })
// })