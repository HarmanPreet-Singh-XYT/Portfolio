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
import Education from './Education';
import { SectionNavigation } from './SectionNavigation';
import { useSearchParams } from 'next/navigation';
function Home() {
    const [activeSection, setActiveSection] = useState("");
    const searchParams = useSearchParams();
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

    const { ref: educationeRef, inView: isEducationInView } = useInView({
        threshold: 0.6,
        onChange: (inView) => {
        if (inView) setActiveSection("education");
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
      const projects = searchParams.get('projects');
      if (projects !== null){
        scrollToSection("projects");
      }
    }, []);
    const sections = [
      {
        name:"about",
        value:"about"
      },
      {
        name:"skills",
        value:"skill"
      },
      {
        name:"experience",
        value:"experience"
      },
      {
        name:"projects",
        value:"project"
      },
      {
        name:"education",
        value:"education"
      },
      {
        name:"contact",
        value:"contact"
      }
    ]
    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar currentSection={'home'}/>
        <SectionNavigation sections={sections} activeSection={activeSection}/>
        <Hero aboutRef={aboutRef}/>
        <Skills skillRef={skillRef}/>
        <Experience experienceRef={experienceRef}/>
        <Projects projectRef={projectRef}/>
        <Education educationRef={educationeRef}/>
        {/* <Services/> */}
        <Contact contactRef={contactRef}/>
      </div>
    );
  }
  
export default Home;
