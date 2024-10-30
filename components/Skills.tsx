import React from 'react';
import { additionalSkills, skillCategories } from '@/app/data';
export default function Skills({skillRef}:{skillRef:any}) {
  return (
    <section className="py-32 relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.1),_transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <h2 className="text-5xl font-bold mb-4 text-center">
          <span ref={skillRef} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Technical Expertise
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          A comprehensive toolkit built over years of hands-on experience in software development and architecture
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx}
              className="group relative"
              style={{ '--delay': `${idx * 0.1}s` } as React.CSSProperties}
            >
              <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                           hover:border-emerald-500/50 transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                    <p className="text-gray-400 text-sm">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium 
                        ${skill.level === 'Expert' ? 'bg-emerald-500/20 text-emerald-400' :
                          skill.level === 'Advanced' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-700/50 text-gray-400'}`}>
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalSkills.map((category, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                       hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-full text-sm bg-gray-900/50 text-gray-300 
                             border border-gray-700/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}