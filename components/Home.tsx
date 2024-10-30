'use client'
import '../app/animations.css'
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from './Navbar';
import Experience from './Experience';
function Home() {
    const [activeSection, setActiveSection] = useState("");

    const { ref: aboutRef, inView: isAboutInView } = useInView({
        threshold: 0.6,
        onChange: (inView) => {
        if (inView) setActiveSection("about");
        },
    });

    const { ref: contactRef, inView: isContactInView } = useInView({
        threshold: 0.6,
        onChange: (inView) => {
        if (inView) setActiveSection("contact");
        },
    });

    const { ref: skillRef, inView: isSkillInView } = useInView({
        threshold: 0.6,
        onChange: (inView) => {
        if (inView) setActiveSection("skill");
        },
    });
    
    const { ref: experienceRef, inView: isExperienceInView } = useInView({
        threshold: 0.6,
        onChange: (inView) => {
        if (inView) setActiveSection("experience");
        },
    });

    const { ref: projectRef, inView: isProjectInView } = useInView({
        threshold: 0.6,
        onChange: (inView) => {
        if (inView) setActiveSection("project");
        },
    });
    useEffect(() => {
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
        <Navbar currentSection={activeSection}/>
        <Hero aboutRef={aboutRef}/>
        <Skills skillRef={skillRef}/>
        <Experience experienceRef={experienceRef}/>
        <Projects projectRef={projectRef}/>
        <Contact contactRef={contactRef}/>
      </div>
    );
  }
  
export default Home;
