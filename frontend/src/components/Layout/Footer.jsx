import React from 'react';
import { Car, Mail, Phone, MapPin, Zap, ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white relative overflow-hidden border-t border-white/10">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Engine */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 bg-accent-primary rounded-2xl flex items-center justify-center shadow-xl shadow-accent-primary/25 group-hover:scale-105 transition-transform duration-300">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-black tracking-tighter leading-none text-white">
                  AUTOCARE<span className="text-accent-primary">.</span>
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-slate-400">Precision Auto Labs</span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-md">
              Industry-leading vehicle diagnostics, routine maintenance, and bespoke performance engineering.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              {[Twitter, Github, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 glass border-white/10 rounded-xl flex items-center justify-center hover:bg-accent-primary hover:text-white transition-all duration-300 group">
                  <Icon size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-accent-primary">Quick Navigation</h3>
              <ul className="space-y-2.5">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Services Catalog', path: '/services' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact Concierge', path: '/contact' },
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-1.5 group">
                      {item.name} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-accent-primary">Popular Services</h3>
              <ul className="space-y-2.5">
                {['ECU Diagnostics', 'Ceramic Braking', 'Climate Recharge', 'Wheel Alignment'].map(item => (
                  <li key={item}>
                    <Link to="/services" className="text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-1.5 group">
                      {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-accent-primary">Contact Info</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="font-black text-slate-500 uppercase tracking-wider text-[9px]">24/7 Hotline</p>
                  <p className="font-bold text-slate-200">+1 (800) PRECISION</p>
                </div>
                <div>
                  <p className="font-black text-slate-500 uppercase tracking-wider text-[9px]">Direct Email</p>
                  <p className="font-bold text-slate-200">concierge@autocare.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            &copy; 2026 AUTOCARE PRECISION LABS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;