import { FC, useState } from "react";
import { Topbar } from "@/components/Global";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChatBubbleBottomCenterIcon,
  ShareIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HearthSolid } from "@heroicons/react/16/solid";
import { PostProps } from "../../interfaces";

const currentUser = {
  userId: 3,
  userName: "@mandarino",
  userImage:
    "https://m.media-amazon.com/images/I/51WHgHxF5YL._AC_UF894,1000_QL80_.jpg",
};

export const Post: FC<PostProps> = (props) => {
  const { currentPost, setCurrentPost } = props;
  const [likePost, setLikePost] = useState(false);
  const [commentPost, setCommentPost] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [temporalData, setTemporalData] = useState({
    likes: 10,
    messages: 2,
    shared: 3,
  });
  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: 1,
      userName: "@miaurio",
      userImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx2xFk_wEb1hLQoDo4Ar3YbhosCPyOCfOgA&s",
      messageLevel: 0,
      messageText: "jsjsjs",
      messageLiked: false,
      messageComment: false,
      messageLikes: 0,
      messageShared: 0,
      messageRepliesTotal: 0,
      messageReplies: [],
    },
    {
      id: 2,
      userId: 2,
      userName: "@pedrito",
      userImage:
        "https://media.tenor.com/hVTGSfNmQhcAAAAM/ivehadituptoherewithyou-think-fast.gif",
      messageLevel: 0,
      messageText: "LOL",
      messageLiked: false,
      messageComment: false,
      messageLikes: 2,
      messageShared: 5,
      messageRepliesTotal: 2,
      messageReplies: [
        {
          id: 3,
          userId: 1,
          userName: "@miaurio",
          userImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx2xFk_wEb1hLQoDo4Ar3YbhosCPyOCfOgA&s",
          messageLevel: 1,
          messageText: "jsjsjs",
          messageLiked: false,
          messageComment: false,
          messageLikes: 0,
          messageShared: 0,
          messageRepliesTotal: 0,
          messageReplies: [],
        },
      ],
    },
  ]);

  const getHeight = () => {
    const divItem = document.getElementById("replies");

    if (divItem) {
      const { height } = divItem.getBoundingClientRect();
      return `${height}px`;
    }
    return "0";
  };

  const addMainMessage = (): void => {
    const mainTextArea: any = document.getElementById("newMainComment");

    if (!mainTextArea) return;
    if (mainTextArea.value.length < 5) return;

    setMessages([
      {
        id: new Date().getTime(),
        userId: currentUser.userId,
        userName: currentUser.userName,
        userImage: currentUser.userImage,
        messageLevel: 0,
        messageText: mainTextArea.value,
        messageLiked: false,
        messageComment: false,
        messageLikes: 0,
        messageShared: 0,
        messageRepliesTotal: 0,
        messageReplies: [],
      },
      ...messages,
    ]);
    setTemporalData({ ...temporalData, messages: temporalData.messages + 1 });
    setCommentPost(false);
  };

  const updateMessage = (messageId: number): void => {
    const newMessages = messages.map((message) =>
      messageId === message.id
        ? { ...message, messageLiked: !message.messageLiked }
        : message
    );
    setMessages(newMessages);
  };

  return (
    <>
      <Topbar>
        <div
          className="w-full h-full flex flex-row overflow-x-auto py-4 pl-2 relative"
          onClick={() => setCurrentPost(null)}
        >
          <div className="flex flex-row items-center">
            <ChevronLeftIcon className="w-10 h-10 text-gray-500 p-1.5" />
            <label className="text-gray-500">Atrás</label>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <label className="text-gray-900 font-bold">Post</label>
          </div>
        </div>
      </Topbar>
      <div className="flex flex-col flex-1 overflow-y-auto bg-gray-100">
        <div className="w-full h-full p-2.5 flex flex-col px-10">
          <div className="flex flex-row mt-4">
            <img
              className="w-12 h-12 rounded-full object-contain bg-gray-200"
              src={currentPost.userImg}
            />
            <div className="flex flex-1 items-center justify-start pl-2">
              <label className="text-base text-blue-500 font-bold">
                {currentPost.userName}
              </label>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mt-1">
            <label className="text-base font-bold text-gray-900">
              {currentPost.message}
            </label>
            <label className="text-base font-semi=bold text-gray-500">
              {currentPost.time}
            </label>
          </div>
          <label className="text-base font-semi=bold text-gray-500">
            {currentPost.lastTime}
          </label>
          <img
            className="flex rounded-lg object-contain aspect-video mt-3 bg-gray-200"
            src={currentPost.postSrc}
          />
          <div className="w-full flex flex-row mt-4 pb-2 border-b border-gray-300">
            <div className="flex flex-1">
              <div className="flex flex-row items-center mr-4">
                <HearthSolid
                  onClick={() => setLikePost(!likePost)}
                  className={`w-10 h-10 p-2 transition-all duration-500 ${
                    likePost ? "text-red-500" : "text-gray-300"
                  }`}
                />
                <label className="text-gray-500 font-semibold">
                  {likePost ? temporalData.likes + 1 : temporalData.likes}
                </label>
              </div>
              <div className="flex flex-row items-center mr-4">
                <ShareIcon className="w-10 h-10 text-gray-300 p-2" />
                <label className="text-gray-300 font-semibold">
                  {temporalData.shared}
                </label>
              </div>
              <div
                className="flex flex-row items-center mr-4"
                onClick={() => {
                  setShowMessages(!commentPost);
                  setCommentPost(!commentPost);
                }}
              >
                <ChatBubbleBottomCenterIcon className="w-10 h-10 text-gray-500 p-2" />
                <label className="text-gray-500 font-semibold">
                  {temporalData.messages}
                </label>
              </div>
            </div>
            <div className="w-10 flex items-center">
              <PaperAirplaneIcon className="w-10 h-10 text-gray-300 p-2 -rotate-45" />
            </div>
          </div>
          <div
            className={`transition-all duration-500 ${
              showMessages ? "border-b border-gray-300" : ""
            }`}
          >
            <div
              onClick={() => {
                setCommentPost(false);
                setShowMessages(!showMessages);
              }}
              className="h-10 flex items-center border-b border-gray-300"
            >
              <label className="text-gray-900 font-semibold">
                Ver respuestas
              </label>
              <ChevronRightIcon
                className={`w-6 h-6 text-gray-900 p-1 transition-all duration-500 ${
                  showMessages ? "rotate-90" : ""
                }`}
              />
            </div>
            <div
              className="overflow-hidden transition-all duration-500"
              style={{ height: showMessages ? getHeight() : 0 }}
            >
              <div className="pb-60" id="replies">
                {commentPost && (
                  <div className="border-b border-gray-300 flex flex-row py-4">
                    <div className="flex items-center justify-center w-16 pt-4">
                      <img
                        className="w-12 h-12 rounded-full object-contain bg-gray-200"
                        src={currentUser.userImage}
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label className="text-base text-gray-900 font-bold">
                        {currentUser.userName}
                      </label>
                      <label className="text-base text-gray-700 mt-0">
                        <textarea
                          id="newMainComment"
                          placeholder="Comenta"
                          className="w-full p-1"
                        />
                      </label>
                    </div>
                    <div
                      className="w-8 flex items-center justify-center"
                      onClick={addMainMessage}
                    >
                      <PaperAirplaneIcon className="w-10 h-10 text-gray-500 p-1.5 -rotate-45" />
                    </div>
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="border-b border-gray-300 flex flex-row py-4"
                  >
                    <div className="flex items-center justify-center w-16">
                      <img
                        className="w-12 h-12 rounded-full object-contain bg-gray-200"
                        src={message.userImage}
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label className="text-base text-gray-900 font-bold">
                        {message.userName}
                      </label>
                      <label className="text-base text-gray-700 mt-4">
                        {message.messageText}
                      </label>
                      <div className="w-full flex flex-row mt-4 -ml-3">
                        <div className="flex flex-1">
                          <div
                            className="flex flex-row items-center mr-4"
                            onClick={() => updateMessage(message.id)}
                          >
                            <HearthSolid
                              className={`w-10 h-10 p-2 transition-all duration-500 ${
                                message.messageLiked
                                  ? "text-red-500"
                                  : "text-gray-300"
                              }`}
                            />
                            <label className="text-gray-500 font-semibold">
                              {message.messageLiked
                                ? message.messageLikes + 1
                                : message.messageLikes}
                            </label>
                          </div>
                          <div className="flex flex-row items-center mr-4">
                            <ShareIcon className="w-10 h-10 text-gray-300 p-2" />
                            <label className="text-gray-300 font-semibold">
                              {message.messageShared}
                            </label>
                          </div>
                          <div className="flex flex-row items-center mr-4">
                            <ChatBubbleBottomCenterIcon className="w-10 h-10 text-gray-300 p-2" />
                            <label className="text-gray-300 font-semibold">
                              {message.messageRepliesTotal}
                            </label>
                          </div>
                        </div>
                      </div>
                      {message.messageComment && (
                        <div className="w-full flex flex-row border">
                          <div className="flex w-10 h-10 ">
                            <img
                              className="w-10 h-10 rounded-full object-contain bg-gray-200"
                              src={currentUser.userImage}
                            />
                          </div>
                          <div className="flex flex-1 items-center justify-start p-2">
                            <input placeholder="Comenta" />
                          </div>
                          <div className="w-8 h-10 border flex items-center justify-center">
                            <PaperAirplaneIcon className="w-10 h-10 text-gray-500 p-1.5 -rotate-45" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
