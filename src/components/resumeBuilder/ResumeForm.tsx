"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Tabs,
  Space,
  Typography,
  Collapse,
  Divider,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UserOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { ResumeData } from "../lib/ResumeTypes";

const { TextArea } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

interface ResumeFormProps {
  resumeData: ResumeData;
  updateResume: (data: Partial<ResumeData>) => void;
}

export function ResumeForm({ resumeData, updateResume }: ResumeFormProps) {
  const [activeTab, setActiveTab] = useState("personal");

  const handlePersonalInfoChange = (field: string, value: string) => {
    updateResume({
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const handleSummaryChange = (value: string) => {
    updateResume({ summary: value });
  };

  const handleObjectiveChange = (value: string) => {
    updateResume({ objective: value });
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    updateResume({ experience: updatedExperience });
  };

  const addExperience = () => {
    updateResume({
      experience: [
        ...resumeData.experience,
        {
          company: "New Company",
          title: "Job Title",
          period: "Start - End",
          responsibilities: ["Responsibility 1"],
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    updateResume({ experience: updatedExperience });
  };

  const addResponsibility = (expIndex: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].responsibilities.push("New responsibility");
    updateResume({ experience: updatedExperience });
  };

  const updateResponsibility = (
    expIndex: number,
    respIndex: number,
    value: string
  ) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].responsibilities[respIndex] = value;
    updateResume({ experience: updatedExperience });
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].responsibilities.splice(respIndex, 1);
    updateResume({ experience: updatedExperience });
  };

  const handleEducationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    updateResume({ education: updatedEducation });
  };

  const addEducation = () => {
    updateResume({
      education: [
        ...resumeData.education,
        {
          degree: "Degree Name",
          institution: "Institution Name",
          period: "Start - End",
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    updateResume({ education: updatedEducation });
  };

  const handleSkillsChange = (skills: string) => {
    updateResume({ skills: skills.split(",").map((skill) => skill.trim()) });
  };

  const handleAwardChange = (index: number, field: string, value: string) => {
    const updatedAwards = [...resumeData.awards];
    updatedAwards[index] = {
      ...updatedAwards[index],
      [field]: value,
    };
    updateResume({ awards: updatedAwards });
  };

  const addAward = () => {
    updateResume({
      awards: [
        ...resumeData.awards,
        {
          title: "Award Title",
          issuer: "Issuer",
          date: "Date",
          description: "",
        },
      ],
    });
  };

  const removeAward = (index: number) => {
    const updatedAwards = [...resumeData.awards];
    updatedAwards.splice(index, 1);
    updateResume({ awards: updatedAwards });
  };

  const handleVolunteeringChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedVolunteering = [...resumeData.volunteering];
    updatedVolunteering[index] = {
      ...updatedVolunteering[index],
      [field]: value,
    };
    updateResume({ volunteering: updatedVolunteering });
  };

  const addVolunteering = () => {
    updateResume({
      volunteering: [
        ...resumeData.volunteering,
        {
          organization: "Organization Name",
          role: "Your Role",
          period: "Start - End",
          description: "",
        },
      ],
    });
  };

  const removeVolunteering = (index: number) => {
    const updatedVolunteering = [...resumeData.volunteering];
    updatedVolunteering.splice(index, 1);
    updateResume({ volunteering: updatedVolunteering });
  };

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane
          tab={
            <span>
              <UserOutlined />
              Personal
            </span>
          }
          key="personal"
        >
          <Form layout="vertical">
            <Form.Item label="Full Name">
              <Input
                value={resumeData.personalInfo.name}
                onChange={(e) =>
                  handlePersonalInfoChange("name", e.target.value)
                }
                placeholder="John Doe"
              />
            </Form.Item>

            <Form.Item label="Professional Title">
              <Input
                value={resumeData.personalInfo.title}
                onChange={(e) =>
                  handlePersonalInfoChange("title", e.target.value)
                }
                placeholder="Frontend Developer"
              />
            </Form.Item>

            <Form.Item label="Email">
              <Input
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) =>
                  handlePersonalInfoChange("email", e.target.value)
                }
                placeholder="john@example.com"
              />
            </Form.Item>

            <Form.Item label="Phone">
              <Input
                value={resumeData.personalInfo.phone}
                onChange={(e) =>
                  handlePersonalInfoChange("phone", e.target.value)
                }
                placeholder="+1 234 567 890"
              />
            </Form.Item>

            <Form.Item label="Location">
              <Input
                value={resumeData.personalInfo.location}
                onChange={(e) =>
                  handlePersonalInfoChange("location", e.target.value)
                }
                placeholder="New York, USA"
              />
            </Form.Item>

            <Form.Item label="Website">
              <Input
                value={resumeData.personalInfo.website}
                onChange={(e) =>
                  handlePersonalInfoChange("website", e.target.value)
                }
                placeholder="https://example.com"
              />
            </Form.Item>

            <Form.Item label="GitHub">
              <Input
                value={resumeData.personalInfo.github}
                onChange={(e) =>
                  handlePersonalInfoChange("github", e.target.value)
                }
                placeholder="https://github.com/yourprofile"
              />
            </Form.Item>

            <Form.Item label="Twitter">
              <Input
                value={resumeData.personalInfo.twitter}
                onChange={(e) =>
                  handlePersonalInfoChange("twitter", e.target.value)
                }
                placeholder="https://twitter.com/yourhandle"
              />
            </Form.Item>

            <Form.Item label="LinkedIn">
              <Input
                value={resumeData.personalInfo.linkedin}
                onChange={(e) =>
                  handlePersonalInfoChange("linkedin", e.target.value)
                }
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </Form.Item>

            <Form.Item label="Professional Summary">
              <TextArea
                rows={4}
                value={resumeData.summary}
                onChange={(e) => handleSummaryChange(e.target.value)}
                placeholder="Brief overview of your professional background and strengths"
              />
            </Form.Item>

            <Form.Item label="Career Objective">
              <TextArea
                rows={3}
                value={resumeData.objective}
                onChange={(e) => handleObjectiveChange(e.target.value)}
                placeholder="Your career goals and aspirations"
              />
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane
          tab={
            <span>
              {/* <BriefcaseOutlined /> */}
              Experience
            </span>
          }
          key="experience"
        >
          <Title level={5}>Work Experience</Title>
          <Collapse accordion>
            {resumeData.experience.map((exp, index) => (
              <Panel
                header={`${exp.company} - ${exp.title}`}
                key={`exp-${index}`}
              >
                <Form layout="vertical">
                  <Form.Item label="Company">
                    <Input
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(index, "company", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Job Title">
                    <Input
                      value={exp.title}
                      onChange={(e) =>
                        handleExperienceChange(index, "title", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Period">
                    <Input
                      value={exp.period}
                      onChange={(e) =>
                        handleExperienceChange(index, "period", e.target.value)
                      }
                      placeholder="e.g., Jan 2020 - Present"
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <span>Responsibilities</span>
                        <Button
                          type="link"
                          onClick={(e) => {
                            e.stopPropagation();
                            addResponsibility(index);
                          }}
                          icon={<PlusOutlined />}
                          size="small"
                        >
                          Add
                        </Button>
                      </div>
                    }
                  >
                    <Space direction="vertical" style={{ width: "100%" }}>
                      {exp.responsibilities.map((resp, respIndex) => (
                        <div
                          key={respIndex}
                          style={{ display: "flex", gap: 8 }}
                        >
                          <Input
                            value={resp}
                            onChange={(e) =>
                              updateResponsibility(
                                index,
                                respIndex,
                                e.target.value
                              )
                            }
                            style={{ flex: 1 }}
                          />
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() =>
                              removeResponsibility(index, respIndex)
                            }
                          />
                        </div>
                      ))}
                    </Space>
                  </Form.Item>

                  <Button
                    danger
                    onClick={() => removeExperience(index)}
                    style={{ marginTop: 16 }}
                  >
                    Remove Job
                  </Button>
                </Form>
              </Panel>
            ))}
          </Collapse>

          <Button
            type="dashed"
            onClick={addExperience}
            style={{ width: "100%", marginTop: 16 }}
            icon={<PlusOutlined />}
          >
            Add Work Experience
          </Button>

          <Divider />

          <Title level={5}>Education</Title>
          <Collapse accordion>
            {resumeData.education.map((edu, index) => (
              <Panel
                header={`${edu.degree} - ${edu.institution}`}
                key={`edu-${index}`}
              >
                <Form layout="vertical">
                  <Form.Item label="Degree">
                    <Input
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Institution">
                    <Input
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Period">
                    <Input
                      value={edu.period}
                      onChange={(e) =>
                        handleEducationChange(index, "period", e.target.value)
                      }
                      placeholder="e.g., 2016 - 2020"
                    />
                  </Form.Item>

                  <Button
                    danger
                    onClick={() => removeEducation(index)}
                    style={{ marginTop: 16 }}
                  >
                    Remove Education
                  </Button>
                </Form>
              </Panel>
            ))}
          </Collapse>

          <Button
            type="dashed"
            onClick={addEducation}
            style={{ width: "100%", marginTop: 16 }}
            icon={<PlusOutlined />}
          >
            Add Education
          </Button>
        </TabPane>

        <TabPane
          tab={
            <span>
              <TrophyOutlined />
              Additional
            </span>
          }
          key="additional"
        >
          <Form layout="vertical">
            <Form.Item label="Skills (comma separated)">
              <TextArea
                rows={3}
                value={resumeData.skills.join(", ")}
                onChange={(e) => handleSkillsChange(e.target.value)}
                placeholder="JavaScript, React, CSS, HTML, etc."
              />
            </Form.Item>
          </Form>

          <Divider />

          <Title level={5}>Awards & Certifications</Title>
          <Collapse accordion>
            {resumeData.awards.map((award, index) => (
              <Panel header={award.title} key={`award-${index}`}>
                <Form layout="vertical">
                  <Form.Item label="Award Title">
                    <Input
                      value={award.title}
                      onChange={(e) =>
                        handleAwardChange(index, "title", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Issuer">
                    <Input
                      value={award.issuer}
                      onChange={(e) =>
                        handleAwardChange(index, "issuer", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Date">
                    <Input
                      value={award.date}
                      onChange={(e) =>
                        handleAwardChange(index, "date", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Description (optional)">
                    <TextArea
                      rows={2}
                      value={award.description}
                      onChange={(e) =>
                        handleAwardChange(index, "description", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Button
                    danger
                    onClick={() => removeAward(index)}
                    style={{ marginTop: 16 }}
                  >
                    Remove Award
                  </Button>
                </Form>
              </Panel>
            ))}
          </Collapse>

          <Button
            type="dashed"
            onClick={addAward}
            style={{ width: "100%", marginTop: 16, marginBottom: 24 }}
            icon={<PlusOutlined />}
          >
            Add Award
          </Button>

          <Divider />
        </TabPane>
      </Tabs>
    </div>
  );
}
