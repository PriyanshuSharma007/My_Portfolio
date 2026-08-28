import Profile from './models/Profile';
import Experience from './models/Experience';
import Skill from './models/Skill';
import Education from './models/Education';
import Project from './models/Project';

export const seedDatabase = async () => {
  try {
    // Delete existing data to allow fresh seed with new schema format
    await Profile.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    await Project.deleteMany({});

    console.log('Seeding mock data...');
    await Profile.create({
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
    });

    await Experience.create([
      {
        jobTitle: 'Back End Developer Intern',
        company: 'HRFY.AI (HR For You)',
        employmentType: 'Internship',
        location: 'Remote',
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-07-31'),
        isCurrentRole: false,
        responsibilities: [
          'Engineered and deployed Node.js/Express.js REST APIs for AI-powered recruitment workflows, handling 1,000+ daily requests in production.',
          'Optimized backend performance and query efficiency, reducing page load time by 40%.'
        ]
      },
      {
        jobTitle: 'Technical Support Associate',
        company: 'Teleperformance',
        employmentType: 'Full-time',
        location: 'India',
        startDate: new Date('2025-10-01'),
        endDate: new Date('2026-05-31'),
        isCurrentRole: false,
        responsibilities: [
          'Resolved high-volume customer technical issues while maintaining 86%+ First Call Resolution (FCR) and 85%+ Customer Satisfaction (CSAT) scores.',
          'Consistently met Average Handle Time (AHT) and After-Call Work (ACW) targets while ensuring quality customer support and issue resolution.'
        ]
      },
      {
        jobTitle: 'Software Trainee',
        company: 'Acaddin',
        employmentType: 'Trainee',
        location: 'India',
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-09-30'),
        isCurrentRole: false,
        responsibilities: [
          'Architected and delivered custom client-facing applications using MongoDB, Express.js, Node.js, and RESTful APIs, providing end-to-end solutions tailored for enterprise launch.',
          'Built scalable, reusable frontend components following component-driven development practices.'
        ]
      },
      {
        jobTitle: 'Front End Developer Intern',
        company: 'SwapSo (Remote)',
        employmentType: 'Internship',
        location: 'Remote',
        startDate: new Date('2024-11-01'),
        endDate: new Date('2025-04-30'),
        isCurrentRole: false,
        responsibilities: [
          'Engineered scalable, responsive web applications using Next.js, React, TypeScript, and Tailwind CSS, optimizing performance and state management to enhance user experience.',
          'Improved data access speed by 70% and authentication performance by 30% through backend optimization.'
        ]
      }
    ]);

    await Skill.create([
      {
        category: 'Frontend Dev',
        subcategory: 'Frameworks & Runtime',
        technologies: [
          { name: 'Next.js', iconUrl: 'nextjs' }
        ]
      },
      {
        category: 'Frontend Dev',
        subcategory: 'Languages',
        technologies: [
          { name: 'TypeScript', iconUrl: 'typescript' },
          { name: 'JavaScript', iconUrl: 'javascript' },
          { name: 'HTML5', iconUrl: 'html5' },
          { name: 'CSS3', iconUrl: 'css3' }
        ]
      },
      {
        category: 'Backend Dev',
        subcategory: 'Frameworks & Runtime',
        technologies: [
          { name: 'Node.js', iconUrl: 'nodejs' },
          { name: 'Express.js', iconUrl: 'express' },
          { name: 'REST APIs', iconUrl: 'nodejs' },
          { name: 'JWT Authentication', iconUrl: 'nodejs' },
          { name: 'RBAC', iconUrl: 'nodejs' },
          { name: 'System Design', iconUrl: 'nodejs' }
        ]
      },
      {
        category: 'Backend Dev',
        subcategory: 'Languages',
        technologies: [
          { name: 'Java', iconUrl: 'java' },
          { name: 'C++', iconUrl: 'cplusplus' },
          { name: 'SQL', iconUrl: 'mysql' }
        ]
      },
      {
        category: 'Libraries',
        technologies: [
          { name: 'React.js', iconUrl: 'react' },
          { name: 'Tailwind CSS', iconUrl: 'tailwindcss' },
          { name: 'Mongoose', iconUrl: 'mongodb' },
          { name: 'Data Modeling', iconUrl: 'mongodb' }
        ]
      },
      {
        category: 'Database & Cache',
        technologies: [
          { name: 'MongoDB', iconUrl: 'mongodb' },
          { name: 'MySQL', iconUrl: 'mysql' },
          { name: 'PostgreSQL', iconUrl: 'postgresql' },
          { name: 'Redis', iconUrl: 'redis' }
        ]
      },
      {
        category: 'Infrastructure',
        technologies: [
          { name: 'Docker', iconUrl: 'docker' },
          { name: 'Postman', iconUrl: 'postman' },
          { name: 'VS Code', iconUrl: 'vscode' },
          { name: 'npm', iconUrl: 'npm' }
        ]
      },
      {
        category: 'Version Control',
        technologies: [
          { name: 'Git', iconUrl: 'git' }
        ]
      },
      {
        category: 'CI/CD',
        technologies: [
          { name: 'GitHub Actions', iconUrl: 'github' },
          { name: 'CI/CD', iconUrl: 'github' }
        ]
      }
    ]);

    await Education.create([
      {
        type: 'Degree',
        title: 'B.E. Information Technology',
        institution: 'Chandigarh University, Punjab',
        period: '2021 - 2025',
        gpax: 'CGPA 7.6/10'
      },
      {
        type: 'Certification',
        title: 'Full Stack Developer',
        institution: 'IBM',
        period: '2025'
      }
    ]);

    await Project.create([
      {
        title: 'AI CareerAgent',
        description: 'Built a multi-agent AI interview platform conducting personalized interviews, resume analysis, performance feedback generation, and tailored learning roadmap creation using LangChain and LangGraph agent orchestration workflows. Designed a scalable microservices architecture with Dockerized services, Redis caching, MongoDB, and Firebase Authentication, enabling secure user management and production-ready AI agent deployment.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
        techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'LangChain', 'LangGraph', 'Docker', 'Firebase', 'AWS'],
        date: '07/2026',
        status: 'Active',
        liveDemoUrl: '#',
        sourceCodeUrl: '#'
      },
      {
        title: 'Sub Track',
        description: 'Built a subscription management platform enabling users to track, organize, and monitor recurring expenses across streaming services, SaaS tools, and memberships. Integrated AI-powered spending insights to identify unnecessary subscriptions and deliver personalized recommendations, helping users optimize spending.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400',
        techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST API Integration'],
        date: '2025',
        status: 'Active',
        liveDemoUrl: '#',
        sourceCodeUrl: '#'
      }
    ]);
    console.log('Mock data seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
