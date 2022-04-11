/*
 * This script handles panning around the tilemap by listening for mouse/touch drag events
 */

const logMouseEventsDebug = false;

let canvasContainer = document.getElementById('canvas-container');

const drawableCanvas = document.getElementById('drawable-canvas');
const context = drawableCanvas.getContext('2d');

let mouseIsCurrentlyDown = false;

let x = 0;
let y = 0;

// Initial window load - set canvas size
setTimeout(function() {
  drawableCanvas.width = canvasContainer.clientWidth;
  drawableCanvas.height = canvasContainer.clientHeight;
}, 100);

// Window resize - set canvas size
window.addEventListener('resize', () => {
  drawableCanvas.width = canvasContainer.clientWidth;
  drawableCanvas.height = canvasContainer.clientHeight;
});

/* Check if this is a touch enabled device */
// Source: https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript

function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

if(isTouchDevice()){
  /* Listen for touch events - this is a touch screen */

  console.log("I am a touch screen device");
} else {
  /* Listen for mouse events - not a touch screen */

  canvasContainer.addEventListener("mousedown", function(e) {
    mouseIsCurrentlyDown = true;
    x = e.offsetX;
    y = e.offsetY;

    if (logMouseEventsDebug) console.log("Mouse Down.")
  })

  canvasContainer.addEventListener("mousemove", function(e) {
    if (mouseIsCurrentlyDown) {
      drawLine(context, x, y, e.offsetX, e.offsetY);
      x = e.offsetX;
      y = e.offsetY;

      if (logMouseEventsDebug) console.log("Mouse Move.")
    }
  })

  canvasContainer.addEventListener("mouseup", function(e) {
    if (mouseIsCurrentlyDown) {
      mouseIsCurrentlyDown = false;
      drawLine(context, x, y, e.offsetX, e.offsetY);
      x = 0;
      y = 0;

      if (logMouseEventsDebug) console.log("Mouse Up.")
    }
  })

  canvasContainer.addEventListener('dblclick', function (e) {
    context.clearRect(0, 0, drawableCanvas.width, drawableCanvas.height);

    if (logMouseEventsDebug) console.log("Double Click!")
  });
}

/* Draw to the canvas */

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'blue';
  context.lineWidth = 4;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
