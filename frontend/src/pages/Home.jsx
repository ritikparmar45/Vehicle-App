import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Shield, 
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
      icon: <Users className="h-6 w-6" />,
      title: 'Expert Mechanics',
      description: 'Our team consists of certified professionals with years of experience across all major premium vehicle brands.'
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: 'Quality Guaranteed',
      description: 'We use only genuine OEM parts. All our services come with a standard 6-month comprehensive warranty.'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Quick Turnaround',
      description: 'Book online, drop off your car, and get it back on time. We value your schedule and time.'
    }
  ];

  const services = [
    { 
      name: 'Basic Service', 
      price: '₹999', 
      duration: '2 Hours', 
      features: ['Oil Change', 'Filter Replacement', 'Basic Wash', 'Visual Inspection'],
      popular: false 
    },
    { 
      name: 'Standard Service', 
      price: '₹1499', 
      duration: '4 Hours', 
      features: ['Engine Oil Change', 'Brake Inspection', 'Tire Rotation', 'Interior Clean', 'Fluid Top-ups'],
      popular: true 
    },
    { 
      name: 'Premium Service', 
      price: '₹2499', 
      duration: 'Full Day', 
      features: ['Complete Diagnostics', 'AC Servicing', 'Wheel Alignment', 'Full Detailing', 'Deep Ceramic Polish'],
      popular: false 
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen animate-fade-in text-slate-100">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-32 lg:pb-48 overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent-primary/10 blur-[120px] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] bg-accent-secondary/10 blur-[120px] rounded-full animate-pulse-slow [animation-delay:2s]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="max-w-2xl space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 animate-slide-up shadow-sm">
                <Star className="w-4 h-4 text-accent-primary fill-accent-primary" />
                <span>Premium Auto Care Solutions</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-8xl font-heading font-black text-white leading-[0.95] tracking-tight animate-slide-up [animation-delay:100ms]">
                  Precision <br/>
                  <span className="text-gradient">Performance</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg animate-slide-up [animation-delay:200ms]">
                  Experience industry-leading vehicle diagnostics and maintenance. Transparent pricing, elite mechanics, zero compromise.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 animate-slide-up [animation-delay:300ms]">
                <Link to="/register" className="btn-primary group">
                  <span>Initiate Booking</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/services" className="inline-flex justify-center items-center px-10 py-5 border-2 border-slate-800 text-xs font-black uppercase tracking-widest rounded-2xl text-white bg-slate-900/50 hover:bg-slate-800 hover:border-slate-700 transition-all backdrop-blur-sm shadow-sm active:scale-95">
                  Explore Services
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-12 pt-12 border-t border-slate-800 animate-slide-up [animation-delay:400ms]">
                 <div>
                    <h4 className="text-4xl font-black text-white">10k+</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Units Serviced</p>
                 </div>
                 <div className="w-px h-12 bg-slate-800"></div>
                 <div>
                    <h4 className="text-4xl font-black text-white">4.9/5</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Satisfaction</p>
                 </div>
              </div>
            </div>
            
            {/* Visual Hero Graphic */}
            <div className="relative hidden lg:block animate-slide-up [animation-delay:400ms]">
               <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-900 bg-slate-900 aspect-[4/3] group">
                  <img 
                    src="/premium_vehicle_service_hero_1777871020415.png" 
                    alt="Premium Workshop" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent"></div>
                  
                  {/* Floating Performance Indicator */}
                  <div className="absolute bottom-8 left-8 glass p-6 rounded-3xl animate-float shadow-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-accent-success/10 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-accent-success" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Diagnostic Status</p>
                        <p className="text-lg font-black text-slate-900 tracking-tight">Optimal Performance</p>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Decorative Element */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="inline-block px-4 py-1 rounded-full bg-slate-900 text-accent-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-accent-primary/20">Our Standards</div>
            <h2 className="text-5xl font-heading font-black text-white mb-6 tracking-tight">Engineered for Excellence</h2>
            <p className="text-xl text-slate-400 font-medium">We combine state-of-the-art diagnostic technology with elite mechanical expertise to deliver unmatched results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-slate-900/40 p-12 rounded-[2.5rem] border border-slate-800 transition-all duration-500 group hover:bg-slate-900 hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 text-accent-primary flex items-center justify-center mb-10 shadow-sm group-hover:bg-accent-primary group-hover:text-white transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-6 tracking-tight group-hover:text-accent-primary transition-colors">{feature.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-5xl font-heading font-black text-white tracking-tight leading-tight">Maintenance <br/> Programs</h2>
                <p className="text-xl text-slate-400 font-medium">Absolute transparency. No hidden fees. Just world-class service.</p>
              </div>
              <Link to="/services" className="mt-8 md:mt-0 group flex items-center text-xs font-black uppercase tracking-widest text-slate-300 hover:text-accent-primary transition-colors">
                Compare All Plans <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
               {services.map((svc, idx) => (
                 <div key={idx} className={`relative bg-slate-900/50 rounded-[3rem] p-12 transition-all duration-500 group ${svc.popular ? 'border-2 border-accent-primary shadow-2xl lg:-translate-y-6' : 'border border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-2'}`}>
                    
                    {svc.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-primary text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                        Most Requested
                      </div>
                    )}

                    <div className="space-y-6 mb-12">
                      <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-accent-primary transition-colors">{svc.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <Clock className="w-4 h-4"/> {svc.duration}
                      </div>
                    </div>
                    
                    <div className="mb-12">
                      <span className="text-6xl font-black text-white tracking-tighter">{svc.price}</span>
                      <span className="text-slate-500 ml-2 font-black uppercase tracking-widest text-[10px]">/ Appointment</span>
                    </div>

                    <ul className="space-y-6 mb-16">
                       {svc.features.map((feat, i) => (
                         <li key={i} className="flex items-center gap-4">
                           <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                             <CheckCircle className="h-4 w-4 text-accent-primary" />
                           </div>
                           <span className="text-slate-400 font-medium">{feat}</span>
                         </li>
                       ))}
                    </ul>

                    <Link to="/register" className={`w-full block text-center py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${svc.popular ? 'bg-accent-primary text-white hover:bg-accent-primary/80 shadow-xl' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                      Select Program
                    </Link>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-slate-900 rounded-[4rem] p-16 md:p-24 overflow-hidden group border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-transparent"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            
            <div className="relative z-10 max-w-3xl space-y-10">
              <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tight leading-tight">Secure Your <br/> Performance Today</h2>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Join the elite community of drivers who trust our bespoke maintenance programs. Track your history, receive alerts, and stay ahead.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/register" className="inline-flex justify-center items-center px-12 py-6 bg-white text-slate-900 font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                  Create Private Account <ArrowRight className="ml-3 w-5 h-5 text-accent-primary" />
                </Link>
              </div>
            </div>

            {/* Decorative background Car icon */}
            <Car className="absolute -bottom-20 -right-20 w-96 h-96 text-white/5 -rotate-12 pointer-events-none group-hover:rotate-0 transition-all duration-[2000ms]" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
