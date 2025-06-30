// pages/index.js

import { Layout } from "@/components/Layout";
import { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";

import "react-device-frameset/styles/marvel-devices.min.css";

export default function Home() {
  const [device, setDevice] = useState<any>("iPhone X");
  const [url, setUrl] = useState("https://example.com");

  const devices = [
    "iPhone 8",
    "iPhone X",
    "iPhone 11 Pro",
    "Pixel 2",
    "Pixel 2 XL",
    "Galaxy Note 8",
    "Galaxy S5",
    "iPad Mini",
    "iPad Pro",
  ];

  return (
    <Layout>
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Device Preview App</h1>
        <label>
          Select Device:{" "}
          <select value={device} onChange={(e) => setDevice(e.target.value)}>
            {devices.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <label>
          Enter URL:{" "}
          <input
            style={{ width: "300px" }}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </label>
        <br />
        <br />
        <DeviceFrameset device={device} color="black" landscape={false}>
          <iframe src={url} title="preview" width="100%" height="100%" />
        </DeviceFrameset>
      </main>
    </Layout>
  );
}
