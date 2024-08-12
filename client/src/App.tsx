import React from "react";
import { VisualizerProvider } from "./context/VisualizerContext";
import { TileProvider } from "./context/TileContext";
import { SpeedProvider } from "./context/SpeedContext";
import { GridComponent } from "./components/Grid";

const App: React.FunctionComponent = () => {
  return (
    <VisualizerProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-screen w-screen flex flex-col">
            <GridComponent />
          </div>
        </SpeedProvider>
      </TileProvider>
    </VisualizerProvider>
  );
};

export default App;
