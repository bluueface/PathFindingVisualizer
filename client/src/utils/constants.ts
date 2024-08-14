import { AlgorithmSelect, SpeedSelect, Tile } from "./types";

export const MAX_ROWS = 28;
export const Max_COLS = 50;

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
  "w-[2%] lg:h-[17px] md:h-[15px] sx:h-[8px] h-[7px] border-t border-r border-[#B3D1D9] ";

export const TRAVERSED_TILE_STYLE = TILE_STYLE + "bg-gray-400";
export const START_TILE_STYLE = TILE_STYLE + "bg-green-700";
export const END_TILE_STYLE = TILE_STYLE + "bg-red-500";
export const WALL_TILE_STYLE = TILE_STYLE + "bg-orange-600";
export const PATH_TILE_STYLE = TILE_STYLE + "bg-[#2166df]";

export const SPEEDS: SpeedSelect[] = [
  { name: "Slow", value: 10 },
  { name: "Medium", value: 5 },
  { name: "Fast", value: 0 },
];

export const ALGORITHMS: AlgorithmSelect[] = [
  { name: "Dijkstra", value: "DIJKSTRA" },
  { name: "A-*", value: "A_STAR" },
  { name: "BFS", value: "BFS" },
  { name: "DFS", value: "DFS" },
];

export const SLEEP_TIME = 30;
