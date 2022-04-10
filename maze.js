/*
 * Maze solving algorithm, button controls, miscellaneous toggles all custom coded by gshrdr.
 * Maze generation algorithm modified from this original source: https://codepen.io/mohamed9714/pen/dyPoaGx
 */

/*
 * Properties
 */

 // Main Storage Grid

var GRID = [];
var SIZE = 20;

var HEIGHT;
var WIDTH;

var MAX_X;
var MAX_Y;

// HTML DOM Elements

var parentContainer;
var canvas;
var ctx;
var generateButton;
var solveButton;

// Maze Drawing

var stack = [];
var current;
var drawingInterval;

// Maze Generation Booleans

var canGenerateMaze = false;
var mazeGenerationOngoing = false;
var hasGeneratedMaze = false;

// Maze Solving Booleans

var solveMazeOngoing = false;
var hasSolvedMaze = false;

// Maze Solving Drawing

var SOLUTION_SIZE = SIZE / 2;

var SHOULD_SPLICE_TAIL = true // true = only draw small tail, false = draw entire tail of maze solving attempts
var TAIL_LENGTH = 25; // Length of tail to draw behind head node | Only uses if SHOULD_SPLICE_TAIL == true
var currentCount;

// Maze Solving Stacks

var mazeSolutionDrawingInterval;
var solutionStack;
var solutionCurrent;
var intersectionStack;

/*
 * Maze Generation Entry Point
 */

// Main application entry point (after the window loads)
window.onload = unlockMaze;

// Forcefully reload the browser if the user resizes the window
function refresh(){
  let isTinyScreenPossiblySmartphone = false;

  if(window.innerWidth < 450 || window.innerHeight < 450) {
    isTinyScreenPossiblySmartphone = true;
  }

  console.log("Page resized to: " + window.innerWidth + ", " + window.innerHeight + " - Attempt reload (if not a smartphone).");

  if (!isTinyScreenPossiblySmartphone) {
    console.log("Page resize detected - not a smartphone, force reload.");
    location.reload();
  }
}

var timeout;
window.onresize = function(){
  clearTimeout(timeout);
  timeout = setTimeout(refresh, 100);
};

function unlockMaze() {
  canGenerateMaze = true;
  updateButtonState();
  loadInitialSizes();
  generateGrid();
}

/*
 * Canvas Context
 */

function saveContext() {
  // Save the default state
  ctx.save();
}

function restoreContext() {
  // Restore to our last save
  ctx.restore();
}

/*
 * Control Buttons
 */

function updateButtonState() {
  if (generateButton === undefined || solveButton === undefined) {
    generateButton = document.getElementById("generate-smooth-button");
    solveButton = document.getElementById("solve-button");

    // Entry point to page
    solveButton.style.opacity = 0.5;
    solveButton.disabled = true;
  } else if (mazeGenerationOngoing || solveMazeOngoing) {
    generateButton.style.opacity = 0.5;
    generateButton.disabled = true;
    solveButton.style.opacity = 0.5;
    solveButton.disabled = true;
  } else if (hasGeneratedMaze && !hasSolvedMaze) {
    generateButton.style.opacity = 1;
    generateButton.disabled = false;
    solveButton.style.opacity = 1;
    solveButton.disabled = false;
  } else if (hasSolvedMaze) {
    generateButton.style.opacity = 1;
    generateButton.disabled = false;
    solveButton.style.opacity = 0.5;
    solveButton.disabled = true;
  }
}

/*
 * Initial State Setup
 */

 function loadInitialSizes() {
   if (window.innerWidth > 600) {
     SIZE = 40;
     SOLUTION_SIZE = SIZE / 2
   }
   if (window.innerWidth > 1800) {
     SIZE = 60;
     SOLUTION_SIZE = SIZE / 2
   }

   parentContainer = document.getElementById("canvas-container");
   HEIGHT = parentContainer.clientHeight - (parentContainer.clientHeight % SIZE) - SIZE;
   WIDTH = parentContainer.clientWidth - (parentContainer.clientWidth % SIZE) - SIZE;

   MAX_X = (WIDTH / SIZE) - 1
   MAX_Y = (HEIGHT / SIZE) - 1

   canvas = document.querySelector("canvas");
   ctx = canvas.getContext("2d");
   saveContext();
   canvas.height = HEIGHT;
   canvas.width = WIDTH;

   console.log("Main Window Size - Height: " + window.innerHeight + " Width: " + window.innerWidth);
   console.log("Parent Container Size - Height: " + parentContainer.clientHeight + " Width: " + parentContainer.clientWidth);
   console.log("Canvas Height: " + HEIGHT + " Canvas Width: " + WIDTH);
 }

