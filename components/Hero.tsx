'use client'
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Github, Linkedin, Mail, Terminal, ArrowRight, Download, ChevronDown } from 'lucide-react';
import { about } from '@/app/data';
import { SectionNavigation } from './Hero/SectionNavigation';
import { AnimatedCounter } from './Hero/AnimatedCounter';

// Types
interface HeroProps {
  aboutRef: any;
  sections?: string[];
}

interface Particle {
  x: string;
  y: string;
  duration: string;
}

export default function Hero({ aboutRef, sections = ['about', 'skills', 'experience', 'projects', 'education', 'services', 'contact'] }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Optimize with useMemo for stats data
  const statsData = useMemo(() => [
    {
      value: 1000,
      label: "Active App Users",
      plus: about.experience.plus
    },
    {
      value: about.project.number,
      label: "Projects Completed",
      plus: about.project.plus
    },
    {
      value: about.experience.number,
      label: "Years Experience",
      plus: about.experience.plus
    },
    {
      value: 5,
      label: "Hackathons",
      plus: about.experience.plus
    },
    {
      value: 5,
      label: "Certifications",
      plus: about.experience.plus
    },


  ], []);

  // Generate particles on mount (from original code)
  useEffect(() => {
    // Generate particle data only on the client side after mount
    setParticles(
      Array.from({ length: 50 }, () => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        duration: `${3 + Math.random() * 4}s`,
      }))
    );
  }, []);

  // Handle animations on mount
  useEffect(() => {
    // Stagger animations for visual appeal
    const animationTimer = setTimeout(() => setIsLoaded(true), 100);
    
    // Clean up timer
    return () => clearTimeout(animationTimer);
  }, []);

  // Navigation helper
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      ref={aboutRef} 
      id="about" 
      className="min-h-screen relative overflow-hidden flex items-center bg-black"
      aria-labelledby="hero-heading"
    >
      {/* SEO improvements - structured metadata */}
      <div className="sr-only">
        <h1 id="hero-heading">{about.name} - {about.title}</h1>
        <p>{about.description}</p>
        <ul>
          {sections.map(section => (
            <li key={section}>{section} section</li>
          ))}
        </ul>
      </div>

      {/* Background elements from original code */}
      <div aria-hidden="true">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.15),_transparent_50%)]"></div>
        
        {/* Floating particles from original code */}
        <div className="particle-container absolute inset-0">
          {particles.map((particle, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                '--x': particle.x,
                '--y': particle.y,
                '--duration': particle.duration,
              } as React.CSSProperties}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-0">
        <div className="max-w-4xl mx-auto">
          {/* Name with glitch effect */}
          <div className={`glitch-container mb-6 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <h2 
              className="sm:text-7xl text-5xl font-bold glitch-text text-white" 
              data-text={about.name}
              aria-label={about.name}
            >
              {about.name}
            </h2>
          </div>
          
          {/* Title with typewriter effect */}
          <div className={`typewriter flex items-center mb-6 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Terminal className="inline-block mr-2 text-emerald-400" size={20} aria-hidden="true" />
            <span className="text-emerald-400 font-mono">~/</span>
            <div className="typing-text-container overflow-hidden">
              <span className="typing-text text-lg sm:text-xl text-gray-300">
                {about.title}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className={`text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {about.description}
          </p>

          {/* Social links */}
          <div className={`flex flex-wrap sm:flex-nowrap gap-5 sm:gap-6 mb-8 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <SocialLink 
              href={about.links.github}
              icon={<Github size={22} />}
              label="GitHub"
              ariaLabel="GitHub Profile"
            />
            <SocialLink 
              href={about.links.linkedin}
              icon={<Linkedin size={22} />}
              label="LinkedIn"
              ariaLabel="LinkedIn Profile"
            />
            <SocialLink 
              href={`mailto:${about.email}`}
              icon={<Mail size={22} />}
              label="Email"
              ariaLabel="Email Contact"
            />
          </div>

          {/* CTA buttons */}
          <div className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button 
              onClick={() => scrollToSection('contact-section')} 
              className="btn-primary group flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black active:translate-y-0.5"
              aria-label="Contact me"
            >
              <Mail size={18} />
              <span>Get in Touch</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <a 
              href={about.links.resume} 
              className="btn-secondary group flex items-center gap-2 px-5 py-3 bg-transparent hover:bg-gray-800 text-white border border-gray-700 hover:border-emerald-500/50 font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black active:translate-y-0.5"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Download CV"
            >
              <Download size={18} />
              <span>Download CV</span>
            </a>
          </div>

          {/* Stats grid */}
          <div 
            ref={statsRef} 
            className={`stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            aria-label="Professional statistics"
          >
            {statsData.map((stat, index) => (
              <StatCard 
                key={index}
                value={stat.value}
                label={stat.label}
                plus={stat.plus}
              />
            ))}
            
            <div className="hidden lg:block stat-card bg-gray-900/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 group hover:scale-105">
              <div className="flex justify-center items-center h-full">
                <button 
                  onClick={() => scrollToSection('skills')}
                  className="flex flex-col items-center text-gray-300 group-hover:text-emerald-400 transition-colors duration-300 w-full h-full"
                  aria-label="View my skills"
                >
                  <span className="text-xl font-medium mb-2">View Skills</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SectionNavigation sections={sections}/>
      {/* Scroll indicator */}
      <button 
        onClick={() => scrollToSection('skills')}
        className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center animate-bounce text-gray-400 hover:text-emerald-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black rounded-full p-1"
        aria-label="Scroll to skills section"
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <ChevronDown size={20} />
      </button>

      {/* CSS animations */}
      <style jsx>{`
        /* Particle animation from original code */
        .particle-container {
          pointer-events: none;
          z-index: 1;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: float var(--duration) infinite ease-in-out;
          left: var(--x);
          top: var(--y);
          opacity: 0.6;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(calc(var(--x) - 50%), calc(var(--y) - 50%));
          }
          25% {
            transform: translate(calc(var(--x) - 50% + 30px), calc(var(--y) - 50% - 30px));
          }
          50% {
            transform: translate(calc(var(--x) - 50% + 10px), calc(var(--y) - 50% + 40px));
          }
          75% {
            transform: translate(calc(var(--x) - 50% - 20px), calc(var(--y) - 50% + 20px));
          }
        }
        
        /* Optimized animations */
        .typing-text-container {
          display: inline-block;
          max-width: 100%;
        }
        
        .typing-text {
          display: inline-block;
          border-right: 2px solid rgba(74, 222, 128, 0.7);
          animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
          white-space: nowrap;
          overflow: hidden;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: rgba(74, 222, 128, 0.7) }
        }
        
        .glitch-text {
          position: relative;
          display: inline-block;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 #ff00c1;
          animation: glitch-anim-1 2s infinite linear alternate-reverse;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          opacity: 0.8;
        }
        
        .glitch-text::after {
          left: -2px;
          text-shadow: 2px 0 #00fff9;
          animation: glitch-anim-2 2s infinite linear alternate-reverse;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          opacity: 0.8;
        }
        
        @keyframes glitch-anim-1 {
          0% { clip-path: polygon(0 0, 100% 0, 100% 25%, 0 25%); }
          100% { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); }
        }
        
        @keyframes glitch-anim-2 {
          0% { clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%); }
          100% { clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); }
        }
      `}</style>
    </header>
  );
}

// Extracted components for better organization and reusability

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  ariaLabel: string;
}

function SocialLink({ href, icon, label, ariaLabel }: SocialLinkProps) {
  return (
    <a 
      href={href} 
      className="social-link group flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 transition-all duration-300"
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <span className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <span className="ml-2 hidden sm:inline">{label}</span>
    </a>
  );
}

type StatCardProps = {
  value: number;
  label: string;
  plus?: boolean;
}

function StatCard({ value, label, plus = false }: StatCardProps) {
  return (
    <div className="stat-card bg-gray-900/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 hover:scale-105">
      <div className="flex justify-center">
        <AnimatedCounter 
          targetValue={value} 
          className="text-4xl font-bold text-emerald-400 mb-2" 
        />
        {plus && <div className="text-4xl font-bold text-emerald-400 mb-2">+</div>}
      </div>
      <div className="text-gray-300 text-center font-medium">{label}</div>
    </div>
  );
}