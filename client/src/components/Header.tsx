import { MutableRefObject, useState } from "react";
import { useTile } from "../hooks/useTile";
import { useVisualizer } from "../hooks/useVisualizer";
import {
  ALGORITHMS,
  EXTENDED_SLEEP_TIME,
  SLEEP_TIME,
  SPEEDS,
} from "../utils/constants";
import Select from "./Select";
import { useSpeed } from "../hooks/useSpeed";
import { Algorithm, Speed } from "../utils/types";
import PlayButton from "./PlayButton";
import { resetGrid } from "../utils/helpers";
import { runVisualizer } from "../utils/runVisualizer";
import { animatePath } from "../utils/animatePath";

interface Props {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}

const Header: React.FunctionComponent<Props> = (props) => {
  const { isVisualizationRunningRef } = props;

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const {
    grid,
    setGrid,
    algorithm,
    setAlgorithm,
    isGraphVisualized,
    setIsGraphVisualized,
  } = useVisualizer();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();

  const handlerRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid(grid.slice(), startTile, endTile);
      return;
    }

    // run the algorithm
    const { traversedTiles, path } = runVisualizer(
      algorithm,
      grid,
      startTile,
      endTile
    );

    animatePath(traversedTiles, path, startTile, endTile, speed);
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;

    setTimeout(
      () => {
        const newGrid = grid.slice();
        setGrid(newGrid);
        setIsGraphVisualized(true);
        setIsDisabled(false);
        isVisualizationRunningRef.current = false;
      },
      SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) +
        EXTENDED_SLEEP_TIME *
          (path.length + 60) *
          SPEEDS.find((s) => s.value === speed)!.value
    );
  };

  return (
    <div className="flex items-center justify-center min-h-[4.5rem] bg-black border-b shadow-gray-600 sm:px-5 px-0">
      <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
          Pathfinding Visualizer
        </h1>
        <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
          <Select
            label="Algorithm"
            value={algorithm}
            options={ALGORITHMS}
            onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
          />
          <Select
            label="Speed"
            value={speed}
            options={SPEEDS}
            onChange={(e) => setSpeed(parseInt(e.target.value) as Speed)}
          />
          <PlayButton
            isDisabled={isDisabled}
            isGraphVisualized={isGraphVisualized}
            handlerRunVisualizer={handlerRunVisualizer}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