/*
 * Grid Generation & Drawing
 */

function generateGrid() {
  for (let x = 0; x < WIDTH / SIZE; x++) {
      const row = [];
      for (let y = 0; y < HEIGHT / SIZE; y++) {
          row.push(new Cell(x, y));
      }
      GRID.push(row);
  }

  current = GRID[0][0];
  current.visited = true;
  stack.push(current);

  drawGrid();
}

function drawGrid() {
  // clear canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // add background
  ctx.beginPath();
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // set rects
  for (let i = 0; i < WIDTH / SIZE; i++) {
    for (let j = 0; j < HEIGHT / SIZE; j++) {
      GRID[i][j].draw(GRID[i][j] === current ? "red" : "#1e293b");
    }
  }
}

/*
 * Generate Maze > Call Maze Draw Functions
 */

function generateMaze() {
 if (canGenerateMaze) {
   if (!hasGeneratedMaze && !mazeGenerationOngoing) {
     // First time generating maze
     console.log("Generate maze.");

     mazeGenerationOngoing = true;
     updateButtonState();
     drawingInterval = setInterval(drawMaze, 10);

     solveMazeOngoing = false;
     hasSolvedMaze = false;
   } else if (!mazeGenerationOngoing) {
     // Maze has already been generated - clear & reset
     console.log("Re-generate maze.");

     restoreContext();
     mazeGenerationOngoing = true;
     updateButtonState();
     hasGeneratedMaze = false;
     ctx.clearRect(0, 0, WIDTH, HEIGHT);
     GRID = [];
     stack = [];

     generateGrid();
     drawingInterval = setInterval(drawMaze, 10);

     solveMazeOngoing = false;
     hasSolvedMaze = false;
   }
 } else {
   alert("Can not generate maze yet - the window hasn't fully loaded.");
 }
}

/*
 * Maze Drawing
 */

function drawMaze() {
    // clear canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // add background
    ctx.beginPath();
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // set rects
    for (let i = 0; i < WIDTH / SIZE; i++) {
      for (let j = 0; j < HEIGHT / SIZE; j++) {
        GRID[i][j].draw(GRID[i][j] === current ? "red" : "#1e293b");
      }
    }

    for (const cell of stack) {
        if (cell !== current) {
            cell.draw("#5b21b6");
        }
    }

    current.visited = true;
    const side = current.getRandomSide();
    if (side) {
        stack.push(side);
        const x = current.x - side.x;
        if (x === 1) {
            current.walls[3] = side.walls[1] = true;
        } else if (x === -1) {
            current.walls[1] = side.walls[3] = true;
        }
        const y = current.y - side.y;
        if (y === 1) {
            current.walls[0] = side.walls[2] = true;
        } else if (y === -1) {
            current.walls[2] = side.walls[0] = true;
        }
        current = side;
    } else if (stack.length) {
        current = stack.pop();
    } else {
      console.log("Maze generated.");

      clearInterval(drawingInterval);
      GRID[0][0].draw("#16a34a", true, false); // Maze starting point
      GRID[MAX_X][MAX_Y].draw("#2563eb", false, true); // Maze ending point
      hasGeneratedMaze = true;
      mazeGenerationOngoing = false;
      updateButtonState();
    }
}

