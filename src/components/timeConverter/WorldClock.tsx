"use client"

import { motion } from "framer-motion"
import { formatInTimeZone } from "date-fns-tz"

interface WorldClockProps {
  worldClockZones: string[]
  getTimezoneAbbr: (timezone: string) => string
}

export default function WorldClock({ worldClockZones, getTimezoneAbbr }: WorldClockProps) {
  const now = new Date()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {worldClockZones.map((timezone) => {
          const time = formatInTimeZone(now, timezone, "HH:mm:ss")
          const date = formatInTimeZone(now, timezone, "MMM d, yyyy")
          const abbr = getTimezoneAbbr(timezone)

          // Generate a unique color for each card based on the timezone name
          const colorIndex = timezone.charCodeAt(0) % 5
          const cardColors = [
            { bg: "#4361ee", text: "#ffffff" },
            { bg: "#3a0ca3", text: "#ffffff" },
            { bg: "#7209b7", text: "#ffffff" },
            { bg: "#f72585", text: "#ffffff" },
            { bg: "#4cc9f0", text: "#000000" },
          ]
          const cardColor = cardColors[colorIndex]

          return (
            <motion.div
              key={timezone}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="world-clock-card"
            >
              <div
                className="p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
                style={{
                  background: cardColor.bg,
                  color: cardColor.text,
                }}
              >
                <div className="text-center">
                  <div className="mb-1 sm:mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={cardColor.text}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold" style={{ color: cardColor.text }}>
                    {time}
                  </div>
                  <div className="text-xs sm:text-sm opacity-80" style={{ color: cardColor.text }}>
                    {date}
                  </div>
                  <div className="my-2 sm:my-3 border-t border-white/20"></div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs truncate max-w-[70%]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={cardColor.text}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline mr-1"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {timezone.split("/")[1] || timezone}
                    </div>
                    <div
                      className="text-xs px-1 sm:px-2 py-1 rounded"
                      style={{
                        backgroundColor: colorIndex === 4 ? "#3a0ca3" : "#4cc9f0",
                        color: colorIndex === 4 ? "#ffffff" : "#000000",
                      }}
                    >
                      {abbr}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
