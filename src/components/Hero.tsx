import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaDownload } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const AnimatedShape = () => {
  const mesh = useRef<any>(null!);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Sphere args={[1, 64, 64]} ref={mesh} scale={2}>
      <MeshDistortMaterial
        color="#fbbf24"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        metalness={0.4}
      />
    </Sphere>
  );
};

const ScrollRoles: React.FC<{ words: string[] }> = ({ words }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500); // Transition every 2.5 seconds
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className="inline-block overflow-hidden h-[2rem] relative w-full">
      <div 
        className="transition-transform duration-700 ease-in-out flex flex-col"
        style={{ transform: `translateY(-${index * 2}rem)` }}
      >
        {words.map((word, i) => (
          <div 
            key={i} 
            className={`h-[2rem] flex items-center justify-center text-amber-500 font-bold select-none transition-all duration-700 ${
              i === index ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
            }`}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

import { profile } from '../mockData.ts';

const Hero: React.FC = () => {
  const roles = useMemo(() => {
    return profile.headline
      ? profile.headline.split(',').map(r => r.trim())
      : ['Full Stack Developer', 'Backend Developer', 'Frontend Developer'];
  }, [profile.headline]);

  return (
    <section id="about" className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden bg-primary dark:bg-[#211F24] transition-colors duration-350 pt-24">

      {/* 3D Background Element */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Canvas>
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 5, 2]} intensity={1} />
          <AnimatedShape />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Description & Quotes */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-textMain dark:text-white tracking-tight mb-6">
              Hi there<span className="text-amber-500">!</span>
            </h1>

            {/* Left Divider & Description */}
            <div className="flex gap-4 mb-6">
              <div className="w-12 h-[2px] bg-textMain dark:bg-white opacity-30 mt-3 flex-shrink-0"></div>
              <div className="flex flex-col space-y-4">
                <p className="text-lg md:text-xl text-textMain/90 dark:text-gray-200 leading-relaxed font-normal">
                  {profile.summary}
                </p>
                {profile.aboutText && (
                  <p className="text-base md:text-lg text-textMuted dark:text-gray-400 leading-relaxed">
                    {profile.aboutText}
                  </p>
                )}
              </div>
            </div>

            {/* Quote Block */}
            {profile.quote && (
              <div className="relative my-6 pl-8 py-2 border-l-4 border-amber-500/80 italic text-lg text-textMain/90 dark:text-gray-200 bg-white/40 dark:bg-white/5 rounded-r-lg">
                <span className="absolute left-2 -top-1 text-3xl font-serif text-amber-500/50">“</span>
                {profile.quote}
                <span className="text-3xl font-serif text-amber-500/50">”</span>
              </div>
            )}

            {/* Socials & Download */}
            <div className="flex flex-wrap items-center gap-6 mt-6">
              <div className="flex gap-3">
                {profile.codingProfiles?.linkedin && (
                  <a href={profile.codingProfiles.linkedin} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white dark:bg-[#2e2b33] shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-center text-textMuted dark:text-gray-300 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white hover:border-transparent transition-all" title="LinkedIn">
                    <FaLinkedinIn size={18} />
                  </a>
                )}
                {profile.codingProfiles?.github && (
                  <a href={profile.codingProfiles.github} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white dark:bg-[#2e2b33] shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-center text-textMuted dark:text-gray-300 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white hover:border-transparent transition-all" title="GitHub">
                    <FaGithub size={18} />
                  </a>
                )}
                {profile.codingProfiles?.leetcode && (
                  <a href={profile.codingProfiles.leetcode} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white dark:bg-[#2e2b33] shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-center text-textMuted dark:text-gray-300 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white hover:border-transparent transition-all" title="LeetCode">
                    <SiLeetcode size={18} />
                  </a>
                )}
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="w-11 h-11 rounded-full bg-white dark:bg-[#2e2b33] shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-center text-textMuted dark:text-gray-300 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white hover:border-transparent transition-all" title="Email">
                    <FaEnvelope size={18} />
                  </a>
                )}
              </div>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 font-semibold rounded-lg shadow-sm text-black bg-[#FFC80A] hover:bg-yellow-500 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Download Resume <FaDownload size={14} className="ml-2" />
              </a>
            </div>
          </div>

          {/* Right Column: Hexagon Portrait & Details */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">

            {/* Hexagon Border Container */}
            {profile.profilePictureUrl && (
              <div className="w-64 h-64 md:w-72 md:h-72 bg-[#FFC80A] flex items-center justify-center shadow-lg transition-transform hover:scale-[1.02] duration-300" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <div className="w-[calc(100%-8px)] h-[calc(100%-8px)] bg-white dark:bg-[#211F24] flex items-center justify-center transition-colors duration-350" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  <img
                    src={profile.profilePictureUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Profile Meta Info */}
            <div className="text-center mt-6 space-y-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-textMain dark:text-white tracking-tight">
                {profile.name}
              </h2>
              {profile.localName && (
                <p className="text-lg text-textMuted dark:text-gray-400 font-medium">
                  {profile.localName}
                </p>
              )}
              {profile.username && (
                <p className="text-sm text-textMuted/80 dark:text-gray-500 font-normal">
                  {profile.username}
                </p>
              )}
              <div className="text-lg md:text-xl font-bold text-amber-500 pt-2 min-h-[2rem]">
                <ScrollRoles words={roles} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
