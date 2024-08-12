import { useContext } from "react";
import { SpeedContext } from "../context/SpeedContext";

export const useSpeed = () => {
  const context = useContext(SpeedContext);

  if (!context) {
    throw Error("useSpeed must be used within a SpeedProvider");
  }

  return context;
};
