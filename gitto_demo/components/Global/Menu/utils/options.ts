import { AiFillHeart, AiFillHome, AiFillPlusCircle } from "react-icons/ai";
import { BiSearch, BiSolidUser } from "react-icons/bi";
import { Option } from "../interfaces";

export const options: Option[] = [
  {
    label: "Home",
    route: "/",
    icon: AiFillHome,
  },
  {
    label: "Search",
    route: "/search",
    icon: BiSearch,
  },
  {
    label: "Post",
    route: "/publish",
    icon: AiFillPlusCircle,
  },
  {
    label: "Notifications",
    route: "/notifications",
    icon: AiFillHeart,
  },
  {
    label: "Profile",
    route: "/profile",
    icon: BiSolidUser,
  },
];
