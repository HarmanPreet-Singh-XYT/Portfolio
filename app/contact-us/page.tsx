'use client'
import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Loader2, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar,
  Github,
  Linkedin,
  Twitter,
  Globe,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import sendMail, { sendContactMail } from '@/app/api/Nodemailer';
import { about, calendlyLink } from '@/app/data';
import Navbar from '@/components/Navbar';

// Form validation - extracted for reuse and testing
const validateForm = (form) => {
  const errors: any = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Email is invalid";
  if (!form.message.trim()) errors.message = "Message is required";
  
  return errors;
};

// FAQ data
const faqs = [
  {
    question: "What's your typical response time?",
    answer: "I usually respond within 24-48 hours on business days. For urgent matters, please mention it in your message."
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely! I work with clients globally and can adjust to different time zones for meetings."
  },
  {
    question: "What information should I include in my message?",
    answer: "Please include project details, timeline, budget range, and any specific requirements you have in mind."
  },
  {
    question: "Do you offer consultations?",
    answer: "Yes, I offer free 30-minute initial consultations to discuss your project and see if we're a good fit."
  }
];

// Social links
const socialLinks = [
  { icon: Github, href: about.links.github, label: "GitHub" },
  { icon: Linkedin, href: about.links.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/harmanpreet277", label: "Twitter" },
];

export default function ContactPage() {
  // Form state management
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    projectType: "website"
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm(form);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const result = await sendContactMail(form.name, form.email, form.message,form.company,form.phone,form.projectType,form.subject);
      if (result) {
        setSubmitStatus('success');
        // Reset form on success
        setForm({ 
          name: "", 
          email: "", 
          company: "",
          phone: "",
          subject: "",
          message: "",
          projectType: "website"
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar currentSection='contact'/>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(74,222,128,0.1),_transparent_70%)]" />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
              <Sparkles size={16} />
              Available for new projects
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
                Let's Work Together
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8">
              Have a project in mind? I'd love to hear about it. Let's create something amazing together.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-400" />
                <span>24-48h response time</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-emerald-400" />
                <span>Working globally</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-emerald-400" />
                <span>Free consultation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
                  <p className="text-gray-400 mb-8">
                    Whether you have a question, want to start a project, or simply want to connect, 
                    feel free to send me a message. I'm always excited to work on new challenges.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/30 transition-all">
                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                      <a 
                        href="mailto:harmanpreetsingh@programmer.net" 
                        className="text-gray-400 hover:text-emerald-400 transition-colors"
                      >
                        harmanpreetsingh@programmer.net
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Best for project inquiries</p>
                    </div>
                  </div>

                  {/* <div className="flex items-start gap-4 p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/30 transition-all">
                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                      <a 
                        href="tel:+1234567890" 
                        className="text-gray-400 hover:text-emerald-400 transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Mon-Fri 9am-6pm EST</p>
                    </div>
                  </div> */}

                  <div className="flex items-start gap-4 p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/30 transition-all">
                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                      <p className="text-gray-400">Ontario, Canada</p>
                      <p className="text-sm text-gray-500 mt-1">Available for remote work worldwide</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Connect with me</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="p-3 bg-gray-800/50 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Contact Form */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                
                {/* Status messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center gap-2" role="alert">
                    <CheckCircle size={20} />
                    Thank you! I'll get back to you within 24-48 hours.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400" role="alert">
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} 
                                 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-colors`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} 
                                 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-colors`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 
                                 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-colors"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 
                                 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                                    <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 
                               focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white transition-colors"
                    >
                      <option value="website">Website Development</option>
                      <option value="webapp">Web Application</option>
                      <option value="mobile">Mobile App</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 
                               focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-colors"
                      placeholder="Brief project description"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${errors.message ? 'border-red-500' : 'border-gray-700'} 
                               focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-colors resize-none`}
                      placeholder="Tell me about your project goals, timeline, and any specific requirements..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 
                             text-black font-semibold hover:from-emerald-600 hover:to-blue-600 
                             focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 
                             focus:ring-offset-gray-900 transition-all duration-300 flex items-center 
                             justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>

                <p className="text-gray-500 text-xs text-center mt-6">
                  By submitting this form, you agree to the privacy policy. Your information will only be used to respond to your inquiry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Quick Actions
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <a
                href={calendlyLink}
                className="group p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 
                         hover:border-emerald-500/30 hover:bg-gray-800/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    <Calendar size={24} />
                  </div>
                  <ArrowRight size={20} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Schedule a Call</h3>
                <p className="text-gray-400 text-sm">Book a free 30-minute consultation call</p>
              </a>

              <a
                href="https://discord.gg/wQ9dVqwPzx"
                className="group p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 
                         hover:border-emerald-500/30 hover:bg-gray-800/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    <MessageSquare size={24} />
                  </div>
                  <ArrowRight size={20} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Start Live Chat</h3>
                <p className="text-gray-400 text-sm">Get instant answers to your questions</p>
              </a>

              <a
                href="/?projects"
                className="group p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 
                         hover:border-emerald-500/30 hover:bg-gray-800/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    <Globe size={24} />
                  </div>
                  <ArrowRight size={20} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">View Portfolio</h3>
                <p className="text-gray-400 text-sm">See examples of my recent work</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Frequently Asked Questions
              </span>
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="text-emerald-400 mt-0.5">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 pl-7">
                    <span className="text-emerald-400 mr-2">A:</span>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-gray-700/50">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                  Ready to Start Your Project?
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Let's turn your ideas into reality. I'm here to help you build something amazing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={calendlyLink}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 
                           text-black font-semibold hover:from-emerald-600 hover:to-blue-600 
                           transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageSquare size={20} />
                  <span>Get Started</span>
                </a>
                <a
                  href="/?projects"
                  className="px-8 py-4 rounded-lg bg-gray-800 text-white font-semibold 
                           hover:bg-gray-700 transition-all duration-300 flex items-center 
                           justify-center gap-2 border border-gray-700"
                >
                  <span>View My Work</span>
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
