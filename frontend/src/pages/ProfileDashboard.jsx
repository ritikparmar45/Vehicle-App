import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  User, Mail, Phone, MapPin, Lock, Pencil,
  Save, XCircle, ShieldCheck, Camera, Settings, BadgeCheck,
  Zap, Bell, CheckCircle2
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
      alert('❌ Failed to update profile settings');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white py-16 pt-28 animate-fade-in relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent-primary/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Banner Section */}
        <div className="relative glass-dark rounded-[3rem] p-8 sm:p-12 border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/15 via-transparent to-indigo-500/10 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative group">
                <div className="w-28 h-28 rounded-3xl bg-slate-900 border-2 border-white/10 overflow-hidden p-1 shadow-2xl flex items-center justify-center text-accent-primary text-4xl font-heading font-black">
                  <img
                    src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(user.name || 'User')}`}
                    alt="Avatar"
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>Authenticated Account</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">{user.name}</h1>
                <p className="text-slate-400 text-xs font-semibold flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-accent-primary" /> {user.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => setEditMode(!editMode)}
              className="btn-primary py-3.5 px-6 rounded-2xl text-xs"
            >
              {editMode ? <XCircle className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
              <span>{editMode ? 'Cancel Edit' : 'Edit Credentials'}</span>
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleUpdate} className="glass-dark rounded-[2.5rem] border border-white/10 p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between pb-6 border-b border-white/5">
            <div className="space-y-1">
              <h2 className="text-2xl font-heading font-black text-white tracking-tight">Account Parameters</h2>
              <p className="text-slate-400 text-xs font-medium">Update your operator details and security settings.</p>
            </div>
            {editMode && (
              <button
                type="submit"
                disabled={isUpdating}
                className="btn-primary py-3 px-6 text-xs"
              >
                <Save className="w-4 h-4" />
                <span>{isUpdating ? 'Saving...' : 'Save Settings'}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="input-field pl-11 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="input-field pl-11 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                  placeholder="+91 98765 43210"
                  className="input-field pl-11 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location Address</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  disabled={!editMode}
                  placeholder="Street, City, State"
                  className="input-field pl-11 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {editMode && (
              <div className="sm:col-span-2 space-y-2 pt-4 border-t border-white/5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password (Optional)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    className="input-field pl-11"
                  />
                </div>
              </div>
            )}
          </div>
        </form>

      </div>
    </div>
  );
};

export default ProfileDashboard;
