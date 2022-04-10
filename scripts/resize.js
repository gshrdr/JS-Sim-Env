// Handle Canvas Draw Call
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
   }, 500);
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
