import React, { useRef, useCallback } from 'react';
import { GraduationCap, Calendar, MapPin, Award, ExternalLink } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { education } from '@/app/data';

// Separate component for better modularity
const TimelineNode = ({ isLatest, isVisible }) => (
  <div 
    className={`absolute left-7 top-0 w-3 h-3 rounded-full transform -translate-x-1/2 
              hidden md:block ${isLatest ? 'bg-emerald-400' : 'bg-gray-400'}`}
    aria-hidden="true"
  >
    {isLatest && (
      <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400/70"></span>
    )}
    <span className={`absolute inset-0 rounded-full ring-4 ${
      isLatest ? 'ring-emerald-400/30' : 'ring-gray-400/20'
    }`}></span>
  </div>
);

// Card component for each education item
const EducationCard = ({ education: edu, index, isVisible, total }) => {
  // Use separate InView for each card for more precise animations
  const { ref, inView: cardInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Determine if this is the latest education (for highlighting)
  const isLatest = index === 0;
  
  return (
    <div 
      ref={ref}
      className={`relative md:pl-24 transition-all duration-700 ease-out ${
        cardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline node */}
      <TimelineNode isLatest={isLatest} isVisible={cardInView} />

      <div 
        className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 group
                  ${isLatest 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/90 border-emerald-500/40 hover:border-emerald-400/60 shadow-lg shadow-emerald-900/10' 
                    : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-500/60'}`}
        tabIndex={0}
      >
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
          <div className={`p-3 rounded-lg shrink-0 transition-all duration-300 ${
            isLatest ? 'bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30' : 'bg-gray-700/50 text-gray-300 group-hover:bg-gray-700/70'
          }`}>
            <GraduationCap size={24} aria-hidden="true" className="transition-transform group-hover:scale-110" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors flex items-center">
              <span>{edu.degree}</span>
              {edu.url && (
                <a 
                  href={edu.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center ml-2 text-emerald-400 hover:text-emerald-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-full"
                  aria-label={`View more information about ${edu.degree} at ${edu.school}`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </h3>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2" title="Duration">
                <Calendar size={16} className={`${isLatest ? 'text-emerald-400' : 'text-gray-400'} transition-colors group-hover:text-emerald-400`} 
                aria-hidden="true" />
                <span>{edu.period}</span>
              </div>
              <div className="flex items-center gap-2" title="Location">
                <MapPin size={16} className={`${isLatest ? 'text-emerald-400' : 'text-gray-400'} transition-colors group-hover:text-emerald-400`} 
                aria-hidden="true" />
                <span>{edu.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-lg md:text-xl font-semibold text-white/90 group-hover:text-white transition-colors">{edu.school}</span>
            {edu.gpa && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block transition-colors ${
                isLatest ? 'bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500/25' : 'bg-gray-700/70 text-gray-300 group-hover:bg-gray-700'
              }`}>
                GPA: {edu.gpa}
              </span>
            )}
          </div>
          
          {edu.honors && edu.honors.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1" aria-label="Honors and awards">
              {edu.honors.map((honor, i) => (
                <div 
                  key={i}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm
                           transition-all duration-300 ${
                             isLatest 
                              ? 'bg-blue-500/10 text-blue-300 hover:bg-blue-500/20' 
                              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                           }`}
                >
                  <Award size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-110" />
                  <span>{honor}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {edu.highlights && edu.highlights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-gray-300 font-medium mb-2">Key Achievements</h4>
            <ul className="space-y-3" aria-label={`Highlights of education at ${edu.school}`}>
              {edu.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-all ${
                    isLatest ? 'bg-emerald-400 group-hover:bg-emerald-300' : 'bg-gray-400 group-hover:bg-gray-300'
                  }`}></span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Education() {
  // For page section navigation and SEO
  const sectionRef = useRef(null);
  
  // Animation with IntersectionObserver for better performance
  const { ref: animationRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  // Create JSON-LD structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': education.map((edu, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'item': {
        '@type': 'EducationalOccupationalCredential',
        'name': edu.degree,
        'educationalLevel': 'Degree',
        'credentialCategory': edu.degree,
        'dateCreated': edu.period.split('-')[0].trim(), // Extract start year
        'provider': {
          '@type': 'EducationalOrganization',
          'name': edu.school,
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': edu.location
          }
        }
      }
    }))
  };

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="py-20 md:py-32 relative bg-black"
      aria-labelledby="education-heading"
    >
      {/* Structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      {/* Enhanced gradient backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(74,222,128,0.08),_transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(59,130,246,0.05),_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <h2 
            id="education-heading"
            className="text-4xl md:text-5xl font-bold mb-3 inline-block"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
              Education
            </span>
          </h2>
          
          <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto">
            Academic excellence and continuous learning have been the foundation of my professional journey
          </p>
        </div>

        {/* Section navigation links for site structure */}
        <nav className="hidden lg:flex justify-center mb-12 text-sm" aria-label="Section navigation">
          <ul className="flex gap-6 bg-gray-800/50 rounded-full px-6 py-2 backdrop-blur-sm border border-gray-700/30">
            <li><a href="#experience" className="text-gray-400 hover:text-white transition-colors">Previous: Experience</a></li>
            <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Previous: Projects</a></li>
            <li><a href="#services" className="text-emerald-400 hover:text-emerald-300 transition-colors">Next: Services</a></li>
          </ul>
        </nav>

        {/* Animation container with refined animation sequence */}
        <div 
          ref={animationRef}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-8 md:space-y-12 relative">
            {/* Timeline line with gradient animation */}
            <div className="absolute left-7 top-3 bottom-3 w-px bg-gradient-to-b from-emerald-500/40 via-teal-500/40 to-blue-500/40 hidden md:block" aria-hidden="true">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/0 via-emerald-400/50 to-emerald-400/0 h-24 animate-pulse-slow"></div>
            </div>
            
            {education.map((edu, idx) => (
              <EducationCard 
                key={edu.school + edu.degree}
                education={edu}
                index={idx}
                isVisible={inView}
                total={education.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}