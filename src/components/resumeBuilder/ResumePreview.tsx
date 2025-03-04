import { Typography, Space, Tag } from "antd";
import { ResumeData } from "../lib/ResumeTypes";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";

const { Title, Text, Paragraph } = Typography;

export function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        color: "#333",
        padding: "24px",
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Title level={2} style={{ color: "#2c3e50" }}>
          {data.personalInfo.name}
        </Title>
        <Title level={4} style={{ color: "#2980b9" }}>
          {data.personalInfo.title}
        </Title>
        <Space wrap size={16} style={{ color: "#555", fontSize: 14 }}>
          {data.personalInfo.phone && (
            <Text style={{ color: "#16a085" }}>
              <Phone size={14} style={{ marginRight: 4 }} />{" "}
              {data.personalInfo.phone}
            </Text>
          )}
          {data.personalInfo.email && (
            <Text style={{ color: "#e74c3c" }}>
              <Mail size={14} style={{ marginRight: 4 }} />{" "}
              {data.personalInfo.email}
            </Text>
          )}
          {data.personalInfo.location && (
            <Text style={{ color: "#f39c12" }}>
              <MapPin size={14} style={{ marginRight: 4 }} />{" "}
              {data.personalInfo.location}
            </Text>
          )}
          {data.personalInfo.website && (
            <Text style={{ color: "#8e44ad" }}>
              <Globe size={14} style={{ marginRight: 4 }} />{" "}
              {data.personalInfo.website}
            </Text>
          )}
        </Space>
        {/* Social Media Links */}
        <Space wrap size={16} style={{ marginTop: 12 }}>
          {data.personalInfo.linkedin && (
            <a
              href={data.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={24} color="#0a66c2" style={{ margin: "0 8px" }} />
            </a>
          )}
          {data.personalInfo.github && (
            <a
              href={data.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={24} color="#333" style={{ margin: "0 8px" }} />
            </a>
          )}
          {data.personalInfo.twitter && (
            <a
              href={data.personalInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={24} color="#1da1f2" style={{ margin: "0 8px" }} />
            </a>
          )}
        </Space>
      </div>

      {/* Summary Section */}
      {data.summary && (
        <div
          style={{
            marginBottom: 24,
            backgroundColor: "#ffffff",
            padding: "12px",
            borderRadius: "6px",
          }}
        >
          <Paragraph>{data.summary}</Paragraph>
        </div>
      )}

      {/* Two Column Layout */}
      <div style={{ display: "flex", flexDirection: "row", gap: 32 }}>
        {/* Main Content Column */}
        <div style={{ flex: 2 }}>
          {/* Experience Section */}
          {data.experience.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Title
                level={4}
                style={{
                  borderBottom: "2px solid #ddd",
                  paddingBottom: 8,
                  color: "#e67e22",
                }}
              >
                Experience
              </Title>
              <Space direction="vertical" size={24} style={{ width: "100%" }}>
                {data.experience.map((job, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "12px",
                      borderRadius: "6px",
                    }}
                  >
                    <Text strong style={{ color: "#222" }}>
                      {job.company}
                    </Text>
                    <Text
                      type="secondary"
                      style={{ fontSize: 14, float: "right" }}
                    >
                      {job.period}
                    </Text>
                    <Text
                      italic
                      style={{
                        display: "block",
                        marginBottom: 8,
                        color: "#666",
                      }}
                    >
                      {job.title}
                    </Text>
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {job.responsibilities.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            marginBottom: 4,
                            fontSize: 14,
                            color: "#333",
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Space>
            </div>
          )}

          {data.awards.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Title
                level={4}
                style={{
                  borderBottom: "2px solid #ddd",
                  paddingBottom: 8,
                  color: "orange",
                }}
              >
                Awards
              </Title>
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                {data.awards.map((award, index) => (
                  <div key={index}>
                    <Text strong style={{ display: "block", fontSize: 14 }}>
                      {award.title}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {award.issuer} - {award.date}
                    </Text>
                    {award.description && (
                      <Paragraph style={{ fontSize: 12, marginTop: 4 }}>
                        {award.description}
                      </Paragraph>
                    )}
                  </div>
                ))}
              </Space>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div style={{ flex: 1 }}>
          {/* Skills Section */}
          {data.skills.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Title
                level={4}
                style={{
                  borderBottom: "2px solid #ddd",
                  paddingBottom: 8,
                  color: "#27ae60",
                }}
              >
                Skills
              </Title>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {data.skills.map((skill, index) => (
                  <Tag
                    key={index}
                    color="geekblue"
                    style={{ fontSize: "14px", padding: "6px" }}
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Title
                level={4}
                style={{
                  borderBottom: "2px solid #ddd",
                  paddingBottom: 8,
                  color: "#e67e22",
                }}
              >
                Education
              </Title>
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text strong>{edu.degree}</Text>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        {edu.period}
                      </Text>
                    </div>
                    <Text>{edu.institution}</Text>
                  </div>
                ))}
              </Space>
            </div>
          )}

          {data.objective && (
            <div style={{ marginBottom: 24 }}>
              <Title
                level={4}
                style={{
                  borderBottom: "2px solid #ddd",
                  paddingBottom: 8,
                  color: "purple",
                }}
              >
                Objective
              </Title>
              <Paragraph style={{ fontSize: 14 }}>{data.objective}</Paragraph>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
