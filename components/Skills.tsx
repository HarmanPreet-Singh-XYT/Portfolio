import React, { useEffect, useState } from 'react';
import { additionalSkills, skillCategories } from '@/app/data';
import { motion } from 'framer-motion';

export default function Skills({ skillRef }) {
  const [activeTab, setActiveTab] = useState('all');
  const [filteredCategories, setFilteredCategories] = useState(skillCategories);
  const [showAllAdditional, setShowAllAdditional] = useState(false);
  
  // Filter skills based on active tab
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredCategories(skillCategories);
    } else {
      setFilteredCategories(
        skillCategories.filter(category => 
          category.type === activeTab || category.title.toLowerCase().includes(activeTab)
        )
      );
    }
  }, [activeTab]);
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.animate-on-scroll').forEach(item => {
      observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, [filteredCategories]);

  return (
    <section 
      id="skills" 
      className="py-24 md:py-32 relative bg-black"
      aria-labelledby="skills-heading"
    >
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(74,222,128,0.12),_transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(59,130,246,0.12),_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* Heading with animation */}
          <motion.h2 
            id="skills-heading"
            ref={skillRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
              Technical Expertise
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 text-center mb-8 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            A comprehensive toolkit built over years of hands-on experience in software development, 
            architecture, and technical leadership.
          </motion.p>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black
                ${activeTab === 'all' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/70'}`}
              aria-pressed={activeTab === 'all'}
            >
              All Skills
            </button>
            {['frontend', 'backend', 'devops', 'tools'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black
                  ${activeTab === tab 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/70'}`}
                aria-pressed={activeTab === tab}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {filteredCategories.map((category, idx) => (
            <motion.div 
              key={category.title}
              className="group animate-on-scroll opacity-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div 
                className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                           hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 
                           transition-all duration-300 h-full"
                tabIndex={0}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 
                               group-hover:bg-emerald-500/20 transition-all duration-300">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <div 
                      key={skill.name} 
                      className="flex items-center justify-between gap-4 group/skill"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300 group-hover/skill:text-white transition-colors duration-200">
                          {skill.name}
                        </span>
                        {/* {skill.certification && (
                          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                            Certified
                          </span>
                        )} */}
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Visual skill level indicator */}
                        <div className="hidden md:flex items-center gap-1">
                          {[...Array(5)].map((_, dotIdx) => (
                            <div 
                              key={dotIdx}
                              className={`h-1.5 w-1.5 rounded-full transition-all duration-300
                                ${skill.level === 'Expert' && dotIdx < 5 ? 'bg-emerald-400' :
                                  skill.level === 'Advanced' && dotIdx < 4 ? 'bg-blue-400' :
                                  skill.level === 'Intermediate' && dotIdx < 3 ? 'bg-yellow-400' :
                                  skill.level === 'Basic' && dotIdx < 2 ? 'bg-gray-400' :
                                  'bg-gray-700'}`}
                            />
                          ))}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
                          ${skill.level === 'Expert' 
                            ? 'bg-emerald-500/20 text-emerald-400 group-hover/skill:bg-emerald-500/30' :
                            skill.level === 'Advanced' 
                            ? 'bg-blue-500/20 text-blue-400 group-hover/skill:bg-blue-500/30' :
                            skill.level === 'Intermediate'
                            ? 'bg-yellow-500/20 text-yellow-400 group-hover/skill:bg-yellow-500/30' :
                            'bg-gray-700/50 text-gray-400 group-hover/skill:bg-gray-700/70'}`}>
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ENHANCED Additional Skills Section */}
        <div className="mt-20 mb-6">
          <motion.h3 
            className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Additional Competencies
          </motion.h3>
          
          {/* First row as featured additional skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {additionalSkills.slice(0, 2).map((category, idx) => (
              <motion.div 
                key={category.title}
                className="animate-on-scroll opacity-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm 
                             border border-gray-700/50 hover:border-blue-500/50 hover:shadow-lg 
                             hover:shadow-blue-500/10 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-blue-500/15 text-blue-400 group-hover:bg-blue-500/20 transition-all duration-300">
                      {category.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white">
                      {category.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1.5 rounded-full text-sm bg-gray-800/80 text-gray-300 
                               border border-gray-700/50 hover:border-blue-400/50 hover:bg-gray-700/70
                               transition-all duration-300 hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Remaining additional skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalSkills.slice(2).map((category, idx) => (
              <motion.div 
                key={category.title}
                className="animate-on-scroll opacity-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-5 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                           hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 
                           transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      {category.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      {category.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm bg-gray-900/70 text-gray-300 
                               border border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-800/70
                               transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Experience metrics - NEW SECTION */}
        <div className="mt-20 mb-12 py-12 px-6 rounded-2xl bg-gray-900/50 border border-gray-800/50">
          <motion.h3 
            className="text-2xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Technical Experience Metrics
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1+", label: "Years of Experience", icon: "⏱️" },
              { value: "10+", label: "Projects Completed", icon: "🚀" },
              { value: "15+", label: "Technologies Mastered", icon: "⚙️" },
              { value: "100K+", label: "Lines of Code", icon: "💻" }
            ].map((metric, idx) => (
              <motion.div 
                key={idx}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl mb-3">{metric.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-gray-400">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        {/* <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <a 
              href="#experience" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium text-lg
                     hover:from-emerald-600 hover:to-blue-600 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black
                     shadow-lg shadow-emerald-500/20"
              aria-label="See my professional experience"
            >
              View Professional Experience
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </div> */}
      </div>
      
      {/* Schema markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": skillCategories.map((category, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": category.title,
            "description": category.description
          }))
        })
      }} />
    </section>
  );
}