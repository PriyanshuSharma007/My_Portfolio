import type { Profile, Experience, Skill, Education, Project } from './types';

export const profile: Profile = {
  name: 'Priyanshu Sharma',
  localName: 'प्रियांशु शर्मा',
  username: '@priyanshuSharma.dev',
  headline: 'Full Stack Developer, Backend Developer, Frontend Developer',
  summary: "I'm a web developer based in Chandigarh, India. I describe myself as a passionate developer who loves coding and always learning about new technologies.",
  aboutText: 'In my spare time I often listen to music, solo travel, watch anime or learn some new technologies.',
  quote: 'Debugging becomes significantly easier if you first admit that you are the problem.',
  profilePictureUrl: '/profile_pic.png',
  resumeUrl: '/Resume.pdf',
  email: 'priyanshu3808sharma@gmail.com',
  codingProfiles: {
    github: 'https://github.com/PriyanshuSharma007',
    leetcode: 'https://leetcode.com/u/PriyanshuX07/',
    linkedin: 'https://www.linkedin.com/in/priyanshusharma008/'
  }
};

export const experiences: Experience[] = [
  {
    _id: 'exp1',
    jobTitle: 'Back End Developer Intern',
    company: 'HRFY.AI (HR For You)',
    employmentType: 'Internship',
    location: 'Remote',
    startDate: '2026-02-01',
    endDate: '2026-07-31',
    isCurrentRole: false,
    responsibilities: [
      'Engineered and deployed Node.js/Express.js REST APIs for AI-powered recruitment workflows, handling 1,000+ daily requests in production.',
      'Optimized backend performance and query efficiency, reducing page load time by 40%.'
    ]
  },
  {
    _id: 'exp2',
    jobTitle: 'Technical Support Associate',
    company: 'Teleperformance',
    employmentType: 'Full-time',
    location: 'India',
    startDate: '2025-10-01',
    endDate: '2026-05-31',
    isCurrentRole: false,
    responsibilities: [
      'Resolved high-volume customer technical issues while maintaining 86%+ First Call Resolution (FCR) and 85%+ Customer Satisfaction (CSAT) scores.',
      'Consistently met Average Handle Time (AHT) and After-Call Work (ACW) targets while ensuring quality customer support and issue resolution.'
    ]
  },
  {
    _id: 'exp3',
    jobTitle: 'Software Trainee',
    company: 'Acaddin',
    employmentType: 'Trainee',
    location: 'India',
    startDate: '2025-06-01',
    endDate: '2025-09-30',
    isCurrentRole: false,
    responsibilities: [
      'Architected and delivered custom client-facing applications using MongoDB, Express.js, Node.js, and RESTful APIs, providing end-to-end solutions tailored for enterprise launch.',
      'Built scalable, reusable frontend components following component-driven development practices.'
    ]
  },
  {
    _id: 'exp4',
    jobTitle: 'Front End Developer Intern',
    company: 'SwapSo (Remote)',
    employmentType: 'Internship',
    location: 'Remote',
    startDate: '2024-11-01',
    endDate: '2025-04-30',
    isCurrentRole: false,
    responsibilities: [
      'Engineered scalable, responsive web applications using Next.js, React, TypeScript, and Tailwind CSS, optimizing performance and state management to enhance user experience.',
      'Improved data access speed by 70% and authentication performance by 30% through backend optimization.'
    ]
  }
];

