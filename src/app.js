var cat;
var background;
var mouse;
var couch1;
var couch2;
var chair;
var tv;
var coffeeTable;
var topWall;
var bottomWall;
var leftWall;
var rightWall;
var caughtScream;
var win;
var backgroundMusic;
var score;
var caughtMice = 0;
var miceTotal = 0;

document.addEventListener('DOMContentLoaded', function() {
  startGame()
});
function startGame() {
  background = new Component(1200, 766, "./img/living_room.png", 0, 0, 0, 0, 1200, 766, "image");
  topWall = new Component(1200, 12, "./img/living_room.png", 0, 0, 0, 0, 1200, 12, "image");
  bottomWall = new Component(1200, 12, "./img/living_room.png", 0, 754, 0, 754, 1200, 12, "image");
  leftWall = new Component(12, 766, "./img/living_room.png", 0, 0, 0, 0, 12, 766, "image");
  rightWall = new Component(12, 766, "./img/living_room.png", 1188, 0, 1188, 0, 12, 766, "image");
  couch1 = new Component(478, 172, "./img/living_room.png", 684, 156, 684, 156, 478, 172, "image", "furniture");
  couch2 = new Component(158, 273, "./img/living_room.png", 1004, 324, 1004, 324, 158, 273, "image", "furniture");
  tv = new Component(92, 367, "./img/living_room.png", 368, 199, 368, 199, 92, 367, "image", "furniture");
  chair = new Component(163, 154, "./img/living_room.png", 168, 304, 168, 304, 163, 154, "image", "furniture");
  flower1 = new Component(98, 90, "./img/living_room.png", 248, 180, 248, 180, 98, 90, "image", "furniture");
  flower2 = new Component(90, 95, "./img/living_room.png", 241, 501, 241, 501, 90, 95, "image", "furniture");
  coffeeTable = new Component(184, 116, "./img/living_room.png", 704, 420, 704, 420, 184, 116, "image", "furniture");
  cat = new Component(148, 80, "./img/cat1.png", 1, 1, 20, 20, 120, 62, "image", "cat");
  mouse = new Component(100, 73, "./img/mouse.png", 0, 0, mouseInitX(), mouseInitY(), 40, 29, "image", "mouse");
  score = new Component("30px", "Consolas", "black", 0, 0, 600, 50, 0, 0, "text");
  backgroundMusic = new Sound("./sounds/easter.mp3", true);
  mouseSound = new Sound("./sounds/mouse.mp3", true);
  caugthScream = new Sound("./sounds/cracking2.mp3", false);
  win = new Sound("./sounds/win.mp3", false);
  gameCanvas.start();
  removeStartButton();
  backgroundMusic.play();
  mouseSound.play();
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
  start : function() {
    this.canvas.width = 1200;
    this.canvas.height = 766;
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
  this.comp = comp;
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
    var myleft = this.dx + 10;
    var myright = this.dx + (this.dw);
    var mytop = this.dy + 10;
    var mybottom = this.dy + (this.dh) - 10;
    var otherleft = furniture.dx;
    var otherright = furniture.dx + (furniture.dw);
    var othertop = furniture.dy;
    var otherbottom = furniture.dy + (furniture.dh);
    return (myright >= otherleft && mybottom >= othertop && mytop <= otherbottom && myleft <= otherright);
  }
  this.furnitureRight = function(furniture) {
    var myleft = this.dx;
    var myright = this.dx + (this.dw) - 10;
    var mytop = this.dy + 10;
    var mybottom = this.dy + (this.dh) - 10;
    var otherleft = furniture.dx;
    var otherright = furniture.dx + (furniture.dw);
    var othertop = furniture.dy;
    var otherbottom = furniture.dy + (furniture.dh);
    return (myleft <= otherright && mybottom >= othertop && mytop <= otherbottom && myright>= otherleft);
  }
  this.furnitureTop = function(furniture) {
    var myleft = this.dx + 10;
    var myright = this.dx + (this.dw) - 10;
    var mytop = this.dy + 10;
    var mybottom = this.dy + (this.dh);
    var otherleft = furniture.dx;
    var otherright = furniture.dx + (furniture.dw);
    var othertop = furniture.dy;
    var otherbottom = furniture.dy + (furniture.dh);
    return (mybottom >= othertop && mytop <= otherbottom && myright >= otherleft && myleft <= otherright);
  }
  this.furnitureBottom = function(furniture) {
    var myleft = this.dx + 10;
    var myright = this.dx + (this.dw) - 10;
    var mytop = this.dy;
    var mybottom = this.dy + (this.dh) - 10;
    var otherleft = furniture.dx;
    var otherright = furniture.dx + (furniture.dw);
    var othertop = furniture.dy;
    var otherbottom = furniture.dy + (furniture.dh);
    return (mytop <= otherbottom && myright >= otherleft && mybottom >= othertop && myleft <= otherright);
  }
}

