"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Input, Card, Button, Switch, Slider, Select, message } from "antd";
import {
  StarOutlined,
  StarFilled,
  DownloadOutlined,
  BulbOutlined,
  BulbFilled,
} from "@ant-design/icons";
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";

const { Option } = Select;
const { TextArea } = Input;

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("https://note-syncs.vercel.app/");
  const [qrCode, setQRCode] = useState("https://note-syncs.vercel.app/");
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState(200);
  const [errorCorrection, setErrorCorrection] = useState<any>("M");
  const [isFavorited, setIsFavorited] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault();
    setQRCode(url);
    message.success("QR Code generated successfully!");
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    message.success(
      isFavorited ? "Removed from favorites" : "Added to favorites"
    );
  };

  const downloadQRCode = () => {
    const svg = document.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `qrcode-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      message.success("QR Code downloaded!");
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const toogle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
    message.success(`Dark mode ${!isDarkMode ? "enabled" : "disabled"}`);
  };

  return (
    <Layout>
      <Header darkMode={isDarkMode} toggleDarkMode={toogle} />
      <div
        className={`min-h-screen flex items-center justify-center p-4 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <Card
          title="QR Code Generator"
          className="w-full max-w-2xl"
          extra={
            <div className="flex items-center gap-4">
              <Button
                type="text"
                icon={
                  isFavorited ? (
                    <StarFilled style={{ color: "#faad14" }} />
                  ) : (
                    <StarOutlined />
                  )
                }
                onClick={toggleFavorite}
                aria-label="Favorite"
              />
            </div>
          }
        >
          <form onSubmit={generateQRCode} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">URL</label>
              <Input
                type="url"
                placeholder="Enter a URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <Button
              type="default"
              block
              onClick={() => setIsAdvancedMode(!isAdvancedMode)}
            >
              {isAdvancedMode
                ? "Hide Advanced Options"
                : "Show Advanced Options"}
            </Button>

            {isAdvancedMode && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      QR Code Color
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        style={{ width: 50, height: 40, padding: 2 }}
                      />
                      <Input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Background Color
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        style={{ width: 50, height: 40, padding: 2 }}
                      />
                      <Input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Size: {size}px × {size}px
                  </label>
                  <div className="flex items-center gap-4">
                    <Slider
                      min={100}
                      max={400}
                      step={10}
                      value={size}
                      onChange={setSize}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={100}
                      max={400}
                      step={10}
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      style={{ width: 80 }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Error Correction Level
                  </label>
                  <Select
                    value={errorCorrection}
                    onChange={setErrorCorrection}
                    className="w-full"
                  >
                    <Option value="L">Low (7%)</Option>
                    <Option value="M">Medium (15%)</Option>
                    <Option value="Q">Quartile (25%)</Option>
                    <Option value="H">High (30%)</Option>
                  </Select>
                </div>
              </>
            )}

            <Button type="primary" htmlType="submit" block size="large">
              Generate QR Code
            </Button>
          </form>

          <div className="flex flex-col items-center gap-4 mt-6">
            {qrCode && (
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <QRCodeSVG
                  value={qrCode}
                  size={size}
                  fgColor={color}
                  bgColor={backgroundColor}
                  level={errorCorrection}
                  includeMargin={true}
                />
              </div>
            )}
            {qrCode && (
              <Button
                icon={<DownloadOutlined />}
                onClick={downloadQRCode}
                block
              >
                Download QR Code
              </Button>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
