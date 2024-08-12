import { useContext } from "react";
import { VisualizerContext } from "../context/VisualizerContext";

export const useVisualizer = () => {
  const context = useContext(VisualizerContext);

  if (!context) {
    throw new Error("useVisualizer must be used within a VisualizerProvider");
  }

  return context;
};
