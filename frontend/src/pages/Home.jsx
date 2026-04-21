import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, Users, Wrench, CheckCircle, ArrowRight, Star, ChevronRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-brand-600" />,
      title: 'Expert Mechanics',
      description: 'Our team consists of certified professionals with years of experience across all major premium vehicle brands.'
    },
    {
      icon: <Shield className="h-6 w-6 text-brand-600" />,
      title: 'Quality Guaranteed',
      description: 'We use only genuine OEM parts. All our services come with a standard 6-month comprehensive warranty.'
    },
    {
      icon: <Clock className="h-6 w-6 text-brand-600" />,
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
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-white">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-brand-50/80 blur-3xl" />
          <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-50/60 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-semibold mb-8 shadow-sm">
                <Star className="w-4 h-4 fill-brand-600" />
                <span>#1 Rated Auto Care Center in the City</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-slate-900 leading-[1.1] mb-6">
                Redefining <br/> <span className="text-gradient">Vehicle Care</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                Experience premium auto maintenance with transparent pricing, certified mechanics, and zero hidden costs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="group inline-flex justify-center items-center px-8 py-4 text-base font-medium rounded-full text-white bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5">
                  Book an Appointment
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/services" className="inline-flex justify-center items-center px-8 py-4 border-2 border-slate-200 text-base font-medium rounded-full text-slate-700 bg-white/50 hover:bg-white hover:border-slate-300 transition-all backdrop-blur-sm">
                  View Our Services
                </Link>
              </div>

              {/* Stats / Trust indicators */}
              <div className="mt-12 flex items-center gap-8 pt-8 border-t border-slate-200/60">
                 <div>
                    <h4 className="text-3xl font-bold text-slate-900">10k+</h4>
                    <p className="text-sm text-slate-500 font-medium">Vehicles Serviced</p>
                 </div>
                 <div className="w-px h-12 bg-slate-200"></div>
                 <div>
                    <h4 className="text-3xl font-bold text-slate-900">4.9/5</h4>
                    <p className="text-sm text-slate-500 font-medium">Customer Reviews</p>
                 </div>
              </div>
            </div>
            
            {/* Visual Graphic */}
            <div className="relative hidden lg:block">
               <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/10 border border-white bg-white aspect-[4/3] flex items-center justify-center transform hover:-translate-y-2 transition-transform duration-500">
                  {/* We use a high quality icon/illustration placeholder to represent a car */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white z-0"></div>
                  <Wrench className="w-48 h-48 text-slate-200 z-10 opacity-50 absolute -right-10 -bottom-10 rotate-12" />
                  <Car className="w-40 h-40 text-brand-600 z-10 relative drop-shadow-xl" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-8 left-8 glass rounded-2xl p-4 z-20 animate-pulse-slow shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full"><CheckCircle className="w-5 h-5 text-green-600" /></div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Service Status</p>
                        <p className="text-sm font-bold text-slate-900">Completed</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">Our Standards</h2>
            <h3 className="text-4xl font-heading font-extrabold text-slate-900 mb-4">Why drivers choose us</h3>
            <p className="text-lg text-slate-600">We combine state-of-the-art diagnostic technology with seasoned mechanical expertise.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-10 rounded-3xl border border-slate-100 card-shadow hover:card-shadow-hover transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-100 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Pricing Table Section */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
         <div className="absolute top-0 w-full h-1/2 bg-slate-50 left-0 -z-10 rounded-b-[4rem]"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-heading font-extrabold text-slate-900 mb-6">Service Packages</h2>
                <p className="text-lg text-slate-600">Transparent pricing. No surprising fees when you come to pick up your keys.</p>
              </div>
              <Link to="/services" className="mt-6 md:mt-0 group flex items-center text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                Compare all features <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-center">
               {services.map((svc, idx) => (
                 <div key={idx} className={`relative bg-white rounded-3xl p-8 lg:p-10 transition-all duration-300 ${svc.popular ? 'border-2 border-brand-500 card-shadow-hover lg:-translate-y-4 shadow-brand-500/10' : 'border border-slate-200 card-shadow hover:card-shadow-hover'}`}>
                    
                    {svc.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-sm">
                        Most Popular
                      </div>
                    )}

                    <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">{svc.name}</h3>
                    <p className="text-slate-500 font-medium mb-8 flex items-center"><Clock className="w-4 h-4 mr-2"/> {svc.duration}</p>
                    
                    <div className="mb-8">
                      <span className="text-5xl font-heading font-extrabold text-slate-900">{svc.price}</span>
                      <span className="text-slate-500 ml-2 font-medium">/visit</span>
                    </div>

                    <ul className="space-y-5 mb-10 flex-grow">
                       {svc.features.map((feat, i) => (
                         <li key={i} className="flex items-start">
                           <CheckCircle className="h-5 w-5 text-brand-500 mr-3.5 flex-shrink-0 mt-0.5" />
                           <span className="text-slate-700 font-medium">{feat}</span>
                         </li>
                       ))}
                    </ul>

                    <Link to="/register" className={`w-full block text-center py-4 px-6 rounded-xl font-semibold transition-all mt-auto ${svc.popular ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-500/25' : 'bg-brand-50 text-brand-700 hover:bg-brand-100'}`}>
                      Select Package
                    </Link>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-100"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 to-slate-900/90"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight">Ready to service your vehicle?</h2>
          <p className="text-brand-100 text-lg mb-10 max-w-2xl mx-auto font-medium">Join thousands of satisfied drivers. Create an account to book your service and track your maintenance history in one place.</p>
          <Link to="/register" className="inline-flex justify-center flex-row items-center bg-white text-brand-900 font-bold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
            Create an Account <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
