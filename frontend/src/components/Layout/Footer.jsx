import React from 'react';
import { Car, Mail, Phone, MapPin, Zap, ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/10 blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Brand Engine */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-accent-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-accent-primary/20 group-hover:rotate-12 transition-transform duration-500">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-heading font-black tracking-tighter leading-none">
                    AUTOCARE<span className="text-accent-primary">.</span>
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 text-slate-400">Precision Labs</span>
                </div>
              </Link>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm">
                Architecting the future of automotive maintenance with precision diagnostics and bespoke concierge services.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin].map((Icon, idx) => (
                <button key={idx} className="w-12 h-12 glass border-white/5 rounded-xl flex items-center justify-center hover:bg-accent-primary hover:text-white transition-all duration-500 group">
                  <Icon size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary">Intelligence</h3>
              <ul className="space-y-4">
                {['Performance Labs', 'Diagnostics', 'Asset Recovery', 'Security'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center gap-2 group">
                      {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary">Interface</h3>
              <ul className="space-y-4">
                {['Protocol', 'API Access', 'Enterprise', 'Support'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center gap-2 group">
                      {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary">Contact</h3>
              <div className="space-y-6">
                <div className="group cursor-pointer">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Direct Line</p>
                  <p className="text-sm font-bold text-slate-200 group-hover:text-accent-primary transition-colors">+1 (800) PRECISION</p>
                </div>
                <div className="group cursor-pointer">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Inquiries</p>
                  <p className="text-sm font-bold text-slate-200 group-hover:text-accent-primary transition-colors">ops@autocare.labs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            &copy; 2025 AUTOCARE PRECISION LABS. ALL SYSTEMS OPERATIONAL.
          </p>
          <div className="flex items-center gap-10">
            <a href="#" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;