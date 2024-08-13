export type Algorithm = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";

export type AlgorithmSelect = {
  name: string;
  value: Algorithm;
};

export type Maze = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION";

export type MazeSelect = {
  name: string;
  value: Maze;
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

export type Speed = 2 | 1 | 0.5;

export type SpeedSelect = {
  name: string;
  value: Speed;
};
