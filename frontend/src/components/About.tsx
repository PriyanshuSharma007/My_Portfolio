import React from 'react';
import useSWR from 'swr';
import type { Profile } from '../types';
import { User } from 'lucide-react';
import { API_BASE_URL } from '../config';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const About: React.FC = () => {
  const { data: profile, error } = useSWR<Profile>(`${API_BASE_URL}/api/profile`, fetcher);

  if (error || !profile) return null;

  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-12">
          <User className="text-accent w-8 h-8 mr-4" />
          <h2 className="text-3xl font-bold text-textMain tracking-tight">About Me</h2>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100">
          <p className="text-lg text-textMain leading-relaxed mb-6 font-medium">
            {profile.summary}
          </p>
          <div className="text-base text-textMuted leading-relaxed space-y-4">
            {profile.aboutText.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
