import { MutableRefObject, useEffect, useState } from "react";
import { useTile } from "../hooks/useTile";
import { useVisualizer } from "../hooks/useVisualizer";
import { ALGORITHMS, SPEEDS } from "../utils/constants";
import Select from "./Select";
import { useSpeed } from "../hooks/useSpeed";
import { Algorithm, Result, Speed, Tile } from "../utils/types";
import PlayButton from "./PlayButton";
import { isEqual, resetGrid } from "../utils/helpers";
import { animatePath, animateTraversedTile } from "../utils/animate";

interface Props {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}

const Header: React.FunctionComponent<Props> = (props) => {
  const { isVisualizationRunningRef } = props;

  const [ws, setWs] = useState<WebSocket | null>(null);
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

  const setVariables = () => {
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(true);
    setIsDisabled(false);
    isVisualizationRunningRef.current = false;
  };

  const animatePathThenSetVariables = async (path: Tile[]) => {
    await animatePath(path, startTile, endTile);
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;
    setVariables();
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081");

    setWs(socket);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as Result;
        const { type } = data;

        if (type === "traversed") {
          const { currentTile } = data;
          if (
            currentTile &&
            !isEqual(currentTile, startTile) &&
            !isEqual(currentTile, endTile)
          ) {
            animateTraversedTile(currentTile);
          }
        }

        if (type === "path") {
          const { path } = data;
          if (path) {
            animatePathThenSetVariables(path);
          }
        }
      } catch (error) {
        throw Error(`Error parsing the received message: ${error}`);
      }
    };
  }, []);

  const runVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid(grid.slice(), startTile, endTile);
      return;
    }

    if (ws) {
      ws.send(JSON.stringify({ grid, startTile, endTile, speed }));
    }
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
            runVisualizer={runVisualizer}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
