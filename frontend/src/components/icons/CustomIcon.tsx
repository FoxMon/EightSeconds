import React from "react";
import {
  BsPeopleFill,
  BsMapFill,
  BsCalendarDateFill,
  BsSearch,
  BsFillBellFill,
} from "react-icons/bs";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { FaUserFriends, FaCrown } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BiCloudUpload, BiRefresh } from "react-icons/bi";

interface CustomIconProps {
  name: string;
  size: string;
  color: string;
}

const CustomIcon = ({ name, size, color }: CustomIconProps) => {
  function getIconComponent() {
    switch (name) {
      case "people":
        return <BsPeopleFill size={size} color={color} />;

      case "map":
        return <BsMapFill size={size} color={color} />;

      case "date":
        return <BsCalendarDateFill size={size} color={color} />;

      case "toggleDown":
        return <VscTriangleDown size={size} color={color}></VscTriangleDown>;

      case "toggleUp":
        return <VscTriangleUp size={size} color={color}></VscTriangleUp>;

      case "SeachIcon":
        return <BsSearch size={size} color={color}></BsSearch>;

      case "following":
        return <FaUserFriends size={size} color={color}></FaUserFriends>;
      case "bell":
        return <BsFillBellFill size={size} color={color}></BsFillBellFill>;
      case "send":
        return <FiSend size={size} color={color}></FiSend>;
      case "crown":
        return <FaCrown size={size} color={color}></FaCrown>;
      case "upload":
        return <BiCloudUpload size={size} color={color}></BiCloudUpload>;
      case "refresh":
        return <BiRefresh size={size} color={color}></BiRefresh>;
      default:
        console.log("Not implemented!");
        return;
    }
  }
  return <React.Fragment>{getIconComponent()}</React.Fragment>;
};

export default CustomIcon;
