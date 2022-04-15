// Get a random RGB color
// Source: https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = num >> 8 & 255;
  var b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

// Get distance between two points
// Source: https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
function getDistance(x1, y1, x2, y2) {
  var a = x1 - x2;
  var b = y1 - y2;

  var c = Math.sqrt( a*a + b*b );

  return c;
}
