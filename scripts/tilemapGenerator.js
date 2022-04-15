/*
 * Generate and draw tilemaps
 */

class TilemapGenerator {

  /* Construct a TilemapGenerator object */

  // Setup the TilemapGenerator class object
  constructor(height, width) {
    // Set height and width of the terrain map
    this.height = height;
    this.width = width;

    // Set tile size
    this.tileSize = TILESIZE;

    // Generate tilemap + terrain
    this.generateTilemap();
  }

  /* Retrieve TilemapGenerator object variables */

  // Retrieve tilemap size
  retrieveMapSize() {
    return {
      height: this.height,
      width: this.width,
    };
  }

  // Retrieve individual tile size
  retrieveTileSize() {
    return this.tileSize;
  }

  // Retrieve tilemap information for display
  retrieveMap() {
    return this.map;
  }

  // Retrieve color by map (row, col) location
  retrieveTileColor(row, col) {
    return `#${TILESET[`${this.map[row][col]}`]}`;
  }

  /* Internal TilemapGenerator helper functions */

  // Create empty tilemap and fill with terrain
  generateTilemap() {
    this.generateEmptyMap();
    this.generateTerrainMap();
  }

  // Generate empty map
  generateEmptyMap() {
    this.map = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      this.map[i] = new Array(this.width).fill("red");
    }
  }

  // Generate perlin noise based terrain for tilemap
  generateTerrainMap() {
    for (let col = 0; col < this.width; col += 1) {
       for (let row = 0; row < this.height; row += 1) {
         if (col == 0 && row == 0) { // top left
           this.map[row][col] = "red";
         } else if (col == 0 && row == this.height - 1) { // bottom left
           this.map[row][col] = "yellow";
         } else if (col == this.width - 1 && row == 0) { // top right
           this.map[row][col] = "pink";
         } else if (col == this.width - 1 && row == this.height - 1) { // bottom right
           this.map[row][col] = "orange";
         } else {
           // Non-special corner cases, input terrain from perlin noise map
           let noise = perlin.get((row/(this.height - 1)) * TERRAIN_RUGGEDNESS, (col/(this.width - 1)) * TERRAIN_RUGGEDNESS);

           let noiseModified;
           if (noise === 0) {
             noiseModified = 0;
           } else {
             noiseModified = (noise + 1) / 2;
           }

           let cv = 255 * noiseModified;

           if (cv <= 85) {
             this.map[row][col] = "deepWater";
           } else if (cv <= 115) {
             this.map[row][col] = "water";
           } else if (cv <= 135) {
             this.map[row][col] = "sand";
           } else if (cv <= 175) {
             this.map[row][col] = "grass";
           } else {
             this.map[row][col] = "darkGrass";
           }

           /* White/black debug
           console.log("Noise: " + noise + " Mod: " + noiseModified);
           let cv = 255 * noiseModified;
           this.map[row][col] = `rgb(${cv}, ${cv}, ${cv})`;
           ==> retrieveTileColor: return this.map[row][col];
           */
         }
       }
    }
  }

}
