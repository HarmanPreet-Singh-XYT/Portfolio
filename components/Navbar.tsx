export default function Navbar({currentSection}:{currentSection:string}) {
    const scrollToSection = (section:string) => {
        document.getElementById(section)!.scrollIntoView({ behavior: "smooth" });
      };
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-gray-800/40 backdrop-blur-md rounded-full shadow-lg border border-gray-700 z-50">
      <ul className="flex space-x-6 text-white text-sm font-semibold">
        <li>
          <button onClick={() => scrollToSection('about-section')} className={`hover:text-[#4ade80] transition ${currentSection === 'about' ? 'text-emerald-400' : ''}`}>
            About
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('skills-section')} className={`hover:text-[#4ade80] transition ${currentSection === 'skill' ? 'text-emerald-400' : ''}`}>
            Skills
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('project-section')} className={`hover:text-[#4ade80] transition ${currentSection === 'project' ? 'text-emerald-400' : ''}`}>
            Projects
          </button>
        </li>
        {/* <li>
          <button href="/contact" className="hover:text-gray-300 transition">
            Experience
          </button>
        </li> */}
        <li>
          <button onClick={() => scrollToSection('contact-section')} className={`hover:text-[#4ade80] transition ${currentSection === 'contact' ? 'text-emerald-400' : ''}`}>
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
}
