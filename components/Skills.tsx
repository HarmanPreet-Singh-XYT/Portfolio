import React from 'react';
import { Code2, Server, Database, Cpu, Palette, Lock, Brain, Cloud } from 'lucide-react';

const skillCategories = [
  {
    icon: <Code2 />,
    title: 'Frontend Development',
    skills: [
      { name: 'Next.js', level: 90 },
      { name: 'React', level: 95 },
      { name: 'React Native', level: 82 },
      { name: 'Tailwind CSS', level: 98 },
      { name: 'Flutter', level: 86 },
    ]
  },
  {
    icon: <Server />,
    title: 'Backend Development',
    skills: [
      { name: 'Node.js/Express', level: 94 },
      { name: 'Python/Django', level: 88 },
      { name: 'Git/Github', level: 98 },
      { name: 'REST API', level: 90 },
      { name: 'WebSockets', level: 87 },
    ]
  },
  {
    icon: <Database />,
    title: 'Database & Cache',
    skills: [
      { name: 'PostgreSQL', level: 92 },
      { name: 'MySQL', level: 90 },
      { name: 'MongoDB', level: 82 },
      { name: 'Firebase', level: 60 },
      // { name: 'Cassandra', level: 82 },
    ]
  },
  {
    icon: <Cloud />,
    title: 'Cloud & DevOps',
    skills: [
      { name: 'Jenkins', level: 95 },
      { name: 'Docker/K8s', level: 92 },
      { name: 'Terraform', level: 88 },
      { name: 'CI/CD', level: 90 },
      { name: 'Monitoring', level: 87 },
    ]
  },
  {
    icon: <Cpu />,
    title: 'Operating Systems',
    skills: [
      { name: 'Windows', level: 95 },
      { name: 'Linux', level: 85 },
      // { name: 'Arch Linux (Linux)', level: 88 },
      // { name: 'MacOS', level: 0 },
      // { name: 'Performance', level: 89 },
    ]
  },
  {
    icon: <Lock />,
    title: 'Security & Testing',
    skills: [
      { name: 'JWT', level: 90 },
      { name: 'Encryption', level: 85 },
      { name: 'OAuth', level: 90 },
      { name: 'Selenium', level: 82 },
      // { name: 'Security Audits', level: 88 },
      // { name: 'Penetration Testing', level: 82 },
      // { name: 'OWASP', level: 87 },
    ]
  },
  {
    icon: <Palette />,
    title: 'Design & UI/UX',
    skills: [
      { name: 'Figma', level: 88 },
      { name: 'Design Systems', level: 90 },
      { name: 'Prototyping', level: 85 },
      { name: 'Adobe XD', level: 42 },
      // { name: 'User Research', level: 86 },
    ]
  },
  {
    icon: <Brain />,
    title: 'Programming Languages',
    skills: [
      { name: 'Javascript', level: 95 },
      { name: 'Typescript', level: 92 },
      { name: 'Python', level: 85 },
      { name: 'Dart', level: 84 },
      { name: 'C++', level: 82 },
    ]
  },
  // {
  //   icon: <Brain />,
  //   title: 'AI & ML',
  //   skills: [
  //     { name: 'TensorFlow', level: 85 },
  //     { name: 'NLP', level: 82 },
  //     { name: 'Computer Vision', level: 80 },
  //     { name: 'ML Ops', level: 84 },
  //     { name: 'Data Analysis', level: 88 },
  //   ]
  // },
];

export default function Skills() {
  return (
    <section className="py-32 relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.1),_transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <h2 className="text-5xl font-bold mb-20 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Technical Expertise
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx}
              className="skill-card group"
              style={{ '--delay': `${idx * 0.1}s` } as React.CSSProperties}
            >
              <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                             hover:border-emerald-500/50 transition-all duration-300">
                <div className="text-emerald-400 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-6 text-gray-100">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full 
                                   transform origin-left scale-x-0 animate-skill-progress"
                          style={{ 
                            '--progress': `${skill.level}%`,
                            '--delay': `${(idx * 5 + skillIdx) * 0.1}s`
                          } as React.CSSProperties}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}