/*
 * Individual Grid Cell
 */

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = [false, false, false, false];
        this.visited = false;
        this.occupiedBySolutionCell = false;
    }

    draw(color, isStart = false, isEnd = false) {
        ctx.beginPath();
        ctx.rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
        ctx.fillStyle = "#111827";
        if (color) {
            ctx.fillStyle = color;
        } else if (this.visited) {
            ctx.fillStyle = "#1e293b";
        }
        ctx.fill();

        if (!this.walls[0] && !isStart) {
            // top
            ctx.beginPath();
            ctx.moveTo(this.x * SIZE, this.y * SIZE);
            ctx.lineTo(this.x * SIZE + SIZE, this.y * SIZE);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#cbd5e1";
            ctx.stroke();
        }

        if (!this.walls[1] && !isEnd) {
            // right
            ctx.beginPath();
            ctx.moveTo(this.x * SIZE + SIZE, this.y * SIZE);
            ctx.lineTo(this.x * SIZE + SIZE, this.y * SIZE + SIZE);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#cbd5e1";
            ctx.stroke();
        }

        if (!this.walls[2] && !isEnd) {
            // bottom
            ctx.beginPath();
            ctx.moveTo(this.x * SIZE + SIZE, this.y * SIZE + SIZE);
            ctx.lineTo(this.x * SIZE, this.y * SIZE + SIZE);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#cbd5e1";
            ctx.stroke();
        }

        if (!this.walls[3] && !isStart) {
            // left
            ctx.beginPath();
            ctx.moveTo(this.x * SIZE, this.y * SIZE);
            ctx.lineTo(this.x * SIZE, this.y * SIZE + SIZE);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#cbd5e1";
            ctx.stroke();
        }
    }

    getRandomSide() {
        const sides = [
            [this.x, this.y + 1],
            [this.x + 1, this.y],
            [this.x, this.y - 1],
            [this.x - 1, this.y]
        ]
            .map(([x, y]) => {
                if (GRID[x]) {
                    return GRID[x][y];
                }
            })
            .filter(v => !!v && !v.visited);
        if (sides.length) {
            const randomIndex = Math.floor(Math.random() * sides.length);
            return sides[randomIndex];
        }
    }
}

