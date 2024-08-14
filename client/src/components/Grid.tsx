import { useVisualizer } from "../hooks/useVisualizer";
import {
  ALGORITHMS,
  END_TILE_STYLE,
  MAX_ROWS,
  PATH_TILE_STYLE,
  SPEEDS,
  START_TILE_STYLE,
  TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  WALL_TILE_STYLE,
} from "../utils/constants";
import TileComponent from "./Tile";
import { MutableRefObject, useEffect, useState } from "react";
import {
  checkIfStartOrEnd,
  createNewGrid,
  isEqual,
  resetGrid,
} from "../utils/helpers";
import Select from "./Select";
import PlayButton from "./PlayButton";
import { animatePath, animateTraversedTile } from "../utils/animate";
import { Algorithm, Result, Speed, Tile } from "../utils/types";
import { useTile } from "../hooks/useTile";
import { useSpeed } from "../hooks/useSpeed";

interface Props {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}

const GridComponent: React.FunctionComponent<Props> = (props) => {
  const { isVisualizationRunningRef } = props;

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

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

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

  const setVariables = () => {
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(true);
    setIsDisabled(false);
    isVisualizationRunningRef.current = false;
  };

  const animatePathThenSetVariables = async (path: Tile[]) => {
    await animatePath(path, startTile, endTile);
    isVisualizationRunningRef.current = true;
    setVariables();
  };

  const runVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid(grid.slice(), startTile, endTile);
      return;
    }

    if (ws) {
      ws.send(JSON.stringify({ grid, startTile, endTile, speed }));
      setIsDisabled(true);
    }
  };

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

  const renderLegend = (label: string, style: string) => (
    <div className="w-full flex justify-between items-center">
      <label>{label}</label>
      <span
        className={`${style} w-[20px] h-[20px] border border-[#B3D1D9]`}
      ></span>
    </div>
  );

  return (
    <div className="flex-1 flex justify-center">
      <div className="flex flex-col sm:flex-row gap-10 justify-center flex-1 max-w-[1317px]">
        <div className="sm:w-[22%] w-full flex flex-col gap-4">
          <div className="flex flex-col gap-5 px-3 py-5 rounded-md bg-[#161B22] border border-[#30363D]">
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
          <div className="flex flex-col gap-4 px-3 py-5 rounded-md bg-[#161B22] border border-[#30363D]">
            {renderLegend("Traversed tile", TRAVERSED_TILE_STYLE)}
            {renderLegend("Untraversed tile", TILE_STYLE)}
            {renderLegend("Path tile", PATH_TILE_STYLE)}
            {renderLegend("Start tile", START_TILE_STYLE)}
            {renderLegend("End tile", END_TILE_STYLE)}
            {renderLegend("Wall tile", WALL_TILE_STYLE)}
          </div>
        </div>
        <div className="flex flex-col bg-[#161B22] h-fit sm:w-[66%] w-full">
          {grid.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex w-[100%] h-[${100 / MAX_ROWS}%]`}
            >
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
                    handleMouseEnter={() =>
                      handleMouseEnter(tile.row, tile.col)
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridComponent;
