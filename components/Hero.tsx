'use client'
import React,{ useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Terminal, ArrowRight,Download } from 'lucide-react';
import { about } from '@/app/data';
interface Particle {
  x:string;
  y:string;
  duration:string;
}
export default function Hero({aboutRef}:{aboutRef:any}) {
  const [particles, setParticles] = useState<Particle[]>([]);

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
  const scrollToSection = (section:string) => {
    document.getElementById(section)!.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header ref={aboutRef} id='about-section' className="min-h-screen relative overflow-hidden flex items-center bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.15),_transparent_50%)]"></div>
      
      {/* Floating particles */}
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

      <div className="container mx-auto px-6 relative z-10 md:mt-0 mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="glitch-container mb-6">
            <h1 className="sm:text-7xl text-6xl font-bold glitch-text" data-text={about.name}>
              {about.name}
            </h1>
          </div>
          
          <div className="typewriter mb-8">
            <Terminal className="inline-block mr-2 text-emerald-400" size={20} />
            <span className="text-emerald-400 font-mono">~/</span>
            <span className="typing-text text-xl text-gray-300">
              {about.title}
            </span>
          </div>

          <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-3xl">
            {about.description}
          </p>

          <div className="flex justify-between sm:gap-6 sm:justify-normal mb-6 flex-nowrap">
            <a href={about.links.github} className="social-link">
              <Github size={24} />
              <span className="ml-2">GitHub</span>
            </a>
            <a href={about.links.linkedin} className="social-link">
              <Linkedin size={24} />
              <span className="ml-2">LinkedIn</span>
            </a>
            <a href={`mailto:${about.email}`} className="social-link">
              <Mail size={24} />
              <span className="ml-2">Email</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-4 mb-8">
              <button onClick={() => scrollToSection('contact-section')} className="btn-primary">
                <Mail size={20} />
                <span>Get in Touch</span>
                <ArrowRight size={16} />
              </button>
              <a href={about.links.resume} className="btn-secondary">
                <Download size={20} />
                <span>Download CV</span>
              </a>
            </div>
          <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="stat-card">
              <div className='flex justify-center'>
                <div className="text-4xl font-bold text-emerald-400 mb-2 counter" data-target={`${about.project.number}`}>{about.project.number}</div>
                {about.project.plus && <div className="text-4xl font-bold text-emerald-400 mb-2">+</div>}
              </div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className='flex'></div>
              <div className='flex justify-center'>
                <div className="text-4xl font-bold text-emerald-400 mb-2 counter" data-target={`${about.experience.number}`}>{about.experience.number}</div>
                {about.experience.plus && <div className="text-4xl font-bold text-emerald-400 mb-2">+</div>}
              </div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            {/* <div className="stat-card">
              <div className="text-4xl font-bold text-emerald-400 mb-2 counter" data-target="50">0</div>
              <div className="text-gray-400">Clients Worldwide</div>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}