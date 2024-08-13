import { isEqual } from "../utils/helpers";
import { Tile } from "../utils/types";

export const dropFromQueue = (tile: Tile, queue: Tile[]) => {
  for (let i = 0; i < queue.length; i++) {
    if (isEqual(tile, queue[i])) {
      queue.splice(i, 1);
      break;
    }
  }
};
