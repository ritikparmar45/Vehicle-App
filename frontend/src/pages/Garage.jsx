import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Car, 
  Plus, 
  Trash2, 
  Edit2, 
  Zap, 
  Calendar, 
  Activity, 
  ShieldCheck, 
  ChevronRight,
  AlertCircle,
  X,
  Wrench
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Garage = () => {
  const { token } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    type: 'car',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    color: '',
    mileage: 0
  });

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API}/vehicles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehicles(response.data.vehicles);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError('Failed to synchronize garage data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingVehicle) {
        await axios.put(`${API}/vehicles/${editingVehicle._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API}/vehicles`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsModalOpen(false);
      setEditingVehicle(null);
      setFormData({ type: 'car', make: '', model: '', year: new Date().getFullYear(), licensePlate: '', color: '', mileage: 0 });
      fetchVehicles();
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction failed.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to purge this asset from your garage?')) {
      try {
        await axios.delete(`${API}/vehicles/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchVehicles();
      } catch (err) {
        setError('Failed to delete asset.');
      }
    }
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      type: vehicle.type,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      licensePlate: vehicle.licensePlate,
      color: vehicle.color || '',
      mileage: vehicle.mileage || 0
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] py-24 px-4 sm:px-6 lg:px-8 animate-fade-in text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary shadow-lg shadow-accent-primary/5">
              <Zap className="w-4 h-4" />
              <span>Asset Management Console</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-heading font-black tracking-tight leading-none text-white">
              Digital <br/> <span className="text-gradient">Garage</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium max-w-xl leading-relaxed">
              Maintain your elite fleet with precision diagnostics and real-time status tracking.
            </p>
          </div>
          
          <button 
            onClick={() => { setEditingVehicle(null); setIsModalOpen(true); }}
            className="group relative px-10 py-6 bg-accent-primary rounded-3xl overflow-hidden shadow-2xl shadow-accent-primary/20 active:scale-95 transition-all"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em]">
              <Plus className="w-5 h-5" />
              <span>Commission New Asset</span>
            </div>
          </button>
        </div>

        {/* Vehicle Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-slate-900/50 rounded-[3rem] animate-pulse"></div>
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="py-32 text-center space-y-8 bg-slate-900/20 rounded-[4rem] border border-white/5">
             <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto">
               <Car className="w-10 h-10 text-slate-600" />
             </div>
             <div className="space-y-2">
               <h3 className="text-2xl font-black">Garage Empty</h3>
               <p className="text-slate-500 text-sm font-medium">No assets currently registered in your local matrix.</p>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {vehicles.map((vehicle) => (
              <div 
                key={vehicle._id}
                className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3.5rem] p-10 hover:border-accent-primary/30 transition-all duration-700 hover:-translate-y-2 shadow-2xl"
              >
                {/* Background Glow */}
                <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full group-hover:bg-accent-primary/10 transition-colors duration-700"></div>
                
                <div className="relative z-10 space-y-10">
                   <div className="flex items-center justify-between">
                      <div className="w-16 h-16 bg-[#050505] rounded-[1.5rem] flex items-center justify-center border border-white/5 shadow-xl group-hover:border-accent-primary/50 transition-colors">
                        {vehicle.type === 'car' ? <Car className="w-8 h-8 text-accent-primary" /> : <Zap className="w-8 h-8 text-accent-primary" />}
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => openEditModal(vehicle)}
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent-primary transition-all text-slate-400 hover:text-white"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(vehicle._id)}
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent-error transition-all text-slate-400 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                   </div>

                   <div className="space-y-2">
                     <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{vehicle.year}</span>
                        <div className="w-1 h-1 rounded-full bg-accent-primary"></div>
                        <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest">{vehicle.type}</span>
                     </div>
                     <h3 className="text-3xl font-black tracking-tight leading-tight uppercase group-hover:text-gradient transition-all">
                       {vehicle.make} <br/> {vehicle.model}
                     </h3>
                   </div>

                   <div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/5">
                      <div className="space-y-1">
                         <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Plate Identity</span>
                         <p className="text-sm font-black tracking-widest text-white">{vehicle.licensePlate}</p>
                      </div>
                      <div className="space-y-1">
                         <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Mileage Log</span>
                         <p className="text-sm font-black tracking-tight text-white">{vehicle.mileage.toLocaleString()} KM</p>
                      </div>
                   </div>

                   <button className="w-full py-5 bg-white/5 group-hover:bg-accent-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all overflow-hidden group/btn">
                      <Activity className="w-4 h-4" />
                      <span>Diagnostic History</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Commission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md animate-fade-in" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-[3rem] border border-white/10 shadow-2xl p-10 md:p-16 animate-slide-up">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-10">
              <div className="space-y-4 text-center">
                <h2 className="text-4xl font-black tracking-tight">{editingVehicle ? 'Update Asset' : 'New Commission'}</h2>
                <p className="text-slate-400 font-medium">Define the core parameters of your vehicle asset.</p>
              </div>

              {error && (
                <div className="p-5 bg-accent-error/10 border border-accent-error/20 rounded-2xl flex items-center gap-4 animate-shake">
                  <AlertCircle className="w-5 h-5 text-accent-error" />
                  <span className="text-xs font-black uppercase tracking-widest text-accent-error">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                   <div className="col-span-2 space-y-4">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Asset Category</label>
                     <div className="grid grid-cols-2 gap-4">
                        {['car', 'bike'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({...formData, type})}
                            className={`py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all flex items-center justify-center gap-3 ${formData.type === type ? 'border-accent-primary bg-accent-primary/10 text-accent-primary shadow-lg shadow-accent-primary/10' : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/10'}`}
                          >
                            {type === 'car' ? <Car size={16} /> : <Zap size={16} />}
                            {type}
                          </button>
                        ))}
                     </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Manufacturer</label>
                     <input 
                       type="text" 
                       placeholder="e.g. BMW" 
                       className="input-field"
                       value={formData.make}
                       onChange={(e) => setFormData({...formData, make: e.target.value})}
                       required
                     />
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Model Variant</label>
                     <input 
                       type="text" 
                       placeholder="e.g. M4 COMPETITION" 
                       className="input-field"
                       value={formData.model}
                       onChange={(e) => setFormData({...formData, model: e.target.value})}
                       required
                     />
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Model Year</label>
                     <input 
                       type="number" 
                       className="input-field"
                       value={formData.year}
                       onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                       required
                     />
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Plate Identity</label>
                     <input 
                       type="text" 
                       placeholder="XX 00 XX 0000" 
                       className="input-field uppercase"
                       value={formData.licensePlate}
                       onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
                       required
                     />
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Asset Color</label>
                     <input 
                       type="text" 
                       placeholder="e.g. Frozen Deep Grey" 
                       className="input-field"
                       value={formData.color}
                       onChange={(e) => setFormData({...formData, color: e.target.value})}
                     />
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Mileage</label>
                     <input 
                       type="number" 
                       className="input-field"
                       value={formData.mileage}
                       onChange={(e) => setFormData({...formData, mileage: parseInt(e.target.value)})}
                     />
                   </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 bg-accent-primary text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-accent-primary/20 active:scale-95 transition-all flex items-center justify-center gap-4"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>{editingVehicle ? 'Authorize Modifications' : 'Initialize Asset Protocol'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Garage;
