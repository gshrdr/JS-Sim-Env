/*
 * This script ensures the primary canvas element resizes to fill the viewport for the main content container of the page.
 */

// Handle Canvas Draw Call
function draw(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = '5';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Handle Resize Call
function resize() {
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  draw(canvas);
}

// Initial Draw Call + Resize
let canvas = document.getElementById("resize");
let container = document.getElementById('resize-container');
console.log("INITIAL DRAW: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
resize();

// Sometimes the first draw call doesn't work, so do a clean up call to give the CSS height/width time to kick in
window.onload = function(){
   setTimeout(function() {
     console.log("DRAW AGAIN: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
     resize();
   }, 500);
};

// Listen For Window Resize + Immediately Resize/Redraw + Debounced Log Resize To Console
const debouncedHandler = debounce(resizeContent, 50);
window.addEventListener('resize', () => {
  resize();
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

// End Of Debounce - Log Resize Details
function resizeContent() {
    console.log("RESIZE: Canvas Width: " + canvas.width + " Canvas Height: " + canvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
}
