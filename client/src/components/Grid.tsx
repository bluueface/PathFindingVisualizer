import { twMerge } from "tailwind-merge";
import { useVisualizer } from "../hooks/useVisualizer";
import { Max_COLS, MAX_ROWS } from "../utils/constants";
import { TileComponent } from "./Tile";

export const GridComponent = () => {
  const { grid } = useVisualizer();

  return (
    <div
      className={twMerge(
        // Base classes
        "flex items-center flex-col justify-center border-sky-300",
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
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
