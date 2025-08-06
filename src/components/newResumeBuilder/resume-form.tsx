"use client"

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Trash2, Upload, User } from 'lucide-react'

interface ResumeFormProps {
  data: any
  onChange: (data: any) => void
}

export function ResumeForm({ data, onChange }: ResumeFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        updatePersonalInfo('profileImage', imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { title: '', company: '', duration: '', description: '' }
      ]
    })
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...data.experience]
    newExperience[index] = { ...newExperience[index], [field]: value }
    onChange({ ...data, experience: newExperience })
  }

  const removeExperience = (index: number) => {
    onChange({
      ...data,
      experience: data.experience.filter((_: any, i: number) => i !== index)
    })
  }

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { degree: '', school: '', year: '' }
      ]
    })
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...data.education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    onChange({ ...data, education: newEducation })
  }

  const removeEducation = (index: number) => {
    onChange({
      ...data,
      education: data.education.filter((_: any, i: number) => i !== index)
    })
  }

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        { name: '', description: '', technologies: '' }
      ]
    })
  }

  const updateProject = (index: number, field: string, value: string) => {
    const newProjects = [...data.projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    onChange({ ...data, projects: newProjects })
  }

  const removeProject = (index: number) => {
    onChange({
      ...data,
      projects: data.projects.filter((_: any, i: number) => i !== index)
    })
  }

  const updateSkills = (value: string) => {
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill)
    onChange({ ...data, skills: skillsArray })
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Profile Image Upload */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
              <AvatarFallback>
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="mb-2"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-xs text-gray-500">
                Recommended: Square image, max 2MB
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={data.personalInfo.name}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                placeholder="City, State"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={data.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              placeholder="Brief professional summary..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Work Experience</CardTitle>
            <Button onClick={addExperience} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="space-y-3 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Experience {index + 1}</h4>
                <Button
                  onClick={() => removeExperience(index)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label>Job Title</Label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    placeholder="Tech Company Inc."
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input
                    value={exp.duration}
                    onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                    placeholder="Jan 2020 - Present"
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))}
          {data.experience.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No work experience added yet. Click Add Experience to get started.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Education</CardTitle>
            <Button onClick={addEducation} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="space-y-3 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Education {index + 1}</h4>
                <Button
                  onClick={() => removeEducation(index)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                <div>
                  <Label>School</Label>
                  <Input
                    value={edu.school}
                    onChange={(e) => updateEducation(index, 'school', e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input
                    value={edu.year}
                    onChange={(e) => updateEducation(index, 'year', e.target.value)}
                    placeholder="2020"
                  />
                </div>
              </div>
            </div>
          ))}
          {data.education.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No education added yet. Click Add Education to get started.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Textarea
              id="skills"
              value={data.skills.join(', ')}
              onChange={(e) => updateSkills(e.target.value)}
              placeholder="JavaScript, React, Node.js, Python, SQL"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Projects</CardTitle>
            <Button onClick={addProject} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.projects.map((project: any, index: number) => (
            <div key={index} className="space-y-3 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Project {index + 1}</h4>
                <Button
                  onClick={() => removeProject(index)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Label>Project Name</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  placeholder="My Awesome Project"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  placeholder="Describe your project..."
                  rows={3}
                />
              </div>
              <div>
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={project.technologies}
                  onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
            </div>
          ))}
          {data.projects.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No projects added yet. Click Add Project to get started.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
