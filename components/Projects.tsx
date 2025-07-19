import React, { useState, useEffect, useMemo } from 'react';
import { AlertCircle, Code, Loader2, Palette } from 'lucide-react';
// import { projects } from '../app/data';s
import ProjectCard from './Project/ProjectCard';
// import { AppDetails } from '@/types/app';s
import { useAppCards } from '@/hooks/useApp';

// export default function Projects({ projectRef }) {
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [isAnimating, setIsAnimating] = useState(false);

//   useEffect(() => {
//     // Apply animation state
//     setIsAnimating(true);
    
//     // Filter projects based on active filter
//     const filtered = projects.filter(project => 
//       activeFilter === 'all' || project.type.includes(activeFilter)
//     );
    
//     // Small delay to allow animation to complete
//     const timer = setTimeout(() => {
//       setFilteredProjects(filtered);
//       setIsAnimating(false);
//     }, 300);
    
//     return () => clearTimeout(timer);
//   }, [activeFilter]);

//   // Filter options with icons
//   const filterOptions = [
//     { id: 'all', label: 'All Projects', icon: null },
//     { id: 'development', label: 'Development', icon: <Code size={16} /> },
//     { id: 'design', label: 'Design', icon: <Palette size={16} /> }
//   ];

//   return (
//     <section 
//       id="projects" 
//       className="py-20 md:py-32 relative bg-black" 
//       aria-labelledby="projects-heading"
//     >
//       {/* Background gradient */}
//       <div className="absolute inset-0 bg-gradient-radial from-emerald-900/10 to-transparent bg-fixed"></div>
      
//       <div className="container mx-auto px-4 sm:px-6 relative">
//         <div className="text-center mb-16">
//           <h2 
//             id="projects-heading"
//             className="text-4xl md:text-5xl font-bold mb-4"
//           >
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
//               Featured Work
//             </span>
//           </h2>
//           <p className="text-gray-400 max-w-2xl mx-auto">
//             A showcase of innovative solutions and creative designs that demonstrate my expertise 
//             in building scalable, user-centric applications
//           </p>
//         </div>

//         {/* Filter Controls */}
//         <div 
//           ref={projectRef} 
//           className="flex justify-center mb-12"
//           role="tablist"
//           aria-label="Project filters"
//         >
//           <div className="p-1 bg-gray-800/60 backdrop-blur-sm rounded-full shadow-lg flex">
//             {filterOptions.map((filter) => (
//               <button
//                 key={filter.id}
//                 onClick={() => setActiveFilter(filter.id)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
//                   activeFilter === filter.id
//                     ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-black shadow-lg'
//                     : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
//                 }`}
//                 role="tab"
//                 aria-selected={activeFilter === filter.id}
//                 aria-controls={`${filter.id}-projects`}
//               >
//                 {filter.icon}
//                 <span>{filter.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Projects Grid */}
//         <div 
//           id={`${activeFilter}-projects`}
//           className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 transition-opacity duration-300 ${
//             isAnimating ? 'opacity-50' : 'opacity-100'
//           }`}
//           role="tabpanel"
//         >
//           {filteredProjects.length > 0 ? (
//             filteredProjects.map((project,index) => (
//               <ProjectCard key={index} project={project} />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <p className="text-gray-400">No projects found matching the selected filter.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

export default function Projects({ projectRef }) {
  const { apps, loading, error, refetch } = useAppCards();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);

  // Transform fetched apps to match the expected format
  const projectsData = apps;

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => 
      activeFilter === 'all' || 
      (typeof project.cardDetails.type === 'string' 
        ? project.cardDetails.type.toLowerCase().includes(activeFilter.toLowerCase())
        : false)
    );
  }, [projectsData, activeFilter]);

  // Handle filter change with animation
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Filter options with icons
  const filterOptions = [
    { id: 'all', label: 'All Projects', icon: null },
    { id: 'development', label: 'Development', icon: <Code size={16} /> },
    { id: 'design', label: 'Design', icon: <Palette size={16} /> }
  ];

  return (
    <section 
      id="projects" 
      className="py-20 md:py-32 relative bg-black" 
      aria-labelledby="projects-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-emerald-900/10 to-transparent bg-fixed"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <h2 
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Featured Work
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of innovative solutions and creative designs that demonstrate my expertise 
            in building scalable, user-centric applications
          </p>
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-md mx-auto">
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-6 text-center">
              <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
              <h3 className="text-red-200 text-lg font-semibold mb-2">Failed to Load Projects</h3>
              <p className="text-red-300/70 text-sm mb-4">
                Unable to fetch projects at this time. Please try again later.
              </p>
              <button
                onClick={refetch}
                className="bg-red-600/20 hover:bg-red-600/30 px-4 py-2 rounded-md text-red-200 text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Filter Controls - Only show if not error */}
        {!error && (
          <div 
            ref={projectRef} 
            className="flex justify-center mb-12"
            role="tablist"
            aria-label="Project filters"
          >
            <div className="p-1 bg-gray-800/60 backdrop-blur-sm rounded-full shadow-lg flex">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-black shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                  role="tab"
                  aria-selected={activeFilter === filter.id}
                  aria-controls={`${filter.id}-projects`}
                  disabled={loading}
                >
                  {filter.icon}
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!error && (
          <div 
            id={`${activeFilter}-projects`}
            className={`transition-opacity duration-300 ${
              isAnimating ? 'opacity-50' : 'opacity-100'
            }`}
            role="tabpanel"
          >
            {loading ? (
              // Loading State
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
                <p className="text-gray-400 text-lg">Loading projects...</p>
              </div>
            ) : filteredProjects.length > 0 ? (
              // Projects Grid
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id || project.cardDetails.title} project={project} />
                ))}
              </div>
            ) : (
              // Empty State
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">No projects found matching the selected filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}