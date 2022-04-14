// Get a random RGB color
// Source: https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = num >> 8 & 255;
  var b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
