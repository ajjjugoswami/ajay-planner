"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const html2pdf = require("html2pdf.js");

import {
  FileText,
  Download,
  Save,
  Edit,
  Palette,
  Layout,
  Archive,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SavedResumes } from "@/components/newResumeBuilder/saved-resumes";
import { TemplateSelector } from "@/components/newResumeBuilder/template-selector";
import { ResumeForm } from "@/components/newResumeBuilder/resume-form";
import { ResumeBuilder } from "@/components/newResumeBuilder/resume-builder";
import { ResumePreview } from "@/components/newResumeBuilder/resume-preview";

const defaultResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    profileImage: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  template: "classic",
};

const editingSections = [
  { value: "form", label: "Edit Information", icon: Edit },
  { value: "builder", label: "Layout Builder", icon: Layout },
  { value: "templates", label: "Choose Template", icon: Palette },
  { value: "saved", label: "Saved Resumes", icon: Archive },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("form");
  const [resumeData, setResumeData] = useState<any>(defaultResumeData);
  const [savedResumes, setSavedResumes] = useState<any[]>([]);
  const { toast } = useToast();

  // Load saved resumes from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedResumes");
    if (saved) {
      setSavedResumes(JSON.parse(saved));
    }

    // Load last edited resume
    const lastResume = localStorage.getItem("currentResume");
    if (lastResume) {
      setResumeData(JSON.parse(lastResume));
    }
  }, []);

  // Auto-save current resume to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("currentResume", JSON.stringify(resumeData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [resumeData]);

  const saveResume = () => {
    const resumeName = resumeData.personalInfo.name || "Untitled Resume";
    const timestamp = new Date().toISOString();

    const newResume = {
      id: Date.now(),
      name: resumeName,
      data: {
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          profileImage: "", // remove large base64 image if present
        },
      },
      savedAt: timestamp,
    };

    const MAX_RESUMES = 10;
    const updatedResumes = [...savedResumes, newResume].slice(-MAX_RESUMES);
    setSavedResumes(updatedResumes);

    try {
      localStorage.setItem("savedResumes", JSON.stringify(updatedResumes));
      toast({
        title: "Resume Saved!",
        description: `"${resumeName}" has been saved successfully.`,
      });
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "QuotaExceededError"
      ) {
        toast({
          title: "Storage Limit Reached",
          description: "Cannot save more resumes. Please delete old ones.",
          variant: "destructive",
        });
      } else {
        throw error;
      }
    }
  };

  const loadResume = (resumeId: number) => {
    const resume = savedResumes.find((r) => r.id === resumeId);
    if (resume) {
      setResumeData(resume.data);
      toast({
        title: "Resume Loaded!",
        description: `"${resume.name}" has been loaded.`,
      });
    }
  };

  const exportToPDF = () => {
    const element = document.getElementById("resume-preview");

    if (!element) {
      toast({
        title: "Export Failed",
        description: "Resume preview not found.",
        variant: "destructive",
      });
      return;
    }

    const opt = {
      margin: 0,
      filename: `${resumeData.personalInfo.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();

    toast({
      title: "Export Started",
      description: "Your resume PDF is being generated...",
    });
  };

  const newResume = () => {
    setResumeData(defaultResumeData);
    toast({
      title: "New Resume",
      description: "Started a new resume.",
    });
  };

  const renderContent = () => {
    switch (activeSection) {
      case "form":
        return <ResumeForm data={resumeData} onChange={setResumeData} />;
      case "builder":
        return <ResumeBuilder data={resumeData} onChange={setResumeData} />;
      case "templates":
        return (
          <TemplateSelector
            selectedTemplate={resumeData.template}
            onTemplateChange={(template) =>
              setResumeData({ ...resumeData, template })
            }
          />
        );
      case "saved":
        return <SavedResumes resumes={savedResumes} onLoad={loadResume} />;
      default:
        return <ResumeForm data={resumeData} onChange={setResumeData} />;
    }
  };

  const currentSection = editingSections.find(
    (section) => section.value === activeSection
  );
  const CurrentIcon = currentSection?.icon || Edit;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  ResumeBuilder Pro
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={newResume}>
                <FileText className="h-4 w-4 mr-2" />
                New
              </Button>
              <Button variant="outline" size="sm" onClick={saveResume}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={exportToPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Panel - Editing (1/4 width) */}
          <div className="xl:col-span-1">
            <div className="sticky top-24">
              {/* Section Selector */}
              <div className="mb-6">
                <Select value={activeSection} onValueChange={setActiveSection}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center space-x-2">
                      <CurrentIcon className="h-4 w-4" />
                      <SelectValue placeholder="Choose section to edit" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {editingSections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <SelectItem key={section.value} value={section.value}>
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <span>{section.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Content Area */}
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Live Preview (3/4 width) */}
          <div className="xl:col-span-3">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Live Preview
              </h2>
              <p className="text-gray-600 text-sm">
                Your resume updates in real-time as you make changes
              </p>
            </div>

            <div
              id="resume-preview"
              className="bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