export const skills: Skill[] = [
  {
    _id: 's1',
    category: 'Frontend Dev',
    subcategory: 'Frameworks & Runtime',
    technologies: [
      { _id: 't1', name: 'Next.js', iconUrl: 'nextjs' }
    ]
  },
  {
    _id: 's2',
    category: 'Frontend Dev',
    subcategory: 'Languages',
    technologies: [
      { _id: 't2', name: 'TypeScript', iconUrl: 'typescript' },
      { _id: 't3', name: 'JavaScript', iconUrl: 'javascript' },
      { _id: 't4', name: 'HTML5', iconUrl: 'html5' },
      { _id: 't5', name: 'CSS3', iconUrl: 'css3' }
    ]
  },
  {
    _id: 's3',
    category: 'Backend Dev',
    subcategory: 'Frameworks & Runtime',
    technologies: [
      { _id: 't6', name: 'Node.js', iconUrl: 'nodejs' },
      { _id: 't7', name: 'Express.js', iconUrl: 'express' },
      { _id: 't8', name: 'REST APIs', iconUrl: 'nodejs' },
      { _id: 't9', name: 'JWT Authentication', iconUrl: 'nodejs' },
      { _id: 't10', name: 'RBAC', iconUrl: 'nodejs' },
      { _id: 't11', name: 'System Design', iconUrl: 'nodejs' }
    ]
  },
  {
    _id: 's4',
    category: 'Backend Dev',
    subcategory: 'Languages',
    technologies: [
      { _id: 't12', name: 'Java', iconUrl: 'java' },
      { _id: 't13', name: 'C++', iconUrl: 'cplusplus' },
      { _id: 't14', name: 'SQL', iconUrl: 'mysql' }
    ]
  },
  {
    _id: 's5',
    category: 'Libraries',
    technologies: [
      { _id: 't15', name: 'React.js', iconUrl: 'react' },
      { _id: 't16', name: 'Tailwind CSS', iconUrl: 'tailwindcss' },
      { _id: 't17', name: 'Mongoose', iconUrl: 'mongodb' },
      { _id: 't18', name: 'Data Modeling', iconUrl: 'mongodb' }
    ]
  },
  {
    _id: 's6',
    category: 'Database & Cache',
    technologies: [
      { _id: 't19', name: 'MongoDB', iconUrl: 'mongodb' },
      { _id: 't20', name: 'MySQL', iconUrl: 'mysql' },
      { _id: 't21', name: 'PostgreSQL', iconUrl: 'postgresql' },
      { _id: 't22', name: 'Redis', iconUrl: 'redis' }
    ]
  },
  {
    _id: 's7',
    category: 'Infrastructure',
    technologies: [
      { _id: 't23', name: 'Docker', iconUrl: 'docker' },
      { _id: 't24', name: 'Postman', iconUrl: 'postman' },
      { _id: 't25', name: 'VS Code', iconUrl: 'vscode' },
      { _id: 't26', name: 'npm', iconUrl: 'npm' }
    ]
  },
  {
    _id: 's8',
    category: 'Version Control',
    technologies: [
      { _id: 't27', name: 'Git', iconUrl: 'git' }
    ]
  },
  {
    _id: 's9',
    category: 'CI/CD',
    technologies: [
      { _id: 't28', name: 'GitHub Actions', iconUrl: 'github' },
      { _id: 't29', name: 'CI/CD', iconUrl: 'github' }
    ]
  }
];

export const education: Education[] = [
  {
    _id: 'edu1',
    type: 'Degree',
    title: 'B.E. Information Technology',
    institution: 'Chandigarh University, Punjab',
    period: '2021 - 2025',
    gpax: 'CGPA 7.6/10'
  },
  {
    _id: 'edu2',
    type: 'Certification',
    title: 'Full Stack Developer',
    institution: 'IBM',
    period: '2025'
  }
];

export const projects: Project[] = [
  {
    _id: 'p1',
    title: 'AI CareerAgent',
    description: 'Built a multi-agent AI interview platform conducting personalized interviews, resume analysis, performance feedback generation, and tailored learning roadmap creation using LangChain and LangGraph agent orchestration workflows. Designed a scalable microservices architecture with Dockerized services, Redis caching, MongoDB, and Firebase Authentication, enabling secure user management and production-ready AI agent deployment.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'LangChain', 'LangGraph', 'Docker', 'Firebase', 'AWS'],
    date: '07/2026',
    status: 'Active',
    liveDemoUrl: 'https://github.com/PriyanshuSharma007/FresherAi',
    sourceCodeUrl: 'https://github.com/PriyanshuSharma007/Subspace'
  },
  {
    _id: 'p2',
    title: 'Sub Track',
    description: 'Built a subscription management platform enabling users to track, organize, and monitor recurring expenses across streaming services, SaaS tools, and memberships. Integrated AI-powered spending insights to identify unnecessary subscriptions and deliver personalized recommendations, helping users optimize spending.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST API Integration'],
    date: '2025',
    status: 'Active',
    liveDemoUrl: 'https://github.com/PriyanshuSharma007/FresherAi',
    sourceCodeUrl: 'https://github.com/PriyanshuSharma007/Subspace'
  }
];
