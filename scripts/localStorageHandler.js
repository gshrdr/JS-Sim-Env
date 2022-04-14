/*
 * This script assists with loading & setting local storage variables
 */

// Console debug log control
const shouldLogLocalStorageDebug = true;

// Update local state values for easy access across application
let HAS_LOADED_CANVAS_ENTITIES = false;
let DRAW_MODE = false;
let PAN_ZOOM_MODE = false;

// Get local storage item by ID
function getLocalItemById(Id) {
  let value = retrieveMenuIDValue(Id);
  let localItem = localStorage.getItem(value);
  return localItem;
}

// Initial load check - check if any local storage values are undefined
function checkForUndefinedValues() {
  let keyEntries = ALL_TOGGLEABLE_MENU_IDS;
  for(let i = 0; i < keyEntries.length; i++) {
    // Test if local storage item is null - set to default if so
    let key = keyEntries[i];
    let value = retrieveMenuIDValue(key);
    let localItem = getLocalItemById(key);
    if (localItem === null) {
      if (shouldLogLocalStorageDebug) console.log("Local storage null value found | LS Key: " + value)
      localStorage.setItem(value, false);
      if (shouldLogLocalStorageDebug) console.log("New local storage value: " + localStorage.getItem(value));
    }
  }
}

function runInitialToggleUpdate() {
  let keyEntries = ALL_TOGGLEABLE_MENU_IDS;
  for(let i = 0; i < keyEntries.length; i++) {
    updateDOMDisplayAndGameState(keyEntries[i]);
  }
}

// Run initial checks upon load
checkForUndefinedValues();
runInitialToggleUpdate();

/*
 * Local storage helper functions
 */

// Reset entire local storage
function resetStorage() {
  localStorage.clear();
  checkForUndefinedValues();
  runInitialToggleUpdate();
}

// Print entire local storage
function printStorage() {
  console.log("----- Print Local Storage -----");
  let keyEntries = ALL_TOGGLEABLE_MENU_IDS;
  for(let i = 0; i < keyEntries.length; i++) {
    let key = keyEntries[i];
    let value = retrieveMenuIDValue(key)
    let localItem = localStorage.getItem(value);
    console.log("Key: " + key + " | Value: " + value + " | LS for value: " + localItem);
  }
  console.log("----- Print Local Storage -----");
}

/*
 * Update DOM display state + update local storage for a particular ID
 */

function toggleMenuItemState(Id) {
  // Get value from ID
  let value = retrieveMenuIDValue(Id);

  // Get local value
  let localItem = getLocalItemById(Id);

  // Update state
  if (localItem === "true") {
    localStorage.setItem(value, false);
  } else {
    localStorage.setItem(value, true);
  }

  // Update DOM display & game state
  updateDOMDisplayAndGameState(Id);
}

// Update scrolling menu list toggle - "ON" or "OFF"
function updateMenuItemDisplayState(Id) {
  // Get key from ID
  let key = retrieveMenuIDValue(Id);

  // Get local value
  let localItem = getLocalItemById(Id);

  // Get menu toggle element
  let el = document.getElementById(key);

  // Update menu state
  if (localItem === "true") {
    el.innerHTML = "ON";
  } else {
    el.innerHTML = "OFF";
  }

  // Console log
  if (shouldLogLocalStorageDebug) console.log("Updating menu list item state | Key: " + key + " Local storage state: " + localItem);
}

// Update DOM display element 7 runs subsequent state update functions by ID
function updateDOMDisplayAndGameState(Id) {
  switch (Id) {
    case FPS_TOGGLE: updateMenuItemDisplayState(Id); toggleFPSDisplay(); break;
    case DRAW_MODE_TOGGLE: updateMenuItemDisplayState(Id); toggleDrawMode(); break;
    case PAN_ZOOM_MODE_TOGGLE: updateMenuItemDisplayState(Id); togglePanZoomMode(); break;
    default: break;
  }
}

// Show or hide FPS toggle
function toggleFPSDisplay() {
  // Get local value
  let localItem = getLocalItemById(FPS_TOGGLE);

  // Get FPS debug element + show/hide
  let el = document.getElementById("fps-debug");
  if (localItem === "true") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }

  // Console log
  if (shouldLogLocalStorageDebug) console.log("Updating FPS DOM display status: " + localItem)
}

// Toggle draw mode
function toggleDrawMode() {
  // Get local value + toggle
  let localItem = getLocalItemById(DRAW_MODE_TOGGLE);
  if (localItem === "true") {
    DRAW_MODE = true;
  } else {
    DRAW_MODE = false;
  }

  // Modify necessary game state elements
  if (HAS_LOADED_CANVAS_ENTITIES) {
    if (shouldLogLocalStorageDebug) console.log("Toggling draw mode + clearing drawing board")
    clearDrawingBoard();
  }
}

// Toggle pan zoom mode
function togglePanZoomMode() {
  // Get local value + toggle
  let localItem = getLocalItemById(PAN_ZOOM_MODE_TOGGLE);
  if (localItem === "true") {
    PAN_ZOOM_MODE = true;
  } else {
    PAN_ZOOM_MODE = false;
  }

  // Modify necessary game state elements
  if (HAS_LOADED_CANVAS_ENTITIES) {
    if (shouldLogLocalStorageDebug) console.log("Toggling pan / zoom mode")
    clearDrawingBoard();
  }
}
