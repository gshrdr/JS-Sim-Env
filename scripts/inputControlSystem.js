/*
 * This script handles mouse and touch inputs to move around the virtual world.
 */

 // TO DO - Rather than using touch events to draw to a third canvas element, remove this canvas element and use
 // the drag events to move/pan the camera around the tile map
 // Scrolling camera tutorial: https://gamedev.stackexchange.com/questions/86820/how-do-i-make-a-scrolling-map-within-an-html5-canvas

// Overall canvas container element
let canvasContainer = document.getElementById('canvas-container');

// Canvas + context elements
const drawableCanvas = document.getElementById('drawable-canvas');
const context = drawableCanvas.getContext('2d');
const tilemapContext = document.getElementById('tilemap-canvas').getContext('2d');

// Pan/Zoom & Draw control variables
let mouseIsCurrentlyDown = false;
let recentTouchTimeStamp;

// Touch/click x/y position
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

  // Touch point difference used for pinch/zoom
  let prevDistance = null;

  /* Handle touch events - draw & pan screen */

  // Touch start events
  drawableCanvas.addEventListener("touchstart", function(e) {
    if (logEventsDebug) console.log("Touch start")

    // Detect double tap event
    checkForDoubleTouch();

    // Block default events
    e.preventDefault();

    // Handle touch started
    if (mouseIsCurrentlyDown === false) {
      mouseIsCurrentlyDown = true;
      let containerYOffset = canvasContainer.getBoundingClientRect().top;
      x = e.touches[0].clientX;
      y = e.touches[0].clientY - containerYOffset;
    }
  });

  // Touch move events
  drawableCanvas.addEventListener("touchmove", function(e) {
    e.preventDefault();

    if (mouseIsCurrentlyDown) {
      if (logEventsDebug) console.log("Touch move")

      let containerYOffset = canvasContainer.getBoundingClientRect().top

      if (e.touches.length == 1 && e.changedTouches.length == 1) {
        // 1 touch is active - Handle draw or pan screen

        // Update game state depending on current pan/zoom or draw mode toggle selection
        if (DRAW_MODE) drawLine(context, x, y, e.touches[0].clientX, (e.touches[0].clientY - containerYOffset));
        if (PAN_ZOOM_MODE) panTilemap(x, y, e.touches[0].clientX, (e.touches[0].clientY - containerYOffset));

        // Handle draw/pan movement
        x = e.touches[0].clientX;
        y = e.touches[0].clientY - containerYOffset;
      } else if (e.touches.length == 2 && e.changedTouches.length == 2) {
        // 2 touches are active - Handle pinch to zoom
        if (PAN_ZOOM_MODE) {
          // Retrieve touch 1 & 2 x/y coordinates to use for distance between points
          let touch1X = e.touches[0].clientX;
          let touch1Y = e.touches[0].clientY;
          let touch2X = e.touches[1].clientX;
          let touch2Y = e.touches[1].clientY;

          // Ensure all touches are in bounds
          if (touch1X >= 0 && touch1Y >= 0 && touch2X >= 0 && touch2Y >= 0) {
            // Get distance between points
            let distance = getDistance(touch1X, touch1Y, touch2X, touch2Y);
            if (logEventsDebug) console.log("(X1, Y1): " + touch1X + ", " + touch1Y + " (X2, Y2): " + touch2X + ", " + touch2Y + " Pinch to zoom, distance between points: " + distance);

            // Check if previous distance is null, otherwise proceed to check for zoom in/out event
            if (prevDistance === null) {
              prevDistance = distance;
            } else {
              if (distance > prevDistance) {
                let scaleDifference = distance / prevDistance;
                if (logEventsDebug) console.log("Pinch moving OUT -> Zoom IN | Scale: " + scaleDifference);
                handlePinchToZoom(scaleDifference);
              } else if (distance < prevDistance) {
                let scaleDifference = distance / prevDistance;
                if (logEventsDebug) console.log("Pinch moving IN -> Zoom OUT | Scale: " + scaleDifference);
                handlePinchToZoom(scaleDifference);
              }

              // Set previous distance to current distance for next pinch iteration
              prevDistance = distance;
            }
          } else {
            if (logEventsDebug) console.warn("Touch out of bounds - unable to pinch to zoom");
          }
        }
      }
    }
  });

  // Touch end events
  drawableCanvas.addEventListener("touchend", function(e) {
    e.preventDefault();

    if (mouseIsCurrentlyDown) {
      if (logEventsDebug) console.log("Touch end")

      // Reset pan & draw controls
      mouseIsCurrentlyDown = false;
      x = 0;
      y = 0;
      prevDistance = null;
    }
  });

  drawableCanvas.addEventListener("touchcancel", function(e) {
    e.preventDefault();

    if (mouseIsCurrentlyDown) {
      if (logEventsDebug) console.log("Touch cancel")

      // Reset pan & draw controls
      mouseIsCurrentlyDown = false;
      x = 0;
      y = 0;
      prevDistance = null;
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
      if (PAN_ZOOM_MODE) panTilemap(x, y, e.offsetX, e.offsetY);

      x = e.offsetX;
      y = e.offsetY;
    }
  })

  canvasContainer.addEventListener("mouseup", function(e) {
    if (logEventsDebug) console.log("Mouse up");
    endMouseEvent(e);
  })

  canvasContainer.addEventListener("mouseleave", function(e) {
    if (logEventsDebug) console.log("Mouse up");
    endMouseEvent(e);
  })

  canvasContainer.addEventListener("mouseout", function(e) {
    if (logEventsDebug) console.log("Mouse up");
    endMouseEvent(e);
  })

  function endMouseEvent(e) {
    if (mouseIsCurrentlyDown) {
      mouseIsCurrentlyDown = false;

      // Update game state depending on toggle mode selections
      if (DRAW_MODE) drawLine(context, x, y, e.offsetX, e.offsetY);

      x = 0;
      y = 0;
    }
  }

  canvasContainer.addEventListener('dblclick', function (e) {
    if (logEventsDebug) console.log("Double click event")
    if (logEventsDebug && DRAW_MODE) console.log("Double click - clear screen")

    // Update game state depending on toggle mode selections
    if (DRAW_MODE) clearDrawingBoard();
  });

  // Listen for mouse scroll events
  canvasContainer.addEventListener('wheel', function (e) {
    if (logEventsDebug && PAN_ZOOM_MODE) console.log("Scroll event - update canvas scale")

    // Prevent default events
    e.preventDefault();

    // Update game state depending on toggle mode selections
    if (PAN_ZOOM_MODE) handleScrollWheel(e);
  });
}

