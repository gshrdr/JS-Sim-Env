/*
 * This script contains the main game loop that resizes and redraws the contents of the canvas element.
 */

// Primary canvas & container elements
let container = document.getElementById('canvas-container');
let tilemapCanvas = document.getElementById("tilemap-canvas");
let entityCanvas = document.getElementById("entity-canvas");

// Tilemap generator object
let tilemapGenerator;

// Game loop override has started?
let gameLoopOverrideHasBeenTriggered = false;

/*
 * Overall Application Entry Point
 */

// Load Initial Canvas On Window Load
window.onload = function() {
  // Setup tilemap generator
  tilemapGenerator = new TilemapGenerator(TILEMAP_HEIGHT, TILEMAP_WIDTH);

  // Initial Draw Call + Resize
  if (shouldLogInitialDraw) console.log("INITIAL DRAW: Canvas Width: " + tilemapCanvas.width + " Canvas Height: " + tilemapCanvas.height + " Container Width: " + container.clientWidth + " Container Height: " + container.clientHeight);
  initialLoad();

  // Animation loop override - run loop constantly
  if (GAME_LOOP_OVERRIDE) startGameLoopOverride();
};

// Resize + draw the initial layout
function initialLoad() {
  resizeTilemap();
  redrawTilemap();
  resizeEntities();
  redrawEntities();

  HAS_LOADED_CANVAS_ENTITIES = true;
}

/*
 * Main Game / Animation Loop
 */

// Animaton loop run/pause due to screen resize
let shouldRunGameLoopScreenResize = false;

// Handle one requestAnimationFrame step - this is one individual step within the main game loop
function gameLoop(timeStamp) {
  // Debug log
  if (shouldRunGameLoopScreenResize && shouldLogScreenResizeEvents) { console.log("Resize tilemap/entity canvas | Copy tilemap offscreen context to screen") }

  // Resize + redraw tilemap layer
  if (shouldRunGameLoopScreenResize) {
    resizeTilemap();
    redrawTilemap();
  }

  // Resize + redraw entities layer
  if (shouldRunGameLoopScreenResize) resizeEntities();
  redrawEntities();

  // Calculate the game loop's FPS
  calculateFPS(timeStamp);

  // If the game loop is set to continue, run another individual step
  if (GAME_LOOP_OVERRIDE || shouldRunGameLoopScreenResize) {
    window.requestAnimationFrame(gameLoop);
  } else {
    // game loop is ending, update FPS counter to reflect no current FPS updates
    endFPS();
  }

  // Reset game loop manual override trigger check
  if (GAME_LOOP_OVERRIDE === false) {
    gameLoopOverrideHasBeenTriggered = false;
  }
}

// Game loop override - begin the game loop
function startGameLoopOverride() {
  if (GAME_LOOP_OVERRIDE && !gameLoopOverrideHasBeenTriggered) {
    gameLoopOverrideHasBeenTriggered = true;
    window.requestAnimationFrame(gameLoop);
  }
}

// Screen started resizing - run game loop
function screenResizeStarted() {
  if (shouldRunGameLoopScreenResize == false) {
    // Begin resizing / animation loop
    shouldRunGameLoopScreenResize = true;
    // Run game loop if we aren't already running loop due to override
    if (GAME_LOOP_OVERRIDE == false) window.requestAnimationFrame(gameLoop);
    if (shouldLogScreenResizeEvents) console.warn("Begin resizing event.");
  }
}

// Screen ended resizing - pause game loop (unless override is enabled)
function screenResizeEnded() {
  if (shouldRunGameLoopScreenResize) {
    // End resizing / animation loop
    shouldRunGameLoopScreenResize = false;
    if (shouldLogScreenResizeEvents) console.warn("End resizing event.");

    // Re-draw tilemap
    resizeTilemap();
    redrawTilemap(true);
  }
}

// Listen For Window Resize + Immediately Resize/Redraw + Debounced Log Resize To Console
const screenResizeEndedDebounced = debounce(screenResizeEnded, 250);
window.addEventListener('resize', () => {
  screenResizeStarted();
	screenResizeEndedDebounced();
});

/*
 * Game Loop Helper Functions
 */

// Debounce event handler with timer
function debounce(func, time){
    var time = time || 100; // 100 by default if no param
    var timer;
    return function(event) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
    };
}

// Calculate + display FPS
let fpsElement = document.getElementById("fps");
let oldTimeStamp; // Last time stamp of FPS check
let lastFpsUpdateTimeStamp; // Last time stamp of FPS display update
let fpsUpdateInterval = 0.5; // FPS display update interval - don't update FPS counter @ 60hz, do it slower

function calculateFPS(timeStamp) {
  // Calculate the number of seconds passed since the last frame
  let secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Check to make sure this isn't a super large value (restart of game loop)
  if (secondsPassed <= 0.1) {
    // Calculate FPS
    let fps = Math.round(1 / secondsPassed);

    // Determine if we should update the FPS display
    if (lastFpsUpdateTimeStamp == null) {
      // No previous FPS update time stamp, set for next iteration
      lastFpsUpdateTimeStamp = timeStamp;
    } else {
      // Determine period of time since last FPS update
      let secondsPassedFpsUpdate = (timeStamp - lastFpsUpdateTimeStamp) / 1000;
      if (secondsPassedFpsUpdate >= fpsUpdateInterval) {
        // It's been a while since an FPS display update.... display FPS on debug window + update display time stamp
        lastFpsUpdateTimeStamp = timeStamp;
        if (!isNaN(fps)) {
          if (fps > 120) { fps = 120; }
          fpsElement.innerHTML = `FPS: ${fps}`;
        }
      }
    }
  }
}

