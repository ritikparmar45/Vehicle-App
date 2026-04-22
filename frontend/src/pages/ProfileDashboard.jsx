import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  User, Mail, Phone, MapPin, Lock, Pencil,
  Save, XCircle, CalendarCheck, LogIn, ShieldCheck,
  Camera, ArrowRight, Shield, BadgeCheck
} from 'lucide-react';

const ProfileDashboard = () => {
  const { user, token } = useAuth();
  const [editMode, setEditMode] = useState(false);
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
      // Success alert is usually handled by the layout or local state
      setEditMode(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update profile');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
      
      {/* Header / Cover */}
      <div className="relative mb-24">
        <div className="h-48 w-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-[2.5rem] shadow-lg overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="absolute top-6 right-6">
              <span className="glass px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-brand-300" />
                Verified Account
              </span>
           </div>
        </div>
        
        {/* Profile Info Overlay */}
        <div className="absolute -bottom-16 left-8 md:left-12 flex flex-col md:flex-row md:items-end gap-6">
          <div className="relative group">
            <img
              src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(user.name || 'User')}`}
              alt="Avatar"
              className="w-32 h-32 rounded-[2rem] shadow-2xl border-4 border-white bg-white p-1 transition-transform group-hover:scale-105"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-brand-600 text-white rounded-xl shadow-lg hover:bg-brand-700 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mb-4">
             <h1 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">{user.name}</h1>
             <p className="text-slate-500 font-medium flex items-center gap-2">
               <Shield className="w-4 h-4 text-brand-500" />
               {user.role?.toUpperCase()} • Member since {new Date(user.createdAt).getFullYear()}
             </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Account Status</h3>
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-sm font-medium text-slate-600">Active</span>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm font-medium text-slate-600">Level</span>
                 <span className="text-xs font-black text-brand-600 bg-brand-50 px-2 py-0.5 rounded">PLATINUM</span>
               </div>
             </div>
          </div>
          
          <div className="bg-slate-900 text-white rounded-3xl p-6 card-shadow relative overflow-hidden group">
             <div className="absolute -right-6 -bottom-6 opacity-10 transition-transform group-hover:scale-110">
               <ShieldCheck className="w-24 h-24" />
             </div>
             <h3 className="text-lg font-bold mb-2">Protection Plan</h3>
             <p className="text-slate-400 text-sm mb-4">Your premium warranty is active until Dec 2026.</p>
             <button className="text-xs font-bold text-brand-400 flex items-center gap-2 group-hover:gap-3 transition-all">
               View Details <ArrowRight className="w-3 h-3" />
             </button>
          </div>
        </div>

        {/* Main Profile Details */}
        <div className="md:col-span-2">
           <div className="bg-white rounded-[2rem] p-8 border border-slate-100 card-shadow h-full">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-heading font-bold text-slate-900">Personal Details</h2>
                 {!editMode && (
                   <button
                     onClick={() => setEditMode(true)}
                     className="flex items-center gap-2 text-brand-600 hover:bg-brand-50 px-4 py-2 rounded-xl transition-all font-bold text-sm"
                   >
                     <Pencil className="w-4 h-4" /> Edit Profile
                   </button>
                 )}
              </div>

              {!editMode ? (
                <div className="grid sm:grid-cols-2 gap-8">
                   {[
                     { label: 'Full Name', val: user.name, icon: <User />, color: 'text-brand-600' },
                     { label: 'Email Address', val: user.email, icon: <Mail />, color: 'text-indigo-600' },
                     { label: 'Contact Number', val: user.phone, icon: <Phone />, color: 'text-brand-600' },
                     { label: 'Primary Address', val: user.address || 'Not Provided', icon: <MapPin />, color: 'text-rose-600' },
                   ].map((item, idx) => (
                     <div key={idx} className="group">
                        <div className="flex items-center gap-3 mb-2">
                           <div className={`p-2 rounded-lg bg-slate-50 ${item.color} group-hover:bg-brand-600 group-hover:text-white transition-all`}>
                             {React.cloneElement(item.icon, { className: 'w-4 h-4' })}
                           </div>
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                        </div>
                        <p className="text-slate-900 font-bold ml-11">{item.val}</p>
                     </div>
                   ))}
                   
                   <div className="sm:col-span-2 pt-8 mt-8 border-t border-slate-50 flex items-center justify-between text-slate-400 text-xs font-medium">
                      <div className="flex items-center gap-2">
                         <LogIn className="w-4 h-4" />
                         Last session: {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Just now'}
                      </div>
                      <div className="flex items-center gap-2">
                         <CalendarCheck className="w-4 h-4" />
                         Member since: {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                   </div>
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-6 animate-fade-in">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 font-bold text-slate-900 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 font-bold text-slate-900 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 font-bold text-slate-900 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 font-bold text-slate-900 outline-none transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">New Password (optional)</label>
                       <div className="relative">
                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                         <input
                           type="password"
                           name="password"
                           value={form.password}
                           onChange={handleChange}
                           placeholder="••••••••"
                           className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-3 text-sm focus:ring-2 focus:ring-brand-500 font-bold text-slate-900 outline-none transition-all"
                         />
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-6">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-brand-600/20 active:scale-95 transition-all"
                    >
                      <Save className="w-4 h-4" /> Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-8 py-3 rounded-xl font-bold active:scale-95 transition-all"
                    >
                      <XCircle className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </form>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
