import React from 'react';
import { Code, Palette, ExternalLink, Github } from 'lucide-react';
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
        <p className="text-gray-400 text-center mb-12">Showcasing some of my best work in development and design</p>

        <div ref={projectRef} className="flex justify-center gap-4 mb-12">
          {['all', 'development', 'design'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-emerald-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm 
                         border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-500"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {project.type.includes('development') ? (
                      <Code className="text-emerald-400" size={20} />
                    ) : (
                      <Palette className="text-emerald-400" size={20} />
                    )}
                    <span className="text-emerald-400 text-sm uppercase tracking-wider">
                      {project.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="xl:flex flex-wrap gap-2 mb-4 hidden">
                    {project.tech.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(project.links.github || project.links.demo) && (<div className="flex gap-4">
                    {project.links.demo && (<a
                      href={project.links.demo}
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>)}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <Github size={18} />
                        <span>Source</span>
                      </a>
                    )}
                  </div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}