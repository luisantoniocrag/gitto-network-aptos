import { useState } from "react";
import { Main, Topbar } from "../Global";
import { Filter } from "../Home/components";

const filters: string[] = ["Todo", "Seguimientos", "Hearth"];
const dummyUsers = [
  {
    userId: 1,
    userName: "@craig",
    userImage:
      "https://pbs.twimg.com/profile_images/1542556596122828804/uxR9c18g_400x400.jpg",
    userNotification: "Te ha seguido",
    follow: false,
  },
  {
    userId: 2,
    userName: "@applecat",
    userImage:
      "https://tr.rbxcdn.com/2655533ce025ada7048dcb2151676e30/420/420/Image/Png",
    userNotification: "le gusto una burbuja",
    follow: false,
  },
  {
    userId: 3,
    userName: "@miaurio",
    userImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx2xFk_wEb1hLQoDo4Ar3YbhosCPyOCfOgA&s",
    userNotification: "le gusto una burbuja",
    follow: false,
  },
  {
    userId: 4,
    userName: "@pedrito",
    userImage:
      "https://media.tenor.com/hVTGSfNmQhcAAAAM/ivehadituptoherewithyou-think-fast.gif",
    userNotification: "publico una burbuja",
    follow: false,
  },
];

export const Notifications = () => {
  const [currentTopic, setCurrentTopic] = useState("Cuentas");

  return (
    <Main>
      <>
        <Topbar>
          <div className="w-full h-full flex flex-row overflow-x-auto py-4 pl-2">
            {filters.map((filter) => (
              <Filter
                changeFilter={() => setCurrentTopic(filter)}
                filterName={filter}
                isActive={currentTopic === filter}
                key={filter}
              />
            ))}
          </div>
        </Topbar>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="grid gap-2 p-4 pb-20">
            {dummyUsers.map((dummyUser) => (
              <div
                key={dummyUser.userId}
                className="grid grid-cols-3 border-b border-gray-300 pt-4 pb-6"
              >
                <div className="col-span-2">
                  <div className="grid grid-cols-3">
                    <div className="flex items-center justify-center">
                      <img
                        className="w-12 h-12 rounded-full object-contain bg-gray-200"
                        src={dummyUser.userImage}
                      />
                    </div>
                    <div className="col-span-2 flex flex-col">
                      <label className="text-lg font-bold text-gray-900 capitalize">
                        {dummyUser.userName.slice(1)}
                      </label>
                      <label className="font-semibold text-gray-300 my-1">
                        {dummyUser.userName}
                      </label>
                      <label className="text-sm text-gray-700 font-semibold capitalize">
                        {dummyUser.userNotification}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center"></div>
              </div>
            ))}
          </div>
        </div>
      </>
    </Main>
  );
};
