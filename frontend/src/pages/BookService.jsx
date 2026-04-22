import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, 
  Calendar, 
  Clock, 
  CreditCard, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle, 
  ChevronRight, 
  Info,
  ShieldCheck,
  User,
  Settings,
  Sparkles
} from 'lucide-react';
import axios from 'axios';
import { format, addDays } from 'date-fns';

const BookService = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    service: '',
    vehicleDetails: {
      type: 'car',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      licensePlate: ''
    },
    appointmentDate: '',
    appointmentTime: '',
    notes: ''
  });

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API}/services`);
      setServices(response.data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to fetch services catalog.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('vehicle.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        vehicleDetails: {
          ...prev.vehicleDetails,
          [field]: field === 'year' ? parseInt(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleServiceSelect = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      service: serviceId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API}/bookings`, formData);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2500);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Booking submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const selectedService = services.find(s => s._id === formData.service);

  const generateDateOptions = () => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle className="h-12 w-12 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight">Booking Confirmed!</h2>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">
            Your appointment has been successfully scheduled. We've sent a confirmation to your email.
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-10 flex items-center gap-4 text-left">
             <div className="bg-brand-600 p-2 rounded-lg text-white"><Calendar className="w-5 h-5" /></div>
             <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scheduled For</p>
               <p className="font-bold text-slate-900">{format(new Date(formData.appointmentDate), 'PPP')} @ {formData.appointmentTime}</p>
             </div>
          </div>
          <p className="text-brand-600 font-bold animate-pulse text-sm">Redirecting to your garage...</p>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, label: 'Service', icon: <Settings /> },
    { num: 2, label: 'Vehicle', icon: <Car /> },
    { num: 3, label: 'Schedule', icon: <Calendar /> },
    { num: 4, label: 'Review', icon: <CheckCircle /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate('/dashboard')}
            className="group flex items-center gap-3 text-slate-600 hover:text-brand-600 font-bold transition-all"
          >
            <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-brand-50 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </div>
            <span>Exit to Dashboard</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-4">
             {steps.map((s, idx) => (
               <React.Fragment key={s.num}>
                 <div className={`flex items-center gap-2 ${currentStep >= s.num ? 'text-brand-600' : 'text-slate-400'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black border-2 transition-all ${currentStep >= s.num ? 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-600/20' : 'bg-white border-slate-200'}`}>
                       {s.num}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest mt-0.5">{s.label}</span>
                 </div>
                 {idx < steps.length - 1 && <div className={`w-6 h-px ${currentStep > s.num ? 'bg-brand-600' : 'bg-slate-200'}`} />}
               </React.Fragment>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 card-shadow overflow-hidden grid lg:grid-cols-3">
          
          {/* Side Info Panel */}
          <div className="bg-slate-900 p-10 text-white relative overflow-hidden hidden lg:block">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Sparkles className="w-32 h-32" />
             </div>
             
             <div className="relative z-10 h-full flex flex-col">
               <h2 className="text-3xl font-heading font-extrabold mb-8">Premium <br/> Concierge</h2>
               
               <div className="space-y-8 flex-grow">
                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/5"><ShieldCheck className="w-6 h-6 text-brand-400" /></div>
                     <div>
                       <h4 className="font-bold text-sm">Certified Care</h4>
                       <p className="text-xs text-slate-400 mt-1 leading-relaxed">All services performed by factory trained master technicians.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/5"><CreditCard className="w-6 h-6 text-brand-400" /></div>
                     <div>
                       <h4 className="font-bold text-sm">Transparent Pricing</h4>
                       <p className="text-xs text-slate-400 mt-1 leading-relaxed">No surprises at pickup. Genuine parts & oil at honest rates.</p>
                     </div>
                  </div>
               </div>

               {selectedService && (
                 <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-8">
                    <p className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-3">Active Selection</p>
                    <h5 className="font-bold text-lg">{selectedService.name}</h5>
                    <div className="flex items-center justify-between mt-4">
                       <span className="text-2xl font-black">₹{selectedService.price}</span>
                       <span className="text-xs font-bold text-slate-400">{selectedService.duration} MINS</span>
                    </div>
                 </div>
               )}
             </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 p-8 sm:p-12">
            {error && (
              <div className="mb-8 bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-center gap-3 animate-slide-up">
                <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />
                <span className="text-rose-800 text-xs font-bold">{error}</span>
              </div>
            )}

            {/* Step 1: Select Service */}
            {currentStep === 1 && (
              <div className="animate-fade-in space-y-8">
                <div>
                  <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">Choose your service</h2>
                  <p className="text-slate-500 font-medium">Select the best catalog option for your vehicle's current needs.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service._id}
                      className={`relative border-2 rounded-[2rem] p-6 cursor-pointer transition-all duration-300 group ${formData.service === service._id
                          ? 'border-brand-600 bg-brand-50 shadow-xl shadow-brand-600/5'
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      onClick={() => handleServiceSelect(service._id)}
                    >
                      {formData.service === service._id && (
                        <div className="absolute top-4 right-4 text-brand-600">
                           <CheckCircle className="w-5 h-5 fill-brand-600 text-white" />
                        </div>
                      )}
                      
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${formData.service === service._id ? 'bg-brand-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-brand-600'}`}>
                         <Settings className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-brand-700 transition-colors">{service.name}</h3>
                      <div className="flex items-center gap-3 mt-4">
                         <span className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors">₹{service.price}</span>
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none pt-1">{service.duration} mins</span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <span className="bg-white/60 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{service.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Vehicle Details */}
            {currentStep === 2 && (
              <div className="animate-fade-in space-y-8">
                <div>
                  <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">Vehicle Profile</h2>
                  <p className="text-slate-500 font-medium">Tell us more about the machine we'll be working on.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">
                      Vehicle Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                       {['car', 'bike'].map(type => (
                         <button
                           key={type}
                           type="button"
                           onClick={() => setFormData(p => ({ ...p, vehicleDetails: { ...p.vehicleDetails, type } }))}
                           className={`py-4 rounded-2xl font-bold uppercase tracking-widest text-xs border-2 transition-all flex items-center justify-center gap-3 ${formData.vehicleDetails.type === type ? 'border-brand-600 bg-brand-50 text-brand-600 shadow-lg shadow-brand-600/5' : 'border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'}`}
                         >
                           {type === 'car' ? <Car className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
                           {type}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Make / Brand</label>
                    <input
                      type="text"
                      name="vehicle.make"
                      value={formData.vehicleDetails.make}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-brand-500 font-bold text-slate-900 outline-none transition-all"
                      placeholder="e.g., Tesla, BMW"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Model Name</label>
                    <input
                      type="text"
                      name="vehicle.model"
                      value={formData.vehicleDetails.model}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-brand-500 font-bold text-slate-900 outline-none transition-all"
                      placeholder="e.g., Model S, M3"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Build Year</label>
                    <input
                      type="number"
                      name="vehicle.year"
                      value={formData.vehicleDetails.year}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-brand-500 font-bold text-slate-900 outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">License Plate</label>
                    <input
                      type="text"
                      name="vehicle.licensePlate"
                      value={formData.vehicleDetails.licensePlate}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-brand-500 font-bold text-slate-900 outline-none transition-all uppercase"
                      placeholder="XYZ 1234"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Schedule */}
            {currentStep === 3 && (
              <div className="animate-fade-in space-y-8">
                <div>
                  <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">Set the date</h2>
                  <p className="text-slate-500 font-medium">Choose a convenient slot for your visit.</p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Available Dates (Next 14 Days)</label>
                    <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
                      {generateDateOptions().map((date) => {
                         const dateStr = format(date, 'yyyy-MM-dd');
                         const isSelected = formData.appointmentDate === dateStr;
                         return (
                          <button
                            key={dateStr}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, appointmentDate: dateStr }))}
                            className={`min-w-[100px] p-4 flex flex-col items-center rounded-2xl transition-all border-2 ${isSelected ? 'border-brand-600 bg-brand-50 text-brand-600 shadow-xl shadow-brand-600/5' : 'border-slate-100 bg-white hover:border-slate-300'}`}
                          >
                             <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{format(date, 'MMM')}</span>
                             <span className="text-2xl font-black mb-1">{format(date, 'dd')}</span>
                             <span className="text-[10px] font-black uppercase tracking-widest">{format(date, 'EEE')}</span>
                          </button>
                         );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Time Slots</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, appointmentTime: time }))}
                          className={`p-3 text-[10px] sm:text-xs font-bold rounded-xl border-2 transition-all ${formData.appointmentTime === time ? 'border-brand-600 bg-brand-50 text-brand-600 shadow-lg shadow-brand-600/5' : 'border-slate-50 text-slate-600 bg-slate-50 hover:border-slate-200'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Service Instructions (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-brand-500 font-medium text-slate-900 outline-none transition-all resize-none"
                    placeholder="E.g., Minor scratch on door, check front brake noise..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirm */}
            {currentStep === 4 && (
              <div className="animate-fade-in space-y-8">
                <div>
                  <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">Final Review</h2>
                  <p className="text-slate-500 font-medium">Verify your selection before we lock it in.</p>
                </div>
                
                <div className="bg-slate-50 rounded-[2.5rem] p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Service Package</span>
                      <p className="font-bold text-slate-900">{selectedService?.name}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Vehicle Details</span>
                      <p className="font-bold text-slate-900">{formData.vehicleDetails.year} {formData.vehicleDetails.make} {formData.vehicleDetails.model}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Appointment</span>
                      <p className="font-bold text-slate-900">{format(new Date(formData.appointmentDate), 'MMM dd, yyyy')} @ {formData.appointmentTime}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Vehicle Plate</span>
                      <p className="font-bold text-slate-900 uppercase">{formData.vehicleDetails.licensePlate}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                       <div>
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Estimated</p>
                         <p className="text-3xl font-black text-brand-600 tracking-tight">₹{selectedService?.price}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                         <p className="font-bold text-slate-900">{selectedService?.duration} MINS</p>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 flex gap-4">
                   <Info className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                   <p className="text-xs font-medium text-brand-800 leading-relaxed">
                     Your booking will be processed immediately. You can reschedule up to 24 hours before your slot via the dashboard.
                   </p>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-12 mt-12 border-t border-slate-50">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-8 py-4 text-slate-400 hover:text-slate-900 font-bold disabled:opacity-0 transition-all active:scale-95 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Go Back
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !formData.service) ||
                    (currentStep === 2 && (!formData.vehicleDetails.make || !formData.vehicleDetails.model || !formData.vehicleDetails.licensePlate)) ||
                    (currentStep === 3 && (!formData.appointmentDate || !formData.appointmentTime))
                  }
                  className="px-10 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold shadow-xl shadow-brand-600/20 disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none transition-all active:scale-95 flex items-center gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4 pt-0.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20 disabled:opacity-50 transition-all active:scale-95 flex items-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                      <span>SECURE BOOKING...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-5 w-5" />
                      <span>CONFIRM & SCHEDULE</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookService;
