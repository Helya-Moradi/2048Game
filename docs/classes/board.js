function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import Tile from "./tile.js";
var Board = /*#__PURE__*/function () {
  function Board() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
    _classCallCheck(this, Board);
    _defineProperty(this, "size", 4);
    _defineProperty(this, "score", 0);
    _defineProperty(this, "matrix", []);
    _defineProperty(this, "slots", []);
    this.size = size;
    this.tilesContainer = document.querySelector(".board .tiles");
    this.slotsContainer = document.querySelector(".board .slots");
    this.slotsContainer.style.gridTemplateRows = "repeat(".concat(size, ", 1fr)");
    this.slotsContainer.style.gridTemplateColumns = "repeat(".concat(size, ", 1fr)");
    this.scoreContainer = document.querySelector(".score .value");
    this.scoreContainer.textContent = this.score.toString();
    this.gameContainer = document.querySelector(".gameContainer");
    this.gameOverContainer = document.querySelector(".gameOverContainer");
    this.winContainer = document.querySelector(".winContainer");
    this.generateBoard();
    this.generateRandomTile();
    this.generateRandomTile();
  }
  _createClass(Board, [{
    key: "rotateMatrix",
    value: function rotateMatrix(matrix, rotations) {
      var newMatrix = matrix.map(function (row) {
        return _toConsumableArray(row);
      });
      for (var i = 0; i < rotations; i++) {
        newMatrix = newMatrix[0].map(function (value, index) {
          return newMatrix.map(function (row) {
            return row[index];
          }).reverse();
        });
      }
      return newMatrix;
    }
  }, {
    key: "shiftTilesToLeft",
    value: function shiftTilesToLeft(matrix) {
      var newMatrix = [];
      for (var i = 0; i < matrix.length; i++) {
        var rowTiles = matrix[i].filter(function (cell) {
          return cell !== null;
        });
        var newRow = [];
        for (var j = 0; j < rowTiles.length; j++) {
          var currentTile = rowTiles[j];
          if (j < rowTiles.length - 1) {
            var nextTile = rowTiles[j + 1];
            if (nextTile.value === currentTile.value) {
              var score = currentTile.upgrade();
              this.score += score;
              this.scoreContainer.textContent = this.score.toString();
              nextTile.element.remove();
              j += 1;
            }
          }
          newRow.push(currentTile);
        }
        var emptyCount = this.size - newRow.length;
        for (var k = 0; k < emptyCount; k++) {
          newRow.push(null);
        }
        newMatrix.push(newRow);
      }
      return newMatrix;
    }
  }, {
    key: "updateMatrix",
    value: function updateMatrix(newMatrix) {
      var hadMove = JSON.stringify(this.matrix) !== JSON.stringify(newMatrix);
      if (hadMove) {
        for (var i = 0; i < newMatrix.length; i++) {
          for (var j = 0; j < newMatrix[i].length; j++) {
            var tile = newMatrix[i][j];
            if (tile) {
              var tileBounds = this.calculateTileBounds(i, j);
              tile.move(tileBounds);
            }
          }
        }
        this.matrix = newMatrix;
        this.generateRandomTile();
      }
    }
  }, {
    key: "moveHandler",
    value: function moveHandler(direction) {
      var rotations = {
        up: 3,
        down: 1,
        left: 0,
        right: 2
      }[direction];
      var newMatrix = this.rotateMatrix(this.matrix, rotations);
      newMatrix = this.shiftTilesToLeft(newMatrix);
      newMatrix = this.rotateMatrix(newMatrix, (this.size - rotations) % this.size);
      this.updateMatrix(newMatrix);
      this.checkState();
    }
  }, {
    key: "generateBoard",
    value: function generateBoard() {
      for (var i = 0; i < this.size; i++) {
        var slotsRow = [];
        var matrixRow = [];
        for (var j = 0; j < this.size; j++) {
          var slot = document.createElement("div");
          slot.classList.add("slot");
          this.slotsContainer.appendChild(slot);
          slotsRow.push(slot);
          matrixRow.push(null);
        }
        this.matrix.push(matrixRow);
        this.slots.push(slotsRow);
      }
    }
  }, {
    key: "calculateTileBounds",
    value: function calculateTileBounds(i, j) {
      var slotsContainerBounds = this.slotsContainer.getBoundingClientRect();
      var slotBounds = this.slots[i][j].getBoundingClientRect();
      return {
        left: slotBounds.left - slotsContainerBounds.left,
        top: slotBounds.top - slotsContainerBounds.top,
        width: slotBounds.width,
        height: slotBounds.height
      };
    }
  }, {
    key: "findEmptyCell",
    value: function findEmptyCell() {
      var emptyCells = this.matrix.map(function (row, i) {
        return row.map(function (cell, j) {
          return _objectSpread(_objectSpread({}, cell), {}, {
            i: i,
            j: j
          });
        }).filter(function (cell) {
          return !cell.value || !cell.element;
        });
      }).flat(2);
      if (emptyCells.length > 0) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
      return null;
    }
  }, {
    key: "generateRandomTile",
    value: function generateRandomTile() {
      var emptyCell = this.findEmptyCell();
      if (emptyCell) {
        var tileBounds = this.calculateTileBounds(emptyCell.i, emptyCell.j);
        var value = Math.random() < 0.75 ? 2 : 4;
        var tile = new Tile(value, tileBounds);
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
  }, {
    key: "checkState",
    value: function checkState() {
      var isWin = this.matrix.some(function (row) {
        return row.some(function (cell) {
          return (cell === null || cell === void 0 ? void 0 : cell.value) === 2048;
        });
      });
      var isContinue = this.matrix.some(function (row) {
        return row.some(function (cell) {
          return cell === null;
        });
      });
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
  }]);
  return Board;
}();
export default Board;