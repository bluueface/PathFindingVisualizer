import { INFINITY, Max_COLS, MAX_ROWS, TILE_STYLE } from "./constants";
import { Grid, Tile } from "./types";

const createRow = (row: number, starTile: Tile, endTile: Tile) => {
  const currentRow: Tile[] = [];

  for (let col = 0; col < Max_COLS; col++) {
    currentRow.push({
      row,
      col,
      isEnd: row === endTile.row && col === endTile.col,
      isWall: false,
      isPath: false,
      distance: INFINITY,
      isStart: row === starTile.row && col === starTile.col,
      isTraversed: false,
      parent: null,
    });
  }
  return currentRow;
};

export const createGrid = (starTile: Tile, endTile: Tile) => {
  const grid: Grid = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    grid.push(createRow(row, starTile, endTile));
  }

  return grid;
};

export const checkIfStartOrEnd = (row: number, col: number) =>
  (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === Max_COLS - 2);

export const createNewGrid = (grid: Grid, row: number, col: number) => {
  const newGrid = grid.slice();
  const newTile = {
    ...newGrid[row][col],
    isWall: !newGrid[row][col].isWall,
  };
  newGrid[row][col] = newTile;
  return newGrid;
};

export const isEqual = (a: Tile, b: Tile) => a.row === b.row && a.col === b.col;

export const resetGrid = (grid: Grid, starTile: Tile, endTile: Tile) => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < Max_COLS; col++) {
      const tile = grid[row][col];
      tile.distance = INFINITY;
      tile.isTraversed = false;
      tile.isPath = false;
      tile.parent = null;
      tile.isWall = false;

      if (!isEqual(starTile, tile) && !isEqual(endTile, tile)) {
        const tileElement = document.getElementById(`${tile.row}-${tile.col}`);

        if (tileElement) {
          tileElement.className = TILE_STYLE;
        }

        if (tile.row === MAX_ROWS - 1) {
          tileElement?.classList?.add("border-b");
        }

        if (tile.col === 0) {
          tileElement?.classList?.add("border-l");
        }
      }
    }
  }
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
