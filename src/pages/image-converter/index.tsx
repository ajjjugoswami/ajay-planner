"use client";

import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  Button,
  Card,
  Select,
  Alert,
  Typography,
  Space,
  Divider,
  Row,
  Col,
  Slider,
  Spin,
  notification,
  Progress,
  Tooltip,
} from "antd";
import {
  Upload,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  ChevronsDown,
  Info,
} from "lucide-react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  background: linear-gradient(135deg, #f6f7f9 0%, #e9ebee 100%);
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 1.5fr);
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`;

const LeftPanel = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 24px;

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 16px;
  }
`;

const RightPanel = styled(motion.div)`
  background: transparent;
`;

const DropZone = styled(motion.div)<{ isdragging: string }>`
  width: 100%;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  background: ${(props) =>
    props.isdragging === "true" ? "rgba(79, 70, 229, 0.1)" : "transparent"};
  border: ${(props) =>
    props.isdragging === "true" ? "3px dashed #4f46e5" : "3px dashed #d1d5db"};
  transition: all 0.3s ease;
  border-radius: 12px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    background: rgba(79, 70, 229, 0.05);
    border-color: #4f46e5;
  }
`;

const UploadIconWrapper = styled(motion.div)`
  font-size: 48px;
  color: #4f46e5;
  margin-bottom: 16px;
  animation: ${float} 3s ease-in-out infinite;
`;

const HintText = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #64748b;
  margin-top: 16px;
  font-size: 14px;
`;

const ImageGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ImageCard = styled(motion.div)`
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  background: white;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ImagePreview = styled(motion.img)`
  width: 100%;
  height: 160px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 12px;
  background: #f8fafc;
`;

const ImageInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`;

const ImageName = styled(Text)`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #334155;
  font-weight: 500;
`;

const ImageSize = styled(Text)`
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ImageActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const ConvertedBadge = styled(motion.span)`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #10b981;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QualityControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 12px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ConvertButton = styled(Button)`
  && {
    background-color: #4f46e5;
    border-color: #4f46e5;
    color: white;
    font-weight: 500;
    height: 48px;
    font-size: 16px;
    flex: 1;

    &:hover {
      background-color: #4338ca;
      border-color: #4338ca;
    }

    &:disabled {
      background-color: #c7d2fe;
      border-color: #c7d2fe;
    }
  }
`;

const DownloadButton = styled(Button)`
  && {
    background-color: #10b981;
    border-color: #10b981;
    color: white;
    font-weight: 500;
    height: 48px;
    font-size: 16px;
    flex: 1;

    &:hover {
      background-color: #059669;
      border-color: #059669;
    }

    &:disabled {
      background-color: #a7f3d0;
      border-color: #a7f3d0;
    }
  }
