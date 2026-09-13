import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Target, 
  Users, 
  ArrowRight,
  Award,
  CheckCircle2
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white py-16 pt-28 animate-fade-in relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-accent-primary/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-accent-primary text-[10px] font-black uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Automotive Engineering Lab</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-heading font-black tracking-tight leading-none text-white">
            Redefining <span className="text-gradient">Vehicle Performance</span>
          </h1>

          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Architecting the future of supercar diagnostics, telemetry management, and bespoke maintenance protocols.
          </p>
        </div>

        {/* Philosophy Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="aspect-[4/3] bg-slate-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1000&auto=format&fit=crop" 
                alt="Workshop Laboratory" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
            </div>

            <div className="absolute -bottom-8 -right-6 glass-dark p-8 rounded-3xl border border-white/10 shadow-2xl hidden md:block animate-float">
              <p className="text-5xl font-heading font-black text-white">15+</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Years of Precision<br/>Mastery</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-heading font-black text-white tracking-tight leading-tight">
                Engineering Integrity & Translucent Operations
              </h2>
              <p className="text-slate-400 text-base font-medium leading-relaxed">
                Founded with a mission to eliminate uncertainty from vehicle ownership, AutoCare Labs integrates factory-grade telemetry scanners with transparent digital invoicing.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { title: 'Factory Specification Matching', desc: 'All diagnostic tolerances adhere to OEM manufacturer guidelines.', icon: <Target className="w-5 h-5 text-accent-primary" /> },
                { title: 'Digital Garage Synchronization', desc: 'Real-time telemetry and digital maintenance logs accessible 24/7.', icon: <Zap className="w-5 h-5 text-indigo-400" /> },
                { title: 'Bespoke Concierge Protocol', desc: 'White-glove vehicle collection and delivery for executive owners.', icon: <Users className="w-5 h-5 text-emerald-400" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 glass-dark rounded-2xl border border-white/5">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-base">{item.title}</h3>
                    <p className="text-slate-400 text-xs font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/services" className="btn-primary">
              <span>Explore Protocols</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Units Serviced', value: '10,000+' },
            { label: 'Master Technicians', value: '45+' },
            { label: 'Satisfaction Index', value: '99.4%' },
            { label: 'Digital Receipts Saved', value: '25,000+' }
          ].map((stat, i) => (
            <div key={i} className="glass-dark p-8 rounded-3xl border border-white/10 text-center space-y-2">
              <p className="text-4xl sm:text-5xl font-heading font-black text-white">{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
