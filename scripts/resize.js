/*
 * This script ensures the primary canvas element resizes to fill the viewport for the main content container of the page.
 */

// Boolean flag to determine if we should output a draw log to the console
// Note - if this flag is enabled and the console is open, the constant output causes the browser to be laggy
// It is recommended to set this flag to false for production builds.
const shouldLogDraws = false;

// Handle Canvas Draw Call
function redraw() {
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = '5';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Handle Resize Call
function resize() {
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}

// Initial Draw Call + Resize
let canvas = document.getElementById("resize");
let container = document.getElementById('resize-container');
if (shouldLogDraws) console.log("INITIAL DRAW: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
resize();
redraw();

// Sometimes the first draw call doesn't work, so do a clean up call to give the CSS height/width time to kick in
window.onload = function(){
   setTimeout(function() {
     if (shouldLogDraws) console.log("DRAW AGAIN: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
     resize();
     redraw();
   }, 500);
};

// ANIMATION LOOP OPTION 1 - REQUEST ANIMATION FRAME 60HERTZ UPDATE

const refreshRate = 1000 / 60;
let shouldRunAnimationLoop = false;

// Handle one requestAnimationFrame step
function step() {
  resize();
  redraw();
  if (shouldLogDraws) console.log("RESIZE: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
  if (shouldRunAnimationLoop) {
    window.requestAnimationFrame(step);
  }
}

// Start animation loop (such as when the screen begins resizing)
function startAnimationFrame() {
    // Begin resizing / animation loop
    shouldRunAnimationLoop = true;
    window.requestAnimationFrame(step);
    if (shouldLogDraws) console.warn("start");
}

// End animation loop (such as when the screen stops resizing)
function endAnimationFrame() {
    // End resizing / animation loop
    shouldRunAnimationLoop = false;
    if (shouldLogDraws) console.warn("end");
}

// Listen For Window Resize + Immediately Resize/Redraw + Debounced Log Resize To Console
const debouncedHandler = debounce(endAnimationFrame, 250);
window.addEventListener('resize', () => {
  if (shouldRunAnimationLoop == false) {
    startAnimationFrame();
  }
	debouncedHandler();
});

// Initiate Debounce Timer
function debounce(func, time){
    var time = time || 100; // 100 by default if no param
    var timer;
    return function(event) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
    };
}
