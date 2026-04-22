import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Award, 
  Users, 
  Sparkles,
  ChevronRight,
  Zap,
  Target,
  Verified
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-slate-50">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            Redefining Maintenance
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-slate-900 tracking-tight mb-8">
            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Vehicle Care</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            We've combined world-class engineering with white-glove service 
            to ensure your vehicle performs at its peak, always.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
               <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1000&auto=format&fit=crop" 
                    alt="Workshop" 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
               </div>
               <div className="absolute -bottom-10 -right-10 bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl hidden md:block border border-white/50">
                  <div className="text-5xl font-black text-blue-600 mb-1">15+</div>
                  <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Years of <br/> Excellence</div>
               </div>
            </div>
            
            <div className="space-y-8">
               <h2 className="text-4xl font-heading font-extrabold text-slate-900 tracking-tight">Our Story & Excellence</h2>
               <p className="text-slate-500 font-medium leading-relaxed text-lg">
                 Founded in 2010, AutoCare was born from a simple observation: vehicle maintenance 
                 felt like a burden to owners. We set out to change that by digitizing the entire flow 
                 and focusing on absolute transparency.
               </p>
               
               <div className="space-y-6">
                  {[
                    { label: 'Unmatched Precision', desc: 'Every bolt, every fluid checked against factory specs.', icon: <Target /> },
                    { label: 'Digital First', desc: 'Manage your entire garage history from your fingertips.', icon: <Zap /> },
                    { label: 'Customer Centric', desc: ' Concierge pickup and drop-off available for all members.', icon: <Users /> },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-5 group">
                       <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                          {React.cloneElement(item.icon, { size: 20 })}
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900 mb-1">{item.label}</h4>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Numbers */}
      <section className="py-24 bg-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
               {[
                 { val: '50k+', label: 'Happy Clients' },
                 { val: '120+', label: 'Expert Technicians' },
                 { val: '25', label: 'Service Centers' },
                 { val: '4.9/5', label: 'Avg Rating' },
               ].map((stat, idx) => (
                 <div key={idx}>
                    <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">{stat.val}</div>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-extrabold text-slate-900 mb-4">Core Principles</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">The values that guide every service we perform.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Quality First', icon: <Verified />, color: 'emerald' },
              { title: 'Reliability', icon: <ShieldCheck />, color: 'indigo' },
              { title: 'Innovation', icon: <Sparkles />, color: 'blue' },
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all group">
                <div className={`w-16 h-16 rounded-[1.5rem] bg-${value.color}-50 text-${value.color}-600 flex items-center justify-center mb-8 transition-colors group-hover:bg-${value.color}-600 group-hover:text-white`}>
                  {React.cloneElement(value.icon, { size: 32 })}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">
                  We never compromise on the high standards we set for ourselves. Every vehicle is treated as if it were our own.
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                   Learn More <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