/* Pan canvas */

function panTilemap(x, y, offsetX, offsetY) {
  TILEMAP_X_MOD -= (x - offsetX) / TILEMAP_SCALE;
  TILEMAP_Y_MOD -= (y - offsetY) / TILEMAP_SCALE;
  resizeTilemap();
  redrawTilemap();
}

/* Scroll & Pinch/zoom canvas */

// Track previous scale so we can translate x/y transforms
let previousScale = TILEMAP_SCALE;

let pinchTimer = null;
function handlePinchToZoom(scaleDifference) {
  // Update & restrict scale
  TILEMAP_SCALE *= scaleDifference;
  TILEMAP_SCALE = Math.min(Math.max(TILEMAP_SCALE_MIN, TILEMAP_SCALE), TILEMAP_SCALE_MAX);

  // Update x/y position using the delta between the new scale and previous scale
  let scaleDelta = TILEMAP_SCALE / previousScale;

  TILEMAP_X_MOD /= scaleDelta
  TILEMAP_Y_MOD /= scaleDelta

  // Apply scale transform
  resizeTilemap();
  redrawTilemap();

  // Set values necessary for previous scale & position deltas
  previousScale = TILEMAP_SCALE;

  // Listen for end of scroll event
  if(pinchTimer !== null) {
    clearTimeout(pinchTimer);
  }
  pinchTimer = setTimeout(function() {
    if (logEventsDebug) console.warn("Pinch to zoom event ended - regenerate tilemap");
    resizeTilemap();
    redrawTilemap(true);
  }, 1000);
}

// Scroll wheel pinch/zoom
let wheelTimer = null;
function handleScrollWheel(e) {
  // Update & restrict scale
  TILEMAP_SCALE += (e.deltaY * -0.01) * .1;
  TILEMAP_SCALE = Math.min(Math.max(TILEMAP_SCALE_MIN, TILEMAP_SCALE), TILEMAP_SCALE_MAX);

  // Update x/y position using the delta between the new scale and previous scale
  let scaleDelta = TILEMAP_SCALE / previousScale;

  TILEMAP_X_MOD /= scaleDelta
  TILEMAP_Y_MOD /= scaleDelta

  // Apply scale transform
  resizeTilemap();
  redrawTilemap();

  // Set values necessary for previous scale & position deltas
  previousScale = TILEMAP_SCALE;

  // Listen for end of scroll event
  if(wheelTimer !== null) {
    clearTimeout(wheelTimer);
  }
  wheelTimer = setTimeout(function() {
    if (logEventsDebug) console.warn("Scroll event ended - regenerate tilemap");
    resizeTilemap();
    redrawTilemap(true);
  }, 1000);
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
