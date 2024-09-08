"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { AiFillHeart, AiFillHome, AiFillPlusCircle } from "react-icons/ai";
import { BiSearch, BiSolidUser } from "react-icons/bi";

interface MenuItem {
  label: string;
  route: string;
  icon: IconType;
}

const navBarMenuItems: MenuItem[] = [
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
    route: "/post",
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

const getColumns = () => navBarMenuItems.length.toString()


const Navbar: React.FC<{}> = () => {
  const router = useRouter();
  const path = usePathname()



  return (
    <div className="fixed bottom-0 z-50 mx-auto max-w-[420px] right-0 left-0 h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div
        className={`grid h-full max-w-lg grid-cols-${getColumns()} mx-auto font-medium`}
      >
        {navBarMenuItems.map(({ label, route, icon: Icon }, index) => (
          <button
            type="button"
            onClick={() => router.push(route)}
            key={`${index}-${label}`}
            className={`${path == route ? "bg-gray-50 dark:bg-gray-800" : ""}  inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}
          >
            <Icon
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className={`${path == route ? "text-teal-600 dark:text-teal-500" : "text-gray-500 dark:text-gray-400"} w-8 h-8 mb-2  group-hover:text-teal-600 dark:group-hover:text-teal-500`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
