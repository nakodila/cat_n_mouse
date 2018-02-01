
var cat;
var background;
var mouse;
var couch1;
var couch2;
var tv;
var coffeeTable;
var caughtMice = 0;
var miceTotal = 0;

document.addEventListener('DOMContentLoaded', function() {
  startGame()
});
function startGame() {
    background = new Component(1200, 765, "./img/living_room.png", 0, 0, 0, 0, 1000, 638, "image", "furniture");
    couch1 = new Component(476, 174, "./img/living_room.png", 685, 111, 571, 92, 397, 145, "image");
    // couch2 = new Component(278, 93, "./img/living_room.png", 299, 37, 299, 37, 278, 93, "image");
    // tv = new Component(196, 60, "./img/living_room.png", 359, 495, 359, 495, 196, 60, "image");
    // coffeeTable = new Component(73, 119, "./img/living_room.png", 404, 225, 404, 225, 73, 119, "image");
    cat = new Component(148, 80, "./img/cat1.png", 1, 1, 20, 20, 100, 52, "image", "cat");
    mouse = new Component(100, 73, "./img/mouse.png", 0, 0, mouseInitX(), mouseInitY(), 30, 22, "image", "mouse");
    score = new Component("30px", "Consolas", "black", 0, 0, 600, 50, 0, 0, "text");
    gameCanvas.start();
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
  var gameScore = document.createTextNode(`You caught ${Math.round(caughtMice/miceTotal*100)}% of mice`);
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
  scorePar.appendChild(gameScore);
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

var gameCanvas = {
    canvas : document.createElement("canvas"),
    // key: false,
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 638;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
        window.addEventListener('keydown', function (e) {
            gameCanvas.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            gameCanvas.key = false;
        })
        },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function Component(width, height, path, sx, sy, dx, dy, dw, dh,  type, comp, className) {

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
        ctx = gameCanvas.context;
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

    this.catMeetFurniture = function(furniture) {
      var myleft = this.dx;
      var myright = this.dx + (this.dw);
      var mytop = this.dy;
      var mybottom = this.dy + (this.dh);
      var otherleft = furniture.dx;
      var otherright = furniture.dx + (furniture.dw);
      var othertop = furniture.dy;
      var otherbottom = furniture.dy + (furniture.dh);
      var collision = true;
      if ((mybottom < othertop) ||
          (mytop > otherbottom) ||
          (myright < otherleft) ||
          (myleft > otherright)) {
          collision = false;
      }
      return collision;
  }
  this.furnitureLeft = function(furniture) {
    var myright = this.dx + (this.dw);
    var otherleft = furniture.dx;
    return myright >= otherleft;
  }
  // this.furnitureRight = function(furniture) {
  //   var myleft = this.dx;
  //   var otherright = furniture.dx + (furniture.dw);
  //   return myleft <= otherright;
  // }
  // this.furnitureTop = function(furniture) {
  //   var mybottom = this.dy + (this.dh);
  //   var othertop = furniture.dy;
  //   return mybottom >= othertop;
  // }
  // this.furnitureBottom = function(furniture) {
  //   var mytop = this.dy;
  //   var otherbottom = furniture.dy + (furniture.dh);
  //   return mytop <= otherbottom;
  // }
}

function updateComponents() {
  gameCanvas.clear();
  background.update();
  score.text = "SCORE: " + String(caughtMice);
  score.update();
  couch1.update();
  // couch2.update();
  // tv.update();
  // coffeeTable.update();
  catMoves();
  mouseMoves();
}

function updateGameArea() {
  if (cat.catchMouse(mouse)) {
    caughtMice += 1;
    if (caughtMice == 1) {
      miceTotal += 1;
      gameCanvas.stop();
      removeCanvas();
      addWinDiv();
      caughtMice = 0;
      cat.speedX = 0;
      cat.speedY = 0;
      mouse.speedX = 0;
      mouse.speedY = 0;
      miceTotal = -1;
    }
    updateComponents();
    mouse = new Component(100, 73, "./img/mouse.png", 0, 0, mouseInitY(), mouseInitX(), 30, 22, "image");
    miceTotal += 1;
  }
  else {
    updateComponents();
  }
}

function catMoves () {
    cat.speedX = 0;
    cat.speedY = 0;
    if (gameCanvas.key && gameCanvas.key == 37) {
      if (cat.catMeetFurniture(couch1) && cat.furnitureRight(couch1)) {
        cat.speedX = 0;
      } else {
        cat.speedX = -2;
        cat.pressCount += 1;
      }
    }
    if (gameCanvas.key && gameCanvas.key == 39) {
      if (cat.catMeetFurniture(couch1) && cat.furnitureLeft(couch1)) {
        cat.speedX = 0;
      } else {
        cat.speedX = 2;
        cat.pressCount += 1;
      }
    }
    if (gameCanvas.key && gameCanvas.key == 38) {
      if (cat.catMeetFurniture(couch1) && cat.furnitureTop(couch1)) {
        cat.speedY = 0;
      } else {
        cat.speedY = -2;
        cat.pressCount += 1;
      }
    }
    if (gameCanvas.key && gameCanvas.key == 40) {
      if (cat.catMeetFurniture(couch1) && cat.furnitureTop(couch1)) {
        cat.speedY = 0;
      } else {
        cat.speedY = 2;
        cat.pressCount += 1;
      }
    }
    cat.newPos();
    cat.update();
}

function mouseSpeed () {
    return Math.round(Math.random());
}

function mouseMoves() {
    mouse.speedX = mouseSpeed() * 2;
    mouse.speedY = mouseSpeed();
    if (mouse.dx >= background.dw - 30 || mouse.dy >= background.dh - 30) {
        mouse = new Component(100, 73, "./img/mouse.png", 0, 0, mouseInitX(), mouseInitY(), 30, 22, "image");
        miceTotal += 1;
  }
    mouse.newPos();
    mouse.update();
}
