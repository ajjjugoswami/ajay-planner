import { Typography, Space, Tag } from "antd"
import { ResumeData } from "../lib/ResumeTypes"
 
const { Title, Text, Paragraph } = Typography

export function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif", color: "rgba(0, 0, 0, 0.85)",padding:"24px" }}>
      {/* Header Section */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 4 }}>
          {data.personalInfo.name}
        </Title>
        <Title level={4} style={{ marginTop: 0, marginBottom: 12, fontWeight: "normal" }}>
          {data.personalInfo.title}
        </Title>
        <Space wrap size={16} style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: 14 }}>
          {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
          {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
          {data.personalInfo.location && <Text>{data.personalInfo.location}</Text>}
          {data.personalInfo.website && <Text>{data.personalInfo.website}</Text>}
        </Space>
      </div>

      {/* Summary Section */}
      {data.summary && (
        <div style={{ marginBottom: 24 }}>
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
              <Title level={4} style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 8, marginBottom: 16 }}>
                Experience
              </Title>
              <Space direction="vertical" size={24} style={{ width: "100%" }}>
                {data.experience.map((job, index) => (
                  <div key={index}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Text strong>{job.company}</Text>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        {job.period}
                      </Text>
                    </div>
                    <Text italic style={{ display: "block", marginBottom: 8 }}>
                      {job.title}
                    </Text>
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {job.responsibilities.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: 4, fontSize: 14 }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Space>
            </div>
          )}

          {/* Education Section */}
          {data.education.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Title level={4} style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 8, marginBottom: 16 }}>
                Education
              </Title>
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        </div>

        {/* Sidebar Column */}
        <div style={{ flex: 1 }}>
          {/* Objective Section */}
          {data.objective && (
            <div style={{ marginBottom: 24 }}>
              <Title level={4} style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 8, marginBottom: 16 }}>
                Objective
              </Title>
              <Paragraph style={{ fontSize: 14 }}>{data.objective}</Paragraph>
            </div>
          )}

          {/* Skills Section */}
          {data.skills.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Title level={4} style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 8, marginBottom: 16 }}>
                Skills
              </Title>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {data.skills.map((skill, index) => (
                  <Tag key={index} style={{ marginBottom: 8 }}>
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {/* Awards Section */}
          {data.awards.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Title level={4} style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 8, marginBottom: 16 }}>
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
                      <Paragraph style={{ fontSize: 12, marginTop: 4 }}>{award.description}</Paragraph>
                    )}
                  </div>
                ))}
              </Space>
            </div>
          )}

          {/* Volunteering Section */}
          {data.volunteering.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Title level={4} style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 8, marginBottom: 16 }}>
                Volunteering
              </Title>
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                {data.volunteering.map((vol, index) => (
                  <div key={index}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Text strong style={{ fontSize: 14 }}>
                        {vol.organization}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {vol.period}
                      </Text>
                    </div>
                    <Text italic style={{ display: "block", fontSize: 12 }}>
                      {vol.role}
                    </Text>
                    {vol.description && <Paragraph style={{ fontSize: 12, marginTop: 4 }}>{vol.description}</Paragraph>}
                  </div>
                ))}
              </Space>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

