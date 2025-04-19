"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/time-converter-constants";

interface RecentSearchesProps {
  recentSearches: any[];
  loadRecentSearch: (search: any) => void;
  deleteRecentSearch: (timestamp: number) => void;
}

export default function RecentSearches({
  recentSearches,
  loadRecentSearch,
  deleteRecentSearch,
}: RecentSearchesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {recentSearches.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {recentSearches.map((search, index) => (
            <motion.div
              key={search.timestamp}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col p-3 sm:p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-start mb-3">
                <div
                  className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-3"
                  style={{
                    backgroundColor: COLORS.secondary,
                    color: "#ffffff",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v5h5"></path>
                    <path d="M3 3l6.1 6.1"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm sm:text-base">
                    From: {search.sourceZone}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">
                    {new Date(search.timestamp).toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Source time: {search.sourceTime}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 truncate">
                    Target zones: {search.targetZones.join(", ")}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <button
                  onClick={() => loadRecentSearch(search)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  Load
                </button>
                <button
                  onClick={() => deleteRecentSearch(search.timestamp)}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-md text-sm"
                >
                   
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center p-6 sm:p-8 text-gray-500">
          No recent searches yet
        </div>
      )}
    </motion.div>
  );
}