function Sound(src, loop) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute('preload', 'audio');
  this.sound.setAttribute('controls', 'none');
  if (loop) {
    this.sound.setAttribute('loop', loop);
  }
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  }
  this.stop = function() {
    this.sound.pause();
  }
}

function updateComponents() {
  gameCanvas.clear();
  background.update();
  score.text = "SCORE: " + String(caughtMice);
  catMoves();
  mouseMoves();
}

function updateGameArea() {
  if (cat.catchMouse(mouse)) {
    caugthScream.play();
    caughtMice += 1;
    if (caughtMice == 2) {
      win.play();
      miceTotal += 1;
      gameCanvas.stop();
      removeCanvas();
      addWinDiv();
      backgroundMusic.stop();
      mouseSound.stop();
      caughtMice = 0;
      miceTotal = -1;
    }
    updateComponents();
    mouse = new Component(100, 73, "./img/mouse.png", 0, 0, mouseInitY(), mouseInitX(), 40, 29, "image");
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
    if ((cat.catMeetFurniture(couch1) && cat.furnitureRight(couch1)) ||
       (cat.catMeetFurniture(couch2) && cat.furnitureRight(couch2)) ||
       (cat.catMeetFurniture(tv) && cat.furnitureRight(tv)) ||
       (cat.catMeetFurniture(flower1) && cat.furnitureRight(flower1)) ||
       (cat.catMeetFurniture(flower2) && cat.furnitureRight(flower2)) ||
       (cat.catMeetFurniture(coffeeTable) && cat.furnitureRight(coffeeTable)) ||
       (cat.catMeetFurniture(chair) && cat.furnitureRight(chair)) ||
       (cat.catMeetFurniture(leftWall) && cat.furnitureRight(leftWall))) {
      cat.speedX = 0;
    } else {
      cat.speedX = -2;
      cat.pressCount += 1;
    }
  }
  if (gameCanvas.key && gameCanvas.key == 39) {
    if ((cat.catMeetFurniture(couch1) && cat.furnitureLeft(couch1)) ||
       (cat.catMeetFurniture(couch2) && cat.furnitureLeft(couch2)) ||
       (cat.catMeetFurniture(tv) && cat.furnitureLeft(tv)) ||
       (cat.catMeetFurniture(flower1) && cat.furnitureLeft(flower1)) ||
       (cat.catMeetFurniture(flower2) && cat.furnitureLeft(flower2)) ||
       (cat.catMeetFurniture(coffeeTable) && cat.furnitureLeft(coffeeTable)) ||
       (cat.catMeetFurniture(chair) && cat.furnitureLeft(chair)) ||
       (cat.catMeetFurniture(rightWall) && cat.furnitureLeft(rightWall))) {
      cat.speedX = 0;
    } else if (gameCanvas.key && (gameCanvas.key == 39 && gameCanvas.key == 40)) {
        debugger
        cat.speedX = 2;
        cat.speedY = 2;
        cat.pressCount +=1;
      } else {
      cat.speedX = 2;
      cat.pressCount += 1;
    }
  }
  if (gameCanvas.key && gameCanvas.key == 38) {
    if ((cat.catMeetFurniture(couch1) && cat.furnitureBottom(couch1)) ||
       (cat.catMeetFurniture(couch2) && cat.furnitureBottom(couch2)) ||
       (cat.catMeetFurniture(coffeeTable) && cat.furnitureBottom(coffeeTable)) ||
       (cat.catMeetFurniture(tv) && cat.furnitureBottom(tv)) ||
       (cat.catMeetFurniture(flower1) && cat.furnitureBottom(flower1)) ||
       (cat.catMeetFurniture(flower2) && cat.furnitureBottom(flower2)) ||
       (cat.catMeetFurniture(chair) && cat.furnitureBottom(chair)) ||
       (cat.catMeetFurniture(topWall) && cat.furnitureBottom(topWall))) {
      cat.speedY = 0;
    } else {
      cat.speedY = -2;
      cat.pressCount += 1;
    }
  }
  if (gameCanvas.key && gameCanvas.key == 40) {
    if ((cat.catMeetFurniture(couch1) && cat.furnitureTop(couch1)) ||
       (cat.catMeetFurniture(couch2) && cat.furnitureTop(couch2)) ||
       (cat.catMeetFurniture(coffeeTable) && cat.furnitureTop(coffeeTable)) ||
       (cat.catMeetFurniture(tv) && cat.furnitureTop(tv)) ||
       (cat.catMeetFurniture(flower1) && cat.furnitureTop(flower1)) ||
       (cat.catMeetFurniture(flower2) && cat.furnitureTop(flower2)) ||
       (cat.catMeetFurniture(chair) && cat.furnitureTop(chair)) ||
       (cat.catMeetFurniture(bottomWall) && cat.furnitureTop(bottomWall))) {
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
    mouse = new Component(100, 73, "./img/mouse.png", 0, 0, mouseInitX(), mouseInitY(), 40, 29, "image");
    miceTotal += 1;
  }
  mouse.newPos();
  mouse.update();
}
