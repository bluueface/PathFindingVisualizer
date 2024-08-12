import { useState } from "react";
import { useTile } from "../hooks/useTile";
import { useVisualizer } from "../hooks/useVisualizer";
import { MAZES } from "../utils/constants";
import Select from "./Select";
import { useSpeed } from "../hooks/useSpeed";

const Header = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { maze, setMaze, grid } = useVisualizer();
  const { startTile, endTile } = useTile();
  const { speed } = useSpeed();

  return (
    <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
      <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
          Pathfinding Visualizer
        </h1>
        <div className="flex sm:items-center justify-start sm:justify-between sm:flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
          <Select
            label="Maze"
            value={maze}
            options={MAZES}
            onChange={(e) => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
