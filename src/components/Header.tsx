"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Moon,
  Bell,
  User,
  FileText,
  Calendar,
  BotMessageSquare,
} from "lucide-react";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  const getHeaderContent = () => {
    switch (pathname) {
      case "/notes/":
        return { icon: <FileText className="w-6 h-6" />, text: "Notes" };
      case "/planner/":
        return { icon: <Calendar className="w-6 h-6" />, text: "Planner" };
      case "/resume-builder/":
        return {
          icon: <FileText className="w-6 h-6" />,
          text: "Resume Builder",
        };
      case "/ask-ai/":
        return {
          icon: <BotMessageSquare className="w-6 h-6" />,
          text: "Ask AI",
        };
      default:
        return { icon: "🚀", text: "Note Sync" };
    }
  };

  const { icon, text } = getHeaderContent();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 shadow-lg flex justify-between items-center  ">
      <Link
        href="/"
        className="text-2xl font-bold tracking-wide flex items-center gap-2 drop-shadow-lg"
      >
        {icon} {text}
      </Link>
      <nav className="flex gap-4">
        <button className="hover:bg-white hover:text-indigo-600 transition p-2 rounded-full">
          <Bell className="w-6 h-6" />
        </button>
        <button className="hover:bg-white hover:text-indigo-600 transition p-2 rounded-full">
          <Moon className="w-6 h-6" />
        </button>
        <button className="hover:bg-white hover:text-indigo-600 transition p-2 rounded-full">
          <User className="w-6 h-6" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
