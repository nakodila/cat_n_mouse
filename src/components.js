export default function Component(width, height, path, sx, sy, dx, dy, dw, dh,  type, comp) {
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
}
