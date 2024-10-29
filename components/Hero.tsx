'use client'
import React,{ useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Terminal, File } from 'lucide-react';

interface Particle {
  x:string;
  y:string;
  duration:string;
}
export default function Hero() {
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
  return (
    <header className="min-h-screen relative overflow-hidden flex items-center bg-black">
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glitch-container mb-6">
            <h1 className="text-7xl font-bold glitch-text" data-text="Harmanpreet Singh">
              Harmanpreet Singh
            </h1>
          </div>
          
          <div className="typewriter mb-8">
            <Terminal className="inline-block mr-2 text-emerald-400" size={20} />
            <span className="text-emerald-400 font-mono">~/</span>
            <span className="typing-text text-xl text-gray-300">
              Software Engineer
            </span>
          </div>

          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl">
            Crafting seamless solutions that blend FullStack expertise, DevOps, Mobile Development, and thoughtful UI/UX. Specialized in building responsive, high-performance applications and infrastructure that drive exceptional user experiences across platforms.
          </p>

          <div className="flex gap-6 mb-16">
            <a href="https://github.com/HarmanPreet-Singh-XYT" className="social-link">
              <Github size={24} />
              <span className="ml-2">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/harman-developer/" className="social-link">
              <Linkedin size={24} />
              <span className="ml-2">LinkedIn</span>
            </a>
            <a href="mailto:harmanpreetsingh@programmer.net" className="social-link">
              <Mail size={24} />
              <span className="ml-2">Email</span>
            </a>
            <a href="https://drive.google.com/file/d/1TYSGvauyGVUJO2fp3WflwWhGmAWS7R9z/view?usp=sharing" className="social-link">
              <File size={24} />
              <span className="ml-2">CV</span>
            </a>
          </div>

          <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="stat-card">
              <div className='flex justify-center'>
                <div className="text-4xl font-bold text-emerald-400 mb-2 counter" data-target="10+">10</div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">+</div>
              </div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className='flex'></div>
              <div className='flex justify-center'>
                <div className="text-4xl font-bold text-emerald-400 mb-2 counter" data-target="1">1</div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">+</div>
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