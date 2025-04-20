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
  Image,
  Star,
  Search,
  Sun,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";

const Header = ({
  darkMode,
  toggleDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
}: any) => {
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-lg ${
        darkMode ? "bg-[#0f1029]/80" : "bg-white/80"
      } border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={"/"}>
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Note Sync
          </span>
        </div></Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div
            className={`relative px-4 py-2 rounded-full ${
              darkMode ? "bg-[#1a1b3a]" : "bg-gray-100"
            } flex items-center`}
          >
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className={`ml-2 bg-transparent border-none outline-none ${
                darkMode ? "placeholder-gray-500" : "placeholder-gray-400"
              } w-40`}
            />
          </div>

          <button className="relative">
            <Bell
              className={`w-6 h-6 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-800/20"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden ${
            darkMode ? "bg-[#0f1029]" : "bg-white"
          } py-4 px-4`}
        >
          <div className="flex flex-col space-y-4">
            <div
              className={`relative px-4 py-2 rounded-full ${
                darkMode ? "bg-[#1a1b3a]" : "bg-gray-100"
              } flex items-center`}
            >
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className={`ml-2 bg-transparent border-none outline-none ${
                  darkMode ? "placeholder-gray-500" : "placeholder-gray-400"
                } w-full`}
              />
            </div>

            <div className="flex items-center justify-between">
              <button className="flex items-center space-x-2">
                <Bell
                  className={`w-6 h-6 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                />
                <span>Notifications</span>
              </button>
              <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                3
              </span>
            </div>

            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-2"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>

            <button className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
