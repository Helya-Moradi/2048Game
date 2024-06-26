import Tile from "./tile.js";

class Board {
  size = 4;
  score = 0;

  matrix = [];
  slots = [];

  slotsContainer;
  tilesContainer;

  scoreContainer;
  gameContainer;
  gameOverContainer;
  winContainer;

  constructor(size = 4) {
    this.size = size;

    this.tilesContainer = document.querySelector(".board .tiles");
    this.slotsContainer = document.querySelector(".board .slots");

    this.slotsContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    this.slotsContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    this.scoreContainer = document.querySelector(".score .value");
    this.scoreContainer.textContent = this.score.toString();

    this.gameContainer = document.querySelector(".gameContainer");
    this.gameOverContainer = document.querySelector(".gameOverContainer");
    this.winContainer = document.querySelector(".winContainer");

    this.generateBoard();

    this.generateRandomTile();
    this.generateRandomTile();
  }

  rotateMatrix(matrix, rotations) {
    let newMatrix = matrix.map((row) => [...row]);

    for (let i = 0; i < rotations; i++) {
      newMatrix = newMatrix[0].map((value, index) =>
        newMatrix.map((row) => row[index]).reverse(),
      );
    }

    return newMatrix;
  }

  shiftTilesToLeft(matrix) {
    const newMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
      const rowTiles = matrix[i].filter((cell) => cell !== null);
      const newRow = [];

      for (let j = 0; j < rowTiles.length; j++) {
        const currentTile = rowTiles[j];

        if (j < rowTiles.length - 1) {
          const nextTile = rowTiles[j + 1];

          if (nextTile.value === currentTile.value) {
            const score = currentTile.upgrade();

            this.score += score;
            this.scoreContainer.textContent = this.score.toString();

            nextTile.element.remove();

            j += 1;
          }
        }

        newRow.push(currentTile);
      }

      const emptyCount = this.size - newRow.length;
      for (let k = 0; k < emptyCount; k++) {
        newRow.push(null);
      }

      newMatrix.push(newRow);
    }

    return newMatrix;
  }

  updateMatrix(newMatrix) {
    const hadMove = JSON.stringify(this.matrix) !== JSON.stringify(newMatrix);

    if (hadMove) {
      for (let i = 0; i < newMatrix.length; i++) {
        for (let j = 0; j < newMatrix[i].length; j++) {
          const tile = newMatrix[i][j];

          if (tile) {
            const tileBounds = this.calculateTileBounds(i, j);

            tile.move(tileBounds);
          }
        }
      }

      this.matrix = newMatrix;

      this.generateRandomTile();
    }
  }

  moveHandler(direction) {
    const rotations = {
      up: 3,
      down: 1,
      left: 0,
      right: 2,
    }[direction];

    let newMatrix = this.rotateMatrix(this.matrix, rotations);
    newMatrix = this.shiftTilesToLeft(newMatrix);
    newMatrix = this.rotateMatrix(
      newMatrix,
      (this.size - rotations) % this.size,
    );

    this.updateMatrix(newMatrix);
    this.checkState();
  }

  generateBoard() {
    for (let i = 0; i < this.size; i++) {
      const slotsRow = [];
      const matrixRow = [];

      for (let j = 0; j < this.size; j++) {
        const slot = document.createElement("div");
        slot.classList.add("slot");

        this.slotsContainer.appendChild(slot);

        slotsRow.push(slot);
        matrixRow.push(null);
      }

      this.matrix.push(matrixRow);
      this.slots.push(slotsRow);
    }
  }

  calculateTileBounds(i, j) {
    const slotsContainerBounds = this.slotsContainer.getBoundingClientRect();
    const slotBounds = this.slots[i][j].getBoundingClientRect();

    return {
      left: slotBounds.left - slotsContainerBounds.left,
      top: slotBounds.top - slotsContainerBounds.top,
      width: slotBounds.width,
      height: slotBounds.height,
    };
  }

  findEmptyCell() {
    const emptyCells = this.matrix
      .map((row, i) =>
        row
          .map((cell, j) => ({
            ...cell,
            i,
            j,
          }))
          .filter((cell) => !cell.value || !cell.element),
      )
      .flat(2);

    if (emptyCells.length > 0) {
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    return null;
  }

  generateRandomTile() {
    const emptyCell = this.findEmptyCell();

    if (emptyCell) {
      const tileBounds = this.calculateTileBounds(emptyCell.i, emptyCell.j);

      const value = Math.random() < 0.75 ? 2 : 4;

      const tile = new Tile(value, tileBounds);
      this.tilesContainer.appendChild(tile.element);

      this.matrix[emptyCell.i][emptyCell.j] = tile;
    }
  }

  // resetGame() {
  //     this.tilesContainer.textContent = '';
  //
  //     this.generateRandomTile();
  //     this.generateRandomTile();
  //
  //     this.gameContainer.classList.remove('hide');
  //     this.gameOverContainer.classList.add('hide');
  //     this.winContainer.classList.add('hide');
  // }

  checkState() {
    const isWin = this.matrix.some((row) =>
      row.some((cell) => cell?.value === 2048),
    );
    const isContinue = this.matrix.some((row) =>
      row.some((cell) => cell === null),
    );

    if (isContinue && !isWin) {
      this.gameContainer.classList.remove("hide");
      this.gameOverContainer.classList.add("hide");
      this.winContainer.classList.add("hide");
    } else if (isContinue && isWin) {
      this.gameContainer.classList.add("hide");
      this.winContainer.classList.remove("hide");
    } else {
      this.gameContainer.classList.add("hide");
      this.winContainer.classList.add("hide");
      this.gameOverContainer.classList.remove("hide");
    }
  }
}

export default Board;
