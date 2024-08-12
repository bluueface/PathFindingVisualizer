import { twMerge } from "tailwind-merge";
import {
  END_TILE_STYLE,
  MAX_ROWS,
  PATH_TILE_STYLE,
  START_TILE_STYLE,
  TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  WALL_TILE_STYLE,
} from "../utils/constants";
import React, { useMemo } from "react";

interface Props {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isTraversed: boolean;
  isWall: boolean;
  isPath: boolean;
  handleMouseDown: MouseFunction;
  handleMouseUp: MouseFunction;
  handleMouseEnter: MouseFunction;
}

interface MouseFunction {
  (row: number, col: number): void;
}

const TileComponent: React.FunctionComponent<Props> = (props) => {
  const {
    row,
    col,
    isStart,
    isEnd,
    isTraversed,
    isWall,
    isPath,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
  } = props;

  const tileStyle = useMemo(() => {
    if (isStart) {
      return START_TILE_STYLE;
    } else if (isEnd) {
      return END_TILE_STYLE;
    } else if (isWall) {
      return WALL_TILE_STYLE;
    } else if (isPath) {
      return PATH_TILE_STYLE;
    } else if (isTraversed) {
      return TRAVERSED_TILE_STYLE;
    } else {
      return TILE_STYLE;
    }
  }, [isEnd, isPath, isStart, isTraversed, isWall]);

  const borderStyle =
    row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";

  const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

  return (
    <div
      className={twMerge(tileStyle, borderStyle, edgeStyle)}
      id={`${row}-${col}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
    />
  );
};

export default TileComponent;
