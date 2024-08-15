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

export type Speed = 10 | 5 | 0.5;

export type Result = {
  type: "traversed" | "path";
  currentTile?: Tile;
  path?: Tile[];
};
