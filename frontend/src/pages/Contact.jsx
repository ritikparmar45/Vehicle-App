import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  Globe,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

import axios from 'axios';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Maintenance Inquiry', message: '' });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await axios.post(`${API_URL}/mail/contact`, form);
      setSent(true);
      setForm({ name: '', email: '', subject: 'Maintenance Inquiry', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error('Error sending email:', err);
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] py-24 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-slide-up">
            <MessageSquare className="w-3 h-3" />
            Concierge Support
          </div>
          <h1 className="text-6xl md:text-7xl font-heading font-black text-white tracking-tight mb-8 animate-slide-up">
            Let's Start a <br/>
            <span className="text-gradient">Conversation</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl animate-slide-up [animation-delay:200ms]">
            Whether you're looking for a bespoke maintenance plan or have a specific inquiry about our diagnostic services, our expert team is ready to assist.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Contact Information & Map */}
          <div className="lg:col-span-5 space-y-12">
            <div className="grid gap-6 animate-slide-up [animation-delay:400ms]">
               {[
                 { label: 'Email Support', val: 'concierge@autocare.com', icon: <Mail />, color: 'slate' },
                 { label: 'Emergency Line', val: '+1 (800) AUTO-CARE', icon: <Phone />, color: 'emerald' },
                 { label: 'Main Workshop', val: '72 Tech Blvd, San Francisco', icon: <MapPin />, color: 'rose' },
                 { label: 'Operating Hours', val: 'Mon - Sat: 8AM - 8PM', icon: <Clock />, color: 'indigo' },
               ].map((item, idx) => (
                 <div key={idx} className="bg-white p-8 rounded-3xl card-shadow card-shadow-hover group">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-100 flex items-center justify-center group-hover:bg-accent-primary group-hover:text-white transition-all duration-500">
                         {React.cloneElement(item.icon, { size: 24 })}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-lg text-slate-900 font-bold">{item.val}</p>
                      </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Map Placeholder */}
            <div className="relative h-80 w-full bg-slate-200 rounded-[2.5rem] overflow-hidden card-shadow group animate-slide-up [animation-delay:600ms]">
               <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
                 alt="Map" 
                 className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
               <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                  <div className="glass px-6 py-3 rounded-2xl text-xs font-black text-white uppercase tracking-widest flex items-center gap-3">
                     <Globe className="w-4 h-4 text-accent-primary" /> HQ Location
                  </div>
                  <button type="button" className="bg-white text-slate-900 hover:bg-accent-primary hover:text-white p-4 rounded-2xl shadow-lg transition-all active:scale-90">
                     <ArrowRight className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/50 rounded-[3rem] p-8 sm:p-16 card-shadow border-slate-800/50 relative overflow-hidden animate-slide-up [animation-delay:400ms]">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
             
              {error && (
                <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-500 text-sm font-bold">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-24 animate-fade-in">
                   <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-10 animate-float">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                   </div>
                   <h3 className="text-4xl font-heading font-black text-slate-900 mb-6 tracking-tight">Transmission Received</h3>
                   <p className="text-slate-500 font-medium max-w-sm text-lg leading-relaxed mb-12">
                     Our concierge team has received your inquiry. A specialist will reach out within the next 2 business hours.
                   </p>
                   <button 
                     onClick={() => setSent(false)}
                     className="text-sm font-black text-accent-primary uppercase tracking-widest border-b-2 border-accent-primary/20 pb-2 hover:border-accent-primary transition-all"
                   >
                     Send another message
                   </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10 relative">
                   <div className="space-y-8">
                     <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                          <input 
                            type="text" 
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Johnathan Doe" 
                            className="input-field"
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                          <input 
                            type="email" 
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="john@company.com" 
                            className="input-field"
                          />
                       </div>
                     </div>
 
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                        <select 
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="input-field appearance-none bg-slate-50/50"
                        >
                           <option>Maintenance Inquiry</option>
                           <option>Custom Modification</option>
                           <option>Parts & Accessories</option>
                           <option>Corporate Partnership</option>
                        </select>
                     </div>
 
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Body</label>
                        <textarea 
                          rows={5} 
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          placeholder="How can we assist you today?" 
                          className="input-field resize-none"
                        />
                     </div>
                   </div>
 
                   <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
                      <AlertCircle className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <p className="text-[10px] font-bold leading-relaxed uppercase tracking-widest text-slate-400">
                        By initiating this contact, you acknowledge our data processing policy. We prioritize your privacy and vehicle security above all.
                      </p>
                   </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-6 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {isSubmitting ? 'Processing...' : 'Transmit Request'}
                    </span>
                    {!isSubmitting && <Send className="w-4 h-4 mt-0.5" />}
                  </button>
               </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
