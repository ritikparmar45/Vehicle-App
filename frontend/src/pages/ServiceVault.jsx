import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Car, 
  Download, 
  Eye, 
  Calendar, 
  Clock, 
  FileText, 
  TrendingUp, 
  Zap,
  Filter,
  Search,
  CheckCircle2
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

const ServiceVault = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
      // Filter completed bookings for vault records
      const data = (response.data.bookings || []).filter(b => b.status === 'completed');
      setBookings(data);
    } catch (err) {
      console.error('Vault fetch error:', err);
    } finally {
      setLoading(false);
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
      alert('❌ Failed to view receipt PDF');
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
      alert('❌ Failed to download receipt PDF');
    }
  };

  const vehicles = [...new Set(bookings.map(b => `${b.vehicleDetails?.make} ${b.vehicleDetails?.model} (${b.vehicleDetails?.licensePlate})`))];

  const filteredBookings = bookings.filter(b => {
    const vehicleKey = `${b.vehicleDetails?.make} ${b.vehicleDetails?.model} (${b.vehicleDetails?.licensePlate})`;
    const matchesVehicle = selectedVehicle === 'all' || vehicleKey === selectedVehicle;
    const matchesSearch = b.service?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.vehicleDetails?.licensePlate?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVehicle && matchesSearch;
  });

  const totalInvestment = filteredBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white py-16 pt-28 animate-fade-in relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-primary/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b border-white/5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase tracking-[0.25em]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Asset Vault</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Digital Service <span className="text-gradient">Vault & Receipts</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium">Access cryptographically signed service history, PDF receipts, and maintenance logs.</p>
          </div>

          <div className="flex items-center gap-6 glass-dark px-6 py-4 rounded-3xl border border-white/10">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Vaulted Value</p>
              <p className="text-3xl font-heading font-black text-white mt-0.5">₹{totalInvestment.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 glass-dark rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-accent-primary flex-shrink-0" />
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full sm:w-auto bg-slate-900 border border-white/10 rounded-2xl px-4 py-2.5 text-xs font-black uppercase tracking-widest text-slate-300 outline-none focus:border-accent-primary"
            >
              <option value="all">All Vehicles ({vehicles.length})</option>
              {vehicles.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search receipts or license..."
              className="input-field pl-11 py-2.5 text-xs rounded-2xl"
            />
          </div>
        </div>

        {/* Vault Records Table */}
        <div className="glass-dark rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                <tr>
                  <th className="px-8 py-4">Service Record</th>
                  <th className="px-8 py-4">Vehicle Matrix</th>
                  <th className="px-8 py-4">Timeline</th>
                  <th className="px-8 py-4">Cost</th>
                  <th className="px-8 py-4 text-right">PDF Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-medium">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Zap className="w-10 h-10 text-slate-600 animate-pulse" />
                        <p className="text-white font-bold text-lg">No completed records in vault</p>
                        <p className="text-slate-400 text-xs font-medium">Completed service appointments will automatically archive digital receipts here.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-white font-bold text-base">{booking.service?.name || 'Service Completed'}</p>
                            <p className="text-xs text-slate-400 font-mono">REF: #SC-{booking._id.slice(-6).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-5">
                        <div className="space-y-0.5">
                          <p className="font-bold text-white uppercase">{booking.vehicleDetails?.make} {booking.vehicleDetails?.model}</p>
                          <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">{booking.vehicleDetails?.licensePlate}</span>
                        </div>
                      </td>

                      <td className="px-8 py-5">
                        <div className="space-y-0.5">
                          <span className="text-white font-bold">{booking.appointmentDate ? format(new Date(booking.appointmentDate), 'MMM dd, yyyy') : '—'}</span>
                          <p className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-accent-primary" /> {booking.appointmentTime}
                          </p>
                        </div>
                      </td>

                      <td className="px-8 py-5">
                        <span className="text-white font-black text-lg">₹{booking.totalAmount || 0}</span>
                      </td>

                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleViewReceipt(booking._id)}
                            className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-white transition-all border border-accent-primary/20 flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" /> View PDF
                          </button>
                          <button
                            onClick={() => handleDownloadReceipt(booking._id)}
                            className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20 flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" /> Save
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceVault;
