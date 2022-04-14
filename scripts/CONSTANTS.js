/*
 * CONSTANTS used throughout the application
 */

 // Game mode controls
 let HAS_LOADED_CANVAS_ENTITIES = false;
 let DRAW_MODE = false;
 let PAN_ZOOM_MODE = false;
 let GAME_LOOP_OVERRIDE = false;

 /* Local storage + Menu item key value pairs */

// Scrolling menu list button IDs
let keyIterator = 1;
const REFRESH_BROWSER = keyIterator; keyIterator++;
const CONSOLE_LOGS_TOGGLE = keyIterator; keyIterator++;
const CLEAR_CONSOLE = keyIterator; keyIterator++;
const CLEAR_STORAGE = keyIterator; keyIterator++;
const PRINT_STORAGE = keyIterator; keyIterator++;
const FPS_TOGGLE = keyIterator; keyIterator++;
const DRAW_MODE_TOGGLE = keyIterator; keyIterator++;
const PAN_ZOOM_MODE_TOGGLE = keyIterator; keyIterator++;
const GAME_LOOP_TOGGLE = keyIterator; keyIterator++;
const REGEN_TERRAIN = keyIterator; keyIterator++;

// All scrolling menu IDs which represent a toggle-able local storage control boolean
const ALL_TOGGLEABLE_MENU_IDS = [CONSOLE_LOGS_TOGGLE, FPS_TOGGLE, DRAW_MODE_TOGGLE, PAN_ZOOM_MODE_TOGGLE, GAME_LOOP_TOGGLE];

// Retrieve key-value information for a particular menu ID
function retrieveMenuIDValue(Id) {
  switch (Id) {
    case REFRESH_BROWSER:
      return "REFRESH_BROWSER";
    case CONSOLE_LOGS_TOGGLE:
      return "CONSOLE_LOGS_TOGGLE";
    case CLEAR_CONSOLE:
      return "CLEAR_CONSOLE";
    case CLEAR_STORAGE:
      return "CLEAR_STORAGE";
    case PRINT_STORAGE:
      return "PRINT_STORAGE";
    case FPS_TOGGLE:
      return "FPS_TOGGLE";
    case DRAW_MODE_TOGGLE:
      return "DRAW_MODE_TOGGLE";
    case PAN_ZOOM_MODE_TOGGLE:
      return "PAN_ZOOM_MODE_TOGGLE";
    case GAME_LOOP_TOGGLE:
      return "GAME_LOOP_TOGGLE";
    case REGEN_TERRAIN:
      return "REGEN_TERRAIN";
    default:
      return null;
  }
}

/* Console Debug Logs */

// localStorageHandler.js
let shouldLogLocalStorageDebug = false;

// inputControlSystem.js
let logEventsDebug = true;

// menuController.js
let shouldLogHamburgerMenuButtonDebug = true;
let shouldLogListItemButtonDebug = true;

// mainGameLoop.js
let shouldLogInitialDraw = true;
let shouldLogResizeSize = true;
let shouldLogScreenResizeEvents = true;
let shouldLogTilemapRegeneration = true;

function overrideAndResetConsoleLogs() {
  shouldLogLocalStorageDebug = false;
  logEventsDebug = false;
  shouldLogHamburgerMenuButtonDebug = false;
  shouldLogListItemButtonDebug = false;
  shouldLogInitialDraw = false;
  shouldLogResizeSize = false;
  shouldLogScreenResizeEvents = false;
  shouldLogTilemapRegeneration = false;
}

function enableAllConsoleLogs() {
  shouldLogLocalStorageDebug = true;
  logEventsDebug = true;
  shouldLogHamburgerMenuButtonDebug = true;
  shouldLogListItemButtonDebug = true;
  shouldLogInitialDraw = true;
  shouldLogResizeSize = true;
  shouldLogScreenResizeEvents = true;
  shouldLogTilemapRegeneration = true;
}
