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
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'approved': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'in-progress': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'cancelled': 
      case 'rejected': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              Hello, <span className="text-brand-600">{user.name.split(' ')[0]}</span>!
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Your vehicle maintenance is on track.
            </p>
          </div>
          
          <Link
            to="/book-service"
            className="group inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-brand-600/20 transition-all hover:-translate-y-1 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Book New Service</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Services', icon: <History />, value: stats.total, color: 'brand' },
            { label: 'Upcoming', icon: <Calendar />, value: stats.approved + stats.pending, color: 'indigo' },
            { label: 'In Workshop', icon: <Clock />, value: stats.approved, color: 'amber' },
            { label: 'Completed', icon: <CheckCircle />, value: stats.completed, color: 'emerald' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow hover:card-shadow-hover transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                  {React.cloneElement(stat.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-heading font-extrabold text-slate-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 card-shadow overflow-hidden">
          <div className="px-8 py-8 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-2xl font-heading font-bold text-slate-900">Your Bookings</h2>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-xl">
              <Filter className="w-4 h-4" />
              <span>Recent first</span>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Car className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No active bookings</h3>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto font-medium">Your garage is quiet. Schedule a service to keep your vehicle in top shape.</p>
              <Link
                to="/book-service"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95"
              >
                Schedule First Service
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Service & Vehicle</th>
                    <th className="px-8 py-5">Schedule</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Cost</th>
                    <th className="px-8 py-5 text-right">Options</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  {bookings.map((booking) => (
                    <tr key={booking?._id || Math.random()} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all">
                            <Car className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-slate-900 font-bold">{booking?.service?.name || 'Service'}</div>
                            <div className="text-xs text-slate-500 font-bold mt-0.5">
                              {booking?.vehicleDetails?.make} {booking?.vehicleDetails?.model} • {booking?.vehicleDetails?.licensePlate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-slate-900 font-bold">{booking?.appointmentDate ? format(new Date(booking.appointmentDate), 'MMM dd, yyyy') : '—'}</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" /> {booking?.appointmentTime || '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyle(booking?.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full bg-current`}></span>
                          {booking?.status || 'unknown'}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-slate-900 font-black text-lg">₹{booking?.totalAmount || 0}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end items-center gap-3">
                          {booking?.status === 'pending' && (
                            <button
                              onClick={() => handleCancelBooking(booking._id)}
                              className="text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-2.5 rounded-xl transition-all"
                              title="Cancel"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          )}
                          {booking?.status === 'completed' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewReceipt(booking._id)}
                                className="text-brand-600 hover:text-white hover:bg-brand-600 bg-brand-50 p-2.5 rounded-xl transition-all"
                                title="View Receipt"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDownloadReceipt(booking._id)}
                                className="text-emerald-600 hover:text-white hover:bg-emerald-600 bg-emerald-50 p-2.5 rounded-xl transition-all"
                                title="Download"
                              >
                                <Download className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                          <Link 
                            to={`/booking-details/${booking._id}`}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-xl transition-all"
                          >
                            <Plus className="w-5 h-5" />
                          </Link>
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
