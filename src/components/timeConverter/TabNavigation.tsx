"use client"

import { COLORS } from "@/lib/time-converter-constants"

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex border-b border-gray-200 min-w-max">
        <div
          className={`px-3 py-2 cursor-pointer flex items-center text-sm sm:text-base sm:px-4 ${
            activeTab === "1" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
          onClick={() => setActiveTab("1")}
          style={{
            borderColor: activeTab === "1" ? COLORS.primary : "",
            color: activeTab === "1" ? COLORS.primary : "",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1 sm:mr-2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span className="whitespace-nowrap">Time Converter</span>
        </div>
        <div
          className={`px-3 py-2 cursor-pointer flex items-center text-sm sm:text-base sm:px-4 ${
            activeTab === "2" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
          onClick={() => setActiveTab("2")}
          style={{
            borderColor: activeTab === "2" ? COLORS.primary : "",
            color: activeTab === "2" ? COLORS.primary : "",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1 sm:mr-2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            <path d="M2 12h20"></path>
          </svg>
          <span className="whitespace-nowrap">World Clock</span>
        </div>
        <div
          className={`px-3 py-2 cursor-pointer flex items-center text-sm sm:text-base sm:px-4 ${
            activeTab === "3" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
          onClick={() => setActiveTab("3")}
          style={{
            borderColor: activeTab === "3" ? COLORS.primary : "",
            color: activeTab === "3" ? COLORS.primary : "",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1 sm:mr-2"
          >
            <path d="M3 3v5h5"></path>
            <path d="M3 3l6.1 6.1"></path>
            <circle cx="12" cy="12" r="9"></circle>
          </svg>
          <span className="whitespace-nowrap">Recent</span>
        </div>
      </div>
    </div>
  )
}
