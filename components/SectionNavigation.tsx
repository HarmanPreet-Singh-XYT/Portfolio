import React from 'react';
type section = {
  name:string;
  value:string;
}
type SectionNavigationProps = {
  sections: section[];
  activeSection:string;
}

export function SectionNavigation({ sections,activeSection }: SectionNavigationProps) {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <nav 
      className="block fixed right-8 top-1/2 transform -translate-y-1/2 z-50" 
      aria-label="Section navigation"
    >
      <ul className="flex flex-col gap-4">
        {sections.map((section) => (
          <li key={section.value}>
            <button
              onClick={() => {scrollToSection(`${section.name}`)}}
              className={`w-3 h-3 rounded-full ${(activeSection === section.value) ? 'bg-emerald-400' : 'bg-gray-600'} hover:bg-emerald-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black group relative`}
              aria-label={`Navigate to ${section.name} section`}
            >
              <span className="sr-only">{section.name}</span>
              <span className="absolute left-0 transform -translate-x-full -translate-y-1/4 px-2 py-1 bg-gray-800 text-emerald-400 text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap -ml-1">
                {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}