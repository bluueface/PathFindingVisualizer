import { ReactNode, createContext, useState } from "react";
import { Tile } from "../utils/types";
import { END_TILE, START_TILE } from "../utils/constants";

interface TileContextInterface {
  startTile: Tile;
  setStartTile: (startTile: Tile) => void;
  endTile: Tile;
  setEndTile: (endTile: Tile) => void;
}

export const TileContext = createContext<TileContextInterface | undefined>(
  undefined
);

export const TileProvider = ({ children }: { children: ReactNode }) => {
  const [startTile, setStartTile] = useState<Tile>(START_TILE);
  const [endTile, setEndTile] = useState<Tile>(END_TILE);

  return (
    <TileContext.Provider
      value={{
        startTile,
        setStartTile,
        endTile,
        setEndTile,
      }}
    >
      {children}
    </TileContext.Provider>
  );
};
