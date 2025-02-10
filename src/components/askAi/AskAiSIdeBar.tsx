"use client";
import { Trash } from "lucide-react";

export default function Sidebar({
  chats,
  currentChatId,
  setCurrentChatId,
  deleteChat,
  startNewChat,
}: any) {
  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col justify-between h-screen fixed left-0 top-0">
      <div>
        <h2 className="text-xl font-semibold mt-[70px]">My Chats</h2>
        <div className="space-y-2 mt-4 overflow-auto  ">
          {chats.slice(-5).map((chat: any) => (
            <div
              key={chat.id}
              className={`p-2 bg-gray-700 rounded-lg flex justify-between items-center cursor-pointer ${
                chat.id === currentChatId ? "bg-green-700" : ""
              }`}
              onClick={() => setCurrentChatId(chat.id)}
            >
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {chat.user.length > 20
                    ? chat.user.slice(0, 20) + "..."
                    : chat.user}
                </p>
                <p className="text-xs text-gray-400">
                  {chat.bot.length > 20
                    ? chat.bot.slice(0, 20) + "..."
                    : chat.bot}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className="ml-2 text-red-400 hover:text-red-600"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={startNewChat}
        className="w-full p-2 bg-green-600 rounded-lg"
      >
        New Chat
      </button>
    </div>
  );
}
