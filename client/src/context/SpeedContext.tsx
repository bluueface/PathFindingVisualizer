import { createContext, ReactNode, useState } from "react";
import { Speed } from "../utils/types";

interface SpeedContextInterface {
  speed: Speed;
  setSpeed: (speed: Speed) => void;
}

export const SpeedContext = createContext<SpeedContextInterface | undefined>(
  undefined
);

export const SpeedProvider = ({ children }: { children: ReactNode }) => {
  const [speed, setSpeed] = useState<Speed>(0);

  return (
    <SpeedContext.Provider
      value={{
        speed,
        setSpeed,
      }}
    >
      {children}
    </SpeedContext.Provider>
  );
};
