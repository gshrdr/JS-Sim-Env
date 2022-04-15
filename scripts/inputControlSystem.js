/*
 * This script handles mouse and touch inputs to move around the virtual world.
 */

 // TO DO - Rather than using touch events to draw to a third canvas element, remove this canvas element and use
 // the drag events to move/pan the camera around the tile map
 // Scrolling camera tutorial: https://gamedev.stackexchange.com/questions/86820/how-do-i-make-a-scrolling-map-within-an-html5-canvas

let canvasContainer = document.getElementById('canvas-container');

const drawableCanvas = document.getElementById('drawable-canvas');
const context = drawableCanvas.getContext('2d');

let mouseIsCurrentlyDown = false;
let recentTouchTimeStamp;

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

  if (logEventsDebug) console.log("Touch based device");

  drawableCanvas.addEventListener("touchstart", function(e) {
    if (logEventsDebug) console.log("Touch start")

    checkForDoubleTouch();

    e.preventDefault();
    mouseIsCurrentlyDown = true;
    let containerYOffset = canvasContainer.getBoundingClientRect().top
    x = e.touches[0].clientX;
    y = e.touches[0].clientY - containerYOffset;
  });

  drawableCanvas.addEventListener("touchmove", function(e) {
    e.preventDefault();

    if (mouseIsCurrentlyDown) {
      if (logEventsDebug) console.log("Touch move")
      let containerYOffset = canvasContainer.getBoundingClientRect().top

      // Update game state depending on current pan/zoom or draw mode toggle selection
      if (DRAW_MODE) drawLine(context, x, y, e.touches[0].clientX, (e.touches[0].clientY - containerYOffset));

      x = e.touches[0].clientX;
      y = e.touches[0].clientY - containerYOffset;
    }
  });

  drawableCanvas.addEventListener("touchend", function(e) {
    e.preventDefault();

    if (mouseIsCurrentlyDown) {
      if (logEventsDebug) console.log("Touch end")

      mouseIsCurrentlyDown = false;
      x = 0;
      y = 0;
    }
  });

  drawableCanvas.addEventListener("touchcancel", function(e) {
    e.preventDefault();

    if (mouseIsCurrentlyDown) {
      if (logEventsDebug) console.log("Touch cancel")

      mouseIsCurrentlyDown = false;
      x = 0;
      y = 0;
    }
  });

  /* Detect double touch - clear screen */
  // Source: https://stackoverflow.com/questions/8825144/detect-double-tap-on-ipad-or-iphone-screen-using-javascript

  function checkForDoubleTouch() {
    if (recentTouchTimeStamp === undefined) {
      recentTouchTimeStamp = Date.now() / 1000;
    } else {
      let current = Date.now() / 1000
      let timeDelta = current - recentTouchTimeStamp;

      if((timeDelta < 0.22) && (timeDelta > 0)){
         // Double Tap - clear screen
         if (DRAW_MODE) clearDrawingBoard();

         // Reset touch event
         mouseIsCurrentlyDown = false;
         x = 0;
         y = 0;

         if (logEventsDebug) console.log("Double touch event")
         if (logEventsDebug && DRAW_MODE) console.log("Double touch - clear screen")
      }

      recentTouchTimeStamp = Date.now() / 1000
    }
  }

} else {
  /* Listen for mouse events - not a touch screen */

  if (logEventsDebug) console.log("Mouse based device");

  canvasContainer.addEventListener("mousedown", function(e) {
    if (logEventsDebug) console.log("Mouse down")

    mouseIsCurrentlyDown = true;
    x = e.offsetX;
    y = e.offsetY;
  })

  canvasContainer.addEventListener("mousemove", function(e) {
    if (mouseIsCurrentlyDown) {
      if (logEventsDebug) console.log("Mouse move")

      // Update game state depending on toggle mode selections
      if (DRAW_MODE) drawLine(context, x, y, e.offsetX, e.offsetY);

      x = e.offsetX;
      y = e.offsetY;
    }
  })

  canvasContainer.addEventListener("mouseup", function(e) {
    if (mouseIsCurrentlyDown) {
      if (logEventsDebug) console.log("Mouse up")
      mouseIsCurrentlyDown = false;

      // Update game state depending on toggle mode selections
      if (DRAW_MODE) drawLine(context, x, y, e.offsetX, e.offsetY);

      x = 0;
      y = 0;
    }
  })

  canvasContainer.addEventListener('dblclick', function (e) {
    if (logEventsDebug) console.log("Double click event")
    if (logEventsDebug && DRAW_MODE) console.log("Double click - clear screen")

    // Update game state depending on toggle mode selections
    if (DRAW_MODE) clearDrawingBoard();
  });
}

/* Draw to the canvas */

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'orange';
  context.lineWidth = 4;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

/* Clear drawable canvas */

function clearDrawingBoard() {
  context.clearRect(0, 0, drawableCanvas.width, drawableCanvas.height);
}
