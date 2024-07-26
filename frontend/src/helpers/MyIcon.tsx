import * as LibIcons from "react-icons/md";
import { IconBaseProps } from "react-icons/lib";

const IconNotFound = LibIcons['MdQuestionMark'];

interface FaIconProps {
  nameIcon: string;
  propsIcon?: IconBaseProps
}

const MyIcon = ({nameIcon, propsIcon}: FaIconProps) => {
  const DynamicIconComponent = LibIcons[nameIcon  as keyof typeof LibIcons] || IconNotFound;
  return <DynamicIconComponent {...propsIcon}/>;
}

export default MyIcon;