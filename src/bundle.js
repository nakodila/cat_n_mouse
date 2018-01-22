/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var myGamePiece;
var background;
var mouse;
var couch1;
var couch2;
var tv;
var coffeeTable;
var caughtMice = 0;
var miceTotal = 0;

function startGame() {
    background = new component(859, 574, "../img/living_room.jpg", 0, 0, 0, 0, 859, 574, "image");
    couch1 = new component(93, 278, "../img/living_room.jpg", 186, 147, 186, 147, 93, 278, "image");
    couch2 = new component(278, 93, "../img/living_room.jpg", 299, 37, 299, 37, 278, 93, "image");
    tv = new component(196, 60, "../img/living_room.jpg", 359, 495, 359, 495, 196, 60, "image");
    coffeeTable = new component(73, 119, "../img/living_room.jpg", 404, 225, 404, 225, 73, 119, "image");
    myGamePiece = new component(148, 80, "../img/cat1.png", 1, 1, 20, 20, 75, 39, "image", "cat");
    mouse = new component(100, 73, "../img/mouse.png", 0, 0, mouseInitX(), mouseInitY(), 30, 22, "image", "mouse");
    myScore = new component("30px", "Consolas", "black", 0, 0, 600, 50, 0, 0, "text");
    myGameArea.start();
    removeStartButton();
}

function removeStartButton() {
    var startButton = document.getElementsByClassName("startButton");
      for (i = 0; i < startButton.length; i += 1) {
        startButton[0].parentNode.removeChild(startButton[0]);
      }
}

function removeCanvas() {
    var body = document.getElementById("body");
    var canvas = document.getElementsByTagName("canvas");
        canvas[0].parentNode.removeChild(canvas[0]);
}

function addWinDiv() {
  var body = document.getElementById("body");
  var mainDiv = document.createElement("div");
  var scoreDiv = document.createElement("div");
  var scorePar = document.createElement("p");
  var score = document.createTextNode(`You caught ${Math.round(caughtMice/miceTotal*100)}% of mice`);
  var replayButtonDiv = document.createElement("div");
  var replayButton = document.createElement("button");
  var buttonText = document.createTextNode("Replay Game");
  scoreDiv.classList.add("scoreDiv");
  scoreDiv.classList.add("startButton");
  mainDiv.classList.add("bodyHide");
  scorePar.classList.add("scorePar");
  replayButton.classList.add("button");
  replayButtonDiv.classList.add("replayButtonDiv");
  replayButton.classList.add("startButton");
  scoreDiv.classList.add("startButton");
  mainDiv.classList.add("startButton");
  replayButton.setAttribute("onclick", "startGame()");
  scorePar.appendChild(score);
  scoreDiv.appendChild(scorePar);
  replayButtonDiv.appendChild(replayButton);
  replayButton.appendChild(buttonText);
  mainDiv.appendChild(scoreDiv);
  mainDiv.appendChild(replayButtonDiv);
  body.appendChild(mainDiv);
}

function mouseInitX() {
    return Math.round(Math.random() * background.dw * 0.80);
}

