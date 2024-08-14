import React, { MouseEventHandler } from "react";
import { GrPowerReset } from "react-icons/gr";
import { BsFillPlayFill } from "react-icons/bs";

interface Props {
  isDisabled: boolean;
  isGraphVisualized: boolean;
  runVisualizer: MouseEventHandler<HTMLButtonElement>;
}

const PlayButton: React.FunctionComponent<Props> = (props) => {
  const { isDisabled, isGraphVisualized, runVisualizer } = props;
  return (
    <button
      disabled={isDisabled}
      onClick={runVisualizer}
      className={`flex justify-center transition ease-in rounded-md p-1 shadow-md ${isGraphVisualized ? "bg-red-600" : "bg-green-600"} disabled:bg-gray-700 ${isGraphVisualized ? "hover:bg-red-500" : "hover:bg-green-500"} border-none`}
    >
      {isGraphVisualized ? (
        <GrPowerReset className="w-8 h-8" />
      ) : (
        <BsFillPlayFill className="w-8 h-8" />
      )}
    </button>
  );
};

export default PlayButton;
