// Hamburger menu source: https://codepen.io/pranjal9599/pen/yJRNoL

/* Elements used throughout menu animation system */
// Hamburger button icons
let hamburgerButton = document.getElementById("menu-button");
let icon = document.getElementById("icon");
let icon1 = document.getElementById("a");
let icon2 = document.getElementById("b");
let icon3 = document.getElementById("c");
// Hamburger menu elements
let menuTop = document.getElementById("menu-top");
let menu = document.getElementById("menu");

// Console events log controller
const shouldLogHamburgerMenuButtonDebug = true;
const shouldLogListItemButtonDebug = true;

// Menu activation state
let menuIsActivated = false;

// Animation controls
let animationDelayShow = 0.04;
let animationDelayHide = 0.03;

/*
 * Overall hamburger menu button press + menu deployment
 */

// Handle hamburger menu button click
function menuButtonClick() {
  // Flip menu boolean toggle
  menuIsActivated = !menuIsActivated;

  // Run menu & elements animations
  runMenuButtonAnimation();
  runMenuElementsAnimation();

  // Debug log
  if (shouldLogHamburgerMenuButtonDebug) console.log("Hamburger button press | Menu status: " + (menuIsActivated ? "Open" : "Closed"));
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
    menu.style.animationDelay = "0s";
    menu.classList.remove("hide-menu");
    menu.classList.add("show-menu");
    menuTop.classList.remove("hide-menu-no-animation");
    menuTop.style.animationDelay = "0s";
    menuTop.classList.remove("hide-menu");
    menuTop.classList.add("show-menu");

    // Scroll menu to top
    menu.scrollTo(0, 0);

    // Show menu elements
    let childNodes = menu.children;
    let animationDelayCurrent = 0.3;
    for (let i = 0; i < childNodes.length; i++) {
      childNodes[i].classList.remove("hide-item");
      childNodes[i].style.visibility = "hidden";
      childNodes[i].style.opacity = "0";
      childNodes[i].style.animationDelay = `${animationDelayCurrent}s`;
      childNodes[i].classList.add("show-item");
      animationDelayCurrent += animationDelayShow;
    }
  } else {
    // Hide menu elements
    let childNodes = menu.children;
    let animationDelayTotal = animationDelayHide * (childNodes.length - 1);
    let animationDelayCurrent = animationDelayTotal;
    for (let i = 0; i < childNodes.length; i++) {
      childNodes[i].classList.remove("show-item");
      childNodes[i].style.visibility = "visible";
      childNodes[i].style.opacity = "1";
      childNodes[i].style.animationDelay = `${animationDelayCurrent}s`;
      childNodes[i].classList.add("hide-item");
      animationDelayCurrent -= animationDelayHide;
    }

    // Hide menu
    menu.style.visibility = "visible";
    menu.style.opacity = "1";
    menu.classList.remove("show-menu");
    menu.style.animationDelay = "0.8s";
    menu.classList.add("hide-menu");
    menuTop.style.visibility = "visible";
    menuTop.style.opacity = "1";
    menuTop.classList.remove("show-menu");
    menuTop.style.animationDelay = "0.8s";
    menuTop.classList.add("hide-menu");
  }
}

/*
 * Individual hamburger menu button click
 */

// Console log debug helper for menu button click
function logButtonClickDebug(input) {
  if (shouldLogListItemButtonDebug) console.log("Menu List Button Pressed | ID: " + input);
}

// Individual menu button is pressed
function buttonClickById(Id) {
  switch (Id) {
    case 1:
      logButtonClickDebug(Id);
      updateStateForId(Id);
      break;
    case 2:
      logButtonClickDebug(Id);
      updateStateForId(Id);
      break;
    default:
      logButtonClickDebug("DEFAULT");
      break;
  }
}

// Handle specific state update by ID
function updateStateForId(Id) {
  switch (Id) {
    case 1: console.clear(); break;
    case 2: toggleState(Id); break;
    default: break;
  }
}

// Toggle button state by ID
function toggleState(Id) {
  if (shouldLogListItemButtonDebug) console.log("Toggle State | ID: " + Id);
}
