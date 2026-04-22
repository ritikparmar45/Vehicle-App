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
  AlertCircle
} from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-24 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-600 text-xs font-black uppercase tracking-widest mb-6">
            <MessageSquare className="w-3 h-3" />
            Connect With Us
          </span>
          <h1 className="text-5xl font-heading font-extrabold text-slate-900 tracking-tight mb-8">
            Let's Start a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Conversation</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Have a question about your vehicle? Or interested in our premium maintenance plans? 
            Our concierge team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up">
            <div className="grid sm:grid-cols-2 gap-6">
               {[
                 { label: 'Email Support', val: 'concierge@autocare.com', icon: <Mail />, color: 'brand' },
                 { label: 'Emergency Line', val: '+1 (800) AUTO-CARE', icon: <Phone />, color: 'emerald' },
                 { label: 'Main Workshop', val: '72 Tech Blvd, San Francisco', icon: <MapPin />, color: 'rose' },
                 { label: 'Operating Hours', val: 'Mon - Sat: 8AM - 8PM', icon: <Clock />, color: 'indigo' },
               ].map((item, idx) => (
                 <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 card-shadow group hover:bg-slate-900 transition-all duration-500">
                    <div className={`w-12 h-12 rounded-2xl bg-${item.color === 'brand' ? 'blue' : item.color}-50 text-${item.color === 'brand' ? 'blue' : item.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                       {React.cloneElement(item.icon, { size: 24 })}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-slate-500">{item.label}</p>
                    <p className="text-slate-900 font-bold group-hover:text-white transition-colors">{item.val}</p>
                 </div>
               ))}
            </div>

            {/* Map Placeholder */}
            <div className="relative h-72 w-full bg-slate-200 rounded-[2.5rem] overflow-hidden card-shadow group">
               <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
                 alt="Map" 
                 className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="glass px-4 py-2 rounded-xl text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                     <Globe className="w-3 h-3" /> HQ Location
                  </div>
                  <button type="button" className="bg-white/20 hover:bg-white text-white hover:text-slate-900 p-3 rounded-xl backdrop-blur-md transition-all">
                     <Send className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[3rem] p-8 sm:p-12 border border-slate-100 card-shadow-hover relative overflow-hidden">
             
             {sent ? (
               <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-8">
                     <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-heading font-extrabold text-slate-900 mb-4">Message Sent!</h3>
                  <p className="text-slate-500 font-medium max-w-sm">
                    Thank you for reaching out. A concierge specialist will respond to your inquiry via email within 2 hours.
                  </p>
                  <button 
                    onClick={() => setSent(false)}
                    className="mt-12 text-sm font-black text-brand-600 uppercase tracking-widest border-b-2 border-brand-200 pb-1 hover:border-brand-600 transition-all"
                  >
                    Send another message
                  </button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div className="relative group">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 group-focus-within:text-brand-600 transition-colors">Your Name</label>
                       <input 
                         type="text" 
                         required
                         placeholder="Enter your full name" 
                         className="w-full bg-slate-50 border-2 border-transparent rounded-[1.25rem] p-5 text-sm font-bold text-slate-900 focus:bg-white focus:border-brand-200 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all placeholder:text-slate-300"
                       />
                    </div>
                    
                    <div className="relative group">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 group-focus-within:text-brand-600 transition-colors">Email Address</label>
                       <input 
                         type="email" 
                         required
                         placeholder="name@company.com" 
                         className="w-full bg-slate-50 border-2 border-transparent rounded-[1.25rem] p-5 text-sm font-bold text-slate-900 focus:bg-white focus:border-brand-200 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all placeholder:text-slate-300"
                       />
                    </div>

                    <div className="relative group">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 group-focus-within:text-brand-600 transition-colors">Inquiry Message</label>
                       <textarea 
                         rows={5} 
                         required
                         placeholder="How can we help your vehicle today?" 
                         className="w-full bg-slate-50 border-2 border-transparent rounded-[1.25rem] p-5 text-sm font-bold text-slate-900 focus:bg-white focus:border-brand-200 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all resize-none placeholder:text-slate-300"
                       />
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 flex gap-4 text-slate-400">
                     <AlertCircle className="w-5 h-5 flex-shrink-0" />
                     <p className="text-[10px] font-bold leading-relaxed uppercase tracking-wider">
                       By submitting this form, you agree to our privacy policy and consent to receiving maintenance alerts via email.
                     </p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-[1.5rem] p-6 font-black uppercase tracking-widest text-sm shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-4 h-4 mt-0.5" />
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
