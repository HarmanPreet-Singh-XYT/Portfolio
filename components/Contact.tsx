import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Loader2 } from 'lucide-react';
import sendMail from '@/app/api/Nodemailer';
import { about } from '@/app/data';

// Form validation - extracted for reuse and testing
const validateForm = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Email is invalid";
  if (!form.message.trim()) errors.message = "Message is required";
  
  return errors;
};

export default function Contact({
  contactRef,
  showAddress = false,
  id = 'contact',
  className = ''
}) {
  // Form state management
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<any>({name:"",email:"",message:""});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

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
      const result = await sendMail(form.name, form.email, form.message);
      if (result) {
        setSubmitStatus('success');
        // Reset form on success
        setForm({ name: "", email: "", message: "" });
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
    <section 
      ref={contactRef} 
      id={id} 
      className={`py-20 md:py-32 relative bg-black ${className}`}
      aria-labelledby="contact-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.05),_transparent_50%)]" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Get in Touch
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-8 md:mb-12 max-w-xl mx-auto">
            Have a project in mind? Let's create something amazing together or start a general conversation.
          </p>

          {/* Status messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-center" role="alert">
              Thank you for reaching out! I'll get back to you soon.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-center" role="alert">
              Something went wrong. Please try again or contact me directly via email.
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact info */}
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400" aria-hidden="true">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Email Me</h3>
                  <a 
                    href="mailto:harmanpreetsingh@programmer.net" 
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    harmanpreetsingh@programmer.net
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400" aria-hidden="true">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Let's Talk</h3>
                  <p className="text-gray-400">Schedule a call to discuss your project</p>
                </div>
              </div>

              {showAddress && (
                <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
                  <address className="not-italic space-y-2 text-gray-400">
                    <p>{about.address.address1}</p>
                    <p>{about.address.address2}</p>
                    <p>{about.address.number}</p>
                  </address>
                </div>
              )}
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-emerald-500 focus:ring-emerald-500'} 
                           focus:ring-1 text-white placeholder-gray-400 transition-colors`}
                  placeholder="Your name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400">
                    {errors.name}
                  </p>
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
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-emerald-500 focus:ring-emerald-500'} 
                           focus:ring-1 text-white placeholder-gray-400 transition-colors`}
                  placeholder="your@email.com"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-emerald-500 focus:ring-emerald-500'} 
                           focus:ring-1 text-white placeholder-gray-400 transition-colors resize-none`}
                  placeholder="Tell me about your project or leave a message"
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 
                         text-black font-semibold hover:from-emerald-600 hover:to-blue-600 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 
                         focus:ring-offset-gray-900 transition-all duration-300 flex items-center 
                         justify-center gap-2 disabled:opacity-70"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Privacy note */}
          <p className="text-gray-500 text-xs text-center mt-8">
            Your information will only be used to respond to your inquiry and won't be shared with third parties.
          </p>
        </div>
      </div>
    </section>
  );
}