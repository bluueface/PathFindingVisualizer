import { Max_COLS, MAX_ROWS } from "./constants";
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
      distance: Infinity,
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
