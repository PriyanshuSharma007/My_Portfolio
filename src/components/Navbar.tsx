import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-[#f9f9f9]/90 dark:bg-[#211F24]/90 backdrop-blur-md border-b border-amber-500/10 dark:border-amber-500/5 shadow-sm transition-colors duration-350">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a href="#" className="text-xl font-bold text-textMain dark:text-white tracking-wide select-none">
              Priyanshu.dev <span className="text-amber-500">&gt;_</span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-textMuted dark:text-gray-300 hover:text-amber-500 transition-colors duration-200 font-semibold text-sm"
              >
                {link.name}
              </a>
            ))}
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-textMuted dark:text-gray-300 hover:text-amber-500 transition-colors focus:outline-none"
              title="Toggle Dark/Light Mode"
            >
              {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
          </div>

          {/* Mobile Menu Button + Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-textMuted dark:text-gray-300 hover:text-amber-500 transition-colors focus:outline-none"
              title="Toggle Dark/Light Mode"
            >
              {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-textMuted dark:text-gray-300 hover:text-textMain dark:hover:text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#f9f9f9]/95 dark:bg-[#211F24]/95 backdrop-blur-md absolute w-full border-b border-secondary dark:border-neutral-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="block px-3 py-2 rounded-md text-base font-semibold text-textMuted dark:text-gray-300 hover:text-amber-500 hover:bg-secondary dark:hover:bg-neutral-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
