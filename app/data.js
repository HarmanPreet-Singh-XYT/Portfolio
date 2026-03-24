import { Code2, Server, Database, Cpu, Palette, Lock, Brain, Cloud, Layout, Code, Zap } from 'lucide-react';
const experiences = [
  {
    title: "Production Operator",
    company: "General Motors of Canada",
    location: "Oshawa, ON, Canada",
    period: "Oct 2025 - Present",
    category: "non-tech",
    note: "Part-time while completing CS education",
    description: [
      "Operating assembly line equipment in automotive manufacturing environment while maintaining quality standards and safety protocols.",
      "Collaborating with cross-functional teams to meet production targets and ensure efficient workflow across manufacturing processes",
    ]
  },
  {
    title: "Hackathon Winner – MUES Hackathon",
    company: "Toronto Metropolitan University",
    location: "Toronto, ON",
    period: "Oct 2025",
    category: "achievement",
    achievements: "1st Place — 180Hz Gaming Monitor Prize",
    description: [
      "Built a real-time collaborative web app 'Magic Space Paint' within 7 hours using Next.js, React, and WebSockets.",
      "Implemented multi-user drawing tools, undo/redo, PNG export, and a character interaction mode.",
      "Collaborated with 2 teammates met on-site; won a 180Hz curved gaming monitor as one of the top prizes.",
    ],
    skills: ["Next.js", "React", "WebSockets", "TypeScript"]
  },
  {
    title: "Software Developer",
    company: "Stealth Startup",
    location: "Remote",
    period: "June 2025 - Aug 2025",
    description: [
      "Built a trading automation system for a client, integrating real-time price tracking, profit detection, inventory management, and trade offer automation.",
      "Reduced manual trading effort by 70% and increased profitability through faster decision-making.",
      "Implemented profit opportunity detection algorithms to identify arbitrage gaps across platforms.",
      "Created an inventory management dashboard to track acquisition costs, current valuations, and profit/loss."
    ]
  },
  // {
  //   title: "Frontend Developer – Outlier AI",
  //   company: "Outlier AI (Hackathon Project)",
  //   location: "Remote",
  //   period: "Apr 2025",
  //   description: [
  //     "Developed a manga-anime news platform with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.",
  //     "Implemented 7 dynamic sections including news feeds, featured articles, and series catalog.",
  //     "Designed immersive Japanese manga-inspired UI with custom animations and responsive layouts.",
  //     "Project: https://manga-news-beta.vercel.app"
  //   ]
  // }
];

