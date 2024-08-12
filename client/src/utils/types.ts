export type Algorithm = "DIJKSTRA" | "BFS";

export type Maze = "NONE" | "RANDOM";

export type Tile = {
  row: number;
  col: number;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  distance: number;
  isTraversed: boolean;
  isStart: boolean;
  parent: Tile | null;
};

export type Grid = Tile[][];

export type Speed = 2 | 1 | 0.5;
