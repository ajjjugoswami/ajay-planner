// pages/index.tsx

import { useState } from "react";
import styled from "styled-components";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

const deviceIcons: Record<string, string> = {
  "iPhone 8": "📱",
  "iPhone 8 Plus": "📱",
  "iPhone X": "📱",
  "iPhone 5s": "📱",
  "iPhone 4s": "📱",
  "Galaxy Note 8": "📱",
  "Samsung Galaxy S5": "📱",
  "Nexus 5": "📱",
  "HTC One": "📱",
  "MacBook Pro": "💻",
  "Lumia 920": "📱",
  "iPad Mini": "📲",
};

const deviceSpecs: Record<
  string,
  { resolution: string; screenSize: string; type: string }
> = {
  "iPhone 8": {
    resolution: "750 x 1334",
    screenSize: "4.7 inch",
    type: "Phone",
  },
  "iPhone 8 Plus": {
    resolution: "1080 x 1920",
    screenSize: "5.5 inch",
    type: "Phone",
  },
  "iPhone X": {
    resolution: "1125 x 2436",
    screenSize: "5.8 inch",
    type: "Phone",
  },
  "iPhone 5s": {
    resolution: "640 x 1136",
    screenSize: "4.0 inch",
    type: "Phone",
  },
  "iPhone 4s": {
    resolution: "640 x 960",
    screenSize: "3.5 inch",
    type: "Phone",
  },
  "Galaxy Note 8": {
    resolution: "1440 x 2960",
    screenSize: "6.3 inch",
    type: "Phone",
  },
  "Samsung Galaxy S5": {
    resolution: "1080 x 1920",
    screenSize: "5.1 inch",
    type: "Phone",
  },
  "Nexus 5": {
    resolution: "1080 x 1920",
    screenSize: "5.0 inch",
    type: "Phone",
  },
  "HTC One": {
    resolution: "1080 x 1920",
    screenSize: "4.7 inch",
    type: "Phone",
  },
  "MacBook Pro": {
    resolution: "1440 x 900",
    screenSize: "13.3 inch",
    type: "Laptop",
  },
  "Lumia 920": {
    resolution: "768 x 1280",
    screenSize: "4.5 inch",
    type: "Phone",
  },
  "iPad Mini": {
    resolution: "768 x 1024",
    screenSize: "7.9 inch",
    type: "Tablet",
  },
};

// === Styled Components ===

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.div`
  width: 100%;
  padding: 2.5rem 2rem;
  background: linear-gradient(135deg, #111827, #1f2937);
  color: #ffffff;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.25);

  @media (min-width: 768px) {
    width: 360px;
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 2rem;
`;

const LabelText = styled.span`
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: #e5e7eb;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: 14px;
  border: none;
  background-color: #374151;
  color: #f9fafb;
  font-size: 1rem;
  outline: none;
  appearance: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #4b5563;
  }

  &:focus {
    background-color: #4b5563;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: 14px;
  border: none;
  background-color: #374151;
  color: #f9fafb;
  font-size: 1rem;
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:hover {
    background-color: #4b5563;
  }

  &:focus {
    background-color: #4b5563;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

const SpecsCard = styled.div`
  background-color: #1f2937;
  border-radius: 14px;
  padding: 1rem 1.2rem;
  margin-top: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const SpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
  color: #d1d5db;
  font-size: 0.95rem;
`;

const PreviewContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f3f4f6;
  overflow: auto;
`;

export default function Home() {
  const [device, setDevice] = useState<any>("iPhone X");
  const [url, setUrl] = useState("https://example.com");

  const devices: any[] = Object.keys(deviceIcons) as any[];

  const currentSpec = deviceSpecs[device];

  return (
    <Wrapper>
      <Sidebar>
        <Heading>📱 Device Preview</Heading>

        <Label>
          <LabelText>Select Device:</LabelText>
          <Select
            value={device}
            onChange={(e) => setDevice(e.target.value as any)}
          >
            {devices.map((d) => (
              <option key={d} value={d}>
                {deviceIcons[d]} {d}
              </option>
            ))}
          </Select>
        </Label>

        <Label>
          <LabelText>Enter URL:</LabelText>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </Label>

        {/* === Device Specs === */}
        <SpecsCard>
          <SpecRow>
            <strong>Model:</strong>
            <span>{device}</span>
          </SpecRow>
          <SpecRow>
            <strong>Type:</strong>
            <span>{currentSpec?.type}</span>
          </SpecRow>
          <SpecRow>
            <strong>Screen:</strong>
            <span>{currentSpec?.screenSize}</span>
          </SpecRow>
          <SpecRow>
            <strong>Resolution:</strong>
            <span>{currentSpec?.resolution}</span>
          </SpecRow>
        </SpecsCard>
      </Sidebar>

      <PreviewContainer>
        <DeviceFrameset device={device} color="black">
          <iframe
            src={url}
            title="preview"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </DeviceFrameset>
      </PreviewContainer>
    </Wrapper>
  );
}
