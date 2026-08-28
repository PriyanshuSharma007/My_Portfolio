import React, { useRef, useState, useEffect } from 'react';
import type { Project } from '../types';
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa';

const ScrollAnimatedContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -80px 0px' 
      }
    );
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const animatedStyle: React.CSSProperties = {
    transform: isVisible 
      ? 'translateZ(0) scale(1) rotateX(0deg)' 
      : 'translateZ(-100px) scale(0.92) rotateX(12deg)',
    opacity: isVisible ? 1 : 0,
    transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out',
  };

  return (
    <div ref={triggerRef} className="w-full" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
      <div style={animatedStyle}>
        {children}
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-white dark:bg-[#252229] rounded-2xl shadow-sm border border-gray-100 dark:border-transparent overflow-hidden flex flex-col h-full hover:shadow-lg hover:-translate-y-2 hover:border-amber-500/20 dark:hover:border-amber-500/20 transition-all duration-300 group">
      
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden bg-secondary dark:bg-[#1a181c]">
        <img 
          src={project.thumbnailUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Details Container */}
      <div className="p-6 flex flex-col flex-1">
        
        {/* Title & Date */}
        <div className="flex justify-between items-baseline mb-3">
          <h3 className="text-xl font-bold text-textMain dark:text-white">{project.title}</h3>
          {project.date && (
            <span className="text-xs font-semibold text-textMuted dark:text-gray-400 tracking-wider">
              {project.date}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-textMuted/90 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {/* Technologies Header */}
        <div className="text-center w-full mb-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500 block">
            Technologies
          </span>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-6">
          {project.techStack.map((tech, i) => (
            <span key={i} className="px-2 py-0.5 bg-secondary dark:bg-[#1e1c21] text-textMuted dark:text-gray-300 text-[11px] font-semibold rounded-md">
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom Bar: Status & Actions */}
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-neutral-800 flex justify-between items-center">
          
          {/* Status Label */}
          <div>
            {project.status === 'Active' ? (
              <span className="text-xs font-bold text-green-500 uppercase tracking-wider">
                Active
              </span>
            ) : (
              <span className="text-xs font-semibold text-textMuted/70 dark:text-gray-450 uppercase tracking-wider">
                Archive
              </span>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4 text-textMuted/80 dark:text-gray-300">
            <a 
              href={project.sourceCodeUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Source Code"
              className="hover:text-amber-500 dark:hover:text-amber-500 transition-colors"
            >
              <FaCode size={18} />
            </a>
            <a 
              href={project.liveDemoUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Live Demo"
              className="hover:text-amber-500 dark:hover:text-amber-500 transition-colors"
            >
              <FaExternalLinkAlt size={14} />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};

import { projects } from '../mockData';

const ProjectGallery: React.FC = () => {

  return (
    <section id="projects" className="py-24 bg-primary dark:bg-[#211F24] transition-colors duration-350 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-textMain dark:text-white tracking-tight font-sans">Works</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Inner Projects Header info */}
        <div className="text-left mb-10">
          <h3 className="text-2xl font-bold text-textMain dark:text-white tracking-tight">Selected Projects</h3>
          <p className="text-sm text-textMuted dark:text-gray-400 mt-1">
            All small gallery of recent projects chosen by me. Interested to see some more? Visit <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-amber-500 font-bold hover:underline">my work</a> page.
          </p>
        </div>

        {/* Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ScrollAnimatedContainer key={project._id}>
              <ProjectCard project={project} />
            </ScrollAnimatedContainer>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectGallery;
