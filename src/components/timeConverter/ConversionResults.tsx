"use client"

import { COLORS } from "@/lib/time-converter-constants"
import { motion } from "framer-motion"
 
interface ConversionResultsProps {
  convertedTimes: any[]
  copyToClipboard: (text: string) => void
}

export default function ConversionResults({ convertedTimes, copyToClipboard }: ConversionResultsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mt-6 bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
        <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Conversion Results</h3>
        <div className="space-y-3 sm:space-y-4">
          {convertedTimes.map((item) => (
            <div key={item.timezone} className="flex flex-col p-3 bg-white rounded-md shadow-sm">
              <div className="flex items-start mb-2">
                <div
                  className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: COLORS.primary, color: "#ffffff" }}
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-sm sm:text-base">{item.timezone}</span>
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{ backgroundColor: COLORS.accent, color: "#000000" }}
                    >
                      {item.abbreviation}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">{item.fullFormatted}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                <div className="text-lg sm:text-xl font-bold">{item.formatted}</div>
                <button
                  onClick={() => copyToClipboard(item.formatted)}
                  className="text-gray-500 hover:text-gray-700 p-1"
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
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
