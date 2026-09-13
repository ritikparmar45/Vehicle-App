import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Sparkles, 
  Wrench, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Droplets,
  Disc,
  Activity,
  Wind,
  Settings,
  ShieldAlert,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';

const serviceCatalog = [
  { 
    id: 'engine-lifecycle',
    name: 'Engine Lifecycle & Fluid Matrix', 
    price: '₹999', 
    duration: '45 MINS', 
    category: 'Engine',
    desc: 'Fully synthetic high-viscosity oil flush, OEM filter replacement, and digital engine pressure calibration.',
    icon: <Droplets className="w-6 h-6 text-orange-400" />,
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    glowColor: 'group-hover:border-orange-500/50 group-hover:shadow-[0_0_35px_rgba(249,115,22,0.2)]'
  },
  { 
    id: 'precision-braking',
    name: 'Precision Ceramic Braking', 
    price: '₹1499', 
    duration: '60 MINS', 
    category: 'Brakes',
    desc: 'Brembo/OEM ceramic pad installation, rotor resurfacing check, and hydraulic line bleed test.',
    icon: <Disc className="w-6 h-6 text-rose-400" />,
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    glowColor: 'group-hover:border-rose-500/50 group-hover:shadow-[0_0_35px_rgba(244,63,94,0.2)]'
  },
  { 
    id: 'system-analysis',
    name: 'ECU Telemetry System Diagnostics', 
    price: '₹1299', 
    duration: '30 MINS', 
    category: 'ECU',
    desc: 'Full-spectrum computer diagnostic scan, sensor telemetry calibration, fault code clearing, and report logging.',
    icon: <Activity className="w-6 h-6 text-indigo-400" />,
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    glowColor: 'group-hover:border-indigo-500/50 group-hover:shadow-[0_0_35px_rgba(99,102,241,0.2)]'
  },
  { 
    id: 'climate-systems',
    name: 'HVAC Airflow & Climate System', 
    price: '₹1299', 
    duration: '90 MINS', 
    category: 'Maintenance',
    desc: 'R134a/R1234yf refrigerant recharge, evaporator antibacterial flush, and pollen filter replacement.',
    icon: <Wind className="w-6 h-6 text-cyan-400" />,
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    glowColor: 'group-hover:border-cyan-500/50 group-hover:shadow-[0_0_35px_rgba(6,182,212,0.2)]'
  },
  { 
    id: 'drive-balance',
    name: '3D Laser Wheel Alignment', 
    price: '₹799', 
    duration: '45 MINS', 
    category: 'Maintenance',
    desc: 'Multi-axis laser alignment, high-speed dynamic wheel balancing, and tire tread depth mapping.',
    icon: <Settings className="w-6 h-6 text-amber-400" />,
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    glowColor: 'group-hover:border-amber-500/50 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.2)]'
  },
  { 
    id: 'concierge-care',
    name: 'Full Bespoke Performance Overhaul', 
    price: '₹3499', 
    duration: 'FULL DAY', 
    category: 'Engine',
    desc: 'Comprehensive 150-point inspection, full fluid service, ceramic detailing, spark plug check, and road test.',
    icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />,
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    glowColor: 'group-hover:border-emerald-500/50 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.2)]'
  }
];

const categories = ['All', 'Engine', 'Brakes', 'ECU', 'Maintenance'];

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredServices = serviceCatalog.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white py-16 pt-28 animate-fade-in relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent-primary/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-accent-primary text-[10px] font-black uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Precision Engineering Catalog</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-heading font-black tracking-tight leading-none text-white">
            Performance <span className="text-gradient">Service Protocols</span>
          </h1>

          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Bespoke maintenance programs engineered for luxury and high-performance machines using certified master mechanics and genuine OEM components.
          </p>

          {/* Telemetry Stats Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% OEM Parts</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent-primary" />
              <span>6-Month Warranty</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>150-Point Inspection</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 glass-dark rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/25'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="input-field pl-11 py-2.5 text-xs rounded-2xl"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`glass-dark rounded-[2.5rem] p-8 border border-white/10 ${service.glowColor} transition-all duration-500 group relative flex flex-col justify-between overflow-hidden shadow-2xl`}
            >
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${service.badgeColor} flex items-center gap-1.5`}>
                    <Clock className="w-3 h-3" /> {service.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-primary opacity-80">{service.category} Protocol</span>
                  <h3 className="text-2xl font-heading font-black text-white tracking-tight uppercase group-hover:text-accent-primary transition-colors">
                    {service.name}
                  </h3>
                </div>

                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Investment</p>
                  <p className="text-3xl font-heading font-black text-white tracking-tight">{service.price}</p>
                </div>

                <Link
                  to="/book-service"
                  className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-accent-primary text-white border border-white/10 hover:border-accent-primary text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group/btn active:scale-95"
                >
                  <span>Book Slot</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Concierge Callout */}
        <div className="glass-dark rounded-[3rem] p-10 sm:p-14 border border-white/10 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Wrench className="w-80 h-80 text-white" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Custom Engineering</span>
              </div>
              <h2 className="text-4xl font-heading font-black text-white tracking-tight">Need Custom Race Tuning or Vintage Restoration?</h2>
              <p className="text-slate-400 text-base font-medium leading-relaxed">
                Our master technicians configure tailored diagnostic matrices for track builds, engine swaps, and exotic vehicle restorations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="btn-primary"
              >
                <span>Consult Specialist</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
