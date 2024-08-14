import { FiGithub } from "react-icons/fi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { SiIconfinder } from "react-icons/si";

import { useState } from "react";
import { Mode } from "../utils/types";
import { IconLink, Icon } from "./Icon";

const Header = () => {
  const [mode, setMode] = useState<Mode>("dark");

  const handleModeChange = (m: Mode) => {
    setMode(m);
  };

  return (
    <div className="flex items-center justify-between min-h-[5rem] bg-[#010409] border-b border-b-[#30363D] shadow-gray-600 sm:px-40 px-0">
      <div className="flex gap-4 items-center ">
        <Icon
          IconName={SiIconfinder}
          styling="hover:text-red-500 w-[2.3rem] h-[2.3rem]"
          onClick={() => handleModeChange("dark")}
        />
        <span className="lg:flex hidden text-2xl pl-1">
          Pathfinding Visualizer
        </span>
      </div>
      <div className="flex items-center gap-6">
        <IconLink
          IconName={FiGithub}
          styling="hover:text-violet-500 w-[1.5rem] h-[1.5rem]"
          link="https://github.com/bluueface/PathFindingVisualizer"
        />

        {mode === "light" ? (
          <Icon
            IconName={MdOutlineDarkMode}
            styling="hover:text-sky-500 w-[1.5rem] h-[1.5rem]"
            onClick={() => handleModeChange("dark")}
          />
        ) : (
          <Icon
            IconName={MdOutlineLightMode}
            styling="hover:text-yellow-500 w-[1.5rem] h-[1.5rem]"
            onClick={() => handleModeChange("light")}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
