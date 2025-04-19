"use client";

import { useState, useEffect, useMemo } from "react";
import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { motion } from "framer-motion";

import { COLORS, COMMON_TIMEZONES } from "@/lib/time-converter-constants";
import RecentSearches from "./RecentSearches";
import TimeConverterForm from "./TimeConverterForm";
import WorldClock from "./WorldClock";
import Notification from "./TimeNotifications";
import ConversionResults from "./ConversionResults";

interface ConvertedTime {
  timezone: string;
  abbreviation: string;
  formatted: string;
  fullFormatted: string;
}

interface RecentSearch {
  sourceTime: string;
  sourceZone: string;
  targetZones: string[];
  timestamp: number;
}

export default function TimeConverter() {
  // Left side tabs
  const [leftTab, setLeftTab] = useState<"converter" | "clock">("converter");

  // Right side tabs
  const [rightTab, setRightTab] = useState<"converted" | "recent">("converted");

  // Time converter state
  const [inputTime, setInputTime] = useState<string>(new Date().toISOString());
  const [sourceTimeZone, setSourceTimeZone] =
    useState<string>("America/Chicago");
  const [targetTimeZones, setTargetTimeZones] = useState<string[]>([
    "Asia/Kolkata",
  ]);
  const [convertedTimes, setConvertedTimes] = useState<ConvertedTime[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("HH:mm:ss");
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Show notification
  const showNotification = (message: string, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Get timezone abbreviation
  const getTimezoneAbbr = (timezone: string) => {
    try {
      return formatInTimeZone(new Date(), timezone, "zzz");
    } catch {
      return "";
    }
  };

  // Convert time
  const convertTime = () => {
    try {
      const date = inputTime ? parseISO(inputTime) : new Date();

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }

      const results = targetTimeZones.map((targetTz) => ({
        timezone: targetTz,
        abbreviation: getTimezoneAbbr(targetTz),
        formatted: formatInTimeZone(date, targetTz, selectedFormat),
        fullFormatted: formatInTimeZone(
          date,
          targetTz,
          "EEEE, MMMM d, yyyy h:mm:ss a zzz"
        ),
      }));

      setConvertedTimes(results);
      setRightTab("converted");

      // Add to recent searches
      setRecentSearches((prev) => [
        {
          sourceTime: inputTime,
          sourceZone: sourceTimeZone,
          targetZones: [...targetTimeZones],
          timestamp: Date.now(),
        },
        ...prev.slice(0, 4),
      ]);

      showNotification("Time converted successfully!");
    } catch (err) {
      showNotification(
        "Invalid date format. Please use a valid format.",
        "error"
      );
    }
  };

  // Load a recent search
  const loadRecentSearch = (search: RecentSearch) => {
    setInputTime(search.sourceTime);
    setSourceTimeZone(search.sourceZone);
    setTargetTimeZones(search.targetZones);
    setRightTab("converted");
    setTimeout(convertTime, 100);
  };
  // Use current time
  const useCurrentTime = () => {
    setInputTime(new Date().toISOString());
    showNotification("Current time set successfully!");
  };

  // Add target timezone
  const addTargetTimeZone = () => {
    if (targetTimeZones.length < 5) {
      const availableZones = COMMON_TIMEZONES.filter(
        (tz) => !targetTimeZones.includes(tz)
      );
      if (availableZones.length > 0) {
        setTargetTimeZones([...targetTimeZones, availableZones[0]]);
      }
    } else {
      showNotification("Maximum of 5 time zones allowed", "info");
    }
  };

  // Remove target timezone
  const removeTargetTimeZone = (index: number) => {
    if (targetTimeZones.length > 1) {
      const newTargets = [...targetTimeZones];
      newTargets.splice(index, 1);
      setTargetTimeZones(newTargets);
    } else {
      showNotification("At least one time zone required", "info");
    }
  };

 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-8xl mx-auto px-4 py-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
          <div
            className="p-6"
            style={{
              background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
              color: "#ffffff",
            }}
          >
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
              </svg>
              <h1 className="text-2xl font-bold m-0">World Time Converter</h1>
            </div>
            <p className="text-white/80 mt-1">
              Convert time between any time zones around the world
            </p>
          </div>

          <div className="p-6">
            {/* Left side tabs */}
            <div className="flex border-b mb-6">
              <button
                className={`px-4 py-2 font-medium ${
                  leftTab === "converter"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setLeftTab("converter")}
              >
                Time Converter
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  leftTab === "clock"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setLeftTab("clock")}
              >
                World Clock
              </button>
            </div>

            {leftTab === "converter" ? (
              <TimeConverterForm
                inputTime={inputTime}
                setInputTime={setInputTime}
                sourceTimeZone={sourceTimeZone}
                setSourceTimeZone={setSourceTimeZone}
                targetTimeZones={targetTimeZones}
                setTargetTimeZones={setTargetTimeZones}
                selectedFormat={selectedFormat}
                setSelectedFormat={setSelectedFormat}
                allTimeZones={COMMON_TIMEZONES.map((tz) => ({
                  value: tz,
                  label: `${tz} (${getTimezoneAbbr(tz)})`,
                  group: tz.split("/")[0],
                }))}
                useCurrentTime={useCurrentTime}
                addTargetTimeZone={addTargetTimeZone}
                removeTargetTimeZone={removeTargetTimeZone}
                convertTime={convertTime}
              />
            ) : (
              <WorldClock
                worldClockZones={COMMON_TIMEZONES}
                getTimezoneAbbr={getTimezoneAbbr}
              />
            )}
          </div>
        </div>

        {/* Right Column - Converted Times or Recent Searches */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            {/* Right side tabs */}
            <div className="flex border-b mb-6">
              <button
                className={`px-4 py-2 font-medium ${
                  rightTab === "converted"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setRightTab("converted")}
              >
                Converted Times
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  rightTab === "recent"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setRightTab("recent")}
              >
                Recent Searches
              </button>
            </div>

            {rightTab === "converted" ? (
              convertedTimes.length > 0 ? (
                <ConversionResults
                  convertedTimes={convertedTimes}
                  copyToClipboard={(text: string) => {
                    navigator.clipboard.writeText(text);
                    showNotification("Copied to clipboard!");
                  }}
                />
              ) : (
                <p className="text-gray-500">No conversions yet.</p>
              )
            ) : (
              <RecentSearches
                recentSearches={recentSearches}
                loadRecentSearch={loadRecentSearch}
              />
            )}
          </div>
        </div>
      </div>

      <Notification notification={notification} />
    </motion.div>
  );
}
