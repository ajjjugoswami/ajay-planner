"use client"

import { motion } from "framer-motion"
import { COLORS, TIME_FORMATS } from "@/lib/time-converter-constants"
import TargetTimeZones from "./TargetTimeZone"
import ConversionResults from "./ConversionResults"
 

interface TimeConverterFormProps {
  inputTime: string
  setInputTime: (time: string) => void
  sourceTimeZone: string
  setSourceTimeZone: (zone: string) => void
  targetTimeZones: string[]
  setTargetTimeZones: (zones: string[]) => void
  selectedFormat: string
  setSelectedFormat: (format: string) => void
  allTimeZones: any[]
   useCurrentTime: () => void
  addTargetTimeZone: () => void
  removeTargetTimeZone: (index: number) => void
  convertTime: () => void
 }

export default function TimeConverterForm({
  inputTime,
  setInputTime,
  sourceTimeZone,
  setSourceTimeZone,
  targetTimeZones,
  setTargetTimeZones,
  selectedFormat,
  setSelectedFormat,
  allTimeZones,
   useCurrentTime,
  addTargetTimeZone,
  removeTargetTimeZone,
  convertTime,
 
}: TimeConverterFormProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Enter Time</label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="text"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                placeholder="e.g. 2025-08-10T12:00:00Z"
                className="w-full px-3 py-2 border border-gray-300 rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={useCurrentTime}
                className="px-3 py-2 bg-blue-500 text-white rounded-md sm:rounded-l-none hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: COLORS.primary }}
              >
                Now
              </button>
            </div>
            <p className="text-xs text-gray-500">Accepts ISO 8601 format or simple date format</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">From Time Zone</label>
            <select
              value={sourceTimeZone}
              onChange={(e) => setSourceTimeZone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allTimeZones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <TargetTimeZones
          targetTimeZones={targetTimeZones}
          setTargetTimeZones={setTargetTimeZones}
          allTimeZones={allTimeZones}
          addTargetTimeZone={addTargetTimeZone}
          removeTargetTimeZone={removeTargetTimeZone}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Output Format</label>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {TIME_FORMATS.map((format) => (
              <option key={format.value} value={format.value}>
                {format.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={convertTime}
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-medium"
          style={{ backgroundColor: COLORS.primary }}
        >
          Convert Time
        </button>

        
      </div>
    </motion.div>
  )
}
