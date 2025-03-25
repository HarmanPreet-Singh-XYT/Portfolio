import { Code2, Server, Database, Cpu, Palette, Lock, Brain, Cloud,Layout } from 'lucide-react';
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
  description: "Creating seamless solutions that blend FullStack expertise, DevOps, Mobile Development, and thoughtful UI/UX. Specialized in building responsive, high-performance applications and infrastructure that drive exceptional user experiences across platforms.",
  links: {
    github: "https://github.com/HarmanPreet-Singh-XYT",
    linkedin: "https://www.linkedin.com/in/harman-developer/",
    resume:'https://drive.google.com/file/d/1PfovCVDR5h11Y6KiVM2zNUNy0bCbn2eP/view?usp=sharing',
  },
  email:'harmanpreetsingh@programmer.net',
  project: {
    number:10,
    plus:true
  },
  experience:{
    number:1,
    plus:true
  },
  address:{
    address1:'370, Mohalla guru ka khuh',
    address2:'Tarn Taran 143401, Punjab, India',
    number:'+91 1852-796-916'
  }
}
const education = [
  {
    degree: "Bachelor's Degree, Computer Science",
    school: "Lovely Professional University",
    location: "Punjab, India",
    period: "2024 - Present",
    gpa: "8",
    honors: [],
    highlights: [
      "Core Computer Science Concepts",
      "Electives in Marketing & Sales",
      "Under Distance Learning/Online Mode"
    ]
  }
];
const projects = [
  {
    id:'screentime',
    type: 'development + design',
    title: 'TimeMark - Track Screen Time & App Usage',
    description: "Monitor your screen time, analyze app usage trends, and set limits to boost productivity. Your data stays private on your device.",
    tech: ['Dart', 'Flutter', 'Figma', 'C++', 'Windows','Visualization', 'Microsoft Store'],
    image: 'screentime/1.png',
    links: {
      // demo: 'https://apps.microsoft.com/detail/9mvqgxvmc883?rtc=1&hl=en-in&gl=IN',
      github: 'https://github.com/HarmanPreet-Singh-XYT/TimeMark-ScreenTimeApp'
    }
  },
  {
    id:'sysresource',
    type: 'development + design',
    title: 'SysResource',
    description: 'SysResource is a real-time server resource monitoring tool that tracks CPU usage, memory utilization, and system uptime. It provides detailed metrics on server configurations like hostname, CPU cores, platform, and architecture, with real-time line charts for CPU and memory usage.',
    tech: ['React', 'Next.js', 'WebSockets', 'Server Administration', 'Node js','NPM Module'],
    image: 'sysresource.jpeg',
    links: {
      demo: 'https://sysresource.vercel.app/',
      github: 'https://github.com/HarmanPreet-Singh-XYT/SysResource',
    }
  },
  {
    id:'pingroute',
    type: 'development + design',
    title: 'PingRoute',
    description: "PingRoute is a powerful network diagnostic tool that helps users monitor network performance in real-time. Whether you're troubleshooting a connection issue or analyzing network traffic, PingRoute provides detailed insights into each hop on your network route.",
    tech: ['Dart', 'Flutter', 'Figma', 'Networking', 'C', 'Windows','Linux','Visualization', 'Microsoft Store'],
    image: 'pingroute.jpeg',
    links: {
      demo: 'https://apps.microsoft.com/detail/9mvqgxvmc883?rtc=1&hl=en-in&gl=IN',
      github: 'https://github.com/HarmanPreet-Singh-XYT/PingRoute'
    }
  },
  {
    id:'answer-ai',
    type: 'development + design',
    title: 'AnswerAI',
    description: 'AnswerAI is collection of native app, web extension, backend and frontend that provides answer of the question from chatGPT by reading question from website.',
    tech: ['Flutter','Dart','React.js','OpenAI ChatGPT','WebScraping','Node.js','Express.js'],
    image: '/answer-ai/3.PNG',
    links: {
    }
  },
  {
    id:'raja-rumala-sahib',
    type: 'development + design',
    title: 'Raja Rumala Sahib (Business Site)',
    description: 'Developed & Designed site for local business according to their needs to increase their reach. Implemented SEO practices, and setup Domain from purchasing domain to Deployment.',
    tech: ['Figma', 'Next.js','React'],
    image: 'businesssite.jpeg',
    links: {
      demo: 'https://raja.rumala-sahib.com/'
    }
  },
  {
    id:'ecommerce',
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
    id:'native-ecommerce',
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
    id:'percentage-value',
    type: 'development + design',
    title: 'PercentageValue Calculator',
    description: 'Developed a calculating app for a specific requirement for a friend in trading.',
    tech: ['Flutter', 'Figma', 'Dart'],
    image: 'percentageValue.PNG',
    links: {
      github:'https://github.com/HarmanPreet-Singh-XYT/PercentageValue'
    }
  },
  {
    id:'rust-game-store',
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
    id:'note-todo',
    type: 'development + design',
    title: 'Note Todo App',
    description: 'versatile task and note-taking web application, designed to help users organize their tasks, notes efficiently',
    tech: ['React', 'Next.js', 'Node.js','Express', 'MongoDB','SASS','Typescript'],
    image: 'notetodo.png',
    links: {
      demo: 'https://note-todo-app.vercel.app/',
      github:'https://github.com/HarmanPreet-Singh-XYT/NoteTodo_MERN'
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
    icon: <Code2 className="w-6 h-6" />,
    title: "Frontend Development",
    description: "Building responsive, performant, and accessible web applications",
    skills: [
      { name: "Next.js", level: "Advanced" },
      { name: "React", level: "Expert" },
      { name: "React Native", level: "Advanced" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Flutter", level: "Advanced" }
    ]
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Backend Development",
    description: "Designing scalable and maintainable server-side applications",
    skills: [
      { name: "Node.js/Express", level: "Expert" },
      { name: "Python/Django", level: "Advanced" },
      { name: "Microservices", level: "Expert" },
      { name: "REST API", level: "Advanced" },
      { name: "WebSockets", level: "Advanced" }
    ]
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Database & Cache",
    description: "Managing and optimizing data storage solutions",
    skills: [
      { name: "PostgreSQL", level: "Expert" },
      { name: "MySQL", level: "Advanced" },
      { name: "MongoDB", level: "Advanced" },
      { name: "Firebase", level: "Intermediate" },
      // { name: "Prometheus", level: "Intermediate" }
    ]
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud & DevOps",
    description: "Implementing robust cloud infrastructure and CI/CD pipelines",
    skills: [
      { name: "Jenkins/ArgoCD", level: "Expert" },
      { name: "Docker/Kubernetes", level: "Advanced" },
      { name: "Terraform", level: "Advanced" },
      { name: "CI/CD", level: "Expert" },
      { name: "Prometheus/Grafana/Loki", level: "Expert" }
    ]
  }
];

const additionalSkills = [
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Operating Systems",
    skills: ["Windows", "Linux"]
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Security & Testing",
    skills: ["JWT", "Encryption", "OAuth", "Selenium"]
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Design & UI/UX",
    skills: ["Figma", "Design Systems", "Prototyping", "Adobe XD"]
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: "Programming Languages",
    skills: ["Javascript", "Typescript", "Python", "Dart", "C/C++","Bash/Shell","SQL"]
  }
];
const calendlyLink="https://calendly.com/preetsinghharman27"
const services = [
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Architecture & DevOps",
    description: "Modern cloud solutions and DevOps practices to optimize your development workflow",
    features: [
      "Cloud infrastructure",
      "CI/CD pipeline setup",
      "Container orchestration",
      "Performance optimization"
    ],
    price: "Starting at $5,000",
    popular: false
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Full Stack Development",
    description: "End-to-end development of scalable software solutions tailored to your business needs",
    features: [
      "Full-stack web applications",
      "Responsive sites",
      "API development & integration",
      "Legacy system modernization"
    ],
    price: "Custom Quote",
    popular: true
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Database Design & Optimization",
    description: "Expert database architecture and performance tuning services",
    features: [
      "Schema design & optimization",
      "Query performance tuning",
      "Data migration services",
      "High availability setup"
    ],
    price: "Starting at $3,000",
    popular: false
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Native App Development",
    description: "End to end development of scalable native app development tailored to business needs.",
    features: [
      "Cross-platform solutions",
      "App Store deployment",
      "Performance optimization",
      "Mobile/Desktop development"
    ],
    price: "Starting at $2,500",
    popular: false
  }
];

export {experiences,about,projects,skillCategories,additionalSkills,education,calendlyLink,services};