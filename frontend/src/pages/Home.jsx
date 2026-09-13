import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Clock, 
  Users, 
  Wrench, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-accent-primary" />,
      title: 'Certified Master Technicians',
      description: 'Our certified engineers specialize in high-performance engines, diagnostics, and exotic vehicle maintenance.'
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
      title: 'Genuine OEM Guarantee',
      description: 'We install only original factory parts. Every service is backed by a 6-month comprehensive warranty.'
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-400" />,
      title: 'Rapid Queue Turnaround',
      description: 'Schedule online, track diagnostic progress live on your dashboard, and collect your machine on time.'
    }
  ];

  const services = [
    { 
      name: 'Basic Care Protocol', 
      price: '₹999', 
      duration: '2 Hours', 
      features: ['Engine Oil Change', 'Oil Filter Replacement', 'Visual Inspection', 'Multi-point Fluid Top-Up'],
      popular: false 
    },
    { 
      name: 'Standard Maintenance', 
      price: '₹1499', 
      duration: '4 Hours', 
      features: ['Full Synthetic Oil Flush', 'Ceramic Brake Inspection', 'Dynamic Wheel Balancing', 'AC Filter & Sanitization', 'Live ECU Diagnostics'],
      popular: true 
    },
    { 
      name: 'Bespoke Performance Overhaul', 
      price: '₹2499', 
      duration: 'Full Day', 
      features: ['Comprehensive 150-Pt Scan', 'Full Climate System Flush', '3D Laser Alignment', 'Exterior Ceramic Detail', 'Engine Bay Restoration'],
      popular: false 
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen animate-fade-in text-slate-100 relative overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-28 lg:pb-40 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-10 left-1/4 w-[40rem] h-[40rem] bg-accent-primary/10 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark border border-white/10 text-accent-primary text-[10px] font-black uppercase tracking-[0.25em]">
                <Star className="w-3.5 h-3.5 fill-accent-primary text-accent-primary" />
                <span>Next-Gen Vehicle Care</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-7xl font-heading font-black text-white leading-[0.95] tracking-tight">
                  Precision <br/>
                  <span className="text-gradient">Performance</span>
                </h1>
                <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
                  World-class diagnostic technology and bespoke vehicle maintenance. Transparent pricing, certified master technicians, and zero compromise.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/book-service" className="btn-primary group">
                  <span>Book Service Now</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/services" className="px-8 py-4 glass-dark rounded-2xl text-xs font-black uppercase tracking-widest text-white border border-white/10 hover:border-accent-primary/40 hover:bg-white/10 transition-all flex items-center justify-center">
                  Explore Services
                </Link>
              </div>

              {/* Live Telemetry Stats */}
              <div className="flex items-center gap-10 pt-8 border-t border-white/10">
                 <div>
                    <h4 className="text-3xl font-heading font-black text-white">10,000+</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Vehicles Serviced</p>
                 </div>
                 <div className="w-px h-10 bg-white/10"></div>
                 <div>
                    <h4 className="text-3xl font-heading font-black text-white">4.9 / 5</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Customer Rating</p>
                 </div>
              </div>
            </div>
            
            {/* Visual Hero Graphic */}
            <div className="lg:col-span-6 relative">
               <div className="relative rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-900 aspect-[16/10] group">
                  <img 
                    src="/supercar_hero.jpg" 
                    alt="Precision Supercar Workshop" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                  
                  {/* Floating Performance Indicator */}
                  <div className="absolute bottom-6 left-6 glass-dark p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Diagnostic Telemetry</p>
                        <p className="text-sm font-black text-white tracking-tight">Optimal Vehicle Calibration</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#08080a] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block px-4 py-1 rounded-full glass border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase tracking-[0.2em]">Our Engineering Standards</div>
            <h2 className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight">Built for Performance</h2>
            <p className="text-slate-400 text-base font-medium">Combining factory diagnostic computers with master craftsmanship to deliver unmatched results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="glass-dark p-8 sm:p-10 rounded-[2.5rem] border border-white/10 card-shadow-hover transition-all duration-500 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-black text-white mb-3 tracking-tight group-hover:text-accent-primary transition-colors">{feature.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section className="py-24 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="max-w-2xl space-y-3">
                <h2 className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight">Maintenance Programs</h2>
                <p className="text-slate-400 text-base font-medium">Transparent fixed pricing. No surprise fees. Standardized service checklists.</p>
              </div>
              <Link to="/services" className="group flex items-center text-xs font-black uppercase tracking-widest text-slate-300 hover:text-accent-primary transition-colors">
                Compare All Programs <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
               {services.map((svc, idx) => (
                 <div key={idx} className={`relative glass-dark rounded-[2.5rem] p-8 sm:p-10 transition-all duration-500 flex flex-col justify-between ${svc.popular ? 'border-2 border-accent-primary shadow-[0_0_40px_rgba(249,115,22,0.2)] lg:-translate-y-4' : 'border border-white/10 hover:border-white/20 shadow-xl'}`}>
                    
                    {svc.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-accent-primary to-orange-600 text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                        Most Popular Choice
                      </div>
                    )}

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-heading font-black text-white tracking-tight">{svc.name}</h3>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <Clock className="w-3.5 h-3.5 text-accent-primary"/> {svc.duration}
                        </div>
                      </div>
                      
                      <div className="pb-6 border-b border-white/5">
                        <span className="text-5xl font-heading font-black text-white tracking-tight">{svc.price}</span>
                        <span className="text-slate-400 ml-2 font-black uppercase tracking-widest text-[9px]">/ Appointment</span>
                      </div>

                      <ul className="space-y-3.5 mb-8">
                         {svc.features.map((feat, i) => (
                           <li key={i} className="flex items-center gap-3">
                             <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                             <span className="text-slate-300 text-sm font-medium">{feat}</span>
                           </li>
                         ))}
                      </ul>
                    </div>

                    <Link to="/book-service" className={`w-full text-center py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${svc.popular ? 'btn-primary' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}>
                      Book Program
                    </Link>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative glass-dark rounded-[3rem] p-10 sm:p-16 overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/15 blur-[140px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl space-y-6">
              <h2 className="text-4xl sm:text-6xl font-heading font-black text-white tracking-tight leading-tight">Secure Your Service Window Today</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Join thousands of drivers who trust AutoCare Labs for precision diagnostics, transparent billing, and digital receipts.
              </p>
              <div className="pt-2">
                <Link to="/register" className="btn-primary">
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
