import { useState } from "react";
import { Main, Topbar } from "../Global";
import { Content, Filter, Post } from "./components";
import { DummyPost } from "./interfaces";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const filters: string[] = [
  "All",
  "Blockchain",
  "Web3",
  "Bitcoin",
  "Ethereum",
  "Telegram",
  "Technology",
  "Startups",
];

const randomStyles: string[] = [
  "bg-[#F5F5F5] text-white rounded-lg flex justify-center items-center h-[200px]",
  "bg-[#F5F5F5] text-white rounded-lg flex justify-center items-center row-span-2 h-[400px]",
  "bg-[#F5F5F5] text-white rounded-lg flex justify-center items-center h-[200px]",
  "bg-[#F5F5F5] text-white rounded-lg flex justify-center items-center h-[100px]",
];
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
      "https://pbs.twimg.com/profile_images/1542556596122828804/uxR9c18g_400x400.jpg",
    userName: "@craig",
    message: "Hashealo",
    time: "12:00pm",
    lastTime: "6h",
    postSrc:
      "https://pbs.twimg.com/profile_images/1542556596122828804/uxR9c18g_400x400.jpg",
  },
  {
    userImg:
      "https://tr.rbxcdn.com/2655533ce025ada7048dcb2151676e30/420/420/Image/Png",
    userName: "@applecat",
    message: "Sale fortnite?",
    time: "12:00pm",
    lastTime: "22h",
    postSrc:
      "https://tr.rbxcdn.com/2655533ce025ada7048dcb2151676e30/420/420/Image/Png",
  },
  {
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx2xFk_wEb1hLQoDo4Ar3YbhosCPyOCfOgA&s",
    userName: "@miaurio",
    message: "zzzz",
    time: "8:00pm",
    lastTime: "12h",
    postSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx2xFk_wEb1hLQoDo4Ar3YbhosCPyOCfOgA&s",
  },
  {
    userImg:
      "https://media.tenor.com/hVTGSfNmQhcAAAAM/ivehadituptoherewithyou-think-fast.gif",
    userName: "@pedrito",
    message: "Pov: El Peter",
    time: "12:00pm",
    lastTime: "6h",
    postSrc:
      "https://media.tenor.com/hVTGSfNmQhcAAAAM/ivehadituptoherewithyou-think-fast.gif",
  },
  {
    userImg: "https://media.tenor.com/rSyiXtfSQokAAAAM/cat-smug-face.gif",
    userName: "@chad",
    message: "GG",
    time: "12:00pm",
    lastTime: "6h",
    postSrc: "https://media.tenor.com/rSyiXtfSQokAAAAM/cat-smug-face.gif",
  },
  {
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx2xFk_wEb1hLQoDo4Ar3YbhosCPyOCfOgA&s",
    userName: "@craig",
    message: "Hashealo",
    time: "12:00pm",
    lastTime: "6h",
    postSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx2xFk_wEb1hLQoDo4Ar3YbhosCPyOCfOgA&s",
  },
  {
    userImg:
      "https://pbs.twimg.com/profile_images/1542556596122828804/uxR9c18g_400x400.jpg",
    userName: "@craig",
    message: "El Christian",
    time: "12:00pm",
    lastTime: "6h",
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

export const Home = () => {
  const [currentTopic, setCurrentTopic] = useState("All");
  const [currentPost, setCurrentPost] = useState<DummyPost | null>(null);

  return (
    <Main>
      <>
        {currentPost ? (
          <Post currentPost={currentPost} setCurrentPost={setCurrentPost} />
        ) : (
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
