import React from 'react';
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
  ShieldAlert
} from 'lucide-react';

const services = [
  { 
    name: 'Engine Lifecycle', 
    price: '₹499', 
    duration: '30 min', 
    desc: 'Synthetic oil replacement and filter optimization.',
    icon: <Droplets />,
    color: 'brand'
  },
  { 
    name: 'Precision Braking', 
    price: '₹1499', 
    duration: '60 min', 
    desc: 'High-performance pad replacement and rotor check.',
    icon: <Disc />,
    color: 'rose'
  },
  { 
    name: 'System Analysis', 
    price: '₹999', 
    duration: '45 min', 
    desc: 'Full ECU diagnostic with detailed status report.',
    icon: <Activity />,
    color: 'indigo'
  },
  { 
    name: 'Climate Systems', 
    price: '₹1299', 
    duration: '90 min', 
    desc: 'Refrigerant recharge and anti-bacterial cleaning.',
    icon: <Wind />,
    color: 'emerald'
  },
  { 
    name: 'Drive Balance', 
    price: '₹599', 
    duration: '30 min', 
    desc: 'Tire rotation and electronic balancing for safety.',
    icon: <Settings />,
    color: 'amber'
  },
  { 
    name: 'Concierge Care', 
    price: '₹3499', 
    duration: '120 min', 
    desc: 'Bumper-to-bumper deep service and protection.',
    icon: <ShieldAlert />,
    color: 'indigo'
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 py-24 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-600 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            Premium Catalog
          </span>
          <h1 className="text-5xl font-heading font-extrabold text-slate-900 tracking-tight mb-8">
            Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Solutions</span> for Your Machine
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            From routine checks to complex restorations, our certified experts 
            ensure your vehicle stays in peak performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-[2.5rem] p-8 border border-slate-100 card-shadow hover:card-shadow-hover transition-all duration-300 group relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-${service.color}-50 text-${service.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(service.icon, { size: 28 })}
                  </div>
                  <span className="glass px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {service.duration}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{service.name}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{service.desc}</p>
                
                <div className="flex items-end justify-between">
                   <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting From</p>
                     <p className="text-3xl font-black text-slate-900 group-hover:text-brand-600 transition-colors">{service.price}</p>
                   </div>
                   <div className="flex items-center gap-2 text-emerald-500">
                     <CheckCircle2 className="w-5 h-5" />
                     <span className="text-[10px] font-black uppercase tracking-widest pt-0.5">Certified</span>
                   </div>
                </div>
              </div>
              
              {/* Subtle background decoration */}
              <div className="absolute -bottom-12 -right-12 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 {React.cloneElement(service.icon, { size: 160 })}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic CTA */}
        <div className="mt-24 bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Wrench className="w-64 h-64" />
           </div>
           
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
              <div className="max-w-xl">
                 <h2 className="text-4xl font-heading font-extrabold mb-4">Can't find what <br/> you're looking for?</h2>
                 <p className="text-slate-400 font-medium">We offer custom modifications and specialized restoration services for vintage and performance vehicles.</p>
              </div>
              <div className="flex gap-4">
                 <button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-1 active:scale-95 shadow-xl shadow-brand-600/20">
                   Contact Specialist
                 </button>
                 <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/10">
                   View Gallery
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
