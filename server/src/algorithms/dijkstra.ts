import { WebSocket } from "ws";
import { Grid, Result, Speed, Tile } from "../utils/types";
import {
  delay,
  dropFromQueue,
  getUntraversedNeighbors,
  isEqual,
} from "../utils/helpers";
import { INFINITY } from "../utils/constants";

export const dijkstra = async (
  grid: Grid,
  startTile: Tile,
  endTile: Tile,
  speed: Speed,
  ws: WebSocket
) => {
  const traversedTiles = []; // Initialize an array to store traversed tiles
  const base = grid[startTile.row][startTile.col]; // Get the start tile from the grid
  base.distance = 0; // Set the distance of the start tile to 0
  base.isTraversed = true; // Mark the start tile as traversed
  const untraversedTiles = [base]; // Initialize the queue with the start tile

  while (untraversedTiles.length > 0) {
    // Continue while there are untraversed tiles
    untraversedTiles.sort((a, b) => a.distance - b.distance);
    // Get the tile with the smallest distance
    const currentTile = untraversedTiles.shift();
    // If the current tile is valid
    if (currentTile) {
      if (currentTile.isWall) continue; // Skip if the tile is a wall
      if (currentTile.distance === INFINITY) break; // Break if the tile's distance is infinity
      currentTile.isTraversed = true; // Mark the tile as traversed
      traversedTiles.push(currentTile); // Add the tile to the traversed tiles array

      // Send traversed tile to the client with a delay
      ws.send(JSON.stringify({ type: "traversed", currentTile } as Result));
      await delay(speed);

      // Break if the tile is the end tile
      if (isEqual(currentTile, endTile)) break;
      const neighbors = getUntraversedNeighbors(grid, currentTile);
      // Iterate through each neighbor
      for (let i = 0; i < neighbors.length; i += 1) {
        // Check if a shorter path is found
        if (currentTile.distance + 1 < neighbors[i].distance) {
          dropFromQueue(neighbors[i], untraversedTiles); // Remove the neighbor from the queue
          neighbors[i].distance = currentTile.distance + 1; // Update the neighbor's distance
          neighbors[i].parent = currentTile; // Set the neighbor's parent to the current tile
          untraversedTiles.push(neighbors[i]); // Add the neighbor to the queue
        }
      }
    }
  }

  const path = []; // Initialize an array to store the path
  let current = grid[endTile.row][endTile.col]; // Start from the end tile
  while (current !== null) {
    // Backtrack until the start tile
    current.isPath = true; // Mark the tile as part of the path
    path.unshift(current); // Add the tile to the path
    current = current.parent!; // Move to the parent tile
  }

  // Send the final path to the client
  ws.send(JSON.stringify({ type: "path", path } as Result));
};
