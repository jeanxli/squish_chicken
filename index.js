let canvasWidth= 1000;
let canvasHeight = 600;

function startGame() {
  gameCanvas.start();
}

let gameCanvas = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  }}