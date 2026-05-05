import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  User, Mail, Phone, MapPin, Lock, Pencil,
  Save, XCircle, CalendarCheck, LogIn, ShieldCheck,
  Camera, ArrowRight, Shield, BadgeCheck,
  Zap, Settings, Bell, CreditCard
} from 'lucide-react';

const ProfileDashboard = () => {
  const { user, token } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const updatedForm = { ...form };
      if (!updatedForm.password) delete updatedForm.password;

      await axios.put(
        `${import.meta.env.VITE_API_URL}/edit-profile`,
        updatedForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditMode(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        
        {/* Header / Command Center Banner */}
        <div className="relative mb-16">
          <div className="h-64 w-full bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/40 via-transparent to-accent-secondary/20"></div>
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             
             {/* Abstract Shapes */}
             <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-accent-primary/20 blur-[100px] rounded-full animate-pulse-slow"></div>
             <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-accent-secondary/20 blur-[100px] rounded-full animate-pulse-slow [animation-delay:2s]"></div>

             <div className="absolute top-8 right-8 flex gap-3">
                <span className="glass px-4 py-2 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-accent-success" />
                  Elite Verified
                </span>
                <button className="glass p-2 rounded-2xl text-white hover:bg-white hover:text-slate-900 transition-all">
                  <Settings className="w-4 h-4" />
                </button>
             </div>
          </div>
          
          {/* Profile Identity Overlay */}
          <div className="absolute -bottom-10 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              <div className="relative group">
                <div className="w-40 h-40 rounded-[2.5rem] shadow-2xl border-[6px] border-white bg-white overflow-hidden p-1.5 transition-transform group-hover:scale-105 duration-500">
                  <img
                    src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(user.name || 'User')}`}
                    alt="Avatar"
                    className="w-full h-full rounded-[2rem] object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 p-3 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-accent-primary transition-all scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="mb-4 space-y-2">
                 <h1 className="text-4xl font-heading font-black text-slate-900 tracking-tight">{user.name}</h1>
                 <div className="flex items-center gap-4">
                    <p className="text-slate-500 font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Shield className="w-4 h-4 text-accent-primary" />
                      {user.role} Member
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">
                      ID: #729{user._id.slice(-4)}
                    </p>
                 </div>
              </div>
            </div>

            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="btn-primary py-4 px-8 mb-4 shadow-accent-primary/20"
              >
                <Pencil className="w-4 h-4" />
                <span>Modify Profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mt-24">
          
          {/* Left Column: Quick Actions & Status */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 card-shadow space-y-8">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Status</h3>
               
               <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse"></div>
                      <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Core Active</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400">99.9% Up</span>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tier Level</span>
                      <span className="text-xs font-black text-accent-primary bg-accent-primary/10 px-3 py-1 rounded-lg tracking-widest">PLATINUM</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="w-[85%] h-full bg-accent-primary rounded-full"></div>
                    </div>
                 </div>
               </div>

               <div className="pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <Bell className="w-5 h-5 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Alerts</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <CreditCard className="w-5 h-5 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Billing</span>
                  </button>
               </div>
            </div>
            
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 card-shadow relative overflow-hidden group">
               <div className="absolute -right-12 -bottom-12 opacity-10 transition-transform group-hover:scale-110 duration-1000 rotate-12">
                 <ShieldCheck className="w-48 h-48" />
               </div>
               <div className="relative z-10 space-y-6">
                 <div className="w-12 h-12 rounded-2xl bg-accent-primary/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-accent-primary" />
                 </div>
                 <h3 className="text-2xl font-black tracking-tight">Auto-Care <br/> Protection</h3>
                 <p className="text-slate-400 font-medium text-sm leading-relaxed">
                   Your premium diagnostic warranty is currently active until December 2026.
                 </p>
                 <button className="text-[10px] font-black text-accent-primary flex items-center gap-3 group-hover:gap-4 transition-all uppercase tracking-[0.2em]">
                   Coverage Matrix <ArrowRight className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>

          {/* Right Column: Identity Configuration */}
          <div className="lg:col-span-8">
             <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 card-shadow h-full">
                <div className="flex items-center justify-between mb-12">
                   <div>
                     <h2 className="text-3xl font-heading font-black text-slate-900 tracking-tight">Identity Matrix</h2>
                     <p className="text-slate-500 font-medium text-sm mt-2">Manage your core account credentials and security.</p>
                   </div>
                </div>

                {!editMode ? (
                  <div className="space-y-12">
                    <div className="grid sm:grid-cols-2 gap-12">
                       {[
                         { label: 'Primary Operator', val: user.name, icon: <User /> },
                         { label: 'Contact Link', val: user.email, icon: <Mail /> },
                         { label: 'Secure Line', val: user.phone, icon: <Phone /> },
                         { label: 'Dispatch Point', val: user.address || 'Location Not Configured', icon: <MapPin /> },
                       ].map((item, idx) => (
                         <div key={idx} className="group space-y-4">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all flex items-center justify-center">
                                 {React.cloneElement(item.icon, { size: 18 })}
                               </div>
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                            </div>
                            <p className="text-xl text-slate-900 font-black tracking-tight pl-1">{item.val}</p>
                         </div>
                       ))}
                    </div>
                    
                    <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row gap-8 justify-between text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                       <div className="flex items-center gap-3">
                          <LogIn className="w-4 h-4 text-accent-primary" />
                          Last Access: {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'System Initialized'}
                       </div>
                       <div className="flex items-center gap-3">
                          <CalendarCheck className="w-4 h-4 text-accent-primary" />
                          Commissioned: {new Date(user.createdAt).toLocaleDateString()}
                       </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleUpdate} className="space-y-10 animate-fade-in">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operator Name</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Email</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Comm Line</label>
                        <input
                          type="text"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base Location</label>
                        <input
                          type="text"
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-3">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Key Update (Optional)</label>
                         <div className="relative">
                           <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                           <input
                             type="password"
                             name="password"
                             value={form.password}
                             onChange={handleChange}
                             placeholder="••••••••"
                             className="input-field pl-14"
                           />
                         </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-10">
                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="btn-primary w-full sm:w-auto px-12 group"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isUpdating ? 'Transmitting...' : 'Commit Changes'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="w-full sm:w-auto px-12 py-5 border-2 border-slate-200 text-xs font-black uppercase tracking-widest rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center gap-3"
                      >
                        <XCircle className="w-4 h-4" /> Abort
                      </button>
                    </div>
                  </form>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
