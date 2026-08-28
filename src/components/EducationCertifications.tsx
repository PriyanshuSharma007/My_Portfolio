import React, { useRef, useState, useEffect } from 'react';

const SlideAnimatedContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    transform: isVisible ? 'translateX(0)' : 'translateX(-80px)',
    opacity: isVisible ? 1 : 0,
    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out',
  };

  return (
    <div ref={triggerRef} className="w-full">
      <div style={animatedStyle}>
        {children}
      </div>
    </div>
  );
};

import { education as educationData } from '../mockData';

const EducationCertifications: React.FC = () => {

  return (
    <section id="education" className="py-24 bg-secondary dark:bg-[#1a181c] transition-colors duration-350 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-textMain dark:text-white tracking-tight font-sans">Education</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Education List */}
        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <div key={edu._id}>
              <SlideAnimatedContainer>
                <div className="flex flex-col text-left space-y-3">
                  
                  {/* Period */}
                  {edu.period && (
                    <span className="text-sm font-bold text-amber-500 tracking-wide">
                      {edu.period}
                    </span>
                  )}

                  {/* Award */}
                  {edu.award && (
                    <div className="flex items-center text-sm font-bold text-amber-500 tracking-wide select-none">
                      <span className="mr-1.5">🏆</span> {edu.award}
                    </div>
                  )}

                  {/* Degree Title */}
                  <h3 className="text-2xl font-extrabold text-textMain dark:text-white leading-tight">
                    {edu.title}
                  </h3>

                  {/* Institution */}
                  <h4 className="text-lg font-bold text-textMain/90 dark:text-gray-200">
                    {edu.institution}
                  </h4>

                  {/* GPAX */}
                  {edu.gpax && (
                    <span className="text-sm text-textMuted dark:text-gray-400 font-medium">
                      {edu.gpax}
                    </span>
                  )}

                  {/* Details bullets */}
                  {edu.details && edu.details.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-textMuted/90 dark:text-gray-300 leading-relaxed pl-1">
                      {edu.details.map((detail, dIndex) => (
                        <li key={dIndex} className="list-none flex items-start gap-2">
                          <span className="text-amber-500 font-bold select-none">-</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </SlideAnimatedContainer>

              {/* Horizontal Divider Line */}
              {index < educationData.length - 1 && (
                <hr className="my-10 border-gray-200 dark:border-neutral-800" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EducationCertifications;
