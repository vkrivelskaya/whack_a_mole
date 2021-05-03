/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ (() => {

var selectors = {
  HOLE: '.hole',
  GAME: '.game',
  START_BTN: '.start',
  SCORE: '.score',
  MODAL: '.modal',
  UP: '.up',
  HOLE_7: '.hole-7',
  HOLE_8: '.hole-8'
};
var classes = {
  MOLE: 'mole',
  UP: 'up',
  ACTIVE: 'active',
  CLOSE: 'close',
  REPEAT_BTN: 'repeat-level-button',
  NEXT_LEVEL_BTN: 'next-level-button',
  NEW_GAME_BTN: 'new-game-button',
  NEXT_LEVEL: 'next-level'
};
var holes = document.querySelectorAll(selectors.HOLE);
var scoreBoardElement = document.querySelector(selectors.SCORE);
var modalWindowElement = document.querySelector(selectors.MODAL);
var hole7Element = document.querySelector(selectors.HOLE_7);
var hole8Element = document.querySelector(selectors.HOLE_8);
var minRate = 200;
var maxRate = 3000;
var gameDuration = 10000;
var score = 0;
var minMoleDisappearanceRate;
var maxMoleDisappearanceRate;
var timerId;
var lastHole;
var isGameFinished = false;

function getRandomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomHole(holes) {
  var holesRandomElementIndex = Math.floor(Math.random() * holes.length);
  var newHole = holes[holesRandomElementIndex];

  if (newHole === lastHole) {
    return getRandomHole(holes);
  }

  lastHole = newHole;
  return newHole;
}

function peepMole() {
  var time = getRandomTime(minMoleDisappearanceRate, maxMoleDisappearanceRate);
  var hole = getRandomHole(holes);

  if (!isGameFinished) {
    hole.classList.add(classes.UP);
    timerId = setTimeout(function () {
      hole.classList.remove(classes.UP);
      peepMole();
    }, time);
  }
}

function saveLevelDataToLocalStorage() {
  localStorage.setItem('score', score);
  localStorage.setItem('min', minMoleDisappearanceRate);
  localStorage.setItem('max', maxMoleDisappearanceRate);
}

function finishGame() {
  isGameFinished = true;
  document.querySelectorAll(selectors.UP).forEach(function (el) {
    return el.classList.remove(classes.UP);
  });
  saveLevelDataToLocalStorage();
  clearTimeout(timerId);
  modalWindowElement.classList.add(classes.ACTIVE);
}

function startLevel() {
  isGameFinished = false;
  peepMole();
  setTimeout(finishGame, gameDuration);
}

function startGame() {
  score = Number(localStorage.getItem('score') || 0);
  minMoleDisappearanceRate = localStorage.getItem('min') || minRate;
  maxMoleDisappearanceRate = localStorage.getItem('max') || maxRate;
  startLevel();
}

function whackMole(e) {
  if (!e.isTrusted) return;

  if (e.target.className.includes(classes.MOLE)) {
    score += 1;
    e.target.parentNode.classList.remove(classes.UP);
    scoreBoardElement.textContent = score;
  }
}

function closeModalWindow() {
  modalWindowElement.classList.remove(classes.ACTIVE);
}

function repeatLevel() {
  closeModalWindow();
  startLevel();
}

function goToNextLevel() {
  minMoleDisappearanceRate *= 0.8;
  maxMoleDisappearanceRate *= 0.7;
  closeModalWindow();
  holes.forEach(function (el) {
    return el.classList.add(classes.NEXT_LEVEL);
  });
  hole7Element.classList.add(classes.ACTIVE);
  hole8Element.classList.add(classes.ACTIVE);
  startLevel();
}

function cleanUpLevelDataFromLocalStorage() {
  localStorage.removeItem('score');
  localStorage.removeItem('min');
  localStorage.removeItem('max');
}

function startNewGame() {
  cleanUpLevelDataFromLocalStorage();
  scoreBoardElement.textContent = 0;
  closeModalWindow();
  score = 0;
  minMoleDisappearanceRate = minRate;
  maxMoleDisappearanceRate = maxRate;
  startLevel();
}

function determineModalWindowElement(e) {
  var target = e.target.className;

  if (target.includes(classes.CLOSE)) {
    closeModalWindow();
    return;
  }

  if (target.includes(classes.REPEAT_BTN)) {
    repeatLevel();
    return;
  }

  if (target.includes(classes.NEXT_LEVEL_BTN)) {
    goToNextLevel();
    return;
  }

  if (target.includes(classes.NEW_GAME_BTN)) {
    startNewGame();
    return;
  }
}

function setupInitialLevel() {
  minMoleDisappearanceRate = localStorage.getItem('min') || minRate;
  maxMoleDisappearanceRate = localStorage.getItem('max') || maxRate;

  if (minMoleDisappearanceRate < minRate && maxMoleDisappearanceRate < maxRate) {
    holes.forEach(function (el) {
      return el.classList.add(classes.NEXT_LEVEL);
    });
    hole7Element.classList.add(classes.ACTIVE);
    hole8Element.classList.add(classes.ACTIVE);
  }

  scoreBoardElement.textContent = Number(localStorage.getItem('score') || 0);
}

function init() {
  var gameContainerElement = document.querySelector(selectors.GAME);
  var startButtonElement = document.querySelector(selectors.START_BTN);
  setupInitialLevel();
  startButtonElement.addEventListener('click', startGame);
  gameContainerElement.addEventListener('click', whackMole);
  modalWindowElement.addEventListener('click', determineModalWindowElement);
}

init();

/***/ }),

/***/ "./styles/style.scss":
/*!***************************!*\
  !*** ./styles/style.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.scss */ "./styles/style.scss");
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.js */ "./main.js");
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_js__WEBPACK_IMPORTED_MODULE_1__);


})();

/******/ })()
;
//# sourceMappingURL=main.js.map