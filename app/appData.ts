interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  description: string;
  date: string;
}

interface StoreLink {
  platform: 'windows' | 'android' | 'ios' | 'web' | 'linux' | 'macos' | 'server';
  url: string;
}

interface SystemRequirement {
  category: string;
  requirements: {
    name: string;
    value: string;
  }[];
}

interface Developer {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface VersionHistory {
  version: string;
  date: string;
  changes: string[];
}
interface Buttons{
  wishlist:boolean,
  share:boolean,
  demo:boolean
}

interface AppDetails {
  id: string;
  name: string;
  icon: string;
  buttons: Buttons;
  isPrivate?:boolean;
  headerImage: string;
  trailerUrl?: string;
  screenshots: string[];
  description: string;
  demoLink?:string;
  shortDescription: string;
  techStack: string[];
  storeLinks: StoreLink[];
  reviews: Review[];
  systemRequirements: SystemRequirement[];
  developers?: Developer[];
  downloadStats?: {
    total: number | string;
    lastMonth: number | string;
  };
  versionHistory: VersionHistory[];
  hasInAppPurchases: boolean;
  permissions:string[];
  faq: FAQ[];
  support: {
    email: string;
    website?: string;
    phone?: string;
  };
  additionalInfo: {
    releaseDate: string;
    category: string;
    size: string;
    supportedLanguages: string[];
    developer: string;
    publisher: string;
    version: string;
  };
  legalLinks?: {
    privacyPolicy: string;
    termsOfService?: string;
  };
}

export const apps : AppDetails[] = [
  {
    id: 'screentime',
    name: 'TimeMark - Track Screen Usage & App Usage',
    icon: '/screentime/logo.png',
    buttons:{
      wishlist:false,
      share:true,
      demo:false
    },
    headerImage: '/screentime/screentime.png',
    // trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      '/screentime/1.PNG',
      '/screentime/2.PNG',
      '/screentime/3.PNG',
      '/screentime/4.PNG',
      '/screentime/5.PNG',
      '/screentime/6.PNG'
    ],
    description: "<h1>TimeMark - Track Screen Usage & App Usage</h1>        <p>Stay in control of your digital habits with <strong>TimeMark</strong>, a powerful screen time tracking and app usage monitoring tool. Get detailed insights, set app limits, and optimize your productivity—all while keeping your data private.</p>                <h2>Key Features:</h2>        <ul>            <li><strong>Comprehensive Screen Time Tracking:</strong> Monitor your total screen time and individual app usage.</li>            <li><strong>App Insights & Trends:</strong> View usage analytics, most used apps, category breakdowns, and daily trends.</li>            <li><strong>Focus Sessions & Pomodoro Timer:</strong> Improve productivity with a built-in focus mode, customizable timers, and session tracking.</li>            <li><strong>App & Screen Time Limits:</strong> Set daily usage limits for specific apps or overall screen time to maintain a healthy balance.</li>            <li><strong>Detailed Reports & Graphs:</strong> Analyze weekly and daily usage with intuitive graphs and charts.</li>            <li><strong>Privacy First:</strong> Your data is stored 100% locally on your device. No tracking, no data collection, no cloud storage.</li>            <li><strong>Customizable Settings:</strong> Adjust themes, notifications, and tracking preferences to suit your needs.</li>        </ul>        <h2>Why Choose TimeMark?</h2>        <p>Unlike other tracking apps, TimeMark ensures complete privacy while providing powerful insights to help you manage your screen time effectively.</p>        <p>Take control of your screen time today with <strong>TimeMark</strong>!</p>",
    shortDescription: 'Monitor your screen time, analyze app usage trends, and set limits to boost productivity. Your data stays private on your device.',
    techStack: ['Flutter', 'C++', 'WinAPI',"Dart"],
    storeLinks: [
      {
        platform: 'windows',
        url: 'https://github.com/HarmanPreet-Singh-XYT/TimeMark-ScreenTimeApp/releases'
      },
    ],
    reviews: [
      // {
      //   id: '1xf2',
      //   userName: 'Manmeet Singh',
      //   rating: 5,
      //   title: '',
      //   description: '',
      //   date: '2024-09-10'
      // },
    ],
    systemRequirements: [
      {
        category: 'Desktop App',
        requirements: [
          { name: 'OS', value: 'Windows 10/11, Ubuntu/Debian' },
          { name: 'Processor', value: 'Dual Core CPU' },
          { name: 'Memory', value: '1 GB RAM' },
          { name: 'Storage', value: '100 MB available space' }
        ]
      },
    ],
    // downloadStats: {
    //   total: "100+",
    //   lastMonth: "22"
    // },
    versionHistory: [
      {
        version: '1.0',
        date: '2024-03-26',
        changes: [
          'Stable Release',
        ]
      }
    ],
    hasInAppPurchases: false,
    permissions: [
      "Uses all system resources",
      "App Tracking"
    ],
    faq: [
      {
        question: 'Who can use TimeMark?',
        answer: 'Anyone who wants to track and manage their screen time, analyze app usage, and improve productivity can use TimeMark.'
      },
      {
        question: 'Does TimeMark collect or store my data online?',
        answer: 'No, all data is stored locally on your device. TimeMark does not send any data to servers or third parties.'
      },
      {
        question: 'Can I set screen time limits for specific apps?',
        answer: 'Yes, you can set daily usage limits for individual apps to manage your screen time effectively.'
      },
      {
        question: 'Does TimeMark provide usage insights and analytics?',
        answer: 'Yes, TimeMark offers detailed reports, graphs, and trends on your screen time, app usage, and focus sessions.'
      },
      {
        question: 'Is there a focus mode or Pomodoro timer?',
        answer: 'Yes, TimeMark includes a focus mode with a customizable Pomodoro timer to help you stay productive.'
      },
      {
        question: 'Can I enable or disable tracking for specific apps?',
        answer: 'Yes, you can choose which apps to track and hide or unhide them from reports.'
      },
      {
        question: 'Does TimeMark work offline?',
        answer: 'Yes, TimeMark works completely offline since all data is stored locally on your device.'
      },
      {
        question: 'Is TimeMark free to use?',
        answer: 'Yes, TimeMark is free to use with all core features available without any subscriptions or hidden costs.'
      },
      {
        question: 'Can I reset or clear my data?',
        answer: 'Yes, there is an option to reset settings or clear all stored data whenever you choose.'
      },
    ],
    support: {
      email: 'harmanpreetsingh@programmer.net',
    },
    additionalInfo: {
      releaseDate: '2024-03-26',
      category: 'Productivity Tools',
      size: '10.3 MB',
      supportedLanguages: ['English'],
      developer: 'Harmanpreet Singh',
      publisher: 'Harmanpreet Singh',
      version: '1.0'
    },
    legalLinks: {
      privacyPolicy: '/timemark/privacy-policy',
      // termsOfService: '/'
    }
  },
  {
    id: 'pingroute',
    name: 'PingRoute',
    icon: '/pingroute/logo.png',
    buttons:{
      wishlist:false,
      share:true,
      demo:false
    },
    headerImage: '/pingroute.jpeg',
    // trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      '/pingroute/1.PNG',
      '/pingroute/2.PNG',
      '/pingroute/3.PNG'
    ],
    description: "<p>PingRoute is a powerful network diagnostic tool that helps users monitor network performance in real-time. Whether you're troubleshooting a connection issue or analyzing network traffic, PingRoute provides detailed insights into each hop on your network route.</p><b>Key Features:</b><ul><li>Perform traceroutes to any IP address or domain name.</li><li>Ping each hop and view statistics including minimum, maximum, average, and last ping times.</li><li>Monitor individual packet loss and visualize data using real-time charts.</li><li>Customizable ping intervals and graph update intervals for tailored network analysis.</li><li>View detailed information for each hop, including domain names.</li><li>Switch between text-based data and graphical visualizations for every hop.</li></ul>With support for both IP addresses and domain names, you can trace routes, ping multiple hops, and visualize key metrics like packet loss, latency, jitter, and average latency with easy-to-read charts. The customizable settings for ping intervals and graph update intervals give users full control over their network analysis.Perfect for network administrators, IT professionals, or anyone who needs to keep a close eye on their network’s performance.",
    shortDescription: 'Provides real time network performance analysis and diagnostic tools for network troubleshooting.',
    techStack: ['Flutter', 'C', 'WinAPI',"Dart"],
    storeLinks: [
      {
        platform: 'windows',
        url: 'https://apps.microsoft.com/detail/9mvqgxvmc883?hl=en-US&gl=US'
      },
    ],
    reviews: [
      {
        id: '1xf2',
        userName: 'Manmeet Singh',
        rating: 5,
        title: '',
        description: '',
        date: '2024-09-10'
      },
    ],
    systemRequirements: [
      {
        category: 'Desktop App',
        requirements: [
          { name: 'OS', value: 'Windows 10/11, Ubuntu/Debian' },
          { name: 'Processor', value: 'Dual Core CPU' },
          { name: 'Memory', value: '1 GB RAM' },
          { name: 'Storage', value: '100 MB available space' }
        ]
      },
    ],
    // developers: [
    //   {
    //     name: 'Alex Chen',
    //     role: 'Lead Architect',
    //     avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    //     bio: 'Cloud architecture expert with 15 years of experience in distributed systems.'
    //   },
    //   {
    //     name: 'Maria Garcia',
    //     role: 'Frontend Lead',
    //     avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    //     bio: 'Specialist in building performant and scalable web applications.'
    //   }
    // ],
    downloadStats: {
      total: "100+",
      lastMonth: "22"
    },
    versionHistory: [
      {
        version: '1.0',
        date: '2024-09-10',
        changes: [
          'Stable Release',
        ]
      }
    ],
    hasInAppPurchases: false,
    permissions: [
      "Uses all system resources",
      "Access your Internet connection"
    ],
    faq: [
      {
        question: 'Who can use it?',
        answer: 'Anyone needing a network analysis of their network can use it to identify network problems.'
      },
      {
        question: 'What is it used for?',
        answer: 'Primary objective is to get a real time network performance analysis with visual representation.'
      },
      {
        question: 'Does it provide individual hope data?',
        answer: 'Yes, it does provide every hops data with multiple parameters graph representation.'
      },
    ],
    support: {
      email: 'harmanpreetsingh@programmer.net',
      // website: 'https://support.cloudscale.com',
      // phone: '+1 (800) 123-4567'
    },
    additionalInfo: {
      releaseDate: '2024-09-10',
      category: 'Network Tools',
      size: '29.8 MB',
      supportedLanguages: ['English'],
      developer: 'Harmanpreet Singh',
      publisher: 'Harmanpreet Singh',
      version: '1.0'
    },
    legalLinks: {
      privacyPolicy: '/pingroute/privacypolicy',
      // termsOfService: '/'
    }
  },
  {
    id: 'sysresource',
    name: 'SysResource',
    icon: '/sysresource/logo.jpg',
    buttons:{
      wishlist:false,
      share:true,
      demo:true
    },
    headerImage: '/sysresource.jpeg',
    // trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      '/sysresource/sysresource.jpeg',
    ],
    demoLink:"https://sysresource.vercel.app/",
    description: "<h1>SysResource</h1><p><b>SysResource</b> is a powerful system resource monitoring tool that allows you to track server performance metrics such as CPU usage, memory utilization, and uptime. It provides detailed information about server hardware and software configurations, with a user-friendly interface that includes real-time charts and sound alerts for system thresholds and server downtime. It supports WebSocket and API integrations, offering flexible options for monitoring multiple servers.</p><h2>Features</h2><ul><li><b>Server Monitoring:</b> Monitor CPU, memory, uptime, hostname, CPU cores, total memory, free memory, platform, type, architecture, environment, and more.</li><li><b>Charts:</b> Real-time line chart representations for CPU and memory usage.</li><li><b>Grouping:</b> Organize servers into groups for better management and separation.</li><li><b>Alerts:</b> Sound notifications when a server goes down or resource usage surpasses thresholds.</li><li><b>WebSocket & API:</b> Two options to monitor resources – via WebSocket or API.</li><li><b>Settings:</b> Configure API interval, max retries, and store settings in local storage.</li><li><b>Documentation:</b> Comprehensive documentation to help you get started.</li></ul>",
    shortDescription: 'Provides real time server analysis and report of the server resource utilization.',
    techStack: ["Javascript","Typescript","Node.js","Express.js","Next.js","React","WebSocket"],
    storeLinks: [
      {
        platform: 'web',
        url: 'https://github.com/HarmanPreet-Singh-XYT/SysResource'
      },
      {
        platform: 'server',
        url: 'https://github.com/HarmanPreet-Singh-XYT/node-sysresource'
      },
    ],
    reviews: [
    ],
    systemRequirements: [
      {
        category: 'Browser App',
        requirements: [
          { name: 'Browser', value: 'Latest Chromium Based/Firefox' },
        ]
      },
      {
        category: 'Server Side',
        requirements: [
          { name: 'RAM', value: '512 MB' },
          { name: 'CPU', value: 'Single Core CPU' },
          { name: 'Network Access', value: 'Required' },
        ]
      },
    ],
    versionHistory: [
      {
        version: '1.0',
        date: '2024-10-13',
        changes: [
          'Stable Release',
        ]
      }
    ],
    hasInAppPurchases: false,
    permissions: [
      "Uses all system resources",
      "Access your Internet connection"
    ],
    faq: [
      {
        question: 'Who can use it?',
        answer: 'Anyone needing a server analysis can use it to keep track of system resources.'
      },
      {
        question: 'What is it used for?',
        answer: 'Primary objective is to get a real time system performance analysis with visual representation.'
      },
      {
        question: 'Can you change data update interval?',
        answer: 'Yes you can but for changing web socket interval you need to update the backend config files manually.'
      },
      {
        question: 'Does it support both API and WebSocket?',
        answer: 'Yes, It does.'
      },
    ],
    support: {
      email: 'harmanpreetsingh@programmer.net',
      // website: 'https://support.cloudscale.com',
    },
    additionalInfo: {
      releaseDate: '2024-10-13',
      category: 'Developer Tools',
      size: 'Browser/Server App',
      supportedLanguages: ['English'],
      developer: 'Harmanpreet Singh',
      publisher: 'Harmanpreet Singh',
      version: '1.0'
    },
  },
  {
    id: 'ecommerce',
    name: 'Ecommerce Full Stack',
    icon: '/ecommerce/logo.png',
    buttons:{
      wishlist:false,
      share:true,
      demo:true
    },
    headerImage: '/ecommerce/3.png',
    // trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      '/ecommerce/3.png',
      '/ecommerce/2.png',
      '/ecommerce/mobile.png',
    ],
    demoLink:"https://harman-ecommerce.vercel.app/",
    description: "<h1>This is a full stack eCommerce website built using the PERN stack (PostgreSQL, Express, React, Node.js). It features a modern and responsive design, secure payment gateways, dynamic product display algorithms, and comprehensive user functionalities such as wishlist, reviews, order tracking, and more.</h1><h2>Features</h2><h3>eCommerce Features</h3><ul>    <li><b>Categories & Subcategories:</b> Well-organized categories and subcategories for easy navigation.</li>    <li><b>Products:</b> Detailed product pages with options for different sizes and colors.</li>    <li><b>Payment Gateway:</b> Integrated with individual products and cart for secure transactions. (Stripe)</li>    <li><b>Wishlist:</b> Option to save favorite products.</li>    <li><b>Special Deals:</b> Exclusive deals displayed on the homepage.</li>    <li><b>Banners:</b> Eye-catching banners to highlight promotions.</li>    <li><b>Responsive Design:</b> Modern and mobile-friendly layout.</li>    <li><b>Quantity Purchase:</b> Ability to purchase multiple quantities of a product.</li>    <li><b>Homepage Algorithms:</b> Various algorithms to dynamically display products on the homepage.</li>    <li><b>Filtering & Sorting:</b> Advanced filtering and sorting options on search and category pages.</li>    <li><b>JWT Session:</b> Secure user sessions with JWT.</li>    <li><b>Encrypted Passwords:</b> Enhanced security with password encryption.</li>    <li><b>OAuth Support:</b> Easy registration and sign-in with OAuth.</li>    <li><b>Payment on Delivery:</b> Option to pay upon delivery.</li>    <li><b>Order Tracking:</b> Track orders with a detailed orders page.</li>    <li><b>Order Summary:</b> Comprehensive order summary page.</li>    <li><b>Custom Checkout:</b> Tailored checkout experience.</li>    <li><b>Review System:</b> Post, delete, and edit reviews with a dedicated reviews page.</li>    <li><b>Dynamic Routing:</b> Smooth navigation with dynamic routing.</li>    <li><b>Product Quickview:</b> Quickly view product details and add to cart or go to the product page.</li>    <li><b>Active Review & Rating Calculation:</b> Backend updates variables required for algorithms to work properly, actively calculates ratings & frontend required parameters.</li></ul><h3>Other Pages</h3><ul>    <li><b>Category Specific Page:</b> Detailed pages for each category.</li>    <li><b>Subcategory Page:</b> Dedicated pages for subcategories.</li>    <li><b>Blog:</b> Informative blog section.</li>    <li><b>Contact Page:</b> Easy-to-use contact form.</li>    <li><b>Services Page:</b> Overview of offered services.</li>    <li><b>About Us:</b> Information about the company.</li>    <li><b>Privacy Policy:</b> Details on data privacy.</li>    <li><b>Secure Payment Page:</b> Information on secure payment methods.</li>    <li><b>Terms and Conditions:</b> Detailed terms and conditions.</li>    <li><b>Refund and Cancellation Policy:</b> Policies on refunds and cancellations.</li></ul>",
    shortDescription: 'Ecommerce site with dynamic product display algorithms, secure payment gateways, user functionalities such as wishlist, reviews, order tracking, and more.',
    techStack: ["Javascript","Typescript","Node.js","Express.js","Next.js","React","PostgreSQL","Tailwind CSS","Stripe","Docker"],
    storeLinks: [
      {
        platform: 'web',
        url: 'https://github.com/HarmanPreet-Singh-XYT/E-Commerce'
      },
      {
        platform: 'server',
        url: 'https://github.com/HarmanPreet-Singh-XYT/E-Commerce'
      },
    ],
    reviews: [
    ],
    systemRequirements: [
      {
        category: 'Browser App',
        requirements: [
          { name: 'Browser', value: 'Latest Chromium Based/Firefox' },
        ]
      },
      {
        category: 'Server Side',
        requirements: [
          { name: 'RAM', value: '1 GB' },
          { name: 'CPU', value: 'Single Core CPU' },
          { name: 'Network Access', value: 'Required' },
        ]
      },
    ],
    versionHistory: [
      {
        version: '1.1',
        date: '2024-08-15',
        changes: [
          'Fix cart summary miscalculation',
        ]
      },
      {
        version: '1.0',
        date: '2024-08-13',
        changes: [
          'Stable Release',
          'OAuth Login for native user',
        ]
      }
    ],
    hasInAppPurchases: true,
    permissions: [
      "Uses all system resources",
      "Access your Internet connection"
    ],
    faq: [
      {
        question: 'Does it have products for demo?',
        answer: 'Yes, it does have products and different pages'
      },
      {
        question: 'Does it have payment gateway?',
        answer: 'Yes, it supports stripe payment gateway.'
      },
      {
        question: 'Does it support authentication and account configuration?',
        answer: 'Yes, it does.'
      },
      {
        question: 'Can you change account settings and track orders?',
        answer: 'Yes, you can.'
      },
      {
        question: 'Can you fast deploy with docker?',
        answer: 'Yes, you can except for DB.'
      },
    ],
    support: {
      email: 'harmanpreetsingh@programmer.net',
      // website: 'https://support.cloudscale.com',
    },
    additionalInfo: {
      releaseDate: '2024-08-13',
      category: 'Developer Tools',
      size: 'Browser/Server App',
      supportedLanguages: ['English'],
      developer: 'Harmanpreet Singh',
      publisher: 'Harmanpreet Singh',
      version: '1.1'
    },
  },
  {
    id: 'note-todo',
    name: 'Note Todo App',
    icon: '/note-todo/logo.png',
    buttons:{
      wishlist:false,
      share:true,
      demo:true
    },
    headerImage: '/note-todo/3.png',
    // trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      '/note-todo/1.png',
      '/note-todo/2.png',
      '/note-todo/3.png',
      '/note-todo/4.png',
      '/note-todo/5.png',
      '/note-todo/6.png',
      '/note-todo/8.png',
    ],
    demoLink:"https://note-todo-app.vercel.app/",
    description: "<h1>To-Do and Notes Joint App</h1<p>The To-Do and Notes Joint App is a versatile task and note-taking web application built with HTML, CSS, and React. It's designed to help users organize their tasks and notes efficiently while offering a collaborative messaging feature.</p<h2>Usage</h2<ol>    <li>Sign in or create an account.</li>    <li>Use the interactive calendar to schedule tasks and notes.</li>    <li>Organize your notes into categories for better management.</li>    <li>View, edit, and delete tasks and notes.</li>    <li>Visualize your data with graphs.</li>    <li>Communicate with the creator or support team via messaging.</li></ol><h2>Features</h2<ul>    <li><b>Interactive Calendar</b></li>    <li><b>User Authentication</b></li>    <li><b>Local Storage for Data</b></li>    <li><b>Note Categorization</b></li>    <li><b>Task and Note Management</b></li>    <li><b>Data Visualization with Graphs</b></li>    <li><b>User-to-Creator Messaging</b></li>    <li><b>Encrypted Backend with OTP Login</b></li>    <li><b>Authentication Required Backend</b></li>    <li><b>OTP Required for Registration to Prevent Database Flooding</b></li>    <li><b>Search Bar for Finding Lost Notes</b></li>  <li><b>Built-in Calendar</b></li</ul>",
    shortDescription: 'versatile task and note-taking web application, designed to help users organize their tasks, notes efficiently.',
    techStack: ['React', 'Next.js', 'Node.js','Express', 'MongoDB','SASS','HTML/CSS'],
    storeLinks: [
      {
        platform: 'web',
        url: 'https://github.com/HarmanPreet-Singh-XYT/NoteTodo_MERN'
      },
      {
        platform: 'server',
        url: 'https://github.com/HarmanPreet-Singh-XYT/NoteTodo_MERN'
      },
    ],
    reviews: [
    ],
    systemRequirements: [
      {
        category: 'Browser App',
        requirements: [
          { name: 'Browser', value: 'Latest Chromium Based/Firefox' },
        ]
      },
      {
        category: 'Server Side',
        requirements: [
          { name: 'RAM', value: '1 GB' },
          { name: 'CPU', value: 'Single Core CPU' },
          { name: 'Network Access', value: 'Required' },
        ]
      },
    ],
    versionHistory: [
      {
        version: '1.1',
        date: '2023-11-07',
        changes: [
          'Add Date & Time Selection/Todo & structure change',
        ]
      },
      {
        version: '1.0',
        date: '2023-10-28',
        changes: [
          'Demo Release',
          'Optimize Backend',
        ]
      }
    ],
    hasInAppPurchases: false,
    permissions: [
      "Uses all system resources",
      "Access your Internet connection"
    ],
    faq: [
      {
        question: 'Is it a full stack application?',
        answer: 'Yes, it is full stack application.'
      },
      {
        question: 'How much time did it took to create?',
        answer: 'It was my first full stack app, it took around a month or two.'
      },
      {
        question: 'Does it support authentication and account configuration?',
        answer: 'Yes, it does.'
      },
      {
        question: 'Can you edit settings, todo, notes?',
        answer: 'Yes, you can.'
      },
    ],
    support: {
      email: 'harmanpreetsingh@programmer.net',
      // website: 'https://support.cloudscale.com',
    },
    additionalInfo: {
      releaseDate: '2023-10-28',
      category: 'Productivity Tools',
      size: 'Browser/Server App',
      supportedLanguages: ['English'],
      developer: 'Harmanpreet Singh',
      publisher: 'Harmanpreet Singh',
      version: '1.1'
    },
  },
  {
    id: 'native-ecommerce',
    name: 'Native Ecommerce App',
    icon: '/native-ecommerce/logo.png',
    buttons:{
      wishlist:false,
      share:true,
      demo:false
    },
    headerImage: '/ecommercemobile.jpeg',
    // trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      '/native-ecommerce/1.png',
      '/native-ecommerce/2.jpeg',
      '/native-ecommerce/3.jpeg'
    ],
    description: "<h1>This is a full stack eCommerce app built using the PERN stack (PostgreSQL, Express, React, Node.js). It features a modern and responsive design, secure payment gateways, dynamic product display algorithms, and comprehensive user functionalities such as wishlist, reviews, order tracking, and more.</h1><h2>Features</h2><h3>eCommerce Features</h3><ul>    <li><b>Categories & Subcategories:</b> Well-organized categories and subcategories for easy navigation.</li>    <li><b>Products:</b> Detailed product pages with options for different sizes and colors.</li>    <li><b>Payment Gateway:</b> Integrated with individual products and cart for secure transactions. (Stripe)</li>    <li><b>Wishlist:</b> Option to save favorite products.</li>    <li><b>Special Deals:</b> Exclusive deals displayed on the homepage.</li>    <li><b>Responsive Design:</b> Modern and mobile-friendly layout.</li>    <li><b>Quantity Purchase:</b> Ability to purchase multiple quantities of a product.</li>    <li><b>Homepage Algorithms:</b> Various algorithms to dynamically display products on the homepage.</li>    <li><b>JWT Session:</b> Secure user sessions with JWT.</li>    <li><b>Encrypted Passwords:</b> Enhanced security with password encryption.</li>    <li><b>OAuth Support:</b> Easy registration and sign-in with OAuth.</li>    <li><b>Payment on Delivery:</b> Option to pay upon delivery.</li>    <li><b>Order Tracking:</b> Track orders with a detailed orders page.</li>    <li><b>Order Summary:</b> Comprehensive order summary page.</li>    <li><b>Custom Checkout:</b> Tailored checkout experience.</li>    <li><b>Review System:</b> Post, delete, and edit reviews with a dedicated reviews page.</li>    <li><b>Dynamic Routing:</b> Smooth navigation with dynamic routing.</li>    <li><b>Active Review & Rating Calculation:</b> Backend updates variables required for algorithms to work properly, actively calculates ratings & frontend required parameters.</li></ul>",
    shortDescription: 'Ecommerce app with dynamic product display algorithms, secure payment gateways, user functionalities such as wishlist, reviews, order tracking, and more.',
    techStack: ["Javascript","Typescript","Node.js","Express.js","React Native","PostgreSQL","Tailwind CSS","Stripe","React"],
    storeLinks: [
      {
        platform: 'android',
        url: 'https://github.com/HarmanPreet-Singh-XYT/ECommerce-React-Native/releases'
      },
      {
        platform: 'server',
        url: 'https://github.com/HarmanPreet-Singh-XYT/E-Commerce'
      },
    ],
    reviews: [
    ],
    systemRequirements: [
      {
        category: 'Mobile',
        requirements: [
          { name: 'OS', value: 'Android 7+' },
          { name: 'RAM', value: '2 GB' },
          { name: 'CPU', value: 'Dual Core' },
          { name: 'Storage', value: '512 MB' },
        ]
      },
      {
        category: 'Server Side',
        requirements: [
          { name: 'RAM', value: '1 GB' },
          { name: 'CPU', value: 'Single Core CPU' },
          { name: 'Network Access', value: 'Required' },
        ]
      },
    ],
    versionHistory: [
      {
        version: '1.3',
        date: '2024-08-16',
        changes: [
          'Locked Orientation for better user experience.',
        ]
      },
      {
        version: '1.2',
        date: '2024-08-15',
        changes: [
          "Fixed Bugs"
        ]
      },
      {
        version: '1.1',
        date: '2024-08-15',
        changes: [
          'Fixed Bugs & Added Clipboard for Gift cards, Coupons.',
        ]
      },
      {
        version: '1.0',
        date: '2024-08-15',
        changes: [
          'Stable Release',
        ]
      }
    ],
    hasInAppPurchases: true,
    permissions: [
      "Uses all system resources",
      "Access your Internet connection"
    ],
    faq: [
      {
        question: 'Does it have products for demo?',
        answer: 'Yes, it does have products and different pages'
      },
      {
        question: 'Does it have payment gateway?',
        answer: 'Yes, it supports stripe payment gateway.'
      },
      {
        question: 'Does it support authentication and account configuration?',
        answer: 'Yes, it does.'
      },
      {
        question: 'Can you change account settings and track orders?',
        answer: 'Yes, you can.'
      },
      {
        question: 'Can you fast deploy with docker?',
        answer: 'Yes, you can except for DB.'
      },
    ],
    support: {
      email: 'harmanpreetsingh@programmer.net',
      // website: 'https://support.cloudscale.com',
    },
    additionalInfo: {
      releaseDate: '2024-08-15',
      category: 'ECommerce',
      size: '66.9 MB',
      supportedLanguages: ['English'],
      developer: 'Harmanpreet Singh',
      publisher: 'Harmanpreet Singh',
      version: '1.3'
    },
  },
  {
    id: 'percentage-value',
    name: 'PercentageValue App',
    icon: '/percentage-value/logo.png',
    buttons:{
      wishlist:false,
      share:true,
      demo:false
    },
    headerImage: '/percentageValue.PNG',
    // trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      '/percentage-value/1.PNG',
      '/percentage-value/2.PNG',
      '/percentage-value/3.PNG'
    ],
    description: "Calculating app that gets the percentage value of a number, and do the reverse.",
    shortDescription: 'Developed a calculating app for a specific requirement for a friend in trading.',
    techStack: ["Flutter","Dart"],
    storeLinks: [
      {
        platform: 'windows',
        url: 'https://github.com/HarmanPreet-Singh-XYT/PercentageValue/releases'
      },
    ],
    reviews: [
    ],
    systemRequirements: [
      {
        category: 'Desktop',
        requirements: [
          { name: 'OS', value: 'Windows/Linux/MacOS' },
          { name: 'RAM', value: '2 GB' },
          { name: 'CPU', value: 'Dual Core' },
          { name: 'Storage', value: '512 MB' },
        ]
      },
    ],
    versionHistory: [
      {
        version: '1.1',
        date: '2025-03-02',
        changes: [
          'add reverse mode',
          'update UI',
        ]
      },
      {
        version: '1.0',
        date: '2024-09-12',
        changes: [
          "stable release"
        ]
      },
    ],
    hasInAppPurchases: false,
    permissions: [
      "Uses all system resources",
    ],
    faq: [
      {
        question: 'What is the main purpose of this app?',
        answer: 'To get percentage value of any value, or do it in reverse.'
      },
    ],
    support: {
      email: 'harmanpreetsingh@programmer.net',
      // website: 'https://support.cloudscale.com',
    },
    additionalInfo: {
      releaseDate: '2024-09-12',
      category: 'Productivity Tools',
      size: '9.67 MB',
      supportedLanguages: ['English'],
      developer: 'Harmanpreet Singh',
      publisher: 'Harmanpreet Singh',
      version: '1.1'
    },
  },
  {
    id: 'answer-ai',
    name: 'Answer AI',
    icon: '/answer-ai/logo.jpg',
    isPrivate:true,
    buttons:{
      wishlist:false,
      share:true,
      demo:false
    },
    headerImage: '/answer-ai/2.PNG',
    trailerUrl: 'https://www.youtube.com/watch?v=YKz6M5djf-M',
    screenshots: [
      '/answer-ai/1.PNG',
      '/answer-ai/3.PNG',
    ],
    description: "<p>AnswerAI is collection of native app, web extension, backend and frontend that provides answer of the question from chatGPT by reading question from website.</p><ul><li>Web Extension - Reads questions and sends to backend - Javascript</li><li>Quiz website - A Dummy site  - Next.js/React</li><li>Software - Shows the latest data from backend as it polls every 5 second or custom - Flutter</li><li>ChatGPT API - Chat, Single Image, Multiple Images</li></ul>",
    shortDescription: 'AnswerAI is collection of native app, web extension, backend and frontend that provides answer of the question from chatGPT by reading question from website.',
    techStack: ['Flutter','Dart','React.js','OpenAI ChatGPT','WebScraping','Node.js','Express.js'],
    storeLinks: [
    ],
    reviews: [
    ],
    systemRequirements: [
      {
        category: 'Mobile',
        requirements: [
          { name: 'OS', value: 'Android 7+' },
          { name: 'RAM', value: '2 GB' },
          { name: 'CPU', value: 'Dual Core' },
          { name: 'Storage', value: '512 MB' },
        ]
      },
      {
        category: 'Desktop',
        requirements: [
          { name: 'OS', value: 'Windows, Linux, macOS' },
          { name: 'RAM', value: '2 GB' },
          { name: 'CPU', value: 'Dual Core' },
          { name: 'Storage', value: '512 MB' },
        ]
      },
      {
        category: 'Server Side',
        requirements: [
          { name: 'RAM', value: '1 GB' },
          { name: 'CPU', value: 'Single Core CPU' },
          { name: 'Network Access', value: 'Required' },
        ]
      },
    ],
    versionHistory: [
      {
        version: '1.0',
        date: '2025-01-04',
        changes: [
          'Stable Release',
        ]
      }
    ],
    hasInAppPurchases: false,
    permissions: [
      "Uses all system resources",
      "Access your Internet connection"
    ],
    faq: [
      {
        question: 'Does it have any demo?',
        answer: 'Yes, the video is available above.'
      },
      {
        question: 'Why code is not available?',
        answer: 'The product was developed for a specific reason and revealing the code may cause issues.'
      },
      {
        question: 'Whats the architectural flow?',
        answer: 'The browser extension picks the question automatically and sends it to the backend, then the backend requests ChatGPT for answer and then stores the answer in the memory which is then displayed on the app which keeps checking every 5 second for new content.'
      },
      {
        question: 'What was the main purpose of it?',
        answer: 'To solve quizes, tests easily using AI.'
      },
    ],
    support: {
      email: 'harmanpreetsingh@programmer.net',
      // website: 'https://support.cloudscale.com',
    },
    additionalInfo: {
      releaseDate: '2024-08-15',
      category: 'Artificial Intelligence',
      size: 'N/A',
      supportedLanguages: ['English'],
      developer: 'Harmanpreet Singh',
      publisher: 'Harmanpreet Singh',
      version: '1.0'
    },
  },
  {
    id: 'raja-rumala-sahib',
    name: 'Raja Rumala Sahib (Business Site)',
    icon: '/raja-rumala-sahib/logo.png',
    buttons:{
      wishlist:false,
      share:true,
      demo:true
    },
    headerImage: '/businesssite.jpeg',
    // trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      '/raja-rumala-sahib/1.PNG',
      '/raja-rumala-sahib/2.PNG',
      '/raja-rumala-sahib/3.PNG'
    ],
    demoLink:"https://raja.rumala-sahib.com/",
    description: "Developed & Designed site for local business according to their needs to increase their reach. Implemented SEO practices, and setup Domain from purchasing domain to Deployment.",
    shortDescription: 'Showcases the work of a business.',
    techStack: ["Javascript","Typescript","Next.js","React"],
    storeLinks: [
    ],
    reviews: [
    ],
    systemRequirements: [
      {
        category: 'Browser App',
        requirements: [
          { name: 'Browser', value: 'Latest Chromium Based/Firefox' },
        ]
      },
    ],
    versionHistory: [
      {
        version: '1.0',
        date: '2024-09-25',
        changes: [
          'Stable Release',
        ]
      }
    ],
    hasInAppPurchases: false,
    permissions: [
      "Access your Internet connection"
    ],
    faq: [
      {
        question: 'What does it do?',
        answer: 'Website showcases the work of a local business.'
      },
      {
        question: 'What is the main purpose?',
        answer: 'To get clients via showcasing work online.'
      },
      {
        question: 'Does it have SEO Implementations?',
        answer: 'Yes, it does have SEO strategies.'
      },
      {
        question: 'Does it have custom domain and where it is hosted?',
        answer: 'Yes, it does and is hosted on vercel.'
      },
    ],
    support: {
      email: 'harmanpreetsingh@programmer.net',
      // website: 'https://support.cloudscale.com',
    },
    additionalInfo: {
      releaseDate: '2024-09-25',
      category: 'Business',
      size: 'Browser App',
      supportedLanguages: ['English'],
      developer: 'Harmanpreet Singh',
      publisher: 'Harmanpreet Singh',
      version: '1.0'
    },
  },
  {
    id: 'rust-game-store',
    name: 'Rust Game Store',
    icon: '/rust-logo.png',
    buttons:{
      wishlist:false,
      share:true,
      demo:true
    },
    headerImage: '/gamestore.jpeg',
    // trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      '/rust-game-store/1.PNG',
      '/rust-game-store/2.PNG',
      '/rust-game-store/3.PNG'
    ],
    demoLink:"https://unicorn-rust.vercel.app/",
    description: "<h1>Rust Game Store</h1><p>A dedicated game site for Rust where users can purchase in-game items directly from the website. Additionally, the site provides server information and a contact support option for assistance.</p><h2>Table of Contents</h2><ol>    <li><b>Purchase items from site and get it in-game</b></li>    <li><b>Support System</b></li>    <li><b>Policy Info</b></li>    <li><b>Information and Offers</b></li></ol>",
    shortDescription: 'Custom game site which allows purchase of in-game items via real money.',
    techStack: ["Javascript","Next.js","React","Node.js","Express","MongoDB","SCSS"],
    storeLinks: [
    ],
    reviews: [
    ],
    systemRequirements: [
      {
        category: 'Browser App',
        requirements: [
          { name: 'Browser', value: 'Latest Chromium Based/Firefox' },
        ]
      },
    ],
    versionHistory: [
      {
        version: '1.0',
        date: '2023-12-30',
        changes: [
          'Deployment',
        ]
      }
    ],
    hasInAppPurchases: true,
    permissions: [
      "Access your Internet connection"
    ],
    faq: [
      {
        question: 'What does it do?',
        answer: 'Website showcases the skins and in-game items of rust.'
      },
      {
        question: 'What is the main purpose?',
        answer: 'To allow users to purchase in-game items through website with real money.'
      },
      {
        question: 'Does it have custom domain and where it is hosted?',
        answer: 'No, it does and is hosted on vercel.'
      },
    ],
    support: {
      email: 'harmanpreetsingh@programmer.net',
      // website: 'https://support.cloudscale.com',
    },
    additionalInfo: {
      releaseDate: '2024-09-25',
      category: 'Gaming',
      size: 'Browser/Server App',
      supportedLanguages: ['English'],
      developer: 'Harmanpreet Singh',
      publisher: 'Harmanpreet Singh',
      version: '1.0'
    },
  },
];