export default function Navbar({currentSection}:{currentSection:string}) {
    const scrollToSection = (section:string) => {
        document.getElementById(section)!.scrollIntoView({ behavior: "smooth" });
      };
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-gray-800/40 backdrop-blur-md rounded-full shadow-lg border border-gray-700 z-50">
      <ul className="flex space-x-6 text-white text-sm font-semibold">
        <li>
          <button onClick={() => scrollToSection('about')} className={`hover:text-[#4ade80] transition ${currentSection === 'about' ? 'text-emerald-400' : ''}`}>
            About
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('skills')} className={`hover:text-[#4ade80] transition ${currentSection === 'skill' ? 'text-emerald-400' : ''}`}>
            Skills
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('experience')} className={`hover:text-[#4ade80] transition ${currentSection === 'experience' ? 'text-emerald-400' : ''}`}>
            Experience
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('projects')} className={`hover:text-[#4ade80] transition ${currentSection === 'project' ? 'text-emerald-400' : ''}`}>
            Projects
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('contact')} className={`hover:text-[#4ade80] transition ${currentSection === 'contact' ? 'text-emerald-400' : ''}`}>
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
}
