import { useState } from "react";
import { useRouter } from "next/router";
import { DummyPost } from "../Home/interfaces";
import { Main, Topbar } from "../Global";
import { Content, Post } from "../Home/components";
import { UpdateProfile } from "./components";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChatBubbleBottomCenterIcon,
  ShareIcon,
  PaperAirplaneIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const dummyPosts: DummyPost[] = [
  {
    userImg:
      "https://m.media-amazon.com/images/I/51WHgHxF5YL._AC_UF894,1000_QL80_.jpg",
    userName: "@mandarino",
    message: "Fachero",
    time: "11:00am",
    lastTime: "7h",
    postSrc:
      "https://m.media-amazon.com/images/I/51WHgHxF5YL._AC_UF894,1000_QL80_.jpg",
  },
  {
    userImg:
      "https://m.media-amazon.com/images/I/51WHgHxF5YL._AC_UF894,1000_QL80_.jpg",
    userName: "@mandarino",
    message: "Se busca",
    time: "12:00pm",
    lastTime: "6h",
    postSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx2xFk_wEb1hLQoDo4Ar3YbhosCPyOCfOgA&s",
  },
];
const randomStyles: string[] = [
  "bg-[#F5F5F5] text-white rounded-lg flex justify-center items-center h-[200px]",
  "bg-[#F5F5F5] text-white rounded-lg flex justify-center items-center row-span-2 h-[400px]",
  "bg-[#F5F5F5] text-white rounded-lg flex justify-center items-center h-[200px]",
  "bg-[#F5F5F5] text-white rounded-lg flex justify-center items-center h-[100px]",
];

export const Profile = () => {
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState<DummyPost | null>(null);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({
    userId: 3,
    userName: "@mandarino",
    userImage:
      "https://m.media-amazon.com/images/I/51WHgHxF5YL._AC_UF894,1000_QL80_.jpg",
    userDescription: "Gato naranja de pie xd",
    userLink: "https://github.com/LuisAcostaE",
    followers: 15,
    follows: 15,
  });

  return (
    <Main>
      <>
        {currentPost && !showUpdateProfile && (
          <Post currentPost={currentPost} setCurrentPost={setCurrentPost} />
        )}
        {showUpdateProfile && (
          <UpdateProfile
            setShowUpdateProfile={setShowUpdateProfile}
            currentProfile={currentProfile}
            setCurrentProfile={setCurrentProfile}
          />
        )}
        {!currentPost && !showUpdateProfile && (
          <>
            <Topbar>
              <div className="w-full h-full flex flex-row justify-between overflow-x-auto py-4 pl-2 relative">
                <div
                  className="flex flex-row items-center z-20"
                  onClick={() => router.back()}
                >
                  <ChevronLeftIcon className="w-10 h-10 text-gray-500 p-1.5" />
                  <label className="text-gray-500">Atrás</label>
                </div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <label className="text-gray-900 font-bold">Perfil</label>
                </div>
                <div
                  className="flex flex-row items-center z-20 mr-4"
                  onClick={() => setShowUpdateProfile(true)}
                >
                  <PencilIcon className="w-10 h-10 text-gray-500 p-2" />
                  <label className="text-gray-500">Editar</label>
                </div>
              </div>
            </Topbar>
            <div className="flex flex-col flex-1 overflow-y-auto">
              <div className="w-full grid grid-cols-3 px-4 pb-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-full pt-4">
                    <img
                      className="w-20 h-20 rounded-full object-contain bg-gray-200"
                      src={currentProfile.userImage}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 text-sm mt-4">{`${currentProfile.followers} Seguidores`}</label>
                    <label className="text-gray-700 text-sm mt-1">{`${currentProfile.followers} Seguidos`}</label>
                  </div>
                </div>
                <div className="col-span-2 pt-4 flex flex-col pl-6">
                  <h1 className="text-lg font-bold text-gray-900 capitalize">
                    {currentProfile.userName.slice(1)}
                  </h1>
                  <label className="text-gray-400 text-sm mt-1">
                    {currentProfile.userName}
                  </label>
                  <label className="text-gray-400 text-sm mt-1">
                    {currentProfile.userDescription}
                  </label>
                  <div className="w-full flex flex-row justify-around flex-1 items-end">
                    <button className="border rounded-2xl text-gray-700 px-4 py-1 text-sm w-1/2 mr-2">
                      Seguir
                    </button>
                    <button className="border rounded-2xl text-gray-700 px-4 py-1 text-sm w-1/2">
                      Mencionar
                    </button>
                  </div>
                </div>
                <div className="col-span-3 w-full flex flex-row justify-around flex-1 items-end mt-6">
                  <button className="border rounded-2xl text-gray-700 font-bold px-4 py-1 text-sm w-full">
                    Bubbles
                  </button>
                  <button className="border rounded-2xl text-gray-700 font-bold px-4 py-1 text-sm w-full mx-3">
                    Comments
                  </button>
                  <button className="border rounded-2xl text-gray-700 font-bold px-4 py-1 text-sm w-full flex items-center justify-center">
                    <ShareIcon className="w-4 h-4 text-gray-900" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 p-4 pb-20 bg-gray-50">
                {dummyPosts.map((dummyPost, i) => (
                  <div
                    key={i}
                    className={`${randomStyles[Math.floor(Math.random() * 3)]}`}
                  >
                    <Content
                      userImg={dummyPost.userImg}
                      userName={dummyPost.userName}
                      message={dummyPost.message}
                      time={dummyPost.time}
                      lastTime={dummyPost.lastTime}
                      postSrc={dummyPost.postSrc}
                      onClick={() => setCurrentPost(dummyPost)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    </Main>
  );
};
