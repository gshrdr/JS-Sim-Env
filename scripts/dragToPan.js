/*
 * This script handles panning around the tilemap by listening for mouse/touch drag events
 */

document.addEventListener("dragover", function(e) {
  e = e || window.event;
  var dragX = e.pageX, dragY = e.pageY;

  console.log("X: " + dragX + " Y: " + dragY);
}, false);