/*
 * Solve Maze
 */

 function solveMaze() {
   if (hasGeneratedMaze && !solveMazeOngoing && !hasSolvedMaze) {
     solveMazeOngoing = true;
     updateButtonState();

     mazeSolutionDrawingInterval = setInterval(drawMazeSolution, 10);
   }
 }

 function drawMazeSolution() {
   // Maze Solving Algorithm
   if (solutionCurrent === undefined && !hasSolvedMaze) {
     // Begin solving maze (entry point)
     console.log("Attempting to solve maze.")

     // Setup stacks used for tracking active solution attempts + intersection nodes
     solutionStack = [];
     intersectionStack = [];

     // Setup counter used to add drawing effects to tail nodes
     currentCount = 0;

     // Setup our first solution attempt node, add it to the stack, and set it to our current head
     let solutionCell = new SolutionCell(0, 0, currentCount);
     GRID[0][0].occupiedBySolutionCell = true;
     solutionStack.push(solutionCell);
     solutionCurrent = solutionCell;

     currentCount += 1;
   } else if (!hasSolvedMaze) {
     // Maze solving in progress

     if (solutionCurrent.x == MAX_X && solutionCurrent.y == MAX_Y) {
       hasSolvedMaze = true;
     } else {
       let openSides = solutionCurrent.getOpenSides();

       if (openSides.length > 0) {
         if (openSides.length > 1) {
           solutionCurrent.isIntersection = true;
           // Multiple intersections
           for (let openGridCells of openSides) {
             // Add to intersection stack for future investigation
             intersectionStack.push(openGridCells);
           }

           // Pick a random direction
           let openGridCell = openSides[Math.floor(Math.random()*openSides.length)];

           // Move current solution cell forward
           let solutionCell = new SolutionCell(openGridCell.x, openGridCell.y, currentCount);
           GRID[openGridCell.x][openGridCell.y].occupiedBySolutionCell = true;
           solutionStack.push(solutionCell);
           solutionCurrent = solutionCell;

           currentCount += 1;
         } else {
           // Only 1 possible direction to go
           let openGridCell = openSides[0];

           // Move current solution cell forward
           let solutionCell = new SolutionCell(openGridCell.x, openGridCell.y, currentCount);
           GRID[openGridCell.x][openGridCell.y].occupiedBySolutionCell = true;
           solutionStack.push(solutionCell);
           solutionCurrent = solutionCell;

           currentCount += 1;
         }
       } else {
         // We've reached a dead end (no more available open sides)

         // Take the most recent available intersection node
         if (intersectionStack.length > 0) {
           let mostRecentIntersectionGridCell = intersectionStack.pop();
           //currentCount = 0;

           let solutionCell = new SolutionCell(mostRecentIntersectionGridCell.x, mostRecentIntersectionGridCell.y, currentCount);
           GRID[mostRecentIntersectionGridCell.x][mostRecentIntersectionGridCell.y].occupiedBySolutionCell = true;
           solutionStack.push(solutionCell);
           solutionCurrent = solutionCell;

           currentCount += 1;
         } else {
           // Reached a dead end + no available intersections - end the algorithm
           hasSolvedMaze = true;
         }
       }
     }
   } else {
     // Completion of maze
     console.log("Maze solved.")

     // Update booleans + update button state
     solveMazeOngoing = false;
     updateButtonState();

     // End the algorithm + stop the drawing interval
     clearInterval(mazeSolutionDrawingInterval);

     // Reset the head element
     solutionCurrent = undefined;
   }

   // Draw solution cell elements
   for (const solutionCell of solutionStack) {
     if (solutionCell.x == MAX_X && solutionCell.y == MAX_Y) {
       solutionCell.draw("red");
     } else if (solutionCell.x == 0 && solutionCell.y == 0) {
       solutionCell.draw("yellow");
     } else {
       if (solutionCell !== solutionCurrent) {
         if (solutionCell.isIntersection) {
           solutionCell.draw("blue");
         } else {
           if (SHOULD_SPLICE_TAIL) {
             if (solutionCell.count >= (currentCount - TAIL_LENGTH)) {
               solutionCell.draw("#5b21b6");
             } else {
               solutionCell.draw("#1e293b");
             }
           } else {
             solutionCell.draw("#5b21b6");
           }
         }
       } else {
         solutionCell.draw("red");
       }
     }
   }
 }

 /*
  * Individual Maze Solution Solution
  */

 class SolutionCell {
     constructor(x, y, currentCount) {
         this.x = x;
         this.y = y;
         this.isIntersection = false;
         this.count = currentCount;
     }

     draw(color) {
         ctx.beginPath();
         ctx.rect((this.x * SIZE) + (SOLUTION_SIZE / 2), (this.y * SIZE) + (SOLUTION_SIZE / 2), SOLUTION_SIZE, SOLUTION_SIZE);
         ctx.fillStyle = "#5b21b6";
         if (color) {
             ctx.fillStyle = color;
         }
         ctx.fill();
     }

     getOpenSides() {
       let openSides = [];

       const sides = [
           [this.x, this.y + 1, "down"],
           [this.x + 1, this.y, "right"],
           [this.x, this.y - 1, "up"],
           [this.x - 1, this.y, "left"]
       ];
       for(const side of sides) {
         const x = side[0];
         const y = side[1];

         if (x >= 0 && x <= MAX_X && y >= 0 && y <= MAX_Y) {
           // Attempting to move down, check if the cell below us has an upward facing wall
           if (side[2] == "down") {
             let walls = GRID[x][y].walls;
             if (walls[0]) {
               if (!GRID[x][y].occupiedBySolutionCell) {
                 openSides.push(GRID[x][y]);
               }
             }
           }
           // Attempting to move left, check if the cell beside us has a right facing wall
           if (side[2] == "left") {
             let walls = GRID[x][y].walls;
             if (walls[1]) {
               if (!GRID[x][y].occupiedBySolutionCell) {
                 openSides.push(GRID[x][y]);
               }
             }
           }
           // Attempting to move up, check if the cell above us has a downward facing wall
           if (side[2] == "up") {
             let walls = GRID[x][y].walls;
             if (walls[2]) {
               if (!GRID[x][y].occupiedBySolutionCell) {
                 openSides.push(GRID[x][y]);
               }
             }
           }
           // Attempting to move right, check if the cell beside us has a left facing wall
           if (side[2] == "right") {
             let walls = GRID[x][y].walls;
             if (walls[3]) {
               if (!GRID[x][y].occupiedBySolutionCell) {
                 openSides.push(GRID[x][y]);
               }
             }
           }
         }
       }

       return openSides;
     }
 }
