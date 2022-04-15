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

// Menu activation state
let menuIsActivated = false;

// Animation controls
let animationDelayShow = 0.03;
let animationDelayHide = 0.02;

/*
 * Overall hamburger menu button press + menu deployment
 */

// Listen for touch outside menu - close menu if so
// mouse click to close - document.getElementById("canvas-container").addEventListener("click", closeMenu);
document.getElementById("canvas-container").addEventListener("touchstart", closeMenu);
function closeMenu() {
  if (menuIsActivated) {
    menuButtonClick();
  }
}

// Handle hamburger menu button click
function menuButtonClick() {
  // Flip menu boolean toggle
  menuIsActivated = !menuIsActivated;

  // Update mini device overlay menu
  updateMiniMenuOverlayColor();

  // Run menu & elements animations
  runMenuButtonAnimation();
  runMenuElementsAnimation();

  // Debug log
  if (shouldLogHamburgerMenuButtonDebug) console.log("Hamburger button press | Menu status: " + (menuIsActivated ? "Open" : "Closed"));
}

// Update the miniature overlay window shown on mobile devices
function updateMiniMenuOverlayColor() {
   const miniOverlay = document.getElementById("mini-content-overlay");
   if (menuIsActivated) {
     miniOverlay.style.backgroundColor = "#111827";
   } else {
     miniOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
   }
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
    menu.style.animationDelay = "0.3s";
    menu.classList.add("hide-menu");
    menuTop.style.visibility = "visible";
    menuTop.style.opacity = "1";
    menuTop.classList.remove("show-menu");
    menuTop.style.animationDelay = "0.3s";
    menuTop.classList.add("hide-menu");
  }
}

/*
 * Individual list item button press console log helper function
 */

 // Console log debug helper for menu button click
 function logButtonClickDebug(input) {
   if (shouldLogListItemButtonDebug) console.log("Menu List Button Pressed | ID: " + input);
 }

 // Console log debug helper for a state toggle
 function logStateToggleDebug(input) {
   if (shouldLogListItemButtonDebug) console.log("Toggle State | ID: " + input);
 }

/*
 * Individual scrolling menu list button click
 */

// Individual menu button is pressed
function buttonClickById(Id) {
  switch (Id) {
    case REFRESH_BROWSER:
      updateStateForId(Id);
      break;
    case CONSOLE_LOGS_TOGGLE:
      updateStateForId(Id);
      break;
    case CLEAR_CONSOLE:
      updateStateForId(Id);
      break;
    case CLEAR_STORAGE:
      logButtonClickDebug(retrieveMenuIDValue(Id));
      updateStateForId(Id);
      break;
    case PRINT_STORAGE:
      logButtonClickDebug(retrieveMenuIDValue(Id));
      updateStateForId(Id);
      break;
    case FPS_TOGGLE:
      logButtonClickDebug(retrieveMenuIDValue(Id));
      updateStateForId(Id);
      break;
    case DRAW_MODE_TOGGLE:
      logButtonClickDebug(retrieveMenuIDValue(Id));
      updateStateForId(Id);
      break;
    case PAN_ZOOM_MODE_TOGGLE:
      logButtonClickDebug(retrieveMenuIDValue(Id));
      updateStateForId(Id);
      break;
    case GAME_LOOP_TOGGLE:
      logButtonClickDebug(retrieveMenuIDValue(Id));
      updateStateForId(Id);
      break;
    case REGEN_TERRAIN:
      logButtonClickDebug(retrieveMenuIDValue(Id));
      updateStateForId(Id);
      break;
    default:
      logButtonClickDebug(retrieveMenuIDValue(Id));
      break;
  }
}

// Handle specific state update by ID
function updateStateForId(Id) {
  switch (Id) {
    case REFRESH_BROWSER: window.location.reload(); break;
    case CONSOLE_LOGS_TOGGLE: toggleState(Id); break;
    case CLEAR_CONSOLE: console.clear(); break;
    case CLEAR_STORAGE: resetStorage(); break;
    case PRINT_STORAGE: printStorage(); break;
    case FPS_TOGGLE: toggleState(Id); break;
    case DRAW_MODE_TOGGLE: toggleState(Id); break;
    case PAN_ZOOM_MODE_TOGGLE: toggleState(Id); break;
    case GAME_LOOP_TOGGLE: toggleState(Id); break;
    case REGEN_TERRAIN: regenerateTerrain(); break;
    default: break;
  }
}

// Toggle button state by ID
function toggleState(Id) {
  switch (Id) {
    case CONSOLE_LOGS_TOGGLE: toggleMenuItemState(Id); logStateToggleDebug(retrieveMenuIDValue(Id)); break;
    case FPS_TOGGLE: toggleMenuItemState(Id); logStateToggleDebug(retrieveMenuIDValue(Id)); break;
    case DRAW_MODE_TOGGLE: toggleMenuItemState(Id); logStateToggleDebug(retrieveMenuIDValue(Id)); break;
    case PAN_ZOOM_MODE_TOGGLE: toggleMenuItemState(Id); logStateToggleDebug(retrieveMenuIDValue(Id)); break;
    case GAME_LOOP_TOGGLE: toggleMenuItemState(Id); logStateToggleDebug(retrieveMenuIDValue(Id)); break;
    default: break;
  }
}
