import React from 'react';
import { ExternalLink } from 'lucide-react';
import CalendlyButton from './CalendlyDynamic';
import { calendlyLink, services } from '@/app/data';

// Extracted ServiceCard component for better modularity
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

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative bg-black" aria-labelledby="services-heading">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.1),_transparent_50%)]" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <h2 id="services-heading" className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Professional Services
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          Comprehensive software development and consulting services to help your business thrive in the digital age
        </p>

        {/* Main Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-3xl mx-auto bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your ideas to life. Schedule a consultation to explore the possibilities.
          </p>
          <div className="flex gap-2 items-center justify-center flex-wrap">
            <CalendlyButton
              props={{
                label: "Schedule Consultation",
                className: "inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-black font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 focus:ring-2 focus:ring-emerald-300 focus:outline-none",
                buttonLink: calendlyLink,
              }}
            />
            <button 
              onClick={() => window.open(calendlyLink, '_blank')} 
              aria-label="Open Calendly in new tab"
              className="p-2 hover:bg-gray-800 rounded-full hover:text-emerald-500 transition-colors"
            >
              <ExternalLink size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}