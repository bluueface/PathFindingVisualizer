import { Max_COLS, MAX_ROWS } from "../utils/constants";
import { Grid, Tile } from "../utils/types";

export const getUntraversedNeighbors = (grid: Grid, tile: Tile) => {
  const { row, col } = tile;
  const neighbors = [];

  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < MAX_ROWS - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < Max_COLS - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  return neighbors.filter((neighbor) => !neighbor.isTraversed);
};
