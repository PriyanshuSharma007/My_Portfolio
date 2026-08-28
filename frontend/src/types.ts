export interface Profile {
  name: string;
  localName?: string;
  username?: string;
  headline: string;
  summary: string;
  aboutText: string;
  quote?: string;
  profilePictureUrl?: string;
  resumeUrl: string;
  email?: string;
  codingProfiles: {
    github?: string;
    leetcode?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export interface Experience {
  _id: string;
  jobTitle: string;
  company: string;
  employmentType?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrentRole: boolean;
  responsibilities: string[];
}

export interface Skill {
  _id: string;
  category: string;
  subcategory?: string;
  technologies: {
    _id: string;
    name: string;
    iconUrl?: string;
  }[];
}

export interface Education {
  _id: string;
  type: 'Degree' | 'Certification';
  title: string;
  institution: string;
  period?: string;
  award?: string;
  gpax?: string;
  details?: string[];
  issueDate?: string;
  credentialUrl?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  techStack: string[];
  date?: string;
  status?: string;
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
}
