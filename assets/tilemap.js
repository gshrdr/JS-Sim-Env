// HTML Canvas rendering: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

// Source: https://github.com/joeiddon/perlin
// Explanation: https://joeiddon.github.io/projects/javascript/perlin.html
let perlin = {
    rand_vect: function(){
        let theta = Math.random() * 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    },
    dot_prod_grid: function(x, y, vx, vy){
        let g_vect;
        let d_vect = {x: x - vx, y: y - vy};
        if (this.gradients[[vx,vy]]){
            g_vect = this.gradients[[vx,vy]];
        } else {
            g_vect = this.rand_vect();
            this.gradients[[vx, vy]] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    smootherstep: function(x){
        return 6*x**5 - 15*x**4 + 10*x**3;
    },
    interp: function(x, a, b){
        return a + this.smootherstep(x) * (b-a);
    },
    seed: function(){
        this.gradients = {};
        this.memory = {};
    },
    get: function(x, y) {
        if (this.memory.hasOwnProperty([x,y]))
            return this.memory[[x,y]];
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        this.memory[[x,y]] = v;
        return v;
    }
}
perlin.seed();

// Tilemap resources: https://stackoverflow.com/questions/21844451/render-a-tile-map-using-javascript
// Canvas bitmap rendering: https://medium.com/@doomgoober/understanding-html-canvas-scaling-and-sizing-c04925d9a830

// Retrieve Canvas + Context
const canvas = document.getElementById('tilemap-canvas');
const ctx = canvas.getContext('2d');

// Tileset dictionary
var tileset = {
  "water": "0000FF",
  "grass": "378805",
  "red": "FF0000",
  "yellow": "FFFF00",
  "pink": "FFC0CB",
  "orange": "FFA500",
}

// Setup Tilemap + Tile
let tileSize = 16; // Individual tile size
let mapCols = 40; // number of columns in tile map
let mapRows = 40; // number of rows in tile map
let mapWidth = mapCols * tileSize;
let mapHeight = mapRows * tileSize;

// Tilemap (in the future either pull this directly from tilemap generated javascript file and/or procedurally generate terrain + 2nd layer)
var levelMap = [];

function generateTilemap() {
  for (let col = 0; col < mapCols; col += 1) {
     for (let row = 0; row < mapRows; row += 1) {
       if (col == 0 && row == 0) { // top left
         levelMap.push("red");
       } else if (col == 0 && row == mapRows - 1) { // bottom left
         levelMap.push("yellow");
       } else if (col == mapCols - 1 && row == 0) { // top right
         levelMap.push("pink");
       } else if (col == mapCols - 1 && row == mapRows - 1) { // bottom right
         levelMap.push("orange");
       } else {
         let noise = perlin.get(mapCols/(col + 1), mapRows/(row + 1));
         if (noise <= -0.05) {
           levelMap.push("water");
         } else {
           levelMap.push("grass");
         }
       }
     }
  }
}

// Draw the tilemap
let mapIndex = 0;
let sourceX = 0;
let sourceY = 0;

function drawLandscape() {
  for (let col = 0; col < mapHeight; col += tileSize) {
    for (let row = 0; row < mapWidth; row += tileSize) {
      let levelMapItem = levelMap[mapIndex];
      let color = `#${tileset[`${levelMap[mapIndex]}`]}`;

      ctx.fillStyle = color;
      ctx.fillRect(col, row, tileSize, tileSize);

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.strokeRect(col, row, tileSize, tileSize);
      mapIndex++;
    }
  }
}

// Run the tilemap generator
generateTilemap();
drawLandscape();

/*
 * Top Level Canvas - Entities Layer
 */

// Retrieve Canvas + Context
const canvasTop = document.getElementById('entities-canvas');
const ctxTop = canvas.getContext('2d');

ctxTop.fillStyle = "#FF0000";
ctxTop.fillRect(36, 36, 8, 8);

ctxTop.strokeStyle = "#000";
ctxTop.lineWidth = 1;
ctxTop.strokeRect(36, 36, 8, 8);
