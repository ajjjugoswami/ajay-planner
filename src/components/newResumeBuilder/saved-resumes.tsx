"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Download } from 'lucide-react'

interface SavedResumesProps {
  resumes: any[]
  onLoad: (resumeId: number) => void
}

export function SavedResumes({ resumes, onLoad }: SavedResumesProps) {
  if (resumes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Saved Resumes</h3>
        <p className="text-gray-500 text-sm">
          Save your current resume to see it here for future editing.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Your Saved Resumes</h3>
        <p className="text-sm text-gray-600">Load any of your previously saved resumes</p>
      </div>
      
      {resumes.map((resume) => (
        <Card key={resume.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-1">{resume.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Saved {new Date(resume.savedAt).toLocaleDateString()}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {resume.data.template || 'classic'}
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => onLoad(resume.id)} 
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <FileText className="h-4 w-4" />
                  <span>Load</span>
                </Button>
              </div>
            </div>
            
            {/* Resume Preview Info */}
            <div className="text-xs text-gray-500 space-y-1">
              {resume.data.personalInfo.email && (
                <div>Email: {resume.data.personalInfo.email}</div>
              )}
              {resume.data.experience.length > 0 && (
                <div>Experience: {resume.data.experience.length} entries</div>
              )}
              {resume.data.education.length > 0 && (
                <div>Education: {resume.data.education.length} entries</div>
              )}
              {resume.data.skills.length > 0 && (
                <div>Skills: {resume.data.skills.length} skills</div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
