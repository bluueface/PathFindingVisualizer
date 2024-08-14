import { PATH_TILE_STYLE, SLEEP_TIME, TRAVERSED_TILE_STYLE } from "./constants";
import { isEqual } from "./helpers";
import { Tile } from "./types";

export const animateTraversedTile = (traversedTile: Tile) => {
  document.getElementById(
    `${traversedTile.row}-${traversedTile.col}`
  )!.className = `${TRAVERSED_TILE_STYLE} animate-traversed`;
};

export const animatePath = (
  path: Tile[],
  startTile: Tile,
  endTile: Tile
): Promise<void> => {
  return new Promise((resolve) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const tile = path[i];
        if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
          document.getElementById(`${tile.row}-${tile.col}`)!.className =
            `${PATH_TILE_STYLE} animate-path`;
        }
        if (i === path.length - 1) {
          // Resolve the promise when the last tile is animated
          resolve();
        }
      }, SLEEP_TIME * i);
    }
  });
};
