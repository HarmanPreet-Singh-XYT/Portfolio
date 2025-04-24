import React from 'react';
import { Code, Palette, ExternalLink, Github, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectCard({ project }) {
  const TypeIcon = project.type === 'development' ? Code : Palette;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                backdrop-blur-sm border border-gray-700/50 overflow-hidden
                hover:border-emerald-500/50 transition-all duration-500 h-full"
    >
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0.5 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 
                 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      ></div>
      
      <div className="relative p-5 md:p-6 flex flex-col h-full">
        {/* Project Type Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <TypeIcon className="text-emerald-400" size={20} aria-hidden="true" />
          </div>
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">
            {project.type}
          </span>
        </div>

        {/* Project Image */}
        <div className="aspect-video mb-5 overflow-hidden rounded-xl">
          <div className="relative w-full h-full">
            <Image
              src={`${project.image}`}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </div>

        {/* Project Info */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs md:text-sm bg-gray-800 text-gray-300
                       border border-gray-700 group-hover:border-emerald-500/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        {(project.links?.demo || project.links?.github || project.id) && (
          <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
            <div className="flex flex-wrap gap-4">
              {project.id && (
                <Link 
                  href={`/details/${project.id}`}
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  aria-label={`View details of ${project.title} project`}
                >
                  <ExternalLink size={18} aria-hidden="true" />
                  <span className="font-medium">Details</span>
                </Link>
              )}
              
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                  aria-label={`View source code for ${project.title} on GitHub`}
                >
                  <Github size={18} aria-hidden="true" />
                  <span className="font-medium">Source</span>
                </a>
              )}
            </div>
            
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors ml-auto"
                aria-label={`View live demo of ${project.title}`}
              >
                <MonitorSmartphone size={18} aria-hidden="true" />
                <span className="font-medium">Live Demo</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}