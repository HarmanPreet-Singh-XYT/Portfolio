import { Code2, Server, Database, Cpu, Palette, Lock, Brain, Cloud } from 'lucide-react';
const experiences = [
  {
    title: "Software Developer",
    company: "Personal Projects",
    location: "Worldwide",
    period: "2023 - Present",
    description: [
      "Developed and Deployed multiple web, mobile, and desktop applications using technologies such as Next.js, React Native, Flutter, etc.",
      "Developed Full Stack Applications from Scratch to End Product & Deployed/Published them",
      "Explored Multiple Technologies and Frameworks & Solved numerous problems during development",
    ]
  },
];
const about = {
  name: "Harmanpreet Singh",
  title: "Software Engineer",
  description: "Crafting seamless solutions that blend FullStack expertise, DevOps, Mobile Development, and thoughtful UI/UX. Specialized in building responsive, high-performance applications and infrastructure that drive exceptional user experiences across platforms.",
  links: {
    github: "https://github.com/HarmanPreet-Singh-XYT",
    linkedin: "https://www.linkedin.com/in/harman-developer/",
    resume:'https://drive.google.com/file/d/1TYSGvauyGVUJO2fp3WflwWhGmAWS7R9z/view?usp=sharing',
  },
  email:'harmanpreetsingh@programmer.net',
  project: {
    number:10,
    plus:true
  },
  experience:{
    number:1,
    plus:true
  }
}
const projects = [
  {
    type: 'development + design',
    title: 'SysResource',
    description: 'SysResource is a real-time server resource monitoring tool that tracks CPU usage, memory utilization, and system uptime. It provides detailed metrics on server configurations like hostname, CPU cores, platform, and architecture, with real-time line charts for CPU and memory usage.',
    tech: ['React', 'Next.js', 'WebSockets', 'Server Administration', 'Node js','NPM Module'],
    image: 'sysresource.jpeg',
    links: {
      demo: 'https://sysresource.vercel.app/',
      github: 'https://github.com/HarmanPreet-Singh-XYT/SysResource'
    }
  },
  {
    type: 'development + design',
    title: 'DataSync Pro',
    description: "PingRoute is a powerful network diagnostic tool that helps users monitor network performance in real-time. Whether you're troubleshooting a connection issue or analyzing network traffic, PingRoute provides detailed insights into each hop on your network route.",
    tech: ['Dart', 'Flutter', 'Figma', 'Networking', 'C', 'Windows','Linux','Visualization', 'Microsoft Store'],
    image: 'pingroute.jpeg',
    links: {
      demo: 'https://apps.microsoft.com/detail/9mvqgxvmc883?rtc=1&hl=en-in&gl=IN',
      github: 'https://github.com/HarmanPreet-Singh-XYT/PingRoute'
    }
  },
  {
    type: 'development + design',
    title: 'Business Site',
    description: 'Developed & Designed site for local business according to their needs to increase their reach. Implemented SEO practices, and setup Domain from purchasing domain to Deployment.',
    tech: ['Figma', 'Next.js','React'],
    image: 'businesssite.jpeg',
    links: {
      demo: 'https://raja.rumala-sahib.com/'
    }
  },
  {
    type: 'development + design',
    title: 'Ecommerce Full Stack',
    description: 'This is a full stack eCommerce website built using the PERN stack (PostgreSQL, Express, React, Node.js). It features a modern and responsive design, secure payment gateways, dynamic product display algorithms, and comprehensive user functionalities such as wishlist, reviews, order tracking, and more.',
    tech: ['Docker', 'Next.js', 'Node.js','Express', 'PostgreSQL', 'React', 'Tailwind CSS','Stripe','Responsive','Typescript'],
    image: 'ecommerce.jpeg',
    links: {
      demo: 'https://harman-ecommerce.vercel.app/',
      github: 'https://github.com/HarmanPreet-Singh-XYT/E-Commerce'
    }
  },
  {
    type: 'development + design',
    title: 'Ecommerce Mobile App',
    description: 'Developed mobile version of Ecommerce site, using React Native. Implemented payment gateways, dynamic product display algorithms, and comprehensive user functionalities such as wishlist, reviews, order tracking, and more.',
    tech: ['Stripe', 'React Native', 'Figma', 'React', 'Typescript','Node.js/Express','PostgreSQL'],
    image: 'ecommercereactnative.jpeg',
    links: {
      github:'https://github.com/HarmanPreet-Singh-XYT/ECommerce-React-Native'
    }
  },
  {
    type: 'development + design',
    title: 'Unicorn Rust Game Store',
    description: 'The custom designed website for Rust Custom Game Server, Specifically for purchasing InGame items',
    tech: ['Figma', 'Next.js', 'Node.js','Express', 'PostgreSQL', 'React', 'Tailwind CSS','Responsive','Typescript'],
    image: 'gamestore.jpeg',
    links: {
      demo: 'https://unicorn-rust.vercel.app/',
      github:'https://github.com/HarmanPreet-Singh-XYT/Rust-Store-CustomServer'
    }
  },
  {
    type: 'design',
    title: 'DasCam App',
    description: 'This innovative project aims to bridge the gap between mobile devices and PCs by turning an Android mobile camera into a functional webcam for a Windows PC. Leveraging the power of React Native, the application establishes a seamless connection between the mobile device and the PC, enabling high-quality real-time video streaming.',
    tech: ['Figma', 'Protopie', 'Framer','React Native','Mobile','Desktop'],
    image: 'dascam.jpeg',
    links: {
    }
  },
  {
    type: 'design',
    title: 'Email App',
    description: 'Modern Email site design featuring full platform of email with options such as reply, emails, email replies and more.',
    tech: ['Figma', 'Protopie', 'Framer','Desktop'],
    image: 'email.jpg',
    links: {
    }
  },
];
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




export {experiences,about,projects,skillCategories};