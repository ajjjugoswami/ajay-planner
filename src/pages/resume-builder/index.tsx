"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Typography, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { initialResumeData } from "@/components/lib/ResumeInitialData";
import { ResumeData } from "@/components/lib/ResumeTypes";
import { ResumeForm } from "@/components/resumeBuilder/ResumeForm";
import { ResumePreview } from "@/components/resumeBuilder/ResumePreview";
import { Layout } from "@/components/Layout";

const { Title } = Typography;

const PageContainer = styled(Layout)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const GlobalStyles = styled.div`
  *::-webkit-scrollbar-track {
    background: #00003e;
  }

  *::-webkit-scrollbar {
    width: 6px;
  }

  *::-webkit-scrollbar-button,
  *::-webkit-scrollbar-thumb {
    background-color: #5732c6;
  }
`;

const Header = styled.div`
  background: #fff;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;
  background: #f5f5f5;
  padding: 24px;
`;

const ScrollableContainer = styled.div`
  max-width: 100%;
  height: 90vh;
  overflow-y: auto;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const Sidebar = styled(ScrollableContainer)`
  min-width: 450px;
  box-shadow: -1px 0 3px rgba(0, 0, 0, 0.1);
`;

export default function ResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("resumeData");
      return storedData ? JSON.parse(storedData) : initialResumeData;
    }
    return initialResumeData;
  });

  // Save data to localStorage on change
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const handleUpdateResume = (newData: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...newData }));
  };

  const handleExportPDF = async () => {
    const resumeElement = document.getElementById("resume-preview");
    if (!resumeElement) return;

    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <GlobalStyles>
      <PageContainer>
        <Header>
          <Title level={3} style={{ margin: 0 }}>
            Resume Builder
          </Title>
          <Space>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleExportPDF}
            >
              Export PDF
            </Button>
          </Space>
        </Header>
        <ContentWrapper>
          <ScrollableContainer>
            <div id="resume-preview">
              <ResumePreview data={resumeData} />
            </div>
          </ScrollableContainer>
          <Sidebar>
            <ResumeForm
              resumeData={resumeData}
              updateResume={handleUpdateResume}
            />
          </Sidebar>
        </ContentWrapper>
      </PageContainer>
    </GlobalStyles>
  );
}
