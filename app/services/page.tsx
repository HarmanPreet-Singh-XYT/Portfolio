'use client'
import React, { useState } from 'react';
import { ExternalLink, Check, Star, ArrowRight, Code2, Globe, Smartphone, Database, Shield, Zap, Users, TrendingUp, Award, Clock, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { additionalSkills, calendlyLink, skillCategories } from '../data';
import Navbar from '@/components/Navbar';

// Mock data for services (in real app, this would come from your data file)
const services = [
  {
    title: "Web Development",
    description: "Modern, responsive websites built with cutting-edge technologies",
    icon: <Globe size={24} />,
    features: [
      "React/Next.js applications",
      "Responsive design",
      "SEO optimization",
      "Performance optimization"
    ],
    popular: true
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    icon: <Smartphone size={24} />,
    features: [
      "React Native apps",
      "Native iOS/Android",
      "App Store deployment",
      "Push notifications"
    ]
  },
  {
    title: "Backend Development",
    description: "Scalable server-side solutions and API development",
    icon: <Database size={24} />,
    features: [
      "RESTful APIs",
      "Database design",
      "Cloud deployment",
      "Microservices architecture"
    ]
  },
  {
    title: "DevOps & Security",
    description: "Secure, scalable infrastructure and deployment solutions",
    icon: <Shield size={24} />,
    features: [
      "CI/CD pipelines",
      "Security audits",
      "Cloud infrastructure",
      "Monitoring & alerts"
    ]
  }
];

const packages = [
  {
    name: "Starter",
    price: "$2,999",
    duration: "2-3 weeks",
    description: "Perfect for small businesses and startups",
    features: [
      "5-page responsive website",
      "Mobile optimization",
      "Basic SEO setup",
      "Contact form integration",
      "1 month support"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "$7,999",
    duration: "4-6 weeks",
    description: "Comprehensive solution for growing businesses",
    features: [
      "Custom web application",
      "Admin dashboard",
      "Database integration",
      "Payment processing",
      "Advanced SEO",
      "3 months support",
      "Training included"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    duration: "8+ weeks",
    description: "Full-scale solutions for large organizations",
    features: [
      "Custom software development",
      "API integrations",
      "Advanced security",
      "Scalable architecture",
      "24/7 monitoring",
      "Dedicated support",
      "Team training",
      "Ongoing maintenance"
    ],
    popular: false
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    rating: 5,
    text: "Exceptional work! The team delivered our web application ahead of schedule and exceeded all expectations."
  },
  {
    name: "Michael Chen",
    company: "Global Solutions",
    rating: 5,
    text: "Professional, reliable, and innovative. They transformed our outdated system into a modern, efficient platform."
  },
  {
    name: "Emily Rodriguez",
    company: "Creative Agency",
    rating: 5,
    text: "Outstanding attention to detail and excellent communication throughout the entire project lifecycle."
  }
];

const stats = [
  { number: "150+", label: "Projects Completed" },
  { number: "95%", label: "Client Satisfaction" },
  { number: "24/7", label: "Support Available" },
  { number: "5 Years", label: "Average Experience" }
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We analyze your requirements, define project scope, and create a detailed roadmap for success."
  },
  {
    step: "02", 
    title: "Design & Architecture",
    description: "Our team creates wireframes, mockups, and technical architecture tailored to your needs."
  },
  {
    step: "03",
    title: "Development & Testing",
    description: "We build your solution using best practices, with continuous testing and quality assurance."
  },
  {
    step: "04",
    title: "Deployment & Support",
    description: "Launch your project with ongoing support, monitoring, and maintenance for optimal performance."
  }
];

// Mock CalendlyButton component
const CalendlyButton = ({ props }) => (
  <button 
    onClick={() => window.open(calendlyLink, '_blank')}
    className={props.className}
  >
    {props.label}
  </button>
);

// Service Card Component
const ServiceCard = ({ service }) => (
  <div
    className={`relative group rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 
               backdrop-blur-sm border border-gray-700/50 overflow-hidden
               hover:border-emerald-500/50 transition-all duration-500 h-full
               ${service.popular ? 'ring-2 ring-emerald-500/50' : ''}`}
  >
    {service.popular && (
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium 
                   bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
        Popular
      </div>
    )}
    
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400" aria-hidden="true">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-white">{service.title}</h3>
      </div>

      <p className="text-gray-400 mb-6">{service.description}</p>

      <ul className="space-y-3 mb-8 flex-grow">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" aria-hidden="true"></span>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Package Card Component
const PackageCard = ({ pkg }) => (
  <div className={`relative rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                   backdrop-blur-sm border overflow-hidden h-full
                   ${pkg.popular 
                     ? 'border-emerald-500/50 ring-2 ring-emerald-500/50 scale-105' 
                     : 'border-gray-700/50 hover:border-emerald-500/30'
                   } transition-all duration-500`}>
    {pkg.popular && (
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-blue-500 text-black text-center py-2 text-sm font-semibold">
        Most Popular
      </div>
    )}
    
    <div className={`p-6 ${pkg.popular ? 'pt-12' : ''}`}>
      <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-emerald-400">{pkg.price}</span>
        {pkg.price !== "Custom" && <span className="text-gray-400 ml-1">starting</span>}
      </div>
      <p className="text-sm text-emerald-300 mb-4">{pkg.duration} delivery</p>
      <p className="text-gray-400 mb-6">{pkg.description}</p>
      
      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link href={`/contact-us`}><button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300
                         ${pkg.popular 
                           ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-black hover:from-emerald-600 hover:to-blue-600' 
                           : 'bg-gray-800 text-white border border-gray-700 hover:border-emerald-500 hover:text-emerald-400'
                         }`}>
        Get Started
      </button></Link>
    </div>
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full">
    <div className="flex gap-1 mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} size={16} className="text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
    <div>
      <h4 className="text-white font-semibold">{testimonial.name}</h4>
      <p className="text-gray-400 text-sm">{testimonial.company}</p>
    </div>
  </div>
);

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar currentSection='services'/>
      {/* Hero Section */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.1),_transparent_50%)]" aria-hidden="true"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Professional Services
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Comprehensive software development and consulting services to help your business thrive in the digital age
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <CalendlyButton
              props={{
                label: "Schedule Consultation",
                className: "inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-black font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
              }}
            />
            {/* <button className="px-8 py-4 rounded-lg border border-gray-700 hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300">
              View Portfolio
            </button> */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 border-y border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Main Services Section */}
      <section className="py-10 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Our Expertise
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            From concept to deployment, we provide end-to-end solutions tailored to your specific needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 bg-gray-900/30">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Our Process
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            A proven methodology that ensures successful project delivery from start to finish
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full hover:border-emerald-500/50 transition-all duration-500">
                  <div className="text-4xl font-bold text-emerald-400 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-emerald-400" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(59,130,246,0.1),_transparent_50%)]" aria-hidden="true"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Service Packages
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Choose the perfect package for your project needs and budget
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, idx) => (
              <PackageCard key={idx} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 bg-gray-900/30">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Client Success Stories
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Don't just take our word for it - hear what our clients have to say about working with us
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Technologies We Use
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Cutting-edge tools and frameworks to build robust, scalable solutions
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skillCategories.flatMap(category => 
            category.skills.map(skill => skill.name)
          ).concat(
            additionalSkills.flatMap(category => 
              category.skills
            )
          ).map((tech, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-all duration-500">
              <div className="text-emerald-400 font-semibold">{tech}</div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-gray-900/30">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Get answers to common questions about our services and process
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                q: "How long does a typical project take?",
                a: "Project timelines vary based on complexity and scope. Simple websites typically take 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines during the consultation phase."
              },
              {
                q: "Do you provide ongoing support and maintenance?",
                a: "Yes! We offer comprehensive support packages including bug fixes, security updates, feature enhancements, and 24/7 monitoring to ensure your application runs smoothly."
              },
              {
                q: "What technologies do you specialize in?",
                a: "We specialize in modern web technologies including React, Next.js, Node.js, Python, and cloud platforms like AWS. We choose the best tech stack for each project's specific requirements."
              },
              {
                q: "How do you handle project communication?",
                a: "We maintain transparent communication through regular updates, scheduled check-ins, and collaborative project management tools. You'll always know the current status of your project."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.1),_transparent_50%)]" aria-hidden="true"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-4xl mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-12 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
              Let's discuss how we can help bring your ideas to life. Schedule a consultation to explore the possibilities and get a custom quote for your project.
            </p>
            <div className="flex gap-4 items-center justify-center flex-wrap">
              <CalendlyButton
                props={{
                  label: "Schedule Free Consultation",
                  className: "inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-black font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                }}
              />
              <Link href={`/contact-us`}><button className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-gray-700 hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300">
                <MessageCircle size={20} />
                Contact Us
              </button></Link>
              <Link href={calendlyLink}>
                <button 
                  aria-label="Open Calendly in new tab"
                  className="p-3 hover:bg-gray-800 rounded-full hover:text-emerald-500 transition-colors"
                >
                  <ExternalLink size={20} aria-hidden="true" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}