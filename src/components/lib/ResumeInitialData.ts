import { ResumeData } from "./ResumeTypes";

 
export const initialResumeData: ResumeData = {
  personalInfo: {
    name: "Jane Doe",
    title: "Frontend Engineer",
    email: "janedoe@email.com",
    phone: "+91 9876543210",
    location: "Bengaluru",
    website: "https://e-resume.vercel.app",
    linkedin: "",
    github: "",
    twitter: ""
  },
  summary: "I am a web developer having expertise in frontend development and exposure to back-end development. I design and develop web applications using the latest technologies to deliver the product with quality code.",
  objective: "Eager to expand my skill set through external trainings to help boost all major front desk KPIs. Hoping to leverage organizational skills to help ABC Corp introduce time-saving schemes for all executives.",
  experience: [
    {
      company: "Company 1",
      title: "Senior Software Developer",
      period: "Apr 2021 - present",
      responsibilities: [
        "Use my extensive experience with front end development to define the structure and components for the project, making sure they are reusable",
        "Keep the code quality high reviewing code from other developers and suggesting improvements",
        "Interact with the designer to suggest changes and to make sure the view he has about the design is translated into actual functionality",
        "E-commerce maintenance with Fastcommerce, a Brazilian e-commerce platform",
      ],
    },
    {
      company: "Company 2",
      title: "Software Developer",
      period: "Jun 2015 - Dec 2017",
      responsibilities: [
        "Develop web applications based on Sharepoint, Drupal 8, Salesforce and Episerver",
        "Lead a team of 10 front end developers, giving support to the client's multi-cultural team, providing feedback, clarifying requirements and helping with technical questions",
        "Keep the Project Manager and the IT Leads updated on the overall progress of the projects and manage the tasks distributed to the team",
        "Keep the code and the features implemented by the other developers in accordance to the requirements",
      ],
    }
  ],
  education: [
    {
      degree: "MS - Cloud technology",
      institution: "MIT, University",
      period: "Jan 2014 - Jan 2016",
    },
    {
      degree: "B.Tech (VTU) - Computer Science",
      institution: "NMAMIT, Nitte",
      period: "Jan 2010 - Jan 2014",
    },
  ],
  skills: [
    "JavaScript",
    "HTML5",
    "CSS",
    "Algorithms",
    "Progressive Web Apps",
    "SQL",
    "Data Structures",
    "React",
    "Angular",
    "jQuery",
    "Redux",
    "Git",
    "VS Code",
    "Jira",
    "Webpack",
    "Eclipse",
    "Bitbucket",
  ],
  awards: [
    {
      title: "Certificate of exceptional bug finder",
      issuer: "XYZ client",
      date: "Nov 2014",
      description: "* Recognition zero defect delivery",
    },
    {
      title: "Certificate of best frontend developer",
      issuer: "XYZ client",
      date: "Nov 2016",
      description: "Awarded for exceptional improvements made to improve user experience",
    },
  ],
 }

