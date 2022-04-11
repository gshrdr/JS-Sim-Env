/*
 * This script handles panning around the tilemap by listening for mouse/touch drag events
 */

let canvasContainer = document.getElementById('canvas-container');

const drawableCanvas = document.getElementById('drawable-canvas');
const context = drawableCanvas.getContext('2d');

let mouseIsCurrentlyDown = false;

let x = 0;
let y = 0;

setTimeout(function() {
  drawableCanvas.width = canvasContainer.clientWidth;
  drawableCanvas.height = canvasContainer.clientHeight;
}, 100);

window.addEventListener('resize', () => {
  drawableCanvas.width = canvasContainer.clientWidth;
  drawableCanvas.height = canvasContainer.clientHeight;
});

canvasContainer.addEventListener("mousedown", function(e) {
  mouseIsCurrentlyDown = true;
  x = e.offsetX;
  y = e.offsetY;

  console.log("Mouse Down.")
})

canvasContainer.addEventListener("mousemove", function(e) {
  if (mouseIsCurrentlyDown) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;

    console.log("Mouse Move.")
  }
})

canvasContainer.addEventListener("mouseup", function(e) {
  if (mouseIsCurrentlyDown) {
    mouseIsCurrentlyDown = false;
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;

    console.log("Mouse Up.")
  }
})

canvasContainer.addEventListener('dblclick', function (e) {
  console.log("Double Click!")
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'blue';
  context.lineWidth = 4;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
