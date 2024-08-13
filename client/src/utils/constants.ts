import { AlgorithmSelect, SpeedSelect, Tile } from "./types";

export const MAX_ROWS = 39;
export const Max_COLS = 49;

export const INFINITY = 99999999999;

export const START_TILE: Tile = {
  row: 1,
  col: 1,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: false,
  isTraversed: false,
  parent: null,
};

export const END_TILE: Tile = {
  row: MAX_ROWS - 2,
  col: Max_COLS - 2,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: false,
  isTraversed: false,
  parent: null,
};

export const TILE_STYLE =
  "lg:w-[17px] md:w-[15px] sx:w-[8px] w-[7px] lg: h-[17px] md:h-[15px] sx:h-[8px] h-[7px] border-t border-r border-sky-200 ";

export const TRAVERSED_TILE_STYLE = TILE_STYLE + "bg-cyan-400";
export const START_TILE_STYLE = TILE_STYLE + "bg-green-400";
export const END_TILE_STYLE = TILE_STYLE + "bg-red-400";
export const WALL_TILE_STYLE = TILE_STYLE + "bg-gray-400";
export const PATH_TILE_STYLE = TILE_STYLE + "bg-green-500";

export const SPEEDS: SpeedSelect[] = [
  { name: "Slow", value: 10 },
  { name: "Medium", value: 5 },
  { name: "Fast", value: 0 },
];

export const ALGORITHMS: AlgorithmSelect[] = [
  { name: "Dijkstra", value: "DIJKSTRA" },
  { name: "A-Start", value: "A_STAR" },
  { name: "Breath First Search", value: "BFS" },
  { name: "Depth First Search", value: "DFS" },
];

export const SLEEP_TIME = 30;
