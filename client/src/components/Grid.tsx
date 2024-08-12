import { twMerge } from "tailwind-merge";
import { useVisualizer } from "../hooks/useVisualizer";
import { Max_COLS, MAX_ROWS } from "../utils/constants";
import TileComponent from "./Tile";
import { MutableRefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

interface Props {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}

const GridComponent: React.FunctionComponent<Props> = (props) => {
  const { isVisualizationRunningRef } = props;
  const { grid, setGrid } = useVisualizer();
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(true);
    const newGrid = createNewGrid(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col);
      setGrid(newGrid);
    }
  };

  return (
    <div
      className={twMerge(
        // Base classes
        "flex items-center flex-col justify-center border-sky-300 my-10",
        // Control Grid height
        `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${MAX_ROWS * 15}px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
        // Control Grid width
        `lg:w-[${Max_COLS * 17}px] md:w-[${Max_COLS * 15}px] xs:w-[${Max_COLS * 8}px] w-[${Max_COLS * 7}px]`
      )}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((tile, tileIndex) => {
            const { isEnd, isStart, isPath, isTraversed, isWall } = tile;
            return (
              <TileComponent
                key={tileIndex}
                row={tile.row}
                col={tile.col}
                isEnd={isEnd}
                isStart={isStart}
                isPath={isPath}
                isTraversed={isTraversed}
                isWall={isWall}
                handleMouseDown={() => handleMouseDown(tile.row, tile.col)}
                handleMouseUp={() => handleMouseUp(tile.row, tile.col)}
                handleMouseEnter={() => handleMouseEnter(tile.row, tile.col)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GridComponent;
