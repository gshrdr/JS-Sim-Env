/*
 * This script ensures the primary canvas element resizes to fill the viewport for the main content container of the page.
 */

// Primary canvas & container elements
let container = document.getElementById('canvas-container');
let canvas = document.getElementById("primary-canvas");

// Boolean flag to determine if we should output a draw log to the console
// Note - if this flag is enabled and the console is open, the constant output causes the browser to be laggy
// It is recommended to set this flag to false for production builds.
const shouldLogDraws = false;

/*
 * Handle Drawing
 */

// Main Redraw Function
function redraw() {
  const ctx = canvas.getContext("2d");
  drawBorder(ctx);
  drawRectangle(ctx);
}

// Draw Border
function drawBorder(ctx) {
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = '5';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Draw Rectangle - Showcases how the animation loop works (only during a window resize event)
let positionX = 50;
let minXPosition = 50;
let maxXPosition = 400;
let speedX = 1;
function drawRectangle(ctx) {
  // Update Rectangle Position
  positionX = positionX + speedX;
  if (positionX > maxXPosition || positionX < minXPosition) {
    speedX = speedX * (-1);
  }

  // Draw Rectangle
  ctx.fillStyle = 'green';
  ctx.rect(positionX, 50, 150, 75);
  ctx.fill();
}

/*
 * Handling Resizing
 */

// Handle Resize Call
function resize() {
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}

// Load Initial Canvas On Window Load
window.onload = function(){
  // Initial Draw Call + Resize
  if (shouldLogDraws) console.log("INITIAL DRAW: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
  resize();
  redraw();

  // Sometimes the first draw call doesn't work, so do a clean up call to give the CSS height/width time to kick in
  setTimeout(function() {
    if (shouldLogDraws) console.log("DRAW AGAIN: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
    resize();
    redraw();
  }, 250);
};

/*
 * Main Game / Animation Loop
 */

// Animation loop variables
const refreshRate = 1000 / 60;

// Animaton loop run/pause due to screen resize
let shouldRunGameLoopScreenResize = false;

// Animation loop override - run loop constantly
let shouldRunGameLoopOverride = false;
if (shouldRunGameLoopOverride) startGameLoopOverride();

// Handle one requestAnimationFrame step - this is one individual step within the main game loop
function gameLoop(timeStamp) {
  // Resize the canvas element to fit the container's height/width
  resize();

  // Redraw the canvas element to match the new height/width + redraw child elements
  redraw();

  // Calculate the game loop's FPS
  calculateFPS(timeStamp);

  // Log the size/width of the canvas + container (if debug boolean is enabled)
  if (shouldLogDraws) console.log("RESIZE: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);

  // If the game loop is set to continue, run another individual step
  if (shouldRunGameLoopOverride || shouldRunGameLoopScreenResize) {
    window.requestAnimationFrame(gameLoop);
  } else {
    // game loop is ending, update FPS counter to reflect no current FPS updates
    endFPS();
  }
}

// Game loop override - begin the game loop
function startGameLoopOverride() {
  shouldRunGameLoopOverride = true;
  window.requestAnimationFrame(gameLoop);
}

// Game loop override - stop the game loop (unless another event fires a temporary update)
function endGameLoopOverride() {
  shouldRunGameLoopOverride = false;
}

// Screen started resizing - run game loop
function screenResizeStarted() {
  if (shouldRunGameLoopScreenResize == false) {
    // Begin resizing / animation loop
    shouldRunGameLoopScreenResize = true;
    // Run game loop if we aren't already running loop due to override
    if (!shouldRunGameLoopOverride) window.requestAnimationFrame(gameLoop);
    if (shouldLogDraws) console.warn("start");
  }
}

// Screen ended resizing - pause game loop (unless override is enabled)
function screenResizeEnded() {
  if (shouldRunGameLoopScreenResize) {
    // End resizing / animation loop
    shouldRunGameLoopScreenResize = false;
    if (shouldLogDraws) console.warn("end");
  }
}

// Listen For Window Resize + Immediately Resize/Redraw + Debounced Log Resize To Console
const screenResizeEndedDebounced = debounce(screenResizeEnded, 250);
window.addEventListener('resize', () => {
  screenResizeStarted();
	screenResizeEndedDebounced();
});

/*
 * Game Loop Helper Functions
 */

// Debounce event handler with timer
function debounce(func, time){
    var time = time || 100; // 100 by default if no param
    var timer;
    return function(event) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
    };
}

// Calculate + display FPS
let fpsElement = document.getElementById("fps");
let oldTimeStamp;

function calculateFPS(timeStamp) {
  // Calculate the number of seconds passed since the last frame
  let secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Check to make sure this isn't a super large value (restart of game loop)
  if (secondsPassed <= 0.1) {
    // Calculate FPS
    let fps = Math.round(1 / secondsPassed);

    // Display FPS on debug window
    if (!isNaN(fps)) {
      fpsElement.innerHTML = `FPS: ${fps}`;
    } 
  }
}

// Reset FPS counter to blank
function endFPS() {
  fpsElement.innerHTML = "FPS: --";
}
