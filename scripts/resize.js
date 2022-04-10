/*
(function() {
  var
    // Obtain a reference to the canvas element using its id.
    htmlCanvas = document.
    // Obtain a graphics context on the canvas element for drawing.
    context = htmlCanvas.getContext('2d');

  // Start listening to resize events and draw canvas.
  initialize();

  function initialize() {
    // Register an event listener to call the resizeCanvas() function
    // each time the window is resized.
    window.addEventListener('resize', resizeCanvas, false);
    // Draw canvas border for the first time.
    resizeCanvas();
  }

  // Display custom canvas. In this case it's a blue, 5 pixel
  // border that resizes along with the browser window.
  function redraw() {

    context.strokeStyle = 'blue';
    context.lineWidth = '5';
    context.strokeRect(0, 0, htmlCanvas.width, htmlCanvas.height);
  }

  // Runs each time the DOM window resize event fires.
  // Resets the canvas dimensions to match window,
  // then draws the new borders accordingly.
  function resizeCanvas() {
    redraw();
  }
})();
*/


// Handle Canvas Draw Call
// Tutorial: https://thewebdev.info/2021/03/01/how-to-resize-html5-canvas-to-fit-the-window/
const draw = (canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = '5';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Initial Draw Call
let canvas = document.getElementById("resize");
let container = document.getElementById('resize-container');
canvas.width = container.clientWidth
canvas.height = container.clientHeight
console.log("INITIAL DRAW: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
draw(canvas)

// Sometimes the first draw call doesn't work, so do a clean up call to give the CSS height/width time to kick in
window.onload = function(){
   setTimeout(function(){
       canvas.width = container.clientWidth
       canvas.height = container.clientHeight
       console.log("DRAW AGAIN: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
       draw(canvas)
   }, 1000);
};

// Listen For Window Resize
let previousWidth = container.clientWidth
let previousHeight = container.clientHeight
window.addEventListener('resize', () => {
  // Update canvas height to match container height (filling remaining screen)
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight

  console.log("RESIZE: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
  draw(canvas)
})