const about = {
  name: "Harmanpreet Singh",
  title: "Software Engineer",
  description: "AI-native Full-Stack Engineer who ships under pressure. Won Google's 'Build with AI' track at Hack Canada 2026 (500+ hackers, 200+ submissions). Honoured at the Anthropic Hackathon at UofT. Production apps used by 1,000+ people.",
  achievements: [
    { icon: "🏆", text: "Google Winner", sub: "Hack Canada 2026" },
    { icon: "🏅", text: "Honoured", sub: "Anthropic Hackathon · UofT" },
    { icon: "🥇", text: "MUES Winner", sub: "Toronto Met University" },
  ],
  links: {
    github: "https://github.com/HarmanPreet-Singh-XYT",
    linkedin: "https://www.linkedin.com/in/harman-developer/",
    resume:'https://drive.google.com/file/d/1jX4W21p3_j8Vtft8YrXpEliM9pKTVOen/view?usp=sharing',
  },
  email:'harman@harmanita.com',
  project: {
    number:15,
    plus:true
  },
  experience:{
    number:1,
    plus:true
  },
  address:{
    address1:'',
    address2:'Punjab, India',
    number:''
  }
}
const education = [
  {
    degree: "Diploma in Interactive Media Design - Web",
    school: "Durham College of Applied Arts & Technology",
    location: "Ontario, Canada",
    period: "Sep 2025 - Apr 2027",
    gpa: "4.6/5.0",
    honors: [],
    highlights: [
      "Focused on front-end development and interactive media design.",
      "Learned web design principles, prototyping, and user experience optimization.",
      "Hands-on training with Adobe Illustrator, Photoshop, and Figma for visual design.",
      "Developed responsive web applications using HTML, CSS, JavaScript, PHP, and React/Node.js.",
      "Experience with CMS development, version control (Git), and collaborative workflows.",
      "Emphasis on accessibility, design thinking, and mobile-first design."
    ]
  },
  {
    degree: "Bachelor's Degree in Computer Science",
    school: "Lovely Professional University (LPU)",
    location: "Online",
    period: "Jan 2024 - Jan 2027",
    gpa: "8.0/10",
    honors: [],
    highlights: [
      "Core studies in computer science, software engineering, and data structures.",
      "Cybersecurity, focusing on network security and digital forensics.",
      "Coursework in artificial intelligence, databases, and computer networks.",
      "Strengthened problem-solving, programming, and secure system design skills.",
      "Completing under Distance Learning/Online Mode."
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
    image: '/screentime/1.png',
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
    image: '/sysresource.jpeg',
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
    image: '/pingroute.jpeg',
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
    image: '/businesssite.jpeg',
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
    image: '/ecommerce.jpeg',
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
    image: '/ecommercereactnative.jpeg',
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
    image: '/percentageValue.PNG',
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
    image: '/gamestore.jpeg',
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
    image: '/notetodo.png',
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
    image: '/dascam.jpeg',
    links: {
    }
  },
  {
    type: 'design',
    title: 'Email App',
    description: 'Modern Email site design featuring full platform of email with options such as reply, emails, email replies and more.',
    tech: ['Figma', 'Protopie', 'Framer','Desktop'],
    image: '/email.jpg',
    links: {
    }
  },
];


const skillCategories = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "AI & LLMs",
    description: "Building agentic workflows and AI-powered applications",
    domain: "ai",
    skills: [
      { name: "LangGraph" },
      { name: "LangChain" },
      { name: "RAG" },
      { name: "LLM APIs" },
      { name: "ChromaDB" },
      { name: "NLP" },
      { name: "CNN" },
      { name: "Transformers" },
      { name: "Deep Learning" },
      { name: "Reinforcement Learning" },
      { name: "Computer Vision" },
      { name: "Scikit-Learn" },
    ]
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Frontend Development",
    description: "Building responsive, performant, and accessible web applications",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "React Native" },
      { name: "Flutter" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "SASS" },
      { name: "Tailwind CSS" },
    ]
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Backend & APIs",
    description: "Designing scalable and maintainable server-side applications",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "FastAPI" },
      { name: "Flask" },
      { name: "Django" },
      { name: "Go/Gin" },
      { name: "WebSockets" },
      { name: "Microservices" },
      { name: "REST API" },
    ]
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Databases",
    description: "Managing and optimizing data storage solutions",
    skills: [
      { name: "PostgreSQL" },
      { name: "PostGIS" },
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Redis" },
      { name: "Supabase" },
    ]
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud & DevOps",
    description: "Implementing cloud infrastructure and CI/CD pipelines",
    skills: [
      { name: "AWS (S3, EC2, Lambda)" },
      { name: "GCP" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "Terraform" },
      { name: "Jenkins/ArgoCD" },
      { name: "Git" },
      { name: "CI/CD" },
      { name: "Linux/Unix" },
      { name: "Prometheus" },
      { name: "Grafana" },
      { name: "Loki" },
    ]
  }
];

const additionalSkills = [
  {
    icon: <Code className="w-5 h-5" />,
    title: "Programming Languages",
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "C/C++",
      "Go",
      "SQL",
      "Swift",
      "Java",
      "Dart",
      "Bash/Shell",
    ]
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Security & Testing",
    skills: ["JWT", "OAuth", "Encryption", "Selenium"]
  },
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
