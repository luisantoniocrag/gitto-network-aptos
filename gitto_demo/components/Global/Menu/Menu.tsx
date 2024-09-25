import { usePathname, useRouter } from "next/navigation";
import { options } from "./utils";

export const Menu = () => {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="border absolute bottom-0 w-full h-16 grid grid-cols-5 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      {options.map(({ label, route, icon: Icon }, index) => (
        <button
          type="button"
          onClick={() => router.push(route)}
          key={`${index}-${label}`}
          className={`${
            path === route ? "bg-gray-50 dark:bg-gray-800" : ""
          } inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}
        >
          <Icon
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={`${
              path === route
                ? "text-teal-600 dark:text-teal-500"
                : "text-gray-500 dark:text-gray-400"
            } w-8 h-8 mb-2  group-hover:text-teal-600 dark:group-hover:text-teal-500`}
          />
        </button>
      ))}
    </div>
  );
};
