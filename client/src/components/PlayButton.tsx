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
      className="disabled:pointer-events-none disabled:opacity-50 transition ease-in rounded-full p-2.5 shadow-md bg-green-500 hover:bg-green-600 border-none active:ring-green-300 focus:outline-none focus:ring focus:ring-green-300 focus:opacity-30"
    >
      {isGraphVisualized ? (
        <GrPowerReset className="w-5 h-5" />
      ) : (
        <BsFillPlayFill className="w-5 h-5" />
      )}
    </button>
  );
};

export default PlayButton;
