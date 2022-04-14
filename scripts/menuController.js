// Hamburger menu source: https://codepen.io/pranjal9599/pen/yJRNoL

var icon = document.getElementById("icon");
var icon1 = document.getElementById("a");
var icon2 = document.getElementById("b");
var icon3 = document.getElementById("c");

function menuButtonClick() {
  console.log("menu button click!");
  icon1.classList.toggle('a');
  icon2.classList.toggle('c');
  icon3.classList.toggle('b');
}
