/*
 * CONSTANTS used throughout the application
 */

// Scrolling menu list button IDs
const CLEAR_CONSOLE = 1;
const CLEAR_STORAGE = 2;
const PRINT_STORAGE = 3;
const FPS_TOGGLE = 4;
const DRAW_MODE_TOGGLE = 5;
const PAN_ZOOM_MODE_TOGGLE = 6;

// All scrolling menu IDs which represent a toggle-able local storage control boolean
const ALL_TOGGLEABLE_MENU_IDS = [FPS_TOGGLE, DRAW_MODE_TOGGLE, PAN_ZOOM_MODE_TOGGLE];

// Retrieve key-value information for a particular menu ID
function retrieveMenuIDValue(Id) {
  switch (Id) {
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
    default:
      return null;
  }
}
