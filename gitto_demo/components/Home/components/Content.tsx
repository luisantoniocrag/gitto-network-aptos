import React from "react";

export const Content = ({
  userImg,
  userName,
  message,
  time,
  lastTime,
  postSrc,
  onClick,
}: any) => {
  return (
    <div className="w-full h-full p-2.5 flex flex-col" onClick={onClick}>
      <div className="flex flex-row">
        <img
          className="w-8 h-8 rounded-full object-contain bg-gray-200"
          src={userImg}
        />
        <div className="flex flex-1 items-center justify-start pl-1">
          <label className="text-xs text-blue-500 font-bold">{userName}</label>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between mt-1">
        <label className="text-xs font-bold text-gray-900">{message}</label>
        <label className="text-xs font-semi=bold text-gray-500">{time}</label>
      </div>
      <label className="text-xs font-semi=bold text-gray-500">{lastTime}</label>
      <img
        className="flex flex-1 rounded-lg object-contain aspect-video mt-3 bg-gray-200"
        src={postSrc}
      />
    </div>
  );
};
