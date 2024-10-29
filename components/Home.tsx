'use client'
import '../app/animations.css'
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import React from 'react';
function Home() {
    React.useEffect(() => {
      // Counter animation
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
  
        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current).toString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toString();
          }
        };
  
        updateCounter();
      });
    }, []);
  
    return (
      <div className="min-h-screen bg-black text-white">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </div>
    );
  }
  
  export default Home;