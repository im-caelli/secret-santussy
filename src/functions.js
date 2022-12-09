// Constants
export const GRID_SIZE = 4; // 4x4
export const TILE_COUNT = 16; // Number of tiles
export const BOARD_SIZE = 320; // Width / Height // Mobile friendly size
export const EMPTY_TILE = TILE_COUNT - 1;


// Checks if the puzzle is solvable
export function isSolvable(tiles) {
  let product = 1;
  for (let i = 1, l = EMPTY_TILE; i <= l; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
    }
  }
  return Math.round(product) === 1;
}

// Checks if the puzzle is solved
export function isSolved(tiles) {
  for (let i = 0, l = tiles.length; i < l; i++) {
    if (tiles[i] !== i) {
      return false;
    }
  }
  return true;
}

// Get the index
export function getIndex(row, col) {
  return parseInt(row, 10) * GRID_SIZE + parseInt(col, 10);
}

// Get Position
export function getMatrixPosition(index) {
  return {
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  }
}

// Get Visual Position for animation
export function getVisualPosition(row, col, width, height) {
  return {
    x: col * width,
    y: row * height,
  };
}