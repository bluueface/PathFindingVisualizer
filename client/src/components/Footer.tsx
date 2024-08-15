import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import { IconLink } from "./Icon";

const Footer = () => {
  return (
    <footer className="self-center w-full sm:w-[60%] min-h-32 flex items-center justify-between  font-bold border-t border-[#30363D]">
      <div className="text-sm">Aziz Ouadoud © 2024 | All rights reserved.</div>
      <div className="flex items-center gap-2">
        <IconLink
          IconName={FiGithub}
          styling="hover:text-violet-500 w-[1.2rem] h-[1.2rem]"
          link="https://github.com/bluueface"
        />
        <IconLink
          IconName={CiLinkedin}
          styling="hover:text-blue-500 w-[1.5rem] h-[1.5rem]"
          link="https://www.linkedin.com/in/aziz-ouadoud/"
        />
      </div>
    </footer>
  );
};

export default Footer;
