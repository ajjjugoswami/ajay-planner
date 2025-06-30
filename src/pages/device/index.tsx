// pages/index.tsx

import { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

export default function Home() {
type DeviceType =
  | "iPhone 8"
  | "iPhone 8 Plus"
  | "iPhone X"
  | "iPhone 5s"
  | "iPhone 4s"
  | "Galaxy Note 8"
  | "Samsung Galaxy S5"
  | "Nexus 5"
  | "HTC One"
  | "MacBook Pro"
  | "Lumia 920"
  | "iPad Mini";


  const [device, setDevice] = useState<DeviceType>("iPhone X");
  const [url, setUrl] = useState("https://example.com");

const devices: DeviceType[] = [
  "iPhone 8",
  "iPhone 8 Plus",
  "iPhone X",
  "iPhone 5s",
  "iPhone 4s",
  "Galaxy Note 8",
  "Samsung Galaxy S5",
  "Nexus 5",
  "HTC One",
  "MacBook Pro",
  "Lumia 920",
  "iPad Mini",
];


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/3 p-6 bg-gray-50 border-r">
        <h1 className="text-2xl font-bold mb-6">Device Preview</h1>
        <label className="block mb-4">
          <span className="block text-sm mb-1">Select Device:</span>
          <select
            value={device}
            onChange={(e) => setDevice(e.target.value as DeviceType)}
            className="w-full p-2 border rounded"
          >
            {devices.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-4">
          <span className="block text-sm mb-1">Enter URL:</span>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-2 border rounded"
          />
        </label>
      </div>
      <div className="flex-1 flex justify-center items-center p-6 overflow-auto bg-gray-100">
        <DeviceFrameset device={device} color="black" >
          <iframe
            src={url}
            title="preview"
            width="100%"
            height="100%"
            className="rounded border"
          />
        </DeviceFrameset>
      </div>
    </div>
  );
}
