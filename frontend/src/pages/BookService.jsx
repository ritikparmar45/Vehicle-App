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
  Sparkles,
  Zap,
  Wrench,
  Activity,
  Award
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
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
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
      setError('Failed to initialize service catalog.');
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
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Transaction failed. Please re-verify parameters.');
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
      <div className="min-h-screen bg-white flex items-center justify-center p-8 animate-fade-in">
        <div className="max-w-xl w-full text-center space-y-12">
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-accent-success/20 blur-2xl rounded-full animate-pulse-slow"></div>
            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-2xl border border-slate-50 animate-float">
              <CheckCircle className="h-16 w-16 text-accent-success" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl font-heading font-black text-slate-900 tracking-tight">Mission Confirmed</h2>
            <p className="text-xl text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
              Your vehicle maintenance has been successfully scheduled into our performance queue.
            </p>
          </div>

          <div className="glass p-8 rounded-[3rem] border-slate-100 flex flex-col md:flex-row items-center gap-8 text-left shadow-2xl">
             <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white"><Calendar className="w-8 h-8 text-accent-primary" /></div>
             <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Scheduled Window</p>
               <p className="text-2xl font-black text-slate-900 tracking-tight">
                 {format(new Date(formData.appointmentDate), 'PPP')} <br/>
                 <span className="text-accent-primary">@ {formData.appointmentTime}</span>
               </p>
             </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest">
            <div className="w-4 h-4 rounded-full border-2 border-slate-200 border-t-accent-primary animate-spin"></div>
            <span>Synchronizing Garage Dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, label: 'Selection', icon: <Settings /> },
    { num: 2, label: 'Asset Info', icon: <Car /> },
    { num: 3, label: 'Queue', icon: <Calendar /> },
    { num: 4, label: 'Transmit', icon: <CheckCircle /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Progress */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-10">
          <button
            onClick={() => navigate('/dashboard')}
            className="group flex items-center gap-4 text-slate-500 hover:text-slate-900 transition-all"
          >
            <div className="w-12 h-12 glass shadow-sm rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:shadow-xl transition-all">
              <ArrowLeft className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Abort Mission</span>
          </button>
          
          <div className="flex items-center gap-6">
             {steps.map((s, idx) => (
               <React.Fragment key={s.num}>
                 <div className={`flex items-center gap-4 ${currentStep >= s.num ? 'text-slate-900' : 'text-slate-300'}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[10px] font-black border-2 transition-all duration-500 ${currentStep >= s.num ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20' : 'bg-white border-slate-200'}`}>
                       {s.num}
                    </div>
                    <span className="hidden lg:block text-[10px] font-black uppercase tracking-[0.2em]">{s.label}</span>
                 </div>
                 {idx < steps.length - 1 && <div className={`w-8 h-px transition-colors duration-500 ${currentStep > s.num ? 'bg-slate-900' : 'bg-slate-200'}`} />}
               </React.Fragment>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-[4rem] border border-slate-100 card-shadow overflow-hidden grid lg:grid-cols-12 min-h-[700px]">
          
          {/* Elite Concierge Panel */}
          <div className="lg:col-span-4 bg-slate-900 p-12 text-white relative overflow-hidden hidden lg:flex flex-col">
             <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-accent-primary/20 blur-[80px] rounded-full animate-pulse-slow"></div>
             
             <div className="relative z-10 space-y-12 flex-grow">
               <div className="space-y-4">
                 <div className="inline-block px-3 py-1 rounded-full glass border-white/10 text-[8px] font-black uppercase tracking-[0.2em] text-accent-primary">Elite Access</div>
                 <h2 className="text-4xl font-heading font-black tracking-tight leading-tight">Bespoke <br/> Concierge</h2>
               </div>
               
               <div className="space-y-10">
                  <div className="flex gap-6 group">
                     <div className="w-14 h-14 glass rounded-[1.25rem] flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-accent-primary/20 group-hover:border-accent-primary/30 transition-all duration-500">
                        <Award className="w-6 h-6 text-accent-primary" />
                     </div>
                     <div className="space-y-1">
                       <h4 className="font-black text-[10px] uppercase tracking-widest text-white">Certified Technicians</h4>
                       <p className="text-xs text-slate-400 leading-relaxed font-medium">Every asset is handled by industry-leading master mechanics.</p>
                     </div>
                  </div>
                  <div className="flex gap-6 group">
                     <div className="w-14 h-14 glass rounded-[1.25rem] flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-accent-secondary/20 group-hover:border-accent-secondary/30 transition-all duration-500">
                        <Activity className="w-6 h-6 text-accent-secondary" />
                     </div>
                     <div className="space-y-1">
                       <h4 className="font-black text-[10px] uppercase tracking-widest text-white">Live Diagnostics</h4>
                       <p className="text-xs text-slate-400 leading-relaxed font-medium">Real-time status updates via your secure digital garage.</p>
                     </div>
                  </div>
               </div>
             </div>

             {selectedService && (
               <div className="relative z-10 glass border-white/10 rounded-[2.5rem] p-8 mt-12 animate-slide-up shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em]">Selection Lock</p>
                    <Zap className="w-4 h-4 text-accent-primary animate-pulse" />
                  </div>
                  <h5 className="font-black text-2xl tracking-tight mb-6">{selectedService.name}</h5>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                     <div className="space-y-1">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Est. Payload</span>
                        <p className="text-3xl font-black tracking-tighter">₹{selectedService.price}</p>
                     </div>
                     <div className="text-right space-y-1">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Duration</span>
                        <p className="font-black text-white text-lg tracking-tight">{selectedService.duration} MINS</p>
                     </div>
                  </div>
               </div>
             )}
          </div>

          {/* Configuration Form Content */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 p-10 sm:p-20 flex flex-col">
            <div className="flex-grow">
              {error && (
                <div className="mb-12 glass-error p-6 rounded-3xl flex items-center gap-4 animate-slide-up">
                  <AlertCircle className="h-6 w-6 text-accent-error flex-shrink-0" />
                  <span className="text-accent-error text-xs font-black uppercase tracking-widest">{error}</span>
                </div>
              )}

              {/* Step 1: Program Selection */}
              {currentStep === 1 && (
                <div className="animate-fade-in space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-heading font-black text-slate-900 tracking-tight">Select Program</h2>
                    <p className="text-lg text-slate-500 font-medium">Identify the optimal maintenance matrix for your vehicle.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {services.map((service) => (
                      <div
                        key={service._id}
                        className={`relative rounded-[2.5rem] p-10 cursor-pointer transition-all duration-500 group border-2 ${formData.service === service._id
                            ? 'border-slate-900 bg-slate-900 text-white shadow-2xl'
                            : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:border-slate-200'
                          }`}
                        onClick={() => handleServiceSelect(service._id)}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${formData.service === service._id ? 'bg-accent-primary text-white' : 'bg-white text-slate-400 group-hover:bg-slate-900 group-hover:text-white shadow-sm'}`}>
                           <Wrench className="w-7 h-7" />
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-2xl font-black tracking-tight">{service.name}</h3>
                          <div className="flex items-center justify-between pt-6 border-t border-slate-200/10">
                             <span className="text-3xl font-black tracking-tighter">₹{service.price}</span>
                             <div className="text-right">
                               <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{service.duration} mins</p>
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Asset Profile */}
              {currentStep === 2 && (
                <div className="animate-fade-in space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-heading font-black text-slate-900 tracking-tight">Asset Profile</h2>
                    <p className="text-lg text-slate-500 font-medium">Calibrate the system to your specific vehicle parameters.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="sm:col-span-2 space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Classification</label>
                      <div className="grid grid-cols-2 gap-6">
                         {['car', 'bike'].map(type => (
                           <button
                             key={type}
                             type="button"
                             onClick={() => setFormData(p => ({ ...p, vehicleDetails: { ...p.vehicleDetails, type } }))}
                             className={`py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] border-2 transition-all flex items-center justify-center gap-4 ${formData.vehicleDetails.type === type ? 'border-slate-900 bg-slate-900 text-white shadow-2xl' : 'border-slate-100 bg-slate-50/50 text-slate-400 hover:border-slate-200'}`}
                           >
                             {type === 'car' ? <Car size={20} /> : <Zap size={20} />}
                             {type}
                           </button>
                         ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Manufacturer</label>
                      <input
                        type="text"
                        name="vehicle.make"
                        value={formData.vehicleDetails.make}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="e.g. MERCEDES-BENZ"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Model Variant</label>
                      <input
                        type="text"
                        name="vehicle.model"
                        value={formData.vehicleDetails.model}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="e.g. AMG GT"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Model Year</label>
                      <input
                        type="number"
                        name="vehicle.year"
                        value={formData.vehicleDetails.year}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Plate</label>
                      <input
                        type="text"
                        name="vehicle.licensePlate"
                        value={formData.vehicleDetails.licensePlate}
                        onChange={handleInputChange}
                        className="input-field uppercase"
                        placeholder="MH 01 AB 1234"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Queue Management */}
              {currentStep === 3 && (
                <div className="animate-fade-in space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-heading font-black text-slate-900 tracking-tight">Queue Selection</h2>
                    <p className="text-lg text-slate-500 font-medium">Select your preferred operational window.</p>
                  </div>
                  
                  <div className="space-y-12">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 block ml-1">Active Timeline</label>
                      <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar">
                        {generateDateOptions().map((date) => {
                           const dateStr = format(date, 'yyyy-MM-dd');
                           const isSelected = formData.appointmentDate === dateStr;
                           return (
                            <button
                              key={dateStr}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, appointmentDate: dateStr }))}
                              className={`min-w-[110px] p-6 flex flex-col items-center rounded-[2rem] transition-all duration-500 border-2 ${isSelected ? 'border-slate-900 bg-slate-900 text-white shadow-2xl' : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-300'}`}
                            >
                               <span className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-2">{format(date, 'MMMM')}</span>
                               <span className="text-3xl font-black mb-2 tracking-tighter">{format(date, 'dd')}</span>
                               <span className="text-[10px] font-black uppercase tracking-widest">{format(date, 'EEE')}</span>
                            </button>
                           );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 block ml-1">Available Slots</label>
                      <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, appointmentTime: time }))}
                            className={`p-5 text-[10px] font-black uppercase tracking-widest rounded-2xl border-2 transition-all duration-500 ${formData.appointmentTime === time ? 'border-slate-900 bg-slate-900 text-white shadow-xl' : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-white hover:border-slate-300'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Mission Directives (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-[2rem] p-6 text-sm focus:bg-white focus:border-slate-900 font-medium text-slate-900 outline-none transition-all resize-none"
                      placeholder="Identify any specific performance anomalies or special requirements..."
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Final Transmission */}
              {currentStep === 4 && (
                <div className="animate-fade-in space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-heading font-black text-slate-900 tracking-tight">Final Matrix</h2>
                    <p className="text-lg text-slate-500 font-medium">Verify the mission parameters before final transmission.</p>
                  </div>
                  
                  <div className="bg-slate-900 rounded-[3rem] p-12 space-y-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                       <ShieldCheck size={200} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-12 relative z-10">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Selected Program</span>
                        <p className="text-2xl font-black tracking-tight">{selectedService?.name}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Primary Asset</span>
                        <p className="text-2xl font-black tracking-tight uppercase">{formData.vehicleDetails.year} {formData.vehicleDetails.make} {formData.vehicleDetails.model}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Queue Window</span>
                        <p className="text-2xl font-black tracking-tight">{format(new Date(formData.appointmentDate), 'MMM dd, yyyy')} | {formData.appointmentTime}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Identity Link</span>
                        <p className="text-2xl font-black tracking-tight uppercase tracking-widest">{formData.vehicleDetails.licensePlate}</p>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-white/10 flex items-center justify-between relative z-10">
                       <div className="space-y-1">
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Estimated Payload</p>
                         <p className="text-5xl font-black text-accent-primary tracking-tighter">₹{selectedService?.price}</p>
                       </div>
                       <div className="text-right glass px-6 py-4 rounded-[1.5rem] border-white/10">
                         <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Queue Duration</p>
                         <p className="font-black text-white text-xl tracking-tight">{selectedService?.duration} MINS</p>
                       </div>
                    </div>
                  </div>

                  <div className="glass p-8 rounded-[2.5rem] border-slate-100 flex gap-6">
                     <Info className="w-6 h-6 text-accent-primary flex-shrink-0 mt-1" />
                     <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider">
                       Initiating this transmission locks your slot. Rescheduling is available up to 24 hours prior to the operational window via your secure dashboard.
                     </p>
                  </div>
                </div>
              )}
            </div>

            {/* Matrix Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-16 gap-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="w-full sm:w-auto px-10 py-5 text-slate-400 hover:text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-0 transition-all active:scale-95 flex items-center justify-center gap-4"
              >
                <ArrowLeft className="w-4 h-4" /> Previous Step
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
                  className="w-full sm:w-auto px-12 py-6 bg-slate-900 hover:bg-black text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none transition-all active:scale-95 flex items-center justify-center gap-4 group"
                >
                  <span>Advance Configuration</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-16 py-6 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-accent-primary/20 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-4"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                      <span>Transmitting Matrix...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-5 w-5" />
                      <span>Commit & Schedule Mission</span>
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
