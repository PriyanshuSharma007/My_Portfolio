import React, { useRef, useState, useEffect } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { experiences } from '../mockData';

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
    <div ref={triggerRef} className="w-full animate-trigger" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
      <div style={animatedStyle}>
        {children}
      </div>
    </div>
  );
};

const ExperienceTimeline: React.FC = () => {

  const calculateDuration = (start: string, end?: string, isCurrent?: boolean) => {
    const startDate = new Date(start);
    const endDate = isCurrent || !end ? new Date() : new Date(end);
    
    const yearsDiff = endDate.getFullYear() - startDate.getFullYear();
    const monthsDiff = endDate.getMonth() - startDate.getMonth();
    
    const totalMonths = yearsDiff * 12 + monthsDiff + 1; // Include start month
    
    return `${totalMonths} mos`;
  };

  const formatPeriod = (start: string, end?: string, isCurrent?: boolean) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
    const startStr = new Date(start).toLocaleDateString(undefined, options);
    const endStr = isCurrent || !end ? 'Present' : new Date(end).toLocaleDateString(undefined, options);
    
    return `${startStr} - ${endStr}`;
  };

  return (
    <section id="experience" className="py-24 bg-primary dark:bg-[#211F24] transition-colors duration-350 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-textMain dark:text-white tracking-tight font-sans">Experiences</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Centered Timeline vertical dotted line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-gray-300/80 dark:border-neutral-700 transform md:-translate-x-1/2 z-0"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {experiences.map((exp) => {
              const period = formatPeriod(exp.startDate, exp.endDate, exp.isCurrentRole);
              const duration = calculateDuration(exp.startDate, exp.endDate, exp.isCurrentRole);

              return (
                <ScrollAnimatedContainer key={exp._id}>
                  {/* Grid Layout (Desktop: left, middle, right columns) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 items-start relative z-10 w-full">
                    
                    {/* Left Column (Desktop: Company & Dates, Mobile: Hidden and merged to right) */}
                    <div className="hidden md:flex md:col-span-5 flex-col text-right pr-12 pt-2">
                      <h4 className="text-xl font-bold text-textMain dark:text-white tracking-tight">
                        {exp.company}
                      </h4>
                      <p className="text-sm font-semibold text-textMuted dark:text-gray-400 mt-1 tracking-wide">
                        {period} ({duration})
                      </p>
                      {exp.location && (
                        <p className="text-xs text-textMuted/70 dark:text-gray-500 mt-1">
                          {exp.location}
                        </p>
                      )}
                    </div>

                    {/* Middle Column (Timeline Dot) */}
                    <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center items-center pl-1.5 md:pl-0">
                      {/* Dotted Halo Border Ring around Dot */}
                      <div className="relative flex items-center justify-center w-9 h-9 md:w-11 md:h-11 bg-primary dark:bg-[#211F24] rounded-full border border-dashed border-gray-400/80 dark:border-neutral-600 shadow-inner transition-colors duration-350">
                        {/* Core Filled Dot with White Border */}
                        <div className="w-4 h-4 md:w-5 md:h-5 bg-amber-500 rounded-full border-[3px] md:border-4 border-primary dark:border-[#211F24] shadow transition-colors duration-350"></div>
                      </div>
                    </div>

                    {/* Right Column (Job description & Details) */}
                    <div className="col-span-1 md:col-span-5 pl-10 md:pl-12 pt-1.5 md:pt-2">
                      
                      {/* Mobile-only Header (Company & Dates) */}
                      <div className="flex md:hidden flex-col mb-2">
                        <h4 className="text-lg font-bold text-textMain dark:text-white">
                          {exp.company}
                        </h4>
                        <p className="text-xs font-semibold text-textMuted dark:text-gray-400 mt-0.5">
                          {period} ({duration})
                        </p>
                      </div>

                      {/* Job Title */}
                      <h3 className="text-xl font-bold text-textMain dark:text-white leading-tight">
                        {exp.jobTitle}
                      </h3>

                      {/* Employment Type */}
                      <div className="flex items-center text-xs text-amber-500 font-bold mt-2 uppercase tracking-wider gap-1.5 select-none">
                        <FaBriefcase className="w-3.5 h-3.5" />
                        {exp.employmentType || 'Full-time'}
                      </div>

                      {/* Bullet Responsibilities starting with yellow dashes */}
                      <ul className="mt-4 space-y-2.5 text-base text-textMuted dark:text-gray-400 leading-relaxed">
                        {exp.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-2.5">
                            <span className="text-amber-500 font-bold select-none">-</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>

                    </div>

                  </div>
                </ScrollAnimatedContainer>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceTimeline;
