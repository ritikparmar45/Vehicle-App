import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, Users, Wrench, CheckCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-brand-600" />,
      title: 'Expert Mechanics',
      description: 'Our team consists of certified professionals with years of experience across all major vehicle brands.'
    },
    {
      icon: <Shield className="h-6 w-6 text-brand-600" />,
      title: 'Quality Guaranteed',
      description: 'We use only genuine parts. All our services come with a standard 6-month warranty.'
    },
    {
      icon: <Clock className="h-6 w-6 text-brand-600" />,
      title: 'Quick Turnaround',
      description: 'Book online, drop off your car, and get it back on time. We value your schedule.'
    }
  ];

  const services = [
    { name: 'Basic Service', price: '₹999', duration: '2 Hours', features: ['Oil Change', 'Filter Replacement', 'Basic Wash'] },
    { name: 'Standard Service', price: '₹1499', duration: '4 Hours', features: ['Engine Oil Change', 'Brake Inspection', 'Tire Rotation', 'Interior Clean'] },
    { name: 'Premium Service', price: '₹2499', duration: 'Full Day', features: ['Complete Diagnostics', 'AC Servicing', 'Wheel Alignment', 'Full Detailing'] }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold mb-6 border border-brand-100">
                Trusted Auto Care Center
              </span>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 mt-2">
                Professional Care for Your Vehicle
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Book your next service appointment in minutes. Get transparent pricing, expert mechanics, and reliable repairs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-colors">
                  Book an Appointment
                </Link>
                <Link to="/services" className="inline-flex justify-center items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                  View Services
                </Link>
              </div>
            </div>
            
            {/* Simple Clean Image Placeholder / Graphic */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100 aspect-[4/3] flex items-center justify-center">
               <Car className="w-32 h-32 text-slate-300" />
               <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Us?</h2>
            <p className="text-slate-600">We provide top-notch service using modern equipment and trained professionals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-slate-200 card-shadow hover:card-shadow-hover transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Pricing Table Section */}
      <section className="py-20 bg-white border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Service Packages</h2>
                <p className="text-slate-600">Transparent pricing with no hidden charges. Choose what fits your needs.</p>
              </div>
              <Link to="/services" className="mt-4 md:mt-0 text-brand-600 font-semibold hover:text-brand-700 flex items-center">
                See all services <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
               {services.map((svc, idx) => (
                 <div key={idx} className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col hover:border-brand-300 transition-colors">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{svc.name}</h3>
                    <p className="text-slate-500 text-sm mb-6 flex items-center"><Clock className="w-4 h-4 mr-1"/> {svc.duration}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-extrabold text-slate-900">{svc.price}</span>
                    </div>

                    <ul className="space-y-4 mb-8 flex-grow">
                       {svc.features.map((feat, i) => (
                         <li key={i} className="flex items-start">
                           <CheckCircle className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0 mt-0.5" />
                           <span className="text-slate-600">{feat}</span>
                         </li>
                       ))}
                    </ul>

                    <Link to="/register" className="w-full block text-center py-3 px-4 border border-brand-600 text-brand-600 rounded-lg hover:bg-brand-50 font-semibold transition-colors mt-auto">
                      Choose Package
                    </Link>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to service your car?</h2>
          <p className="text-brand-100 mb-8 max-w-2xl mx-auto">Create an account to book your service and track your vehicle's maintenance history.</p>
          <Link to="/register" className="inline-block bg-white text-brand-600 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-slate-50 transition-colors">
            Get Started
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
