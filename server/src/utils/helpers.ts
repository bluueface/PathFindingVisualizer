import { Max_COLS, MAX_ROWS } from "./constants";
import { Grid, Tile } from "./types";

export const isEqual = (a: Tile, b: Tile) => a.row === b.row && a.col === b.col;

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

export const dropFromQueue = (tile: Tile, queue: Tile[]) => {
  for (let i = 0; i < queue.length; i++) {
    if (isEqual(tile, queue[i])) {
      queue.splice(i, 1);
      break;
    }
  }
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
