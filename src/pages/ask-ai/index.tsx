"use client";
import { useEffect, useRef, useState } from "react";
import { Search, Mic } from "lucide-react";
import axios from "axios";
import { Layout } from "@/components/Layout";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "@/components/askAi/AskAiSIdeBar";

export default function ChatUI() {
  const [chats, setChats] = useState<
    { id: string; user: string; bot: string }[]
  >([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedChats = JSON.parse(
        localStorage.getItem("aj-bot-chats") || "[]"
      );
      setChats(savedChats);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aj-bot-chats", JSON.stringify(chats));
    }
  }, [chats]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const chatId = currentChatId || uuidv4();
    const newChat = { id: chatId, user: input, bot: "..." };
    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(chatId);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
        contents: [{ role: "user", parts: [{ text: input }] }],
      });

      let botReply =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";

      botReply = botReply
        .replace(/```([\s\S]*?)```/g, `<pre><code>$1</code></pre>`)
        .replace(/\n/g, "<br>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, bot: botReply } : chat
        )
      );
    } catch (error) {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? { ...chat, bot: "Error fetching response." }
            : chat
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const deleteChat = (chatId: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) setCurrentChatId(null);
  };

  const startNewChat = () => {
    setCurrentChatId(null);
    setInput("");
  };

  return (
    <Layout>
      <div className="flex bg-gradient-to-br to-black text-white h-full">
        {/* Sidebar */}
        <Sidebar
          chats={chats}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
          deleteChat={deleteChat}
          startNewChat={startNewChat}
        />

        {/* Chat Section */}
        <div className="flex-1 flex flex-col items-center p-6 ml-64 relative">
          {!currentChatId ? (
            // Initial View: Input inside a card
            <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg w-1/2">
              <h1 className="text-2xl font-semibold mb-4">
                How can I help you today?
              </h1>
              <p className="text-gray-400 mb-4">Start a new chat to begin</p>
              <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
                <input
                  type="text"
                  className="flex-1 bg-transparent outline-none text-white text-lg"
                  placeholder="Type your prompt here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  onClick={sendMessage}
                  className="p-2 bg-green-600 rounded-lg"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          ) : (
            // Chat Messages + Fixed Input at Bottom
            <div className="w-full max-w-2xl flex flex-col flex-grow">
              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto space-y-4 p-6 pb-20">
                {chats
                  .filter((chat) => chat.id === currentChatId)
                  .map((chat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="p-3 bg-blue-600 text-right self-end ml-auto rounded-lg max-w-[75%]">
                        {chat.user}
                      </div>
                      <div className="p-3 bg-gray-700 text-left rounded-lg   break-all">
                        <div dangerouslySetInnerHTML={{ __html: chat.bot }} />
                      </div>
                    </div>
                  ))}
                {isTyping && <p className="text-gray-500 text-sm">Typing...</p>}
              </div>

              {/* Fixed Input Box */}
              <div className="w-full max-w-2xl bg-gray-700 rounded-lg flex items-center px-4 py-2 fixed bottom-2 ">
                <input
                  type="text"
                  className="flex-1 bg-transparent outline-none text-white text-lg"
                  placeholder="Type your prompt here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  onClick={sendMessage}
                  className="p-2 bg-green-600 rounded-lg"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                  <Mic className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