`;

const EmptyState = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

type ImageFile = {
  id: string;
  file: File;
  preview: string;
  converted?: string;
  format?: string;
  originalSize?: number;
  convertedSize?: number;
  progress?: number;
};

type ImageFormat = "webp" | "png" | "jpeg" | "jpg";

export default function ImageConverter() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>("webp");
  const [quality, setQuality] = useState<number>(90);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const showNotification = (
    type: "success" | "error",
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
      icon:
        type === "success" ? (
          <CheckCircle color="#10b981" size={20} />
        ) : (
          <AlertCircle color="#ef4444" size={20} />
        ),
      placement: "topRight",
    });
  };

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).slice(0, 10); // Limit to 10 files

    const newImages = newFiles
      .filter((file) => file.type?.startsWith("image/"))
      .map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
        originalSize: file.size,
        progress: 0,
      }));

    setImages((prev) => [...prev, ...newImages].slice(0, 10)); // Ensure max 10 files

    if (newFiles.length > 10) {
      showNotification(
        "error",
        "Limit Reached",
        "Maximum 10 images can be converted at once"
      );
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const convertAllImages = async () => {
    if (images.length === 0) return;

    setIsConverting(true);

    try {
      await Promise.all(
        images.map(async (img) => {
          if (img.converted) return; // Skip already converted

          try {
            const converted = await convertSingleImage(
              img.file,
              selectedFormat,
              quality
            );

            // Calculate converted size
            const byteString = atob(converted.split(",")[1]);
            const convertedSize = byteString.length;

            setImages((prev) =>
              prev.map((i) =>
                i.id === img.id
                  ? {
                      ...i,
                      converted,
                      format: selectedFormat,
                      convertedSize,
                    }
                  : i
              )
            );
          } catch (err) {
            console.error(`Failed to convert ${img.file.name}:`, err);
          }
        })
      );

      showNotification(
        "success",
        "Conversion Complete",
        `All images converted to ${selectedFormat.toUpperCase()}`
      );
    } catch (err) {
      console.error("Batch conversion error:", err);
      showNotification(
        "error",
        "Conversion Failed",
        "Some images failed to convert"
      );
    } finally {
      setIsConverting(false);
    }
  };

  const convertSingleImage = async (
    file: File,
    format: ImageFormat,
    quality: number
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        let mimeType: string;
        switch (format) {
          case "webp":
            mimeType = "image/webp";
            break;
          case "png":
            mimeType = "image/png";
            break;
          case "jpeg":
          case "jpg":
            mimeType = "image/jpeg";
            break;
          default:
            mimeType = "image/png";
        }

        const qualityValue = format === "png" ? quality / 100 : quality / 100;
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Conversion failed - empty result"));
              return;
            }
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error("Failed to read blob"));
            reader.readAsDataURL(blob);
          },
          mimeType,
          qualityValue
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(file);
    });
  };

  const downloadImage = (image: ImageFile) => {
    if (!image.converted) return;

    const link = document.createElement("a");
    link.href = image.converted;
    link.download = `${image.file.name.split(".")[0]}.${image.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    showNotification("success", "Removed", "Image removed from the list");
  };

  const downloadAll = () => {
    images.forEach((img) => {
      if (img.converted) {
        const link = document.createElement("a");
        link.href = img.converted;
        link.download = `${img.file.name.split(".")[0]}.${img.format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
    showNotification(
      "success",
      "Download Started",
      "All converted images are being downloaded"
    );
  };

  // Clean up object URLs
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  return (
    <Layout>
    <Container>
      {contextHolder}
      <MainContent>
        <LeftPanel
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title level={4} style={{ color: "#4f46e5", marginBottom: 24 }}>
            <ImageIcon
              size={20}
              style={{ marginRight: 12, verticalAlign: "middle" }}
            />
            Upload & Convert
          </Title>

          <input
            type="file"
            id="file-upload"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileInput}
            multiple
          />

          <DropZone
            ref={dropZoneRef}
            isdragging={isDragging.toString()}
            onDragEnter={handleDragEvents}
            onDragOver={handleDragEvents}
            onDragLeave={handleDragEvents}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
            whileHover={{ scale: 1.01 }}
          >
            <UploadIconWrapper>
              <Upload size={48} />
            </UploadIconWrapper>
            <Title level={5} style={{ color: "#4f46e5", marginBottom: 8 }}>
              Drag & Drop your images here
            </Title>
            <Text style={{ color: "#64748b", fontSize: 14 }}>
              or click to browse files (Max 10 images)
            </Text>
            <HintText
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronsDown size={16} />
              <span>Supports JPG, PNG, WebP formats</span>
            </HintText>
          </DropZone>

          {images.length > 0 && (
            <>
              <QualityControl>
                <div>
                  <Text
                    strong
                    style={{
                      color: "#4f46e5",
                      display: "block",
                      marginBottom: 12,
                    }}
                  >
                    Output Format
                  </Text>
                  <Select
                    value={selectedFormat}
                    onChange={setSelectedFormat}
                    style={{ width: "100%" }}
                    size="large"
                    disabled={isConverting}
                  >
                    <Option value="webp">WebP (Recommended)</Option>
                    <Option value="png">PNG (Lossless)</Option>
                    <Option value="jpeg">JPEG (Compatible)</Option>
                  </Select>
                </div>

                <div style={{ marginTop: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text strong style={{ color: "#4f46e5" }}>
                      Quality: {quality}%
                    </Text>
                    <Tooltip title="Higher quality means larger file size">
                      <Info size={16} color="#64748b" />
                    </Tooltip>
                  </div>
                  <Slider
                    min={10}
                    max={100}
                    step={5}
                    value={quality}
                    onChange={setQuality}
                    disabled={isConverting}
                    trackStyle={{ backgroundColor: "#4f46e5" }}
                    handleStyle={{
                      borderColor: "#4f46e5",
                      boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.2)",
                    }}
                  />
                </div>
              </QualityControl>

              <ActionButtons>
                <ConvertButton
                  onClick={convertAllImages}
                  disabled={isConverting}
                  loading={isConverting}
                  icon={<ImageIcon size={18} />}
                >
                  Convert All
                </ConvertButton>

                <DownloadButton
                  onClick={downloadAll}
                  disabled={
                    !images.some((img) => img.converted) || isConverting
                  }
                  icon={<Download size={18} />}
                >
                  Download All
                </DownloadButton>
              </ActionButtons>
            </>
          )}
        </LeftPanel>

        <RightPanel
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title level={4} style={{ color: "#4f46e5", marginBottom: 24 }}>
            <ImageIcon
              size={20}
              style={{ marginRight: 12, verticalAlign: "middle" }}
            />
            Image Gallery ({images.length})
          </Title>

          {images.length === 0 ? (
            <EmptyState
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ImageIcon
                size={48}
                color="#d1d5db"
                style={{ marginBottom: 16 }}
              />
              <Text type="secondary" style={{ fontSize: 14 }}>
                No images uploaded yet. Drag & drop or click to upload.
              </Text>
            </EmptyState>
          ) : (
            <ImageGrid layout transition={{ staggerChildren: 0.1 }}>
              <AnimatePresence>
                {images.map((img) => (
                  <ImageCard
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {img.converted && (
                      <ConvertedBadge
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        {img.format?.toUpperCase()}
                      </ConvertedBadge>
                    )}
                    <ImagePreview
                      src={img.preview}
                      alt="Preview"
                      whileHover={{ scale: 1.03 }}
                    />
                    <ImageInfo>
                      <ImageName>{img.file.name}</ImageName>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <ImageSize>
                          <span>Original:</span>
                          <strong>
                            {formatFileSize(img.originalSize || 0)}
                          </strong>
                        </ImageSize>
                        {img.convertedSize && (
                          <ImageSize>
                            <span>Converted:</span>
                            <strong
                              style={{
                                color:
                                  img.convertedSize < (img.originalSize || 0)
                                    ? "#10b981"
                                    : "#ef4444",
                              }}
                            >
                              {formatFileSize(img.convertedSize)}
                            </strong>
                          </ImageSize>
                        )}
                      </div>
                    </ImageInfo>

                    {img.progress && img.progress < 100 ? (
                      <Progress percent={img.progress} size="small" />
                    ) : (
                      <ImageActions>
                        <Button
                          size="middle"
                          icon={<Trash2 size={16} />}
                          onClick={() => removeImage(img.id)}
                          danger
                          style={{ fontWeight: 500 }}
                        />
                        <Button
                          type="primary"
                          size="middle"
                          icon={<Download size={16} />}
                          onClick={() => downloadImage(img)}
                          disabled={!img.converted}
                          style={{
                            background: "#10b981",
                            borderColor: "#10b981",
                            fontWeight: 500,
                          }}
                        />
                      </ImageActions>
                    )}
                  </ImageCard>
                ))}
              </AnimatePresence>
            </ImageGrid>
          )}
        </RightPanel>
      </MainContent>
    </Container></Layout>
  );
}
