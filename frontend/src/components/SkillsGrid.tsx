import React, { useRef, useState, useEffect } from 'react';
import useSWR from 'swr';
import type { Skill } from '../types';
import { API_BASE_URL } from '../config';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ScrollAnimatedContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.05, 
        rootMargin: '0px 0px -60px 0px' 
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
      : 'translateZ(-120px) scale(0.9) rotateX(15deg)',
    opacity: isVisible ? 1 : 0,
    transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out',
  };

  return (
    <div ref={triggerRef} className="w-full animate-trigger" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
      <div style={animatedStyle}>
        {children}
      </div>
    </div>
  );
};

const SkillIcon: React.FC<{ name: string; iconUrl?: string }> = ({ name, iconUrl }) => {
  const [hovered, setHovered] = useState(false);

  // Fallback to devicon standard naming conventions dynamically
  const cleanedName = name.toLowerCase().replace(/[\s.#]/g, (m) => {
    if (m === '#') return 'sharp';
    if (m === '.') return 'dot';
    return '';
  });

  const getIconSrc = () => {
    // If the DB provided a specific devicon key, use it. Otherwise guess based on clean name.
    const key = iconUrl && iconUrl !== 'default' ? iconUrl : cleanedName;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${key}/${key}-original.svg`;
  };

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-[#1e1c21] rounded-xl border border-gray-100 dark:border-transparent dark:hover:border-neutral-700 hover:border-gray-300 hover:shadow-sm transition-all duration-300 select-none group"
    >
      <div className="w-6 h-6 flex items-center justify-center relative">
        <img 
          src={getIconSrc()} 
          alt={name}
          className={`w-5 h-5 object-contain transition-all duration-300 ${
            hovered ? 'scale-110 filter-none' : 'grayscale dark:invert opacity-80'
          }`}
          onError={(e) => {
            // Hide broken images and just show text
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <span className="text-sm font-semibold text-textMain dark:text-gray-300 group-hover:text-amber-500 dark:group-hover:text-amber-500 transition-colors duration-200">
        {name}
      </span>
    </div>
  );
};

const SkillsGrid: React.FC = () => {
  const { data: categories, error } = useSWR<Skill[]>(`${API_BASE_URL}/api/skills`, fetcher);

  if (error || !categories) return null;

  // Filter components exactly matching layout sequences from screenshots
  const frontendCats = categories.filter(c => c.category === 'Frontend Dev');
  const backendCats = categories.filter(c => c.category === 'Backend Dev');
  const librariesCat = categories.find(c => c.category === 'Libraries');
  
  // Dynamic secondary categories
  const dbCat = categories.find(c => c.category === 'Database & Cache');
  const infraCat = categories.find(c => c.category === 'Infrastructure');
  
  // Row 4 categories
  const vcCat = categories.find(c => c.category === 'Version Control');
  const hostingCat = categories.find(c => c.category === 'Hosting');
  const cicdCat = categories.find(c => c.category === 'CI/CD');

  return (
    <section id="skills" className="py-24 bg-secondary dark:bg-[#1a181c] transition-colors duration-350 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-textMain dark:text-white tracking-tight font-sans">Skills</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stack of Rows */}
        <div className="space-y-12">
          
          {/* Row 1: Frontend & Backend Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Frontend Dev Column */}
            {frontendCats.length > 0 && (
              <ScrollAnimatedContainer>
                <div className="bg-white dark:bg-[#252229] border border-gray-100/50 dark:border-transparent rounded-3xl p-8 h-full shadow-sm text-center">
                  
                  {/* Centered Yellow Code Symbol Above Title */}
                  <div className="flex flex-col items-center justify-center mb-6">
                    <span className="text-3xl font-extrabold text-amber-500 mb-1 select-none font-mono">{"</>"}</span>
                    <h3 className="text-2xl font-bold text-textMain dark:text-white tracking-tight">
                      Frontend Dev
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Subcategories (Languages vs Frameworks) */}
                    {['Frameworks & Runtime', 'Languages'].map((sub) => {
                      const catDoc = frontendCats.find(c => c.subcategory === sub);
                      if (!catDoc || !catDoc.technologies || catDoc.technologies.length === 0) return null;
                      return (
                        <div key={sub} className="text-center">
                          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-4">
                            {sub}
                          </span>
                          <div className="flex flex-wrap gap-3 justify-center">
                            {catDoc.technologies.map(t => (
                              <SkillIcon key={t.name} name={t.name} iconUrl={t.iconUrl} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollAnimatedContainer>
            )}

            {/* Backend Dev Column */}
            {backendCats.length > 0 && (
              <ScrollAnimatedContainer>
                <div className="bg-white dark:bg-[#252229] border border-gray-100/50 dark:border-transparent rounded-3xl p-8 h-full shadow-sm text-center">
                  
                  {/* Centered Yellow Terminal Symbol Above Title */}
                  <div className="flex flex-col items-center justify-center mb-6">
                    <span className="text-3xl font-extrabold text-amber-500 mb-1 select-none font-mono">{">_"}</span>
                    <h3 className="text-2xl font-bold text-textMain dark:text-white tracking-tight">
                      Backend Dev
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {['Frameworks & Runtime', 'Languages'].map((sub) => {
                      const catDoc = backendCats.find(c => c.subcategory === sub);
                      if (!catDoc || !catDoc.technologies || catDoc.technologies.length === 0) return null;
                      return (
                        <div key={sub} className="text-center">
                          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-4">
                            {sub}
                          </span>
                          <div className="flex flex-wrap gap-3 justify-center">
                            {catDoc.technologies.map(t => (
                              <SkillIcon key={t.name} name={t.name} iconUrl={t.iconUrl} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollAnimatedContainer>
            )}
          </div>

          {/* Row 2: Libraries (Full-width spanning) */}
          {librariesCat && (
            <ScrollAnimatedContainer>
              <div className="bg-white dark:bg-[#252229] border border-gray-100/50 dark:border-transparent rounded-3xl p-8 shadow-sm text-center">
                <h3 className="text-2xl font-bold text-textMain dark:text-white tracking-tight mb-6">
                  Libraries
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {librariesCat.technologies.map(t => (
                    <SkillIcon key={t.name} name={t.name} iconUrl={t.iconUrl} />
                  ))}
                </div>
              </div>
            </ScrollAnimatedContainer>
          )}

          {/* Row 3: Database & Cache & Infrastructure Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dbCat && (
              <ScrollAnimatedContainer>
                <div className="bg-white dark:bg-[#252229] border border-gray-100/50 dark:border-transparent rounded-3xl p-8 h-full shadow-sm text-center">
                  <h3 className="text-2xl font-bold text-textMain dark:text-white tracking-tight mb-6">
                    Database & Cache
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {dbCat.technologies.map(t => (
                      <SkillIcon key={t.name} name={t.name} iconUrl={t.iconUrl} />
                    ))}
                  </div>
                </div>
              </ScrollAnimatedContainer>
            )}

            {infraCat && (
              <ScrollAnimatedContainer>
                <div className="bg-white dark:bg-[#252229] border border-gray-100/50 dark:border-transparent rounded-3xl p-8 h-full shadow-sm text-center">
                  <h3 className="text-2xl font-bold text-textMain dark:text-white tracking-tight mb-6">
                    Infrastructure
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {infraCat.technologies.map(t => (
                      <SkillIcon key={t.name} name={t.name} iconUrl={t.iconUrl} />
                    ))}
                  </div>
                </div>
              </ScrollAnimatedContainer>
            )}
          </div>

          {/* Row 4: Version Control, Hosting, CI/CD (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Version Control */}
            {vcCat && (
              <ScrollAnimatedContainer>
                <div className="bg-white dark:bg-[#252229] border border-gray-100/50 dark:border-transparent rounded-3xl p-8 h-full shadow-sm text-center">
                  <h3 className="text-2xl font-bold text-textMain dark:text-white tracking-tight mb-6">
                    Version Control
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {vcCat.technologies.map(t => (
                      <SkillIcon key={t.name} name={t.name} iconUrl={t.iconUrl} />
                    ))}
                  </div>
                </div>
              </ScrollAnimatedContainer>
            )}

            {/* Hosting */}
            {hostingCat && (
              <ScrollAnimatedContainer>
                <div className="bg-white dark:bg-[#252229] border border-gray-100/50 dark:border-transparent rounded-3xl p-8 h-full shadow-sm text-center">
                  <h3 className="text-2xl font-bold text-textMain dark:text-white tracking-tight mb-6">
                    Hosting
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {hostingCat.technologies.map(t => (
                      <SkillIcon key={t.name} name={t.name} iconUrl={t.iconUrl} />
                    ))}
                  </div>
                </div>
              </ScrollAnimatedContainer>
            )}

            {/* CI/CD */}
            {cicdCat && (
              <ScrollAnimatedContainer>
                <div className="bg-white dark:bg-[#252229] border border-gray-100/50 dark:border-transparent rounded-3xl p-8 h-full shadow-sm text-center">
                  <h3 className="text-2xl font-bold text-textMain dark:text-white tracking-tight mb-6">
                    CI/CD
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {cicdCat.technologies.map(t => (
                      <SkillIcon key={t.name} name={t.name} iconUrl={t.iconUrl} />
                    ))}
                  </div>
                </div>
              </ScrollAnimatedContainer>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default SkillsGrid;
