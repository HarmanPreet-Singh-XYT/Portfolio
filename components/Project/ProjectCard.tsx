import React from 'react';
import { Code, Palette, ExternalLink, Github, MonitorSmartphone, Brush, Calendar, Download, Eye, Layers, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectCardData } from '@/types/app';
import { useRouter } from 'next/navigation';

// export default function ProjectCard({ project }) {
//   const TypeIcon = project.type === 'development' ? Code : Palette;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="group relative rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 
//                 backdrop-blur-sm border border-gray-700/50 overflow-hidden
//                 hover:border-emerald-500/50 transition-all duration-500 h-full"
//     >
//       {/* Hover glow effect */}
//       <div 
//         className="absolute inset-0.5 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 
//                  group-hover:opacity-100 transition-opacity duration-500"
//         aria-hidden="true"
//       ></div>
      
//       <div className="relative p-5 md:p-6 flex flex-col h-full">
//         {/* Project Type Badge */}
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 rounded-lg bg-emerald-500/10">
//             <TypeIcon className="text-emerald-400" size={20} aria-hidden="true" />
//           </div>
//           <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">
//             {project.type}
//           </span>
//         </div>

//         {/* Project Image */}
//         <div className="aspect-video mb-5 overflow-hidden rounded-xl">
//           <div className="relative w-full h-full">
//             <Image
//               src={`${project.image}`}
//               alt={`Screenshot of ${project.title}`}
//               fill
//               sizes="(max-width: 768px) 100vw, 50vw"
//               className="object-cover transform group-hover:scale-105 transition-transform duration-700"
//               loading="lazy"
//             />
//           </div>
//         </div>

//         {/* Project Info */}
//         <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
//           {project.title}
//         </h3>
        
//         <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
//           {project.description}
//         </p>

//         {/* Tech Stack Tags */}
//         <div className="flex flex-wrap gap-2 mb-5">
//           {project.tech.map((tech) => (
//             <span
//               key={tech}
//               className="px-3 py-1 rounded-full text-xs md:text-sm bg-gray-800 text-gray-300
//                        border border-gray-700 group-hover:border-emerald-500/30 transition-colors"
//             >
//               {tech}
//             </span>
//           ))}
//         </div>

//         {/* Action Links */}
//         {(project.links?.demo || project.links?.github || project.id) && (
//           <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
//             <div className="flex flex-wrap gap-4">
//               {project.id && (
//                 <Link 
//                   href={`/details/${project.id}`}
//                   className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
//                   aria-label={`View details of ${project.title} project`}
//                 >
//                   <ExternalLink size={18} aria-hidden="true" />
//                   <span className="font-medium">Details</span>
//                 </Link>
//               )}
              
//               {project.links?.github && (
//                 <a
//                   href={project.links.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
//                   aria-label={`View source code for ${project.title} on GitHub`}
//                 >
//                   <Github size={18} aria-hidden="true" />
//                   <span className="font-medium">Source</span>
//                 </a>
//               )}
//             </div>
            
//             {project.links?.demo && (
//               <a
//                 href={project.links.demo}
//                 target="_blank"
//                 rel="noopener noreferrer" 
//                 className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors ml-auto"
//                 aria-label={`View live demo of ${project.title}`}
//               >
//                 <MonitorSmartphone size={18} aria-hidden="true" />
//                 <span className="font-medium">Live Demo</span>
//               </a>
//             )}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }
// Filtered type with only the properties needed by ProjectCard

