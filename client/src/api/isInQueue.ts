import { isEqual } from "../utils/helpers";
import { Tile } from "../utils/types";


export function isInQueue(tile: Tile, queue: Tile[]) {
  for (let i = 0; i < queue.length; i++) {
    if (isEqual(tile, queue[i])) return true;
  }
  return false;
}