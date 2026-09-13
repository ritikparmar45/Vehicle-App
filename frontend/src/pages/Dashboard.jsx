import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Car, 
  AlertCircle, 
  Download, 
  Eye, 
  History,
  TrendingUp,
  MapPin,
  ArrowRight
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    completed: 0
  });

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user || !token) return;
    fetchBookings();
  }, [user, token]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_BASE}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.bookings || [];
      setBookings(data);

      const total = data.length;
      const pending = data.filter(b => b?.status === 'pending').length;
      const approved = data.filter(b => b?.status === 'approved').length;
      const completed = data.filter(b => b?.status === 'completed').length;

      setStats({ total, pending, approved, completed });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await axios.patch(`${API_BASE}/bookings/${bookingId}/status`, {
        status: 'cancelled',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to cancel booking');
    }
  };

  const handleViewReceipt = async (bookingId) => {
    try {
      const response = await axios.get(`${API_BASE}/receipts/view/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to view receipt');
    }
  };

  const handleDownloadReceipt = async (bookingId) => {
    try {
      const response = await axios.get(`${API_BASE}/receipts/download/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `receipt_${bookingId}.pdf`;
      link.click();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to download receipt');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending': return 'badge-pending';
      case 'approved': return 'badge-approved';
      case 'in-progress': return 'badge-in-progress';
      case 'completed': return 'badge-completed';
      case 'cancelled': 
      case 'rejected': return 'badge-cancelled';
      default: return 'badge-pending';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 pt-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase tracking-[0.2em] mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Operational Dashboard</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Welcome Back, <span className="text-gradient">{user.name.split(' ')[0]}</span>
            </h1>
            <p className="text-slate-400 mt-2 text-sm font-medium">
              Manage your upcoming appointments, track service status, and access digital receipts.
            </p>
          </div>
          
          <Link
            to="/book-service"
            className="btn-primary group shadow-xl shadow-accent-primary/20 hover:shadow-accent-primary/40 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Book New Service</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Services', icon: <History />, value: stats.total, color: 'text-accent-primary bg-accent-primary/10 border-accent-primary/20' },
            { label: 'Upcoming', icon: <Calendar />, value: stats.approved + stats.pending, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
            { label: 'In Workshop', icon: <Clock />, value: stats.approved, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
            { label: 'Completed', icon: <CheckCircle />, value: stats.completed, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-3xl p-6 border border-white/10 card-shadow-hover transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl border ${stat.color}`}>
                  {React.cloneElement(stat.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-heading font-black text-white mt-1 tracking-tight">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="glass-dark rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-heading font-black text-white tracking-tight">Active & Past Bookings</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <Filter className="w-4 h-4 text-accent-primary" />
              <span>Recent Activity</span>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
                <Car className="h-9 w-9 text-slate-500" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">No active bookings found</h3>
              <p className="text-slate-400 mb-8 max-w-sm mx-auto text-sm font-medium">Your garage schedule is empty. Reserve an appointment to maintain peak vehicle performance.</p>
              <Link
                to="/book-service"
                className="btn-primary"
              >
                Schedule First Service
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                  <tr>
                    <th className="px-8 py-4">Service & Vehicle</th>
                    <th className="px-8 py-4">Schedule Window</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Est. Cost</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium text-sm">
                  {bookings.map((booking) => (
                    <tr key={booking?._id || Math.random()} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary group-hover:scale-105 transition-all">
                            <Car className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-white font-bold text-base">{booking?.service?.name || 'Vehicle Service'}</div>
                            <div className="text-xs text-slate-400 font-semibold mt-0.5">
                              {booking?.vehicleDetails?.make} {booking?.vehicleDetails?.model} • <span className="text-slate-300 uppercase font-mono">{booking?.vehicleDetails?.licensePlate}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-white font-bold">{booking?.appointmentDate ? format(new Date(booking.appointmentDate), 'MMM dd, yyyy') : '—'}</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-accent-primary" /> {booking?.appointmentTime || '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`badge-status ${getStatusStyle(booking?.status)}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                          {booking?.status || 'unknown'}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-white font-black text-lg">₹{booking?.totalAmount || 0}</span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end items-center gap-2">
                          {booking?.status === 'pending' && (
                            <button
                              onClick={() => handleCancelBooking(booking._id)}
                              className="text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500 p-2.5 rounded-xl border border-rose-500/20 transition-all"
                              title="Cancel Booking"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          {booking?.status === 'completed' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewReceipt(booking._id)}
                                className="text-accent-primary hover:text-white hover:bg-accent-primary bg-accent-primary/10 p-2.5 rounded-xl border border-accent-primary/20 transition-all"
                                title="View Receipt PDF"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDownloadReceipt(booking._id)}
                                className="text-emerald-400 hover:text-white hover:bg-emerald-500 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 transition-all"
                                title="Download Receipt"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple Filter Icon for UI
const Filter = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
);

export default Dashboard;
