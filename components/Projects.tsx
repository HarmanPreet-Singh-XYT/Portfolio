import React from 'react';
import { Code, Palette, ExternalLink, Github, ArrowRight, MonitorSmartphone } from 'lucide-react';
import { projects } from '../app/data';

export default function Projects({projectRef}:{projectRef:any}) {
  const [activeFilter, setActiveFilter] = React.useState('all');

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.type.includes(activeFilter)
  );

  return (
    <section id='project-section' className="py-32 relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.1),_transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <h2 className="text-5xl font-bold mb-4 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Featured Work
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          A showcase of innovative solutions and creative designs that demonstrate my expertise in building scalable, user-centric applications
        </p>

        <div ref={projectRef} className="flex justify-center gap-4 mb-16">
          <div className="p-1 bg-gray-800/50 backdrop-blur-sm rounded-full">
            {['all', 'development', 'design'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-black shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                       backdrop-blur-sm border border-gray-700/50 overflow-hidden
                       hover:border-emerald-500/50 transition-all duration-500"
            >
              <div className="absolute inset-0.5 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 
                           group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    {project.type === 'development' ? (
                      <Code className="text-emerald-400" size={20} />
                    ) : (
                      <Palette className="text-emerald-400" size={20} />
                    )}
                  </div>
                  <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">
                    {project.type}
                  </span>
                </div>

                <div className="aspect-[16/9] mb-6 overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300
                               border border-gray-700 group-hover:border-emerald-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {(project.links.demo || project.links.github || project.id) && <div className="flex items-center justify-between gap-6">
                  <div className='flex gap-5'>
                    {(project.links.demo || project.id) && <a
                      href={`details/${project.id}`}
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span className="font-medium">View Project</span>
                      <ArrowRight size={16} />
                    </a>}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Github size={18} />
                        <span className="font-medium">Source Code</span>
                      </a>
                    )}
                  </div>
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <MonitorSmartphone size={18} />
                      <span className="font-medium">Demo</span>
                    </a>
                  )}
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}