import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import {experiences} from '../app/data.js';


export default function Experience({experienceRef}:{experienceRef:any}) {
  return (
    <section ref={experienceRef} id='experience-section' className="py-32 relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.1),_transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <h2 className="text-5xl font-bold mb-4 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Experience Journey
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-16">Blocks of development and in hand experience with learning</p>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 to-blue-500"></div>

            {/* Experience cards */}
            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <div 
                  key={idx}
                  className="relative pl-24 experience-card"
                  style={{ '--delay': `${idx * 0.2}s` } as React.CSSProperties}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 top-0 w-3 h-3 bg-emerald-400 rounded-full transform -translate-x-1/2 
                                ring-4 ring-emerald-400/30"></div>

                  <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                                hover:border-emerald-500/50 transition-all duration-300">
                    <div className="flex flex-wrap gap-4 items-center mb-4">
                      <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
                        {exp.company}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-emerald-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-emerald-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2"></span>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}