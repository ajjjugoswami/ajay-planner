export interface PersonalInfo { 
    name: string
    title: string
    email: string
    phone: string
    location: string
    website: string
    linkedin: string
    github: string
    twitter: string
  }
  
  export interface Experience {
    company: string
    title: string
    period: string
    responsibilities: string[]
  }
  
  export interface Education {
    degree: string
    institution: string
    period: string
  }
  
  export interface Award {
    title: string
    issuer: string
    date: string
    description: string
  }
  
  export interface Volunteering {
    organization: string
    role: string
    period: string
    description: string
  }
  
  export interface ResumeData {
    personalInfo: PersonalInfo
    summary: string
    objective: string
    experience: Experience[]
    education: Education[]
    skills: string[]
    awards: Award[]
    volunteering: Volunteering[]
  }
  
  