// Reset FPS counter to blank
function endFPS() {
  fpsElement.innerHTML = "FPS: --";
}

/*
 * Handling Resizing - Tile Map Layer & Entities Layer
 */

// Resize Tilemap Layer
function resizeTilemap() {
  tilemapCanvas.width = container.clientWidth;
  tilemapCanvas.height = container.clientHeight;
}

// Resize Entities Layer
function resizeEntities() {
  entityCanvas.width = container.clientWidth;
  entityCanvas.height = container.clientHeight;
}

/*
 * Handle Drawing - Tile Map Layer
 */

let hasGeneratedInitialTilemap = false;
let hasGeneratedOffScreenCanvas = false;
let offScreenCanvas;

// Main Redraw Function - Tilemap Layer
function redrawTilemap(shouldRegenerate = false) {
  // Set tilemap canvas scale
  const ctx = tilemapCanvas.getContext("2d");
  ctx.scale(TILEMAP_SCALE, TILEMAP_SCALE);

  // Check if we have already generated tilemap offscreen, if so copy to main context, otherwise re-draw
  if (hasGeneratedInitialTilemap == false) {
    generateInitialTilemap();
    drawOffScreenTilemap();
  } else {
    if (shouldRegenerate) {
      generateInitialTilemap();
      drawOffScreenTilemap();
    } else {
      drawOffScreenTilemap();
    }
  }
}

// Completely regenerate terrain and tilemap - triggered from menu button press
function regenerateTerrain() {
  // Refresh perlin noise map
  perlin.seed();

  // Reset TilemapGenerator map
  tilemapGenerator.generateTilemap();

  // Redraw tilemap on canvas
  resizeTilemap();
  redrawTilemap(true);
}

// Step 1 - Generate the tilemap's off screen canvas element
// Generate the initial tile map on an offscreen canvas for efficient recall later
function generateInitialTilemap() {
  hasGeneratedInitialTilemap = true;

  if (hasGeneratedOffScreenCanvas == false) {
    // Generate off screen canvas
    offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = TILEMAP_WIDTH * TILESIZE;
    offScreenCanvas.height = TILEMAP_HEIGHT * TILESIZE;

    // Flip boolean toggle indicating creation of off screen canvas
    hasGeneratedOffScreenCanvas = true;

    // Get off screen context
    const ctx = offScreenCanvas.getContext("2d");

    // Draw off screen tilemap
    drawTilemap(ctx)
  } else {
    // Get off screen context
    const ctx = offScreenCanvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, offScreenCanvas.width, offScreenCanvas.height);

    // Draw off screen tilemap
    drawTilemap(ctx)
  }
}

// Step 2 - Draw the initial tilemap onto the off screen canvas element
// Draw tilemap
function drawTilemap(ctx) {
  // Retrieve tilemap generator variables
  let mapSize = tilemapGenerator.retrieveMapSize();
  let tileSize = tilemapGenerator.retrieveTileSize();

  // Draw Map
  for (let col = 0; col < mapSize.height; col += 1) {
    for (let row = 0; row < mapSize.width; row += 1) {
      // Tile
      ctx.fillStyle = tilemapGenerator.retrieveTileColor(row, col);
      ctx.fillRect((col * tileSize), (row * tileSize), tileSize, tileSize);

      // Grid - if scale >= 0.5
      if (TILEMAP_SCALE >= 0.5) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.strokeRect((col * tileSize), (row * tileSize), tileSize, tileSize);
      }
    }
  }

  if (shouldLogTilemapRegeneration) console.warn("Tilemap completely regenerated and redrawn.")
}

// Step 3 - Bring the off screen canvas element's tilemap to the on screen canvas element for visual display
// Copy the offscreen tilemap that we generated and drew already
function drawOffScreenTilemap() {
  const ctx = tilemapCanvas.getContext("2d");
  ctx.save();
  ctx.translate(TILEMAP_X_MOD, TILEMAP_Y_MOD);
  ctx.drawImage(offScreenCanvas, 0, 0);
  ctx.restore();
}

/*
 * Handle Drawing - Entities Layer
 */

// Main Redraw Function - Entities Layer
function redrawEntities() {
  // Get canvas context + ensure horizontal/vertical scale is fixed to a 1:1 ratio
  const ctx = entityCanvas.getContext("2d");
  ctx.scale(1, 1);

  // Clear canvas
  ctx.beginPath();
  ctx.clearRect(0, 0, entityCanvas.width, entityCanvas.height);

  // Draw entities
  drawRectangle(ctx);
}

// Draw Rectangle - Showcases how the animation loop works (only during a window resize event)
let positionX = 100;
let minXPosition = 100;
let maxXPosition = 150;
let speedX = 0.5;
function drawRectangle(ctx) {
  // Update rectangle position x
  if (GAME_LOOP_OVERRIDE) {
    positionX = positionX + speedX;
    if (positionX > maxXPosition || positionX < minXPosition) {
      speedX = speedX * (-1);
    }
  }

  // Update rectangle position y
  positionY = 200;

  // Draw rectangle - solid fill
  ctx.fillStyle = 'red';
  ctx.rect(positionX, positionY, 10, 10);
  ctx.fill();

  // Draw rectangle - border
  ctx.strokeStyle = 'white';
  ctx.lineWidth = '2';
  ctx.strokeRect(positionX, positionY, 10, 10);
}
