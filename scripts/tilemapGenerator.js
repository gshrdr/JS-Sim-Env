/*
 * Generate and draw tilemaps
 */

const TILESIZE = 20;

class TilemapGenerator {

  // Setup the TilemapGenerator class object
  constructor(height, width) {
    // Set height and width of the terrain map
    this.height = height;
    this.width = width;

    // Set tile size
    this.tileSize = TILESIZE;

    // Generate empty array for the terrain map
    this.map = new Array(height);
    for (let i = 0; i < height; i++) {
      this.map[i] = new Array(width).fill(0);
    }
  }

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

}
