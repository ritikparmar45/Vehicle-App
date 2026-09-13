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
  ArrowRight,
  Sparkles
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
    <div className="min-h-screen bg-[#050505] text-white py-16 pt-28 animate-fade-in relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-accent-primary/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-accent-primary text-[10px] font-black uppercase tracking-[0.25em]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>24/7 Concierge Support</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-heading font-black tracking-tight leading-none text-white">
            Connect With Our <span className="text-gradient">Specialists</span>
          </h1>

          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Have questions about custom diagnostic protocols, performance upgrades, or corporate fleet maintenance? Our team is available 24/7.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            {[
              { label: 'Direct Email Support', val: 'concierge@autocare.com', icon: <Mail className="w-5 h-5 text-accent-primary" /> },
              { label: 'Emergency Hotline', val: '+1 (800) PRECISION', icon: <Phone className="w-5 h-5 text-emerald-400" /> },
              { label: 'Main Workshop & Lab', val: '72 Tech Blvd, San Francisco, CA', icon: <MapPin className="w-5 h-5 text-rose-400" /> },
              { label: 'Operating Schedule', val: 'Mon - Sat: 8:00 AM - 8:00 PM', icon: <Clock className="w-5 h-5 text-indigo-400" /> },
            ].map((item, idx) => (
              <div key={idx} className="glass-dark p-6 sm:p-8 rounded-3xl border border-white/10 card-shadow-hover transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-base sm:text-lg font-bold text-white mt-0.5">{item.val}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 glass-dark p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-black text-white tracking-tight">Transmit Direct Message</h2>
              <p className="text-slate-400 text-xs font-medium">Fill out the form below to receive a response within 2 hours.</p>
            </div>

            {sent && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 animate-slide-up">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-300 text-xs font-semibold">Message transmitted successfully! Our team will respond shortly.</span>
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 animate-slide-up">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="text-rose-300 text-xs font-semibold">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="input-field"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Topic</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="e.g. Booking inquiry / Custom Restoration"
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Content</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Provide details about your vehicle make, model, and required services..."
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 rounded-2xl"
              >
                {isSubmitting ? 'Transmitting...' : 'Transmit Message'}
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
