"use client"

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase, GraduationCap, Code, FolderOpen, Plus, Trash2, GripVertical } from 'lucide-react'

interface ResumeBuilderProps {
  data: any
  onChange: (data: any) => void
}

export function ResumeBuilder({ data, onChange }: ResumeBuilderProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [sections, setSections] = useState([
    'personalInfo',
    'summary',
    'experience',
    'education',
    'skills',
    'projects'
  ])

  const sectionIcons = {
    personalInfo: User,
    summary: User,
    experience: Briefcase,
    education: GraduationCap,
    skills: Code,
    projects: FolderOpen
  }

  const sectionTitles = {
    personalInfo: 'Personal Information',
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects'
  }

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedItem(sectionId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    if (!draggedItem) return

    const draggedIndex = sections.indexOf(draggedItem)
    const newSections = [...sections]
    newSections.splice(draggedIndex, 1)
    newSections.splice(targetIndex, 0, draggedItem)
    
    setSections(newSections)
    setDraggedItem(null)
  }

  const renderSectionContent = (sectionId: string) => {
    const Icon = sectionIcons[sectionId as keyof typeof sectionIcons]
    
    switch (sectionId) {
      case 'personalInfo':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{data.personalInfo.name || 'Your Name'}</h3>
            <p className="text-sm text-gray-600">{data.personalInfo.email || 'email@example.com'}</p>
            <p className="text-sm text-gray-600">{data.personalInfo.phone || '+1 (555) 123-4567'}</p>
            <p className="text-sm text-gray-600">{data.personalInfo.location || 'City, State'}</p>
          </div>
        )
      
      case 'summary':
        return (
          <div>
            <p className="text-sm text-gray-700">
              {data.personalInfo.summary || 'Professional summary will appear here...'}
            </p>
          </div>
        )
      
      case 'experience':
        return (
          <div className="space-y-4">
            {data.experience.length > 0 ? (
              data.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4">
                  <h4 className="font-medium">{exp.title}</h4>
                  <p className="text-sm text-gray-600">{exp.company} • {exp.duration}</p>
                  <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No work experience added yet</p>
            )}
          </div>
        )
      
      case 'education':
        return (
          <div className="space-y-4">
            {data.education.length > 0 ? (
              data.education.map((edu: any, index: number) => (
                <div key={index}>
                  <h4 className="font-medium">{edu.degree}</h4>
                  <p className="text-sm text-gray-600">{edu.school} • {edu.year}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No education added yet</p>
            )}
          </div>
        )
      
      case 'skills':
        return (
          <div className="flex flex-wrap gap-2">
            {data.skills.length > 0 ? (
              data.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))
            ) : (
              <p className="text-sm text-gray-500">No skills added yet</p>
            )}
          </div>
        )
      
      case 'projects':
        return (
          <div className="space-y-4">
            {data.projects.length > 0 ? (
              data.projects.map((project: any, index: number) => (
                <div key={index}>
                  <h4 className="font-medium">{project.name}</h4>
                  <p className="text-sm text-gray-700">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.split(',').map((tech: string, techIndex: number) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No projects added yet</p>
            )}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-[600px] bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 min-h-[800px]">
          <div className="space-y-6">
            {sections.map((sectionId, index) => {
              const Icon = sectionIcons[sectionId as keyof typeof sectionIcons]
              const title = sectionTitles[sectionId as keyof typeof sectionTitles]
              
              return (
                <div
                  key={sectionId}
                  draggable
                  onDragStart={(e) => handleDragStart(e, sectionId)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="group relative border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-move"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                      <Icon className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">{title}</h3>
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    {renderSectionContent(sectionId)}
                  </div>
                  
                  {index < sections.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Drag and drop sections to reorder your resume layout
          </p>
        </div>
      </div>
    </div>
  )
}
