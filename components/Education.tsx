import React from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { education } from '@/app/data';


export default function Education() {
  return (
    <section className="py-32 relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.1),_transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <h2 className="text-5xl font-bold mb-4 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Education
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Academic excellence and continuous learning have been the foundation of my professional journey
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {education.map((edu, idx) => (
              <div 
                key={idx}
                className="relative pl-24 education-card"
                style={{ '--delay': `${idx * 0.2}s` } as React.CSSProperties}
              >
                {/* Timeline dot */}
                <div className="absolute left-7 top-0 w-3 h-3 bg-emerald-400 rounded-full transform -translate-x-1/2 
                              ring-4 ring-emerald-400/30"></div>

                <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                              hover:border-emerald-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                      <div className="flex flex-wrap gap-4 text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-emerald-400" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-emerald-400" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-semibold text-white">{edu.school}</span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
                        GPA: {edu.gpa}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.honors.map((honor, i) => (
                        <div 
                          key={i}
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm"
                        >
                          <Award size={14} />
                          <span>{honor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2"></span>
                        <span className="text-gray-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}