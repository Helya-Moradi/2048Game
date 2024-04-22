function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import getBackgroundColors from "../utils/getBackgrounds.js";
var Tile = /*#__PURE__*/function () {
  function Tile(value, bounds) {
    _classCallCheck(this, Tile);
    this.value = value;
    var tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = value.toString();
    tile.style.left = "".concat(bounds.left, "px");
    tile.style.top = "".concat(bounds.top, "px");
    tile.style.width = "".concat(bounds.width, "px");
    tile.style.height = "".concat(bounds.height, "px");
    tile.style.backgroundColor = getBackgroundColors(value);
    this.element = tile;
    this.addAnimate();
  }
  _createClass(Tile, [{
    key: "move",
    value: function move(bounds) {
      this.element.animate([{
        left: "".concat(bounds.left, "px"),
        top: "".concat(bounds.top, "px")
      }], {
        duration: 200,
        fill: "forwards",
        easing: "ease-in-out"
      });
    }
  }, {
    key: "upgrade",
    value: function upgrade() {
      this.value *= 2;
      this.element.textContent = this.value.toString();
      this.mergeAnimate();
      return this.value;
    }
  }, {
    key: "addAnimate",
    value: function addAnimate() {
      this.element.animate([{
        transform: "scale(0)"
      }, {
        transform: "scale(1)"
      }], {
        duration: 200,
        easing: "ease-in-out"
      });
    }
  }, {
    key: "mergeAnimate",
    value: function mergeAnimate() {
      this.element.animate([{
        transform: "scale(1.1)"
      }, {
        transform: "scale(1)",
        backgroundColor: getBackgroundColors(this.value),
        color: this.value <= 4 ? "#776e65" : "#fff"
      }], {
        duration: 200,
        fill: "forwards",
        easing: "ease-in-out"
      });
    }
  }]);
  return Tile;
}();
export default Tile;