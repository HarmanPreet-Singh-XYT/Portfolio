import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import sendMail from '@/app/api/Nodemailer';

export default function Contact({contactRef}:{contactRef:any}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e:any) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await sendMail(form.name, form.email, form.message).then((res) => {
      if(res) alert('Thank you for Contacting, I will get back to you soon');
      else alert('Something went wrong, please try again later');
    });
    setIsSubmitting(false);
  };

  return (
    <section ref={contactRef} id='contact-section' className="py-32 relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(74,222,128,0.05),_transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Get in Touch
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Have a project in mind? Let's create something amazing together or general conversation
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                  <Mail className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Email Me</h3>
                  <p className="text-gray-400">harmanpreetsingh@programmer.net</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                  <MessageSquare className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Let's Talk</h3>
                  <p className="text-gray-400">Schedule a call to discuss your project</p>
                </div>
              </div>

              {/* <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">Office Hours</h3>
                <div className="space-y-2 text-gray-400">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 2:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div> */}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                           focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 
                           text-white placeholder-gray-400 transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                           focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 
                           text-white placeholder-gray-400 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name='message'
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                           focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 
                           text-white placeholder-gray-400 transition-colors resize-none"
                  placeholder="your message"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 
                         text-black font-semibold hover:from-emerald-600 hover:to-blue-600 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 
                         focus:ring-offset-gray-900 transition-all duration-300 flex items-center 
                         justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}