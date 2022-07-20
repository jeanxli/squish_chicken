let canvasWidth= 1000;
let canvasHeight = 600;

let fallSpeed = 0;
let interval = setInterval(updateCanvas, 20);

let chicken;
let chickYPos = 10;

let isJumping = false;
let yJumpSpeed = 0;  
let xJumpSpeed = 0;  

let trafficCone;

let score = 0;
let scoreLabel;


function startGame() {
  gameCanvas.start();
  chicken = new makeChicken(175, 175, 10);
  trafficCone = new makeTCone();
  scoreLabel = new makeScoreLabel(10,30);
  cupcake = new makeCupcake(200, 200);

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

// egg image
const tConeImg = new Image();
tConeImg.addEventListener('load', function() {
})
tConeImg.src = 'images/t_cone1.png';

// cupcake
const cupckImg = new Image();
cupckImg.addEventListener('load', function() {
})
cupckImg.src = 'images/cupcake.png';

function makeCupcake(width, height) {
    this.width = width;
    this.height = height;

    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.drawImage(cupckImg, 800, 400, this.width, this.height);
    }
}

function makeChicken(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = chickYPos;

    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.drawImage(chickImage, this.x, this.y, this.width, this.height);
    }
    this.makeFall = function() {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.05;
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
            this.y -= yJumpSpeed;
            yJumpSpeed += 0.3;

            this.x += (0.01) * (yJumpSpeed * yJumpSpeed);
            //xJumpSpeed += 0.1; 
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
    let width = 200; 
    let height = 150;
    let speed = randNum(4,6);

    this.x = canvasWidth;
    this.y = canvasHeight - height;
    
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.drawImage(tConeImg, this.x, this.y, width, height);
    }
    this.attackChicken = function() {
        this.x -= speed;
        this.returnToAttackPosition();
    }
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = 150;
            height = 150;
            speed = randNum(5,6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;

            score ++;
        }
    }
}


function collision() {
    let chickLeft = chicken.x - 100;
    let chickRight = chicken.x + chicken.width - 100;
    let tConeLeft = trafficCone.x;
    let tConeRight = trafficCone.x + trafficCone.width;

    let chickBottom = chicken.y + chicken.height - 100;
    let tConeTop = trafficCone.y;

    
    if (chickRight > tConeLeft && chickLeft < tConeLeft && chickBottom > tConeTop) {
        if (confirm("game over\nEither OK or Cancel")) {
            document.location.reload();
        }
        else {
            alert("thanks for playing");
        }
        gameCanvas.stop();
    }
}


function win() {
    if (chicken.x == 800) {
        if (confirm("you won\nEither OK or cancel")) {
            document.location.reload();
        }
        else {
            alert("thanks for playing");
        }
        gameCanvas.stop();
    }
    
}


function updateCanvas() {
    collision();
    win();

    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    chicken.makeFall();
    chicken.draw();
    chicken.jump();

    trafficCone.draw();
    trafficCone.attackChicken();

    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();

    cupcake.draw();
}

function resetJump() {
    yJumpSpeed = 0;
    isJumping = false;
    xJumpSpeed = 0;
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() {resetJump(); }, 1000)
    }
}