function mouseInitY() {
    return Math.round(Math.random() * background.dh * 0.80);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 859;
        this.canvas.height = 574;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
        },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, path, sx, sy, dx, dy, dw, dh,  type, comp) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.sx = sx;
    this.sy = sy;
    this.dx = dx;
    this.dy = dy;
    this.dw = dw;
    this.dh = dh;

    this.catFrames = {
                      0 : [1, 1],
                      1 : [150, 1],
                      2 : [300, 1],
                      3 : [450, 1],
                      4 : [1, 117],
                      5 : [150, 117],
                      6 : [300, 117],
                      7 : [450, 117],
                      8 : [1, 236],
                      9 : [150, 236],
                      10 : [300, 236],
                      11 : [450, 236]
                      };
    this.frameIndex = 0;
    this.pressCount = 0;
    this.pressPerFrame = 10;

    if (type == "image") {
        this.image = new Image();
        this.image.src = path;
    }
    this.update = function() {
        ctx = myGameArea.context;
        if (this.pressCount > this.pressPerFrame) {
          this.pressCount = 0;
          this.frameIndex += 1;
          if (this.frameIndex == 5) {
            this.frameIndex = 0;
          }
        }
        if ((type == "image") && (comp == "cat")) {
            ctx.drawImage(
                this.image,
                this.catFrames[Math.floor(this.frameIndex)][0],
                this.catFrames[Math.floor(this.frameIndex)][1],
                this.width,
                this.height,
                this.dx,
                this.dy,
                this.dw,
                this.dh
              );
        } else if (type == "image") {
            ctx.drawImage(
                this.image,
                this.sx,
                this.sy,
                this.width,
                this.height,
                this.dx,
                this.dy,
                this.dw,
                this.dh
              );
        } else if (type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = path;
            ctx.fillText(this.text, this.dx, this.dy);
        } else {
            ctx.fillStyle = path;
            ctx.fillRect(this.dx, this.dy, this.dw, this.dh);
        }
    }
    this.newPos = function() {
        this.dx += this.speedX;
        this.dy += this.speedY;
    }

    // this.crashWith = function(otherobj) {
    //     var myleft = this.dx;
    //     var myright = this.dx + (this.dw);
    //     var mytop = this.dy;
    //     var mybottom = this.dy + (this.dh);
    //     var otherleft = otherobj.dx;
    //     var otherright = otherobj.xd + (otherobj.dw);
    //     var othertop = otherobj.dy;
    //     var otherbottom = otherobj.dy + (otherobj.dh);
    //     var crash = true;
    //     if ((mybottom < othertop) ||
    //            (mytop > otherbottom) ||
    //            (myright < otherleft) ||
    //            (myleft > otherright)) {
    //        crash = false;
    //     }
    //     return crash;
    // }
    this.catchMouse = function(mouse) {
        var myleft = this.dx + 40;
        var myright = this.dx + (this.dw);
        var mytop = this.dy ;
        var mybottom = this.dy + (this.dh);
        var otherleft = mouse.dx + 10;
        var otherright = mouse.dx + (mouse.dw);
        var othertop = mouse.dy + 10;
        var otherbottom = mouse.dy + (mouse.dh) - 10;
        var caught = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
            caught = false;
        }
        return caught;
    }
}

function updateComponents() {
  myGameArea.clear();
  background.update();
  myScore.text = "SCORE: " + String(caughtMice);
  myScore.update();
  couch1.update();
  couch2.update();
  tv.update();
  coffeeTable.update();
  catMoves();
  mouseMoves();
}

function updateGameArea() {
    if (myGamePiece.catchMouse(mouse)) {
        caughtMice += 1;
        if (caughtMice == 1) {
            miceTotal += 1;
            myGameArea.stop();
            removeCanvas();
            addWinDiv();
            caughtMice = 0;
            myGamePiece.speedX = 0;
            myGamePiece.speedY = 0;
            mouse.speedX = 0;
            mouse.speedY = 0;
            miceTotal = 0;

        }
    updateComponents();
    mouse = new component(100, 73, "../img/mouse.png", 0, 0,
                          mouseInitY(), mouseInitX(), 30, 22, "image");
    miceTotal += 1;
    } else {
        updateComponents();
    }
}

function catMoves () {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;

    if (myGameArea.key && myGameArea.key == 37) {
        myGamePiece.speedX = -2;
        myGamePiece.pressCount += 1;
    }
    if (myGameArea.key && myGameArea.key == 39) {
        myGamePiece.speedX = 2;
        myGamePiece.pressCount += 1;
    }
    if (myGameArea.key && myGameArea.key == 38) {
        myGamePiece.speedY = -2;
        myGamePiece.pressCount += 1;
    }
    if (myGameArea.key && myGameArea.key == 40) {
        myGamePiece.speedY = 2;
        myGamePiece.pressCount += 1;
    }
    myGamePiece.newPos();
    myGamePiece.update();
}

function mouseSpeed () {
    return Math.round(Math.random());
}

function mouseMoves() {
    mouse.speedX = mouseSpeed() * 2;
    mouse.speedY = mouseSpeed();
    if (mouse.dx >= background.dw - 30 || mouse.dy >= background.dh - 30) {
        mouse = new component(100, 73, "../img/mouse.png", 0, 0, mouseInitX(), mouseInitY(), 30, 22, "image");
        miceTotal += 1;
  }
    mouse.newPos();
    mouse.update();
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map