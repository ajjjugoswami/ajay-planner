"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, User, Calendar, Award, Code, Briefcase, Globe, Linkedin } from 'lucide-react'

interface ResumePreviewProps {
  data: any
}

const templateStyles = {
  classic: {
    primary: '#1f2937',
    secondary: '#3b82f6',
    background: '#ffffff',
    text: '#374151',
    accent: '#f3f4f6'
  },
  modern: {
    primary: '#059669',
    secondary: '#10b981',
    background: '#f0fdf4',
    text: '#065f46',
    accent: '#d1fae5'
  },
  creative: {
    primary: '#7c3aed',
    secondary: '#a855f7',
    background: '#faf5ff',
    text: '#581c87',
    accent: '#e9d5ff'
  },
  minimal: {
    primary: '#374151',
    secondary: '#6b7280',
    background: '#f9fafb',
    text: '#111827',
    accent: '#f3f4f6'
  },
  professional: {
    primary: '#1e40af',
    secondary: '#3b82f6',
    background: '#eff6ff',
    text: '#1e3a8a',
    accent: '#dbeafe'
  },
  colorful: {
    primary: '#dc2626',
    secondary: '#f59e0b',
    background: '#fef3c7',
    text: '#92400e',
    accent: '#fed7aa'
  },
  timeline: {
    primary: '#0f766e',
    secondary: '#14b8a6',
    background: '#f0fdfa',
    text: '#134e4a',
    accent: '#ccfbf1'
  },
  infographic: {
    primary: '#be185d',
    secondary: '#ec4899',
    background: '#fdf2f8',
    text: '#831843',
    accent: '#fce7f3'
  },
  portfolio: {
    primary: '#7c2d12',
    secondary: '#ea580c',
    background: '#fff7ed',
    text: '#9a3412',
    accent: '#fed7aa'
  },
  executive: {
    primary: '#1e1b4b',
    secondary: '#3730a3',
    background: '#eef2ff',
    text: '#312e81',
    accent: '#e0e7ff'
  },
  academic: {
    primary: '#365314',
    secondary: '#65a30d',
    background: '#f7fee7',
    text: '#3f6212',
    accent: '#ecfccb'
  },
  tech: {
    primary: '#1f2937',
    secondary: '#6366f1',
    background: '#f1f5f9',
    text: '#374151',
    accent: '#e2e8f0'
  }
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const template = data.template || 'classic'
  const colors = templateStyles[template as keyof typeof templateStyles]

  // Classic Layout (Single Column)
  const ClassicLayout = () => (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl">
      {/* Header */}
      <div className="p-8 text-center" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
        {data.personalInfo.profileImage && (
          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white">
            <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
            <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
          </Avatar>
        )}
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo.name || 'Your Name'}</h1>
        <div className="flex justify-center items-center space-x-6 text-sm opacity-90">
          {data.personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: colors.primary, borderColor: colors.secondary }}>
              Professional Summary
            </h2>
            <p className="leading-relaxed text-gray-700">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: colors.primary, borderColor: colors.secondary }}>
              Work Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold" style={{ color: colors.primary }}>{exp.title}</h3>
                      <p className="font-medium" style={{ color: colors.secondary }}>{exp.company}</p>
                    </div>
                    <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: colors.accent }}>
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>Education</h2>
              <div className="space-y-4">
                {data.education.map((edu: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p style={{ color: colors.secondary }}>{edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: colors.primary, borderColor: colors.secondary }}>
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: colors.accent }}>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>{project.name}</h3>
                  <p className="text-gray-700 mb-3">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.split(',').map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs rounded border"
                          style={{ borderColor: colors.secondary, color: colors.secondary }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  // Modern Layout (Two Column)
  const ModernLayout = () => (
    <div className="max-w-6xl mx-auto bg-white shadow-2xl flex">
      {/* Left Sidebar */}
      <div className="w-1/3 p-8" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
        {data.personalInfo.profileImage && (
          <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-white">
            <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
            <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
          </Avatar>
        )}
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">{data.personalInfo.name || 'Your Name'}</h1>
          <div className="space-y-2 text-sm opacity-90">
            {data.personalInfo.email && (
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/30">Skills</h2>
            <div className="space-y-2">
              {data.skills.map((skill: string, index: number) => (
                <div key={index} className="bg-white/20 px-3 py-2 rounded text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/30">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu: any, index: number) => (
                <div key={index}>
                  <h3 className="font-semibold text-sm">{edu.degree}</h3>
                  <p className="text-sm opacity-90">{edu.school}</p>
                  <p className="text-xs opacity-75">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div className="w-2/3 p-8">
        {data.personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>Professional Summary</h2>
            <p className="leading-relaxed text-gray-700">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>Work Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="relative pl-6">
                  <div 
                    className="absolute left-0 top-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.secondary }}
                  />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>{exp.title}</h3>
                      <p className="font-medium" style={{ color: colors.secondary }}>{exp.company}</p>
                    </div>
                    <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: colors.accent }}>
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: colors.accent }}>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>{project.name}</h3>
                  <p className="text-gray-700 mb-3">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.split(',').map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs rounded border"
                          style={{ borderColor: colors.secondary, color: colors.secondary }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  // Creative Layout
  const CreativeLayout = () => (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl overflow-hidden">
      {/* Creative Header */}
      <div className="relative">
        <div 
          className="h-48 w-full"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` 
          }}
        />
        <div className="absolute inset-0 flex items-center justify-between px-12">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-2">{data.personalInfo.name || 'Your Name'}</h1>
            <p className="text-xl opacity-90">Creative Professional</p>
          </div>
          {data.personalInfo.profileImage && (
            <Avatar className="w-40 h-40 border-8 border-white shadow-xl">
              <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
              <AvatarFallback><User className="w-20 h-20" /></AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>

      {/* Contact Bar */}
      <div className="px-12 py-6" style={{ backgroundColor: colors.accent }}>
        <div className="flex justify-center space-x-8 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center space-x-2" style={{ color: colors.primary }}>
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center space-x-2" style={{ color: colors.primary }}>
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center space-x-2" style={{ color: colors.primary }}>
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-12 space-y-10">
        {data.personalInfo.summary && (
          <section className="text-center">
            <div 
              className="inline-block px-6 py-2 rounded-full text-white font-semibold mb-4"
              style={{ backgroundColor: colors.secondary }}
            >
              About Me
            </div>
            <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Creative Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience Column */}
          {data.experience.length > 0 && (
            <div className="lg:col-span-2">
              <div 
                className="inline-block px-6 py-2 rounded-full text-white font-semibold mb-6"
                style={{ backgroundColor: colors.primary }}
              >
                Experience
              </div>
              <div className="space-y-6">
                {data.experience.map((exp: any, index: number) => (
                  <div key={index} className="relative">
                    <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: colors.accent }}>
                      <h3 className="text-xl font-bold mb-1" style={{ color: colors.primary }}>
                        {exp.title}
                      </h3>
                      <p className="font-semibold mb-2" style={{ color: colors.secondary }}>
                        {exp.company} • {exp.duration}
                      </p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills & Education Sidebar */}
          <div className="space-y-8">
            {data.skills.length > 0 && (
              <div>
                <div 
                  className="inline-block px-4 py-2 rounded-full text-white font-semibold mb-4"
                  style={{ backgroundColor: colors.secondary }}
                >
                  Skills
                </div>
                <div className="space-y-3">
                  {data.skills.map((skill: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.education.length > 0 && (
              <div>
                <div 
                  className="inline-block px-4 py-2 rounded-full text-white font-semibold mb-4"
                  style={{ backgroundColor: colors.primary }}
                >
                  Education
                </div>
                <div className="space-y-4">
                  {data.education.map((edu: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: colors.accent }}>
                      <h4 className="font-semibold" style={{ color: colors.primary }}>{edu.degree}</h4>
                      <p className="text-sm" style={{ color: colors.secondary }}>{edu.school}</p>
                      <p className="text-xs text-gray-600">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects Showcase */}
        {data.projects.length > 0 && (
          <section>
            <div 
              className="inline-block px-6 py-2 rounded-full text-white font-semibold mb-6"
              style={{ backgroundColor: colors.secondary }}
            >
              Featured Projects
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="group">
                  <div 
                    className="p-6 rounded-xl shadow-lg transition-transform group-hover:scale-105"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                      {project.name}
                    </h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-xs rounded-full text-white"
                            style={{ backgroundColor: colors.secondary }}
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  // Minimal Layout
  const MinimalLayout = () => (
    <div className="max-w-3xl mx-auto bg-white shadow-lg">
      <div className="p-16 space-y-16">
        {/* Minimal Header */}
        <header className="text-center space-y-6">
          {data.personalInfo.profileImage && (
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
              <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
            </Avatar>
          )}
          <div>
            <h1 className="text-4xl font-light mb-4" style={{ color: colors.primary }}>
              {data.personalInfo.name || 'Your Name'}
            </h1>
            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            </div>
          </div>
        </header>

        {data.personalInfo.summary && (
          <section className="text-center">
            <p className="text-lg leading-relaxed text-gray-700 font-light max-w-2xl mx-auto">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-light mb-12 text-center" style={{ color: colors.primary }}>
              Experience
            </h2>
            <div className="space-y-12">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-medium mb-2" style={{ color: colors.primary }}>
                    {exp.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{exp.company} • {exp.duration}</p>
                  <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {data.education.length > 0 && (
            <section className="text-center">
              <h2 className="text-xl font-light mb-8" style={{ color: colors.primary }}>
                Education
              </h2>
              <div className="space-y-6">
                {data.education.map((edu: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-gray-600 text-sm">{edu.school}</p>
                    <p className="text-gray-500 text-xs">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section className="text-center">
              <h2 className="text-xl font-light mb-8" style={{ color: colors.primary }}>
                Skills
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {data.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm border rounded-full"
                    style={{ borderColor: colors.secondary, color: colors.secondary }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-light mb-12 text-center" style={{ color: colors.primary }}>
              Projects
            </h2>
            <div className="space-y-12">
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-medium mb-4" style={{ color: colors.primary }}>
                    {project.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4 max-w-2xl mx-auto">
                    {project.description}
                  </p>
                  {project.technologies && (
                    <div className="flex flex-wrap justify-center gap-2">
                      {project.technologies.split(',').map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs border rounded-full"
                          style={{ borderColor: colors.secondary, color: colors.secondary }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  // Professional Layout
  const ProfessionalLayout = () => (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl">
      {/* Executive Header */}
      <div className="p-8 border-b-4" style={{ borderColor: colors.primary }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {data.personalInfo.profileImage && (
              <Avatar className="w-20 h-20 border-2" style={{ borderColor: colors.primary }}>
                <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
                <AvatarFallback><User className="w-10 h-10" /></AvatarFallback>
              </Avatar>
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                {data.personalInfo.name || 'Your Name'}
              </h1>
              <p className="text-lg text-gray-600">Professional Executive</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-600 space-y-1">
            {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {data.personalInfo.summary && (
          <section>
            <div className="flex items-center mb-4">
              <div 
                className="w-1 h-8 mr-4"
                style={{ backgroundColor: colors.primary }}
              />
              <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                Executive Summary
              </h2>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: colors.accent }}>
              <p className="text-lg leading-relaxed text-gray-700">{data.personalInfo.summary}</p>
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <div className="flex items-center mb-6">
              <div 
                className="w-1 h-8 mr-4"
                style={{ backgroundColor: colors.primary }}
              />
              <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                Professional Experience
              </h2>
            </div>
            <div className="space-y-8">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-4 pl-6" style={{ borderColor: colors.secondary }}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: colors.primary }}>
                        {exp.title}
                      </h3>
                      <p className="text-lg font-semibold" style={{ color: colors.secondary }}>
                        {exp.company}
                      </p>
                    </div>
                    <div 
                      className="px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                    >
                      {exp.duration}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.accent }}>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.education.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div 
                  className="w-1 h-6 mr-4"
                  style={{ backgroundColor: colors.primary }}
                />
                <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
                  Education & Qualifications
                </h2>
              </div>
              <div className="space-y-4">
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="p-4 rounded-lg border-l-4" style={{ backgroundColor: colors.accent, borderColor: colors.secondary }}>
                    <h3 className="font-bold" style={{ color: colors.primary }}>{edu.degree}</h3>
                    <p className="font-semibold" style={{ color: colors.secondary }}>{edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div 
                  className="w-1 h-6 mr-4"
                  style={{ backgroundColor: colors.primary }}
                />
                <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
                  Core Competencies
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {data.skills.map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="p-3 text-center rounded-lg font-medium text-white"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.projects.length > 0 && (
          <section>
            <div className="flex items-center mb-6">
              <div 
                className="w-1 h-8 mr-4"
                style={{ backgroundColor: colors.primary }}
              />
              <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                Key Projects & Achievements
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="border-2 rounded-lg p-6" style={{ borderColor: colors.secondary }}>
                  <h3 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
                    {project.name}
                  </h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(',').map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs rounded-full text-white font-medium"
                          style={{ backgroundColor: colors.primary }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  // Colorful Layout
  const ColorfulLayout = () => (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl overflow-hidden">
      {/* Colorful Header */}
      <div 
        className="p-8 text-white relative overflow-hidden"
        style={{ 
          background: `linear-gradient(45deg, ${colors.primary} 0%, ${colors.secondary} 50%, #f59e0b 100%)` 
        }}
      >
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.personalInfo.name || 'Your Name'}</h1>
            <p className="text-xl opacity-90">Creative Professional</p>
          </div>
          {data.personalInfo.profileImage && (
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
              <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
            </Avatar>
          )}
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
      </div>

      {/* Contact Strip */}
      <div className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
        <div className="flex justify-center space-x-8 text-sm font-medium">
          {data.personalInfo.email && (
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {data.personalInfo.summary && (
          <section className="text-center">
            <div 
              className="inline-block px-8 py-3 rounded-full text-white font-bold text-lg mb-6 shadow-lg"
              style={{ background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})` }}
            >
              About Me
            </div>
            <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <div 
              className="inline-block px-8 py-3 rounded-full text-white font-bold text-xl mb-8 shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              Work Experience
            </div>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="relative">
                  <div 
                    className="p-6 rounded-2xl shadow-lg border-l-8"
                    style={{ 
                      backgroundColor: colors.accent,
                      borderColor: index % 2 === 0 ? colors.primary : colors.secondary
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: colors.primary }}>
                          {exp.title}
                        </h3>
                        <p className="text-lg font-semibold" style={{ color: colors.secondary }}>
                          {exp.company}
                        </p>
                      </div>
                      <div 
                        className="px-4 py-2 rounded-full text-white font-bold shadow-md"
                        style={{ backgroundColor: index % 2 === 0 ? colors.secondary : '#f59e0b' }}
                      >
                        {exp.duration}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.skills.length > 0 && (
            <section>
              <div 
                className="inline-block px-6 py-3 rounded-full text-white font-bold text-lg mb-6 shadow-lg"
                style={{ backgroundColor: colors.secondary }}
              >
                Skills
              </div>
              <div className="grid grid-cols-2 gap-3">
                {data.skills.map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="p-3 text-center rounded-xl font-semibold text-white shadow-md transform hover:scale-105 transition-transform"
                    style={{ 
                      backgroundColor: index % 3 === 0 ? colors.primary : index % 3 === 1 ? colors.secondary : '#f59e0b'
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <div 
                className="inline-block px-6 py-3 rounded-full text-white font-bold text-lg mb-6 shadow-lg"
                style={{ backgroundColor: '#f59e0b' }}
              >
                Education
              </div>
              <div className="space-y-4">
                {data.education.map((edu: any, index: number) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl shadow-md border-l-6"
                    style={{ 
                      backgroundColor: colors.accent,
                      borderColor: index % 2 === 0 ? colors.primary : '#f59e0b'
                    }}
                  >
                    <h3 className="font-bold" style={{ color: colors.primary }}>{edu.degree}</h3>
                    <p className="font-semibold" style={{ color: colors.secondary }}>{edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.projects.length > 0 && (
          <section>
            <div 
              className="inline-block px-8 py-3 rounded-full text-white font-bold text-xl mb-8 shadow-lg"
              style={{ background: `linear-gradient(45deg, ${colors.secondary}, #f59e0b)` }}
            >
              Featured Projects
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="group">
                  <div 
                    className="p-6 rounded-2xl shadow-lg transition-all group-hover:shadow-xl group-hover:-translate-y-2 border-t-8"
                    style={{ 
                      backgroundColor: colors.accent,
                      borderColor: index % 3 === 0 ? colors.primary : index % 3 === 1 ? colors.secondary : '#f59e0b'
                    }}
                  >
                    <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                      {project.name}
                    </h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-xs rounded-full text-white font-semibold shadow-sm"
                            style={{ 
                              backgroundColor: techIndex % 3 === 0 ? colors.primary : techIndex % 3 === 1 ? colors.secondary : '#f59e0b'
                            }}
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  // Timeline Layout
  const TimelineLayout = () => (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl">
      {/* Header */}
      <div className="p-8 text-center" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
        {data.personalInfo.profileImage && (
          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white">
            <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
            <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
          </Avatar>
        )}
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo.name || 'Your Name'}</h1>
        <div className="flex justify-center items-center space-x-6 text-sm opacity-90">
          {data.personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {data.personalInfo.summary && (
          <section className="text-center">
            <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Timeline Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: colors.primary }}>
              Career Timeline
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
                style={{ backgroundColor: colors.secondary }}
              />
              
              <div className="space-y-12">
                {data.experience.map((exp: any, index: number) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-5/12">
                      <div 
                        className="p-6 rounded-lg shadow-lg"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                          {exp.title}
                        </h3>
                        <p className="font-semibold mb-2" style={{ color: colors.secondary }}>
                          {exp.company}
                        </p>
                        <p className="text-gray-700 mb-3">{exp.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="w-2/12 flex justify-center">
                      <div 
                        className="w-6 h-6 rounded-full border-4 border-white shadow-lg"
                        style={{ backgroundColor: colors.primary }}
                      />
                    </div>
                    
                    <div className="w-5/12" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills and Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>Education</h2>
              <div className="space-y-4">
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: colors.accent }}>
                    <h3 className="font-semibold" style={{ color: colors.primary }}>{edu.degree}</h3>
                    <p style={{ color: colors.secondary }}>{edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )

  // Infographic Layout
  const InfographicLayout = () => (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl">
      {/* Creative Header with Shapes */}
      <div className="relative overflow-hidden" style={{ backgroundColor: colors.primary }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative z-10 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{data.personalInfo.name || 'Your Name'}</h1>
              <p className="text-xl opacity-90">Creative Professional</p>
              <div className="mt-4 space-y-2 text-sm">
                {data.personalInfo.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{data.personalInfo.email}</span>
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{data.personalInfo.phone}</span>
                  </div>
                )}
              </div>
            </div>
            {data.personalInfo.profileImage && (
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
                <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {data.personalInfo.summary && (
          <section className="text-center">
            <div 
              className="inline-block px-8 py-3 rounded-full text-white font-bold text-lg mb-6"
              style={{ backgroundColor: colors.secondary }}
            >
              About Me
            </div>
            <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Visual Skills Section */}
        {data.skills.length > 0 && (
          <section>
            <div 
              className="inline-block px-8 py-3 rounded-full text-white font-bold text-xl mb-8"
              style={{ backgroundColor: colors.primary }}
            >
              <Code className="inline h-5 w-5 mr-2" />
              Skills & Expertise
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.skills.map((skill: string, index: number) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: index % 2 === 0 ? colors.primary : colors.secondary }}
                  >
                    {skill.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-sm font-medium">{skill}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience with Icons */}
        {data.experience.length > 0 && (
          <section>
            <div 
              className="inline-block px-8 py-3 rounded-full text-white font-bold text-xl mb-8"
              style={{ backgroundColor: colors.secondary }}
            >
              <Briefcase className="inline h-5 w-5 mr-2" />
              Work Experience
            </div>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="flex items-start space-x-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 p-6 rounded-xl" style={{ backgroundColor: colors.accent }}>
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                      {exp.title}
                    </h3>
                    <p className="font-semibold mb-2" style={{ color: colors.secondary }}>
                      {exp.company} • {exp.duration}
                    </p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  // Portfolio Layout
  const PortfolioLayout = () => (
    <div className="max-w-6xl mx-auto bg-white shadow-2xl">
      {/* Portfolio Header */}
      <div className="p-8" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
        <div className="flex items-center space-x-8">
          {data.personalInfo.profileImage && (
            <Avatar className="w-32 h-32 border-4 border-white">
              <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
              <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{data.personalInfo.name || 'Your Name'}</h1>
            <p className="text-xl opacity-90 mb-4">Portfolio & Projects</p>
            <div className="flex space-x-6 text-sm">
              {data.personalInfo.email && (
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {data.personalInfo.summary && (
          <section>
            <p className="text-lg leading-relaxed text-gray-700 text-center max-w-4xl mx-auto">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Featured Projects Grid */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.primary }}>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="group">
                  <div 
                    className="p-6 rounded-xl shadow-lg transition-all group-hover:shadow-xl group-hover:-translate-y-2 h-full"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      {project.name.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                      {project.name}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').slice(0, 3).map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs rounded-full text-white font-medium"
                            style={{ backgroundColor: colors.primary }}
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience & Skills Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp: any, index: number) => (
                  <div key={index} className="p-4 rounded-lg border-l-4" style={{ backgroundColor: colors.accent, borderColor: colors.secondary }}>
                    <h3 className="font-bold" style={{ color: colors.primary }}>{exp.title}</h3>
                    <p className="text-sm" style={{ color: colors.secondary }}>{exp.company} • {exp.duration}</p>
                    <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="space-y-8">
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
                  Technical Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-white"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
                  Education
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: colors.accent }}>
                      <h3 className="font-bold" style={{ color: colors.primary }}>{edu.degree}</h3>
                      <p style={{ color: colors.secondary }}>{edu.school}</p>
                      <p className="text-sm text-gray-600">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  // Executive Layout
  const ExecutiveLayout = () => (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl">
      {/* Executive Header */}
      <div className="p-8 border-b-8" style={{ borderColor: colors.primary }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {data.personalInfo.profileImage && (
              <Avatar className="w-24 h-24 border-4" style={{ borderColor: colors.primary }}>
                <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
                <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
              </Avatar>
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
                {data.personalInfo.name || 'Your Name'}
              </h1>
              <p className="text-xl text-gray-600 mb-2">Senior Executive</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
              </div>
            </div>
          </div>
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: colors.secondary }}
          >
            <Award className="h-12 w-12" />
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {data.personalInfo.summary && (
          <section>
            <div className="flex items-center mb-4">
              <div 
                className="w-2 h-12 mr-4"
                style={{ backgroundColor: colors.primary }}
              />
              <h2 className="text-3xl font-bold" style={{ color: colors.primary }}>
                Executive Summary
              </h2>
            </div>
            <div className="p-8 rounded-lg text-lg leading-relaxed" style={{ backgroundColor: colors.accent }}>
              {data.personalInfo.summary}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <div className="flex items-center mb-6">
              <div 
                className="w-2 h-12 mr-4"
                style={{ backgroundColor: colors.primary }}
              />
              <h2 className="text-3xl font-bold" style={{ color: colors.primary }}>
                Leadership Experience
              </h2>
            </div>
            <div className="space-y-8">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-8 pl-8" style={{ borderColor: colors.secondary }}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: colors.primary }}>
                        {exp.title}
                      </h3>
                      <p className="text-xl font-semibold" style={{ color: colors.secondary }}>
                        {exp.company}
                      </p>
                    </div>
                    <div 
                      className="px-6 py-3 rounded-lg text-white font-bold"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {exp.duration}
                    </div>
                  </div>
                  <div className="p-6 rounded-lg" style={{ backgroundColor: colors.accent }}>
                    <p className="text-lg leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.education.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div 
                  className="w-2 h-8 mr-4"
                  style={{ backgroundColor: colors.primary }}
                />
                <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                  Education & Credentials
                </h2>
              </div>
              <div className="space-y-4">
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="p-6 rounded-lg border-l-8" style={{ backgroundColor: colors.accent, borderColor: colors.secondary }}>
                    <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{edu.degree}</h3>
                    <p className="font-semibold" style={{ color: colors.secondary }}>{edu.school}</p>
                    <p className="text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div 
                  className="w-2 h-8 mr-4"
                  style={{ backgroundColor: colors.primary }}
                />
                <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                  Core Competencies
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {data.skills.map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="p-4 text-center rounded-lg font-semibold text-white text-lg"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )

  // Academic Layout
  const AcademicLayout = () => (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl">
      {/* Academic Header */}
      <div className="p-8 text-center border-b-4" style={{ borderColor: colors.primary }}>
        {data.personalInfo.profileImage && (
          <Avatar className="w-32 h-32 mx-auto mb-4 border-4" style={{ borderColor: colors.primary }}>
            <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
            <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
          </Avatar>
        )}
        <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-600 mb-4">Academic & Research Professional</p>
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: colors.primary }}>
              Research Interests & Summary
            </h2>
            <div className="p-6 rounded-lg text-center" style={{ backgroundColor: colors.accent }}>
              <p className="text-lg leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="text-center p-6 rounded-lg" style={{ backgroundColor: colors.accent }}>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                    {edu.degree}
                  </h3>
                  <p className="text-lg font-semibold mb-2" style={{ color: colors.secondary }}>
                    {edu.school}
                  </p>
                  <p className="text-gray-600">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
              Academic & Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="p-6 rounded-lg border-l-8" style={{ backgroundColor: colors.accent, borderColor: colors.secondary }}>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                    {exp.title}
                  </h3>
                  <p className="font-semibold mb-2" style={{ color: colors.secondary }}>
                    {exp.company} • {exp.duration}
                  </p>
                  <p className="leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 text-center" style={{ color: colors.primary }}>
                Research Skills & Methods
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="p-3 text-center rounded-lg font-medium"
                    style={{ backgroundColor: colors.accent, color: colors.primary }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 text-center" style={{ color: colors.primary }}>
                Research Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((project: any, index: number) => (
                  <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: colors.accent }}>
                    <h3 className="font-bold mb-2" style={{ color: colors.primary }}>
                      {project.name}
                    </h3>
                    <p className="text-sm">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )

  // Tech Layout
  const TechLayout = () => (
    <div className="max-w-6xl mx-auto bg-white shadow-2xl">
      {/* Tech Header */}
      <div className="p-8" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {data.personalInfo.profileImage && (
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src={data.personalInfo.profileImage || "/placeholder.svg"} />
                <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
              </Avatar>
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{data.personalInfo.name || 'Your Name'}</h1>
              <p className="text-xl opacity-90">Software Developer</p>
              <div className="flex space-x-4 mt-2 text-sm opacity-90">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              </div>
            </div>
          </div>
          <div className="text-right">
            <Code className="h-16 w-16 opacity-50" />
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {data.personalInfo.summary && (
          <section>
            <div className="p-6 rounded-lg border-l-8" style={{ backgroundColor: colors.accent, borderColor: colors.secondary }}>
              <p className="text-lg leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          </section>
        )}

        {/* Tech Skills Grid */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
              <Code className="inline h-6 w-6 mr-2" />
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.skills.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="p-4 text-center rounded-lg font-mono font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
                  style={{ backgroundColor: index % 2 === 0 ? colors.primary : colors.secondary }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Showcase */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="p-6 rounded-lg border-2" style={{ backgroundColor: colors.accent, borderColor: colors.secondary }}>
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg mr-4 flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {project.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: colors.primary }}>
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(',').map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs rounded-full font-mono text-white"
                          style={{ backgroundColor: colors.secondary }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
              Work Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="p-6 rounded-lg border-l-8" style={{ backgroundColor: colors.accent, borderColor: colors.secondary }}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: colors.primary }}>
                        {exp.title}
                      </h3>
                      <p className="font-semibold" style={{ color: colors.secondary }}>
                        {exp.company}
                      </p>
                    </div>
                    <span className="px-4 py-2 rounded-lg text-sm font-mono" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
                      {exp.duration}
                    </span>
                  </div>
                  <p className="leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="p-6 rounded-lg" style={{ backgroundColor: colors.accent }}>
                  <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{edu.degree}</h3>
                  <p className="font-semibold" style={{ color: colors.secondary }}>{edu.school}</p>
                  <p className="text-gray-600">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  // Render the appropriate layout based on template
  const renderLayout = () => {
    switch (template) {
      case 'modern':
        return <ModernLayout />
      case 'creative':
        return <CreativeLayout />
      case 'minimal':
        return <MinimalLayout />
      case 'professional':
        return <ProfessionalLayout />
      case 'colorful':
        return <ColorfulLayout />
      case 'timeline':
        return <TimelineLayout />
      case 'infographic':
        return <InfographicLayout />
      case 'portfolio':
        return <PortfolioLayout />
      case 'executive':
        return <ExecutiveLayout />
      case 'academic':
        return <AcademicLayout />
      case 'tech':
        return <TechLayout />
      default:
        return <ClassicLayout />
    }
  }

  return (
    <div className="w-full">
      {renderLayout()}
    </div>
  )
}
