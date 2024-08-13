import { bfs } from "../api/bfs";
import { dijkstra } from "../api/dijkstra";
import { Algorithm, Grid, Tile } from "./types";

export const runVisualizer = (
  algorithm: Algorithm,
  grid: Grid,
  starTile: Tile,
  endTile: Tile
) => {
  switch (algorithm) {
    case "DIJKSTRA":
      return dijkstra(grid, starTile, endTile);
    case "BFS":
      return bfs(grid, starTile, endTile);
    default:
      return bfs(grid, starTile, endTile);
  }
};