// Modified ProjectCard component
export default function ProjectCard({ project }: { project: ProjectCardData }) {
  const isDevelopment = project.cardDetails.type === 'development';
  const TypeIcon = isDevelopment ? Code : Palette;
  
  // Calculate average rating if reviews exist
  const averageRating = project.reviews?.length > 0 
    ? (project.reviews.reduce((acc, review) => acc + review.rating, 0) / project.reviews.length).toFixed(1)
    : null;

  // Format download count
  const formatDownloads = (count: number | string) => {
    if (typeof count === 'string') return count;
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count?.toString();
  };

  // Extract GitHub link from storeLinks
  const githubLink = project.storeLinks?.find(link => link.platform === 'github')?.platform;
  const router = useRouter();
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
        className={`absolute inset-0.5 bg-gradient-to-br opacity-0 
                   group-hover:opacity-100 transition-opacity duration-500
                   ${isDevelopment 
                     ? 'from-emerald-500/10 to-blue-500/10' 
                     : 'from-purple-500/10 to-pink-500/10'}`}
        aria-hidden="true"
      ></div>
      
      <div onClick={()=>router.push(`/details/${project.id}`)} className="relative hover:cursor-pointer p-5 md:p-6 flex flex-col h-full">
        {/* Project Type Badge with type-specific info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDevelopment ? 'bg-emerald-500/10' : 'bg-purple-500/10'}`}>
              <TypeIcon className={isDevelopment ? 'text-emerald-400' : 'text-purple-400'} size={20} aria-hidden="true" />
            </div>
            <span className={`text-sm font-medium uppercase tracking-wider ${isDevelopment ? 'text-emerald-400' : 'text-purple-400'}`}>
              {project.cardDetails.type}
            </span>
          </div>
          
          {/* Type-specific badges */}
          <div className="flex items-center gap-2">
            {averageRating && (
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={14} fill="currentColor" />
                <span className="text-sm">{averageRating}</span>
              </div>
            )}
            {project.isPrivate && (
              <span className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded-full">
                Private
              </span>
            )}
            {/* Development specific - show platform count */}
            {isDevelopment && project.storeLinks?.length > 0 && (
              <span className="px-2 py-1 text-xs bg-emerald-900/30 text-emerald-400 rounded-full">
                {project.storeLinks.length} platforms
              </span>
            )}
            {/* Design specific - show if it's a client project */}
            {!isDevelopment && project.additionalInfo?.category && (
              <span className="px-2 py-1 text-xs bg-purple-900/30 text-purple-400 rounded-full">
                {project.additionalInfo.category}
              </span>
            )}
          </div>
        </div>

        {/* Project Image */}
        <div className="aspect-video mb-5 overflow-hidden rounded-xl relative group">
          <div className="relative w-full h-full">
            <Image
              src={project.cardDetails.image}
              alt={`Screenshot of ${project.cardDetails.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Play button overlay for projects with trailers */}
            {project.trailerUrl && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/70 rounded-full p-4">
                  <Eye className="text-white" size={24} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Info */}
        <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 transition-colors
                      ${isDevelopment ? 'group-hover:text-emerald-400' : 'group-hover:text-purple-400'}`}>
          {project.cardDetails.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
          {project.cardDetails.description}
        </p>

        {/* Development: Tech Stack | Design: Tools/Skills */}
        {isDevelopment ? (
          <div className="flex flex-wrap gap-2 mb-5">
            {project.cardDetails.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs md:text-sm bg-gray-800 text-gray-300
                         border border-gray-700 group-hover:border-emerald-500/30 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.cardDetails.tech.length > 4 && (
              <span className="px-3 py-1 rounded-full text-xs md:text-sm text-gray-500">
                +{project.cardDetails.tech.length - 4} more
              </span>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-5">
            {project.cardDetails.tech.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-full text-xs md:text-sm bg-gray-800 text-gray-300
                         border border-gray-700 group-hover:border-purple-500/30 transition-colors
                         flex items-center gap-1"
              >
                <Brush size={12} />
                {tool}
              </span>
            ))}
            {project.cardDetails.tech.length > 3 && (
              <span className="px-3 py-1 rounded-full text-xs md:text-sm text-gray-500">
                +{project.cardDetails.tech.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Type-specific stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {isDevelopment ? (
            <>
              {project.downloadStats?.total && (
                <div className="flex items-center gap-1">
                  <Download size={14} />
                  <span>{formatDownloads(project.downloadStats.total)}</span>
                </div>
              )}
              {project.additionalInfo?.version && (
                <div className="flex items-center gap-1">
                  <Layers size={14} />
                  <span>v{project.additionalInfo.version}</span>
                </div>
              )}
              {project.additionalInfo?.size && (
                <div className="flex items-center gap-1">
                  <span>{project.additionalInfo.size}</span>
                </div>
              )}
            </>
          ) : (
            <>
              {project.screenshots?.length > 0 && (
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{project.screenshots.length} views</span>
                </div>
              )}
              {project.developers?.length > 0 && (
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{project.developers.length} collaborators</span>
                </div>
              )}
            </>
          )}
          {project.additionalInfo?.releaseDate && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date(project.additionalInfo.releaseDate).getFullYear()}</span>
            </div>
          )}
        </div>

        {/* Action Links - Type specific */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
          <div className="flex flex-wrap gap-4">
            {project.id && (
              <Link 
                href={`/details/${project.id}`}
                className={`flex items-center gap-2 font-medium transition-colors
                          ${isDevelopment 
                            ? 'text-emerald-400 hover:text-emerald-300' 
                            : 'text-purple-400 hover:text-purple-300'}`}
                aria-label={`View details of ${project.cardDetails.title} project`}
              >
                <ExternalLink size={18} aria-hidden="true" />
                <span>Details</span>
              </Link>
            )}
            
            {/* Development: GitHub link */}
            {isDevelopment && githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                aria-label={`View source code for ${project.cardDetails.title} on GitHub`}
              >
                <Github size={18} aria-hidden="true" />
                <span className="font-medium">Source</span>
              </a>
            )}
            
            {/* Design: Portfolio/Behance link - you'll need to add this to storeLinks or as a separate field */}
            {!isDevelopment && project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                aria-label={`View ${project.cardDetails.title} in portfolio`}
              >
                <Palette size={18} aria-hidden="true" />
                <span className="font-medium">Portfolio</span>
              </a>
            )}
          </div>
          
          {/* Right side links */}
          <div className="flex items-center gap-3">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                aria-label={`View live demo of ${project.cardDetails.title}`}
              >
                <MonitorSmartphone size={18} aria-hidden="true" />
                <span className="font-medium">{isDevelopment ? 'Live Demo' : 'View Live'}</span>
              </a>            )}
            
            {/* Development specific - show store link count */}
            {isDevelopment && project.storeLinks?.length > 0 && !project.demoLink && (
              <span className="text-sm text-gray-500">
                Available on {project.storeLinks.length} platform{project.storeLinks.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}