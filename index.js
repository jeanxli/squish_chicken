let canvasWidth= 1000;
let canvasHeight = 600;

let fallSpeed = 0;
let interval = setInterval(updateCanvas, 20);

let chicken;
let chickYPos = 10;

let isJumping = false;
let jumpSpeed = 0;    

let trafficCone;

let score = 0;
let scoreLabel;


function startGame() {
  gameCanvas.start();
  chicken = new makeChicken(175, 175, 10);
  trafficCone = new makeTCone();
  scoreLabel = new makeScoreLabel(10,30);
}

let gameCanvas = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  }}

// chicken image
const chickImage = new Image();
chickImage.addEventListener('load', function() {
})
chickImage.src = 'images/chicken.png';

// traffic cone image
const trafficConeImg = new Image();
trafficConeImg.addEventListener('load', function() {
})
trafficConeImg.src = 'images/t_cone1.png';

function makeChicken(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = chickYPos;

    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.drawImage(chickImage, this.x, this.y, this.width, this.height);
        //ctx.drawImage(trafficConeImg, 500, 500, 500, 500)
    }
    this.makeFall = function() {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            this.stopChicken();
        }
    }
    this.stopChicken = function() {
        let ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }
    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}

function makeScoreLabel(x, y) {
    this.score = 0;
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "bold 30px impact";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y);
    }
}

function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function makeTCone() {
    let width = 150; //randNum(30, 50);
    let height = 150; //randNum(50, 200);
    let speed = randNum(4,6);

    this.x = canvasWidth;
    this.y = canvasHeight - height;
    
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.drawImage(trafficConeImg, this.x, this.y, width, height);
    }
    this.attackChicken = function() {
        this.x -= speed;
        this.returnToAttackPosition();
    }
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = 150; //randNum(30, 50);
            height = 150; //randNum(50, 200);
            speed = randNum(5,6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;

            score ++;
        }
    }
}

function collision() {
    let chickLeft = chicken.x - 75;
    let chickRight = chicken.x + chicken.width - 75;
    let tConeLeft = trafficCone.x;
    let tConeRight = trafficCone.x + trafficCone.width;

    let chickBottom = chicken.y + chicken.height - 75;
    let tConeTop = trafficCone.y;

    if (chickRight > tConeLeft && chickLeft < tConeLeft && chickBottom > tConeTop) {
        gameCanvas.stop();
    }
}

function updateCanvas() {
    collision();

    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    chicken.makeFall();
    chicken.draw();
    chicken.jump();

    trafficCone.draw();
    trafficCone.attackChicken();

    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() {resetJump(); }, 1000)
    }
}


