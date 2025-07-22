import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  User, Mail, Phone, MapPin, Lock, Pencil,
  Save, XCircle, CalendarCheck, LogIn, ShieldCheck
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
      alert('✅ Profile updated successfully!');
      setEditMode(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update profile');
    }
  };

  if (!user) {
    return <p className="text-center text-red-600 mt-10">Please login to view your profile.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-14 px-6 py-8 bg-white shadow-2xl rounded-3xl border border-gray-200">
      <div className="flex flex-col items-center mb-8">
        <img
          src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(user.name || 'User')}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full shadow-lg border-2 border-blue-500 mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        <p className="text-sm text-gray-500">Manage your account details and preferences</p>
      </div>

      {/* Stats Block */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8 text-center">
        <div className="bg-blue-100 text-blue-800 rounded-xl p-4 shadow-md">
          <User className="mx-auto mb-1" size={20} />
          <p className="text-xs font-medium">Role: {user.role?.toUpperCase()}</p>
        </div>
        <div className="bg-green-100 text-green-800 rounded-xl p-4 shadow-md">
          <CalendarCheck className="mx-auto mb-1" size={20} />
          <p className="text-xs font-medium">
            Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            }) : 'N/A'}
          </p>
        </div>
        <div className="bg-purple-100 text-purple-800 rounded-xl p-4 shadow-md">
          <LogIn className="mx-auto mb-1" size={20} />
          <p className="text-xs font-medium">
            Last Login: {user.lastLogin ? new Date(user.lastLogin).toLocaleString('en-IN') : 'N/A'}
          </p>
        </div>
        <div className={`rounded-xl p-4 shadow-md ${user.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
          <ShieldCheck className="mx-auto mb-1" size={20} />
          <p className="text-xs font-medium">Status: {user.isActive ? 'Active' : 'Inactive'}</p>
        </div>
      </div>

      {!editMode ? (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-sm mb-6">
  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
    <User className="w-5 h-5 text-blue-600" />
    <div>
      <p className="text-xs text-gray-500">Name</p>
      <p className="font-semibold text-gray-800">{user.name}</p>
    </div>
  </div>

  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
    <Mail className="w-5 h-5 text-green-600" />
    <div>
      <p className="text-xs text-gray-500">Email</p>
      <p className="font-semibold text-gray-800">{user.email}</p>
    </div>
  </div>

  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
    <Phone className="w-5 h-5 text-yellow-600" />
    <div>
      <p className="text-xs text-gray-500">Phone</p>
      <p className="font-semibold text-gray-800">{user.phone}</p>
    </div>
  </div>

  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
    <MapPin className="w-5 h-5 text-red-600" />
    <div>
      <p className="text-xs text-gray-500">Address</p>
      <p className="font-semibold text-gray-800">{user.address || 'Not Provided'}</p>
    </div>
  </div>
</div>

          

          <div className="text-center">
            <button
              onClick={() => setEditMode(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleUpdate}
          className="space-y-4 text-sm text-gray-700 animate-fade-in"
        >
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">New Password (optional)</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              <Save size={16} />
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm"
            >
              <XCircle size={16} />
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileDashboard;
