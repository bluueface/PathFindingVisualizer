import { IconType } from "react-icons";
import { ICON_STYLE } from "../utils/constants";

interface Props {
  IconName: IconType;
  styling: string;
  onClick?: () => void;
  link?: string;
}

export const Icon: React.FunctionComponent<Props> = (props) => {
  const { IconName, styling, onClick } = props;
  return <IconName className={`${ICON_STYLE} ${styling}`} onClick={onClick} />;
};

export const IconLink: React.FunctionComponent<Props> = (props) => {
  const { IconName, styling, link } = props;
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <IconName className={`${ICON_STYLE} ${styling}`} />
    </a>
  );
};
