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
  ArrowRight,
  Plus,
  History,
  BadgeCheck,
  Zap
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

const ServiceVault = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('all');

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
      // Filter only completed bookings for the vault
      const data = (response.data.bookings || []).filter(b => b.status === 'completed');
      setBookings(data);
    } catch (err) {
      console.error(err);
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

  const vehicles = [...new Set(bookings.map(b => `${b.vehicleDetails.make} ${b.vehicleDetails.model} (${b.vehicleDetails.licensePlate})`))];

  const filteredBookings = selectedVehicle === 'all' 
    ? bookings 
    : bookings.filter(b => `${b.vehicleDetails.make} ${b.vehicleDetails.model} (${b.vehicleDetails.licensePlate})` === selectedVehicle);

  const totalSpent = filteredBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] py-16 px-4 sm:px-6 lg:px-8 animate-fade-in text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20">
              <ShieldCheck className="w-4 h-4 text-accent-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary">Secure Infrastructure</span>
            </div>
            <h1 className="text-5xl font-heading font-black tracking-tighter">Digital Service <span className="text-accent-primary">Vault</span></h1>
            <p className="text-slate-400 font-medium max-w-xl">
              Access your lifetime vehicle maintenance records, certified receipts, and performance history in a secure, encrypted repository.
            </p>
          </div>

          <button 
            onClick={() => setShowReport(true)}
            className="btn-primary group"
          >
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Generate Resale Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
           <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 flex items-center justify-center">
                 <History className="w-8 h-8 text-accent-primary" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Services</p>
                 <p className="text-3xl font-black">{bookings.length}</p>
              </div>
           </div>

           <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                 <TrendingUp className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Investment</p>
                 <p className="text-3xl font-black">₹{totalSpent.toLocaleString()}</p>
              </div>
           </div>

           <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                 <BadgeCheck className="w-8 h-8 text-indigo-500" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Data Integrity</p>
                 <p className="text-3xl font-black text-indigo-400">VERIFIED</p>
              </div>
           </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-8">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Filter Vehicle:</span>
           <select 
             value={selectedVehicle}
             onChange={(e) => setSelectedVehicle(e.target.value)}
             className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-accent-primary focus:outline-none"
           >
              <option value="all" className="bg-[#0a0a0a]">All Vehicles</option>
              {vehicles.map(v => (
                <option key={v} value={v} className="bg-[#0a0a0a]">{v}</option>
              ))}
           </select>
        </div>

        {/* Records Table */}
        <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-white/5 border-b border-white/5">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Service Record</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Vehicle Matrix</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timeline</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Value</th>
                    <th className="px-10 py-6 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Vault Assets</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {filteredBookings.length === 0 ? (
                   <tr>
                      <td colSpan="5" className="px-10 py-24 text-center">
                         <div className="flex flex-col items-center gap-4">
                            <Zap className="w-12 h-12 text-slate-700 animate-pulse" />
                            <p className="text-slate-500 font-bold tracking-tight text-lg">No records found in the vault.</p>
                            <p className="text-slate-600 text-sm font-medium">Complete a service booking to synchronize your data.</p>
                         </div>
                      </td>
                   </tr>
                 ) : (
                   filteredBookings.map((booking) => (
                     <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="text-sm font-black text-white">{booking.service?.name}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ref: #SC-{booking._id.slice(-6).toUpperCase()}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-3">
                             <Car className="w-4 h-4 text-slate-500" />
                             <span className="text-sm font-bold text-slate-300">
                                {booking.vehicleDetails?.make} {booking.vehicleDetails?.model}
                             </span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="space-y-1">
                             <p className="text-sm font-black text-white">{format(new Date(booking.appointmentDate), 'MMM dd, yyyy')}</p>
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                <Clock className="w-3 h-3" /> {booking.appointmentTime}
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className="text-lg font-black text-accent-primary">₹{booking.totalAmount.toLocaleString()}</span>
                       </td>
                       <td className="px-10 py-8 text-right">
                          <div className="flex justify-end gap-3">
                             <button 
                               onClick={() => handleViewReceipt(booking._id)}
                               className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                               title="View Certificate"
                             >
                                <Eye className="w-5 h-5" />
                             </button>
                             <button 
                               onClick={() => handleDownloadReceipt(booking._id)}
                               className="p-3 bg-white/5 rounded-xl text-emerald-500/80 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all"
                               title="Download Asset"
                             >
                                <Download className="w-5 h-5" />
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

      {/* Resale Report Modal (Mock) */}
      {showReport && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowReport(false)}></div>
           <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-slide-up">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent-primary/20 flex items-center justify-center">
                       <FileText className="w-6 h-6 text-accent-primary" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black">Resale Value <span className="text-accent-primary">Report</span></h3>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Generated Intelligence</p>
                    </div>
                 </div>
                 <button onClick={() => setShowReport(false)} className="text-slate-500 hover:text-white transition-colors text-3xl font-light">&times;</button>
              </div>

              <div className="space-y-8">
                 <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Vehicle Integrity Score</p>
                          <div className="flex items-end gap-2">
                             <span className="text-4xl font-black text-emerald-500">9.4</span>
                             <span className="text-slate-500 font-bold mb-1">/ 10</span>
                          </div>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Estimated Appreciation</p>
                          <div className="flex items-end gap-2">
                             <span className="text-4xl font-black text-accent-primary">+12%</span>
                             <span className="text-slate-500 font-bold mb-1">Market Avg</span>
                          </div>
                       </div>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                       <p className="text-slate-400 text-sm leading-relaxed">
                          This vehicle has been maintained exclusively through <span className="text-white font-bold">AUTOCARE Precision Labs</span>. 
                          The full service history is verified and adds significant value to the resale market price.
                       </p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Report Summary</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                          <span className="text-slate-500 text-xs font-bold">Total Services</span>
                          <span className="text-white font-black">{filteredBookings.length}</span>
                       </div>
                       <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                          <span className="text-slate-500 text-xs font-bold">Investment Verified</span>
                          <span className="text-white font-black">₹{totalSpent.toLocaleString()}</span>
                       </div>
                    </div>
                 </div>

                 <button 
                  onClick={() => window.print()}
                  className="w-full btn-primary py-5 rounded-[2rem]"
                 >
                    Download Certified PDF Report
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ServiceVault;
