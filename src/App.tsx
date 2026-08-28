import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsGrid from './components/SkillsGrid';
import ProjectGallery from './components/ProjectGallery';
import EducationCertifications from './components/EducationCertifications';
import ContactForm from './components/ContactForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary dark:bg-[#211F24] dark:text-neutral-100 transition-colors duration-350">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <ExperienceTimeline />
        <SkillsGrid />
        <ProjectGallery />
        <EducationCertifications />
        <ContactForm />
      </main>
      <footer className="bg-secondary dark:bg-[#1a181c] dark:text-gray-400 dark:border-t dark:border-neutral-800/20 text-center py-6 text-textMuted text-sm transition-colors duration-350">
        <p>&copy; {new Date().getFullYear()} Priyanshu.dev. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
