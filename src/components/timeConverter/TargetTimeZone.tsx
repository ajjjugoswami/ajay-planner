"use client"

import { COLORS } from "@/lib/time-converter-constants"

interface TargetTimeZonesProps {
  targetTimeZones: string[]
  setTargetTimeZones: (zones: string[]) => void
  allTimeZones: any[]
  addTargetTimeZone: () => void
  removeTargetTimeZone: (index: number) => void
}

export default function TargetTimeZones({
  targetTimeZones,
  setTargetTimeZones,
  allTimeZones,
  addTargetTimeZone,
  removeTargetTimeZone,
}: TargetTimeZonesProps) {
  return (
    <div className="my-5 sm:my-6 border-t border-gray-200 pt-5 sm:pt-6">
      <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Target Time Zones</h3>

      {targetTimeZones.map((tz, index) => (
        <div key={index} className="flex flex-col sm:flex-row mb-3 gap-2">
          <select
            value={tz}
            onChange={(e) => {
              const newTargets = [...targetTimeZones]
              newTargets[index] = e.target.value
              setTargetTimeZones(newTargets)
            }}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {allTimeZones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeTargetTimeZone(index)}
            disabled={targetTimeZones.length <= 1}
            className={`px-3 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
              targetTimeZones.length <= 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 focus:ring-red-500"
            }`}
            style={{ backgroundColor: targetTimeZones.length <= 1 ? "#ccc" : COLORS.error }}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addTargetTimeZone}
        disabled={targetTimeZones.length >= 5}
        className={`w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          targetTimeZones.length >= 5 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-50"
        }`}
      >
        Add Target Time Zone
      </button>
    </div>
  )
}
