"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import { useState } from 'react'

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateChange: (template: string) => void
}

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional single-column layout',
    colors: ['#1f2937', '#3b82f6', '#ffffff'],
    category: 'Traditional'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column layout with sidebar',
    colors: ['#059669', '#10b981', '#f0fdf4'],
    category: 'Professional'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Asymmetric creative layout',
    colors: ['#7c3aed', '#a855f7', '#faf5ff'],
    category: 'Creative'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean layout with lots of whitespace',
    colors: ['#374151', '#6b7280', '#f9fafb'],
    category: 'Minimal'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate-style structured layout',
    colors: ['#1e40af', '#3b82f6', '#eff6ff'],
    category: 'Professional'
  },
  {
    id: 'colorful',
    name: 'Colorful',
    description: 'Vibrant multi-section layout',
    colors: ['#dc2626', '#f59e0b', '#fef3c7'],
    category: 'Creative'
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Experience shown as timeline',
    colors: ['#0f766e', '#14b8a6', '#f0fdfa'],
    category: 'Creative'
  },
  {
    id: 'infographic',
    name: 'Infographic',
    description: 'Visual elements and charts',
    colors: ['#be185d', '#ec4899', '#fdf2f8'],
    category: 'Creative'
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Project-focused layout',
    colors: ['#7c2d12', '#ea580c', '#fff7ed'],
    category: 'Creative'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Senior-level professional layout',
    colors: ['#1e1b4b', '#3730a3', '#eef2ff'],
    category: 'Professional'
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Research and education focused',
    colors: ['#365314', '#65a30d', '#f7fee7'],
    category: 'Professional'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Developer and tech-focused',
    colors: ['#1f2937', '#6366f1', '#f1f5f9'],
    category: 'Professional'
  }
]

const categories = ['All', 'Traditional', 'Professional', 'Creative', 'Minimal']

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Choose Your Template</h3>
        <p className="text-sm text-gray-600 mb-4">Each template has a unique layout and design</p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <CardContent className="p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-sm">{template.name}</h4>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{template.description}</p>
                </div>
                {selectedTemplate === template.id && (
                  <div className="bg-blue-500 text-white rounded-full p-1 ml-2">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
              
              {/* Color Palette */}
              <div className="flex space-x-1 mb-2">
                {template.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <Button 
                size="sm"
                className="w-full text-xs" 
                variant={selectedTemplate === template.id ? "default" : "outline"}
              >
                {selectedTemplate === template.id ? 'Selected' : 'Select'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
