import { Server as WebSocketServer } from "ws";
import http from "http";
import { PORT } from "../config";
import { Grid, Speed, Tile } from "./utils/types";
import { dijkstra } from "./algorithms/dijkstra";

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message: Buffer) => {
    try {
      // Parse the JSON string
      const { grid, startTile, endTile, speed } = JSON.parse(
        message.toString()
      ) as {
        grid: Grid;
        startTile: Tile;
        endTile: Tile;
        speed: Speed;
      };

      // Run the Dijkstra algorithm and stream the data back to the client
      dijkstra(grid, startTile, endTile, speed, ws);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });

  ws.on("close", () => {});

  ws.on("error", () => {});
});

server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});
