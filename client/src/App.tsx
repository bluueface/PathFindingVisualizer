import React, { useRef } from "react";
import { VisualizerProvider } from "./context/VisualizerContext";
import { TileProvider } from "./context/TileContext";
import { SpeedProvider } from "./context/SpeedContext";
import GridComponent from "./components/Grid";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const isVisualizationRunningRef = useRef(false);

  return (
    <VisualizerProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-screen w-screen flex flex-col">
            <Header />
            <GridComponent
              isVisualizationRunningRef={isVisualizationRunningRef}
            />
            <Footer />
          </div>
        </SpeedProvider>
      </TileProvider>
    </VisualizerProvider>
  );
};

export default App;
