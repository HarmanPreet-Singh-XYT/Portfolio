import React from 'react';
import { Code2, Cloud, Database, Layout, Cpu, Users, Lightbulb, Rocket } from 'lucide-react';
import CalendlyButton from './CalendlyDynamic';

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

// const additionalServices = [
//   {
//     icon: <Cpu className="w-8 h-8" />,
//     title: "Technical Consultation",
//     description: "Expert advice on technology stack, architecture, and best practices"
//   },
//   {
//     icon: <Users className="w-8 h-8" />,
//     title: "Team Augmentation",
//     description: "Skilled developers to strengthen your existing team"
//   },
//   {
//     icon: <Lightbulb className="w-8 h-8" />,
//     title: "Innovation Workshop",
//     description: "Workshops to explore new technologies and innovative solutions"
//   },
//   {
//     icon: <Rocket className="w-8 h-8" />,
//     title: "MVP Development",
//     description: "Rapid development of minimum viable products for startups"
//   }
// ];

export default function Services() {
  return (
    <section className="py-32 relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.1),_transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <h2 className="text-5xl font-bold mb-4 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Professional Services
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Comprehensive software development and consulting services to help your business thrive in the digital age
        </p>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`relative group rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                       backdrop-blur-sm border border-gray-700/50 overflow-hidden
                       hover:border-emerald-500/50 transition-all duration-500
                       ${service.popular ? 'ring-2 ring-emerald-500/50' : ''}`}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium 
                             bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Popular
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>

                <p className="text-gray-400 mb-6">{service.description}</p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2"></span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">{service.price}</span>
                  <button className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 
                                 hover:bg-emerald-500/20 transition-colors">
                    Get Started
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        {/* <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-4">Additional Services</h3>
          <p className="text-gray-400 text-center mb-12">
            Specialized services to complement your development needs
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                         hover:border-emerald-500/50 transition-all duration-300 text-center"
              >
                <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                  {service.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{service.title}</h4>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your ideas to life. Schedule a consultation to explore the possibilities.
          </p>
          {/* <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r 
                     from-emerald-500 to-blue-500 text-black font-semibold 
                     hover:from-emerald-600 hover:to-blue-600 transition-all duration-300"
          >
            Schedule Consultation
          </a> */}
          <CalendlyButton
            props={{
              label: "Schedule Consulation",
              className: "inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-black font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300",
              buttonLink: 'https://calendly.com/preetsinghharman27',
          }}
/>
        </div>
      </div>
    </section>
  );
}