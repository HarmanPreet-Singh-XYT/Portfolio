'use client';
import React from 'react';
import { skillCategories, additionalSkills } from '@/app/data';
import { motion } from 'framer-motion';

// Domain accent config
const domainConfig: Record<string, { accent: string; border: string; chipHover: string }> = {
  'AI & LLMs': {
    accent: 'text-violet-400',
    border: 'border-l-violet-500',
    chipHover: 'hover:border-violet-500/60 hover:text-violet-300 hover:bg-violet-500/5',
  },
  'Frontend Development': {
    accent: 'text-emerald-400',
    border: 'border-l-emerald-500',
    chipHover: 'hover:border-emerald-500/60 hover:text-emerald-300 hover:bg-emerald-500/5',
  },
  'Backend & APIs': {
    accent: 'text-blue-400',
    border: 'border-l-blue-500',
    chipHover: 'hover:border-blue-500/60 hover:text-blue-300 hover:bg-blue-500/5',
  },
  'Databases': {
    accent: 'text-cyan-400',
    border: 'border-l-cyan-500',
    chipHover: 'hover:border-cyan-500/60 hover:text-cyan-300 hover:bg-cyan-500/5',
  },
  'Cloud & DevOps': {
    accent: 'text-amber-400',
    border: 'border-l-amber-500',
    chipHover: 'hover:border-amber-500/60 hover:text-amber-300 hover:bg-amber-500/5',
  },
  'Programming Languages': {
    accent: 'text-gray-400',
    border: 'border-l-gray-500',
    chipHover: 'hover:border-gray-400/60 hover:text-gray-200 hover:bg-gray-500/5',
  },
  'Security & Testing': {
    accent: 'text-rose-400',
    border: 'border-l-rose-500',
    chipHover: 'hover:border-rose-500/60 hover:text-rose-300 hover:bg-rose-500/5',
  },
};

const fallbackConfig = {
  accent: 'text-gray-400',
  border: 'border-l-gray-600',
  chipHover: 'hover:border-gray-400/60 hover:text-gray-200 hover:bg-gray-500/5',
};

// Merge all skill sources into one flat list
function buildDomains() {
  // Map additionalSkills to same shape as skillCategories
  const additionalMapped = additionalSkills.map((s: any) => ({
    icon: s.icon,
    title: s.title,
    skills: s.skills.map((name: string) => ({ name })),
  }));

  return [...skillCategories, ...additionalMapped];
}

export default function Skills({ skillRef }: { skillRef: any }) {
  const domains = buildDomains();

  return (
    <section
      id="skills"
      className="py-24 md:py-32 relative bg-black"
      aria-labelledby="skills-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(139,92,246,0.06),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_rgba(74,222,128,0.06),_transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.h2
            id="skills-heading"
            ref={skillRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Technical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-400">
              Skills
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What I reach for when building.
          </motion.p>
        </div>

        {/* Domain rows */}
        <div className="divide-y divide-gray-800/40">
          {domains.map((domain: any, idx: number) => {
            const config = domainConfig[domain.title] ?? fallbackConfig;
            const isAI = domain.title === 'AI & LLMs';

            return (
              <motion.div
                key={domain.title}
                className={`flex flex-col sm:flex-row gap-3 sm:gap-8 py-4 md:py-5 ${
                  isAI ? 'bg-violet-500/[0.03] -mx-4 sm:-mx-6 px-4 sm:px-6 rounded-lg' : ''
                }`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                {/* Left: category label */}
                <div className={`sm:w-52 flex-shrink-0 flex items-start sm:items-center gap-3 border-l-2 pl-3 ${config.border}`}>
                  <div className={`mt-0.5 sm:mt-0 flex-shrink-0 ${config.accent}`}>
                    {domain.icon}
                  </div>
                  <div>
                    <span className={`text-sm font-semibold ${config.accent} leading-tight`}>
                      {domain.title}
                    </span>
                    {isAI && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-400 border border-violet-500/30 align-middle">
                        featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: skill chips */}
                <div className="flex flex-wrap gap-2 sm:pt-0">
                  {domain.skills.map((skill: { name: string }, i: number) => (
                    <span
                      key={skill.name}
                      className={`px-3 py-1.5 text-sm rounded-full bg-gray-900/60 text-gray-300 border border-gray-700/50 transition-all duration-200 cursor-default ${config.chipHover}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: skillCategories.map((category: any, index: number) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: category.title,
              description: category.description,
            })),
          }),
        }}
      />
    </section>
  );
}
