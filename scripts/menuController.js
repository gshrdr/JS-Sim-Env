// Hamburger menu source: https://codepen.io/pranjal9599/pen/yJRNoL

/* Elements used throughout menu animation system */
// Hamburger button icons
let hamburgerButton = document.getElementById("menu-button");
let icon = document.getElementById("icon");
let icon1 = document.getElementById("a");
let icon2 = document.getElementById("b");
let icon3 = document.getElementById("c");
// Hamburger menu elements
let menu = document.getElementById("menu");

// Console events log controller
const shouldLogMenuButtonDebug = true;

// Menu activation state
let menuIsActivated = false;

// Animation controls
let animationDelay = 0.1;

function menuButtonClick() {
  // Flip menu boolean toggle
  menuIsActivated = !menuIsActivated;

  // Run menu & elements animations
  runMenuButtonAnimation();
  runMenuElementsAnimation();

  // Debug log
  if (shouldLogMenuButtonDebug) console.log("Menu button press | Menu status: " + (menuIsActivated ? "Open" : "Closed"));
}

// Run hamburger button animation
function runMenuButtonAnimation() {
  // Toggle lines animation
  icon1.classList.toggle('a');
  icon2.classList.toggle('c');
  icon3.classList.toggle('b');
}

// Run hamburger menu elements animation
function runMenuElementsAnimation() {
  if (menuIsActivated) {
    // Show menu
    menu.classList.remove("hide-menu-no-animation");
    menu.style.animationDelay = "0";
    menu.classList.remove("hide-menu");
    menu.classList.add("show-menu");

    // Show menu elements
    let childNodes = menu.children;
    let animationDelayCurrent = 0;
    for (let i = 0; i < childNodes.length; i++) {
      childNodes[i].classList.remove("hide-item");
      childNodes[i].style.visibility = "hidden";
      childNodes[i].style.opacity = "0";
      childNodes[i].style.animationDelay = `${animationDelayCurrent}s`;
      childNodes[i].classList.add("show-item");
      animationDelayCurrent += animationDelay;
    }
  } else {
    // Hide menu elements
    let childNodes = menu.children;
    let animationDelayTotal = animationDelay * (childNodes.length - 1);
    let animationDelayCurrent = animationDelayTotal;
    for (let i = 0; i < childNodes.length; i++) {
      childNodes[i].classList.remove("show-item");
      childNodes[i].style.visibility = "visible";
      childNodes[i].style.opacity = "1";
      childNodes[i].style.animationDelay = `${animationDelayCurrent}s`;
      childNodes[i].classList.add("hide-item");
      animationDelayCurrent -= animationDelay;
    }

    // Hide menu
    menu.style.visibility = "visible";
    menu.style.opacity = "1";
    menu.classList.remove("show-menu");
    menu.style.animationDelay = `${animationDelayTotal}s`;
    menu.classList.add("hide-menu");
  }
}
