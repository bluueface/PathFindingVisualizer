import { ReactNode, createContext, useState } from "react";
import { Algorithm, Maze, Grid } from "../utils/types";
import { createGrid } from "../utils/helpers";
import { END_TILE, START_TILE } from "../utils/constants";

interface VisualizerContextInterface {
  algorithm: Algorithm;
  setAlgorithm: (algorithm: Algorithm) => void;
  maze: Maze;
  setMaze: (maze: Maze) => void;
  grid: Grid;
  setGrid: (grid: Grid) => void;
  isGraphVisualized: boolean;
  setIsGraphVisualized: (isGraphVisualized: boolean) => void;
}

export const VisualizerContext = createContext<
  VisualizerContextInterface | undefined
>(undefined);

export const VisualizerProvider = ({ children }: { children: ReactNode }) => {
  const [algorithm, setAlgorithm] = useState<Algorithm>("DIJKSTRA");
  const [maze, setMaze] = useState<Maze>("NONE");
  const [grid, setGrid] = useState<Grid>(createGrid(START_TILE, END_TILE));
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

  return (
    <VisualizerContext.Provider
      value={{
        algorithm,
        setAlgorithm,
        maze,
        setMaze,
        grid,
        setGrid,
        isGraphVisualized,
        setIsGraphVisualized,
      }}
    >
      {children}
    </VisualizerContext.Provider>
  );
};
