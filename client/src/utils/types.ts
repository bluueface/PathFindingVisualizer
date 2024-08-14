export type Algorithm = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";

export type AlgorithmSelect = {
  name: string;
  value: Algorithm;
};

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

export type Speed = 10 | 5 | 0;

export type SpeedSelect = {
  name: string;
  value: Speed;
};

export type Result = {
  type: "traversed" | "path";
  currentTile?: Tile;
  path?: Tile[];
  traversedTiles?: Tile[];
};

export type Mode = "dark" | "light";
