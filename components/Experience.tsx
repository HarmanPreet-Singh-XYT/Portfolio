import React, { useState, useEffect, useCallback, memo } from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink, Award, ArrowDownCircle } from 'lucide-react';
import { experiences } from '../app/data.js';

// Memoized Card component for better performance
const ExperienceCard = memo(({ experience, index, isVisible }:{experience:any,index:number,isVisible:boolean}) => {
  return (
    <div 
      className={`relative pl-8 md:pl-24 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 0.15}s` }}
      data-testid="experience-card"
    >
      {/* Timeline dot with animated pulse effect */}
      <div className="absolute left-3 md:left-8 top-0 w-3 h-3 bg-emerald-400 rounded-full transform -translate-x-1/2 
                   ring-4 ring-emerald-400/30 animate-pulse"></div>

      <div className="p-5 md:p-6 lg:p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                   hover:border-emerald-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-emerald-500/10">
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
            {experience.title}
          </h3>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
            {experience.company}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
          <div className="flex items-center gap-2" title="Duration">
            <Calendar size={16} className="text-emerald-400" />
            <span>{experience.period}</span>
          </div>
          <div className="flex items-center gap-2" title="Location">
            <MapPin size={16} className="text-emerald-400" />
            <span>{experience.location}</span>
          </div>
          {experience.type && (
            <div className="flex items-center gap-2" title="Employment Type">
              <Briefcase size={16} className="text-emerald-400" />
              <span>{experience.type}</span>
            </div>
          )}
          {experience.achievements && (
            <div className="flex items-center gap-2" title="Key Achievement">
              <Award size={16} className="text-emerald-400" />
              <span>{experience.achievements}</span>
            </div>
          )}
        </div>

        <ul className="space-y-3 mb-4 list-none">
          {experience.description.map((item, i) => (
            <li key={i} className="flex items-start gap-3 group/item hover:text-white transition-colors duration-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform"></span>
              <span className="text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
        
        {experience.skills && (
          <div className="mt-5">
            <p className="text-sm text-gray-400 mb-2">Skills & Technologies</p>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-2 py-1 text-xs rounded-md bg-gray-700/50 text-gray-300 hover:bg-emerald-900/30 hover:text-emerald-300 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {experience.url && (
          <a 
            href={experience.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition-colors group/link"
            aria-label={`Learn more about my role at ${experience.company}`}
          >
            Learn more <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
});

// For better developer experience, add display name
ExperienceCard.displayName = 'ExperienceCard';

export default function Experience({ experienceRef }) {
  const [visibleCards, setVisibleCards] = useState([]);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const visibleExperiences = showAllExperiences ? experiences : experiences.slice(0, 3);
  
  // Memoize the intersection observer callback for performance
  const observerCallback = useCallback((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-index'));
        setVisibleCards(prev => {
          if (!prev.includes(index)) {
            return [...prev, index];
          }
          return prev;
        });
      }
    });
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { 
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px' 
    });
    
    // Use a small timeout to ensure the DOM is ready
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('#experience-timeline > div');
      elements.forEach(el => observer.observe(el));
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [observerCallback, showAllExperiences]);

  return (
    <section 
      ref={experienceRef} 
      id="experience" 
      className="py-20 md:py-32 relative bg-black scroll-mt-20"
      aria-labelledby="experience-heading"
    >
      {/* Enhanced gradient background with subtle animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.1),_transparent_50%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-3 block">
            Professional Journey
          </span>
          <h2 
            id="experience-heading" 
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Work Experience
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:w-4/5 mx-auto">
            A timeline of my professional roles that have shaped my expertise and contributed to my growth as a developer
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Enhanced timeline line with gradient and animation */}
            <div className="absolute left-3 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-emerald-400 to-blue-500 opacity-70"></div>
            <div className="absolute left-3 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-emerald-400 to-blue-500 opacity-30 animate-pulse"></div>

            {/* Experience cards */}
            <div className="space-y-12" id="experience-timeline">
              {visibleExperiences.map((exp, idx) => (
                <div key={idx} data-index={idx}>
                  <ExperienceCard 
                    experience={exp} 
                    index={idx}
                    isVisible={visibleCards.includes(idx)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Show more/less button when experiences are more than 3 */}
        {experiences.length > 3 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAllExperiences(prev => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 
                      text-emerald-400 font-medium transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              aria-expanded={showAllExperiences}
              aria-controls="experience-timeline"
            >
              {showAllExperiences ? 'Show Less' : `Show All (${experiences.length})`}
              <ArrowDownCircle 
                size={18} 
                className={`transition-transform duration-300 ${showAllExperiences ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>
        )}
        
        {/* <div className="mt-16 text-center">
          <p className="text-gray-400">
            Want to see my complete work history? Check out my
            <a 
              href="https://linkedin.com/in/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium mx-1 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded"
              aria-label="View my LinkedIn profile"
            >
              LinkedIn profile
            </a>
            for more details.
          </p>
        </div> */}

        {/* Navigation link to next section */}
        <div className="mt-16 text-center">
          <a 
            href="#projects" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors duration-300"
            aria-label="Navigate to Projects section"
          >
            <span>View My Projects</span>
            <ArrowDownCircle size={16} className="animate-bounce" />
          </a>
        </div>
      </div>

      {/* Schema.org structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": experiences.map((exp, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "WorkExperience",
              "name": exp.title,
              "description": exp.description.join(" "),
              "organization": {
                "@type": "Organization",
                "name": exp.company
              },
              "startDate": exp.period.split(" - ")[0],
              "endDate": exp.period.split(" - ")[1] || "Present",
              "location": exp.location
            }
          }))
        })
      }} />
    </section>
  );
}