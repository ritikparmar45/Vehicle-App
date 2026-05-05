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
  Verified,
  ArrowRight
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/10 blur-[120px] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-secondary/10 blur-[120px] rounded-full animate-pulse-slow [animation-delay:1s]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-slide-up">
            <Sparkles className="w-3 h-3" />
            Redefining Maintenance
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-black text-slate-900 tracking-tight mb-8 animate-slide-up [animation-delay:100ms]">
            The Future of <br/>
            <span className="text-gradient">Vehicle Care</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed animate-slide-up [animation-delay:200ms]">
            We've combined world-class engineering with bespoke service 
            to ensure your vehicle performs at its peak, always.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative animate-slide-up [animation-delay:400ms]">
               <div className="aspect-[4/5] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1000&auto=format&fit=crop" 
                    alt="Workshop" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all duration-500"></div>
               </div>
               <div className="absolute -bottom-10 -right-10 glass p-10 rounded-[2.5rem] shadow-2xl hidden md:block animate-float">
                  <div className="text-6xl font-black text-slate-900 mb-1">15+</div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Years of <br/> Excellence</div>
               </div>
            </div>
            
            <div className="space-y-12 animate-slide-up [animation-delay:500ms]">
               <div className="space-y-6">
                 <h2 className="text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">Our Story & <br/> Commitment</h2>
                 <p className="text-slate-500 font-medium leading-relaxed text-lg">
                   Founded in 2010, AutoCare was born from a simple observation: vehicle maintenance 
                   felt like a burden to owners. We set out to change that by digitizing the entire flow 
                   and focusing on absolute transparency.
                 </p>
               </div>
               
               <div className="space-y-8">
                  {[
                    { label: 'Unmatched Precision', desc: 'Every component checked against factory specs.', icon: <Target /> },
                    { label: 'Digital First', desc: 'Manage your entire garage history from your dashboard.', icon: <Zap /> },
                    { label: 'Customer Centric', desc: 'Concierge pickup and drop-off for our premium members.', icon: <Users /> },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                       <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                          {React.cloneElement(item.icon, { size: 22 })}
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-accent-primary transition-colors">{item.label}</h4>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>

               <button className="btn-primary group">
                 <span>Learn Our Process</span>
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Numbers */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/20 blur-[150px] rounded-full -mr-48 -mt-48"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
               {[
                 { val: '50k+', label: 'Happy Clients' },
                 { val: '120+', label: 'Expert Technicians' },
                 { val: '25', label: 'Service Centers' },
                 { val: '4.9/5', label: 'Avg Rating' },
               ].map((stat, idx) => (
                 <div key={idx} className="space-y-3">
                    <div className="text-5xl md:text-6xl font-black text-white mb-2">{stat.val}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Our Values */}
      <section className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-200/50 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Values</div>
            <h2 className="text-5xl font-heading font-black text-slate-900 mb-6">Core Principles</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg">The values that guide every service we perform and every interaction we have.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: 'Quality First', icon: <Verified />, color: 'emerald' },
              { title: 'Reliability', icon: <ShieldCheck />, color: 'accent-primary' },
              { title: 'Innovation', icon: <Sparkles />, color: 'accent-secondary' },
            ].map((value, i) => (
              <div key={i} className="bg-white p-12 rounded-[3rem] card-shadow card-shadow-hover group">
                <div className="w-20 h-20 rounded-[2rem] bg-slate-50 text-slate-900 flex items-center justify-center mb-10 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                  {React.cloneElement(value.icon, { size: 36 })}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-accent-primary transition-colors">{value.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-10 text-lg">
                  We never compromise on the high standards we set for ourselves. Every vehicle is treated as if it were our own masterpiece.
                </p>
                <div className="flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                   Explore More <ArrowRight className="w-3 h-3 text-accent-primary" />
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
