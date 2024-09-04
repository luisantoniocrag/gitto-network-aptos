"use client"

import { useState } from "react";


const headerTopics = ["All", "Blockchain", "Web3", "Bitcoin", "Ethereum", "Telegram", "Technology", "Startups"] 

export default function Home() {

  const [headerTopicSelected, setHeaderTopicSelected] = useState("All")


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-w-[420px] mx-auto">
      <div className=" max-w-[420px]  overflow-x-auto whitespace-nowrap border-b-2">
      {
        headerTopics.map((value, index) => <BadgeHeader isActive={headerTopicSelected == value} onClick={() => setHeaderTopicSelected(value)} key={index} name={value} />)
      }
      </div>
    </main>
  );
}


interface BadgeHeaderProps {
  name: string;
  isActive: boolean;
  onClick?: (e: any) => void;
}

const BadgeHeader : React.FC<BadgeHeaderProps> = ({ name, isActive, onClick }) => (
  <div className={`inline-block px-6 py-2 bg-[#F5F5F5] rounded-full cursor-pointer mr-4 border-2 ${isActive  ? "border-black" : "border-[#F5F5F5]"} `} onClick={onClick}>
    <span className="font-bold text-black">{name}</span>
  </div>
);