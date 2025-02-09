import React from "react";
import { Moon, Bell, User } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 shadow-lg flex justify-between items-center rounded-b-2xl">
      <Link href="/" className="text-2xl font-bold tracking-wide drop-shadow-lg">
        🚀 Reminder & Planner
